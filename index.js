#!/usr/bin/env node
const axios = require("axios");
const readline = require("readline");
const WebSocket = require("ws");

const TIMEOUT = 5000;
const DEFAULT_PROTOCOL = "https://";

const addProtocol = (url) => {
  if (/^https?:\/\//.test(url) || /^wss?:\/\//.test(url)) {
    return url;
  }
  return DEFAULT_PROTOCOL + url;
};

async function getChainIdViaHttp(url) {
  const payload = { jsonrpc: "2.0", method: "eth_chainId", params: [], id: 1 };
  try {
    const { data } = await axios.post(url, payload, { timeout: TIMEOUT });
    if (!data.result) throw new Error("Invalid RPC response");
    return parseInt(data.result, 16);
  } catch (error) {
    if (url.startsWith("https://")) {
      return getChainIdViaHttp(url.replace("https://", "http://"));
    }
    throw error;
  }
}

function getChainIdViaWebSocket(url) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(url);
    const request = { jsonrpc: "2.0", method: "eth_chainId", params: [], id: 1 };
    const connectionTimeout = setTimeout(() => {
      ws.close();
      reject(new Error("WebSocket connection timed out"));
    }, TIMEOUT);
    ws.on("open", () => ws.send(JSON.stringify(request)));
    ws.on("error", (err) => {
      clearTimeout(connectionTimeout);
      reject(err);
    });
    ws.on("message", (data) => {
      clearTimeout(connectionTimeout);
      try {
        const response = JSON.parse(data);
        if (response.result) resolve(parseInt(response.result, 16));
        else reject(new Error("Invalid WebSocket response"));
      } catch (e) {
        reject(e);
      } finally {
        ws.close();
      }
    });
  });
}

function showSpinner(message = "Fetching...") {
  const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  let i = 0;
  const interval = setInterval(() => {
    process.stdout.write(`\r${frames[i++ % frames.length]} ${message}`);
  }, 80);
  return () => {
    clearInterval(interval);
    process.stdout.write("\r" + " ".repeat(message.length + 2) + "\r");
  };
}

async function processRpcUrl(url) {
  const stopSpinner = showSpinner("Fetching Chain ID...");
  try {
    const fullUrl = addProtocol(url.trim());
    const isWs = fullUrl.startsWith("ws");
    const chainId = isWs
      ? await getChainIdViaWebSocket(fullUrl)
      : await getChainIdViaHttp(fullUrl);
    stopSpinner();
    console.log(`✅ Success! Chain ID: ${chainId} (0x${chainId.toString(16)})`);
  } catch (error) {
    stopSpinner();
    console.error(`❌ Failed: ${error.message}`);
    process.exit(1);
  }
}

(async () => {
  const urlArgument = process.argv[2];

  if (urlArgument) {
    await processRpcUrl(urlArgument);
  } else {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log(`
🔗 RPC Chain ID Checker
========================
Enter an RPC URL or run with an argument:
e.g., chainid https://ethereum-rpc.publicnode.com
`);

    const urlInput = await new Promise((resolve) => {
      rl.question("🌐 RPC URL: ", resolve);
    });
    rl.close();
    await processRpcUrl(urlInput);
  }
})();