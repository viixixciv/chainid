# RPC Chain ID Checker
A lightweight and elegant command-line tool to retrieve a blockchain's `chainId` from any RPC endpoint (supports both HTTP/S and WebSocket).

## Features
* ✨ **Elegant Interface:** A clean, minimal UI with an interactive loading spinner for a better user experience.
* ✔ **Dual-Protocol Support:** Seamlessly works with `http://`, `https://`, `ws://`, and `wss://` endpoints.
* 🚀 **Smart Defaults:** Automatically prefixes URLs with `https://` if no protocol is specified.
* 🔄 **Automatic Fallback:** If an `https://` connection fails, it automatically retries with `http://`.
* ⏱️ **Timeout Protection:** Includes a 5-second timeout to prevent indefinite hanging.
* 💻 **Clear Output:** Displays the Chain ID in both decimal and hexadecimal formats.
* ⚙️ **Zero-Configuration:** No setup or API keys needed. Just run it.

## Installation

### Local Usage
For quick, one-time use.
```bash
git clone https://github.com/viixixciv/chainid.git && cd chainid
npm install
npm start
```

### Global Installation (Recommended)
For easy access from anywhere in your terminal.
```bash
npm install -g @viixixciv/chainid
chainid
```

## Usage
1. Run the tool: `npm start` (or `chainid` if installed globally).
2. Enter your RPC endpoint when prompted and press Enter.

### Example Inputs
```bash
# Full URL (HTTPS)
https://mainnet.infura.io/v3/YOUR_KEY

# Full URL (WebSocket)
wss://mainnet.infura.io/ws/v3/YOUR_KEY

# Simplified URL (will be prefixed with https://)
ethereum-rpc.publicnode.com
```

## Sample Output
The new interface is clean and provides clear feedback.
```bash
🔗 RPC Chain ID Checker
========================
Enter RPC URL (supports http, https, ws, wss)

🌐 RPC URL: https://ethereum-rpc.publicnode.com
⠋ Fetching Chain ID...  (<- This is an animated spinner)

✅ Success! Chain ID: 1 (0x1)
```

## License
This project is licensed under the MIT License. See the [LICENSE](https://github.com/viixixciv/chainid/blob/main/LICENSE) file for details.

## Support
Like this tool? Consider supporting its development:
- EVM: `0xDeAd22Bd5024B8982c99Ecf0F961abD37969afca`
