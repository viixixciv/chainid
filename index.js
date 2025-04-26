#!/usr/bin/env node
const axios = require("axios");
const readline = require("readline");
const WebSocket = require("ws");

async function getChainId(rpcUrl) {
  try {
    rpcUrl = rpcUrl.trim();

    // Determine if it's WebSocket or HTTP
    if (rpcUrl.startsWith("ws://") || rpcUrl.startsWith("wss://")) {
      return await getChainIdViaWebSocket(rpcUrl);
    } else {
      // Add http:// if not present
      if (!rpcUrl.startsWith("http")) {
        rpcUrl = "http://" + rpcUrl;
      }
      return await getChainIdViaHttp(rpcUrl);
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
    return null;
  }
}

async function getChainIdViaHttp(rpcUrl) {
  console.log(`\nFetching chain ID via HTTP from: ${rpcUrl}`);

  const response = await axios.post(
    rpcUrl,
    {
      jsonrpc: "2.0",
      method: "eth_chainId",
      params: [],
      id: 1,
    },
    {
      timeout: 5000,
    }
  );

  if (response.data?.result) {
    const chainId = parseInt(response.data.result, 16);
    console.log(`✅ Chain ID: ${chainId} (0x${chainId.toString(16)})`);
    return chainId;
  } else {
    console.log("❌ Failed to get chain ID");
    return null;
  }
}

async function getChainIdViaWebSocket(wsUrl) {
  console.log(`\nFetching chain ID via WebSocket from: ${wsUrl}`);

  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl);
    const request = {
      jsonrpc: "2.0",
      method: "eth_chainId",
      params: [],
      id: 1,
    };

    const timeout = setTimeout(() => {
      ws.close();
      reject(new Error("WebSocket timeout"));
    }, 5000);

    ws.on("open", () => {
      ws.send(JSON.stringify(request));
    });

    ws.on("message", (data) => {
      try {
        const response = JSON.parse(data);
        if (response.result) {
          const chainId = parseInt(response.result, 16);
          console.log(`✅ Chain ID: ${chainId} (0x${chainId.toString(16)})`);
          clearTimeout(timeout);
          ws.close();
          resolve(chainId);
        }
      } catch (e) {
        clearTimeout(timeout);
        ws.close();
        reject(e);
      }
    });

    ws.on("error", (error) => {
      clearTimeout(timeout);
      reject(error);
    });
  });
}

function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("=== RPC CHAIN ID ===");
  console.log("Enter RPC URL (supports both HTTP and WebSocket)\n");
  console.log("Examples:");
  console.log("- HTTP: https://mainnet.infura.io/v3/your-key");
  console.log("- WebSocket: wss://mainnet.infura.io/ws/v3/your-key\n");

  rl.question("RPC URL: ", (url) => {
    getChainId(url).finally(() => {
      rl.close();
      process.exit(0);
    });
  });
}

main();
