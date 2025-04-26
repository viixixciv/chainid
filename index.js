#!/usr/bin/env node
const axios = require("axios");
const readline = require("readline");
const WebSocket = require("ws");

// Configuration
const DEFAULT_TIMEOUT = 5000;
const DEFAULT_PROTOCOL = "https://";

async function getChainId(rpcUrl) {
  try {
    rpcUrl = rpcUrl.trim();

    if (isWebSocket(rpcUrl)) {
      return await getChainIdViaWebSocket(rpcUrl);
    }

    // First try with proper protocol
    const urlWithProtocol = addProtocol(rpcUrl);
    return await getChainIdViaHttp(urlWithProtocol);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    return null;
  }
}

function isWebSocket(url) {
  return url.startsWith("ws://") || url.startsWith("wss://");
}

function addProtocol(url) {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return DEFAULT_PROTOCOL + url;
}

async function getChainIdViaHttp(rpcUrl) {
  console.log(`\n🔍 Fetching chain ID from: ${rpcUrl}`);

  try {
    const response = await axios.post(
      rpcUrl,
      {
        jsonrpc: "2.0",
        method: "eth_chainId",
        params: [],
        id: 1,
      },
      { timeout: DEFAULT_TIMEOUT }
    );

    if (!response.data?.result) {
      throw new Error("No chain ID received");
    }

    const chainId = parseInt(response.data.result, 16);
    console.log(`✅ Chain ID: ${chainId} (0x${chainId.toString(16)})`);
    return chainId;
  } catch (error) {
    // If HTTPS fails, try HTTP as fallback
    if (rpcUrl.startsWith("https://")) {
      console.log("⚠️  HTTPS failed, trying HTTP...");
      const httpUrl = rpcUrl.replace("https://", "http://");
      return await getChainIdViaHttp(httpUrl);
    }
    throw new Error(`Request failed: ${error.message}`);
  }
}

async function getChainIdViaWebSocket(wsUrl) {
  console.log(`\n🔍 Fetching chain ID from: ${wsUrl}`);

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
    }, DEFAULT_TIMEOUT);

    ws.on("open", () => ws.send(JSON.stringify(request)));
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

function displayWelcome() {
  console.log(`
=== RPC CHAIN ID CHECKER ===
Enter RPC URL (supports both HTTP and WebSocket)

Examples:
- HTTP: https://mainnet.infura.io/v3/your-key
- WebSocket: wss://mainnet.infura.io/ws/v3/your-key
- Simplified: ethereum-rpc.publicnode.com
`);
}

function main() {
  displayWelcome();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("🌐 RPC URL: ", async (url) => {
    await getChainId(url);
    rl.close();
    process.exit(0);
  });
}

main();
