# RPC CHAIN ID

A lightweight tool to retrieve blockchain `chainId` from RPC endpoints (supports both HTTP and WebSocket).

## Features

✔ Dual-protocol support (HTTP/WebSocket)  
✔ Automatic URL prefix handling (`http://` if missing)  
✔ Smart connection type detection  
✔ 5-second timeout protection  
✔ Chain ID displayed in decimal + hexadecimal  
✔ Zero-configuration required

## Installation

### Local Usage

```bash
git clone https://github.com/viixixciv/chainid.git
cd chainid
npm install
npm start
```

### Global Installation (Recommended)

```bash
npm install -g chainid
chainid
```

## Usage

1. Run the tool: `npm start` (or `chainid` if installed globally)
2. Enter your RPC endpoint when prompted

### Example Inputs

```bash
https://mainnet.infura.io/v3/YOUR_KEY
wss://mainnet.infura.io/ws/v3/YOUR_KEY
ethereum-rpc.publicnode.com  # Auto-detects HTTP
```

## Sample Output

```bash
=== RPC CHAIN ID ===
Enter RPC URL (supports both HTTP and WebSocket)

Examples:
- HTTP: https://mainnet.infura.io/v3/your-key
- WebSocket: wss://mainnet.infura.io/ws/v3/your-key

RPC URL: https://ethereum-rpc.publicnode.com

Fetching chain ID via HTTP from: https://ethereum-rpc.publicnode.com
✅ Chain ID: 1 (0x1)
```

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/viixixciv/chainid/blob/main/LICENSE) file for details.

## Support

Like this tool? Consider supporting development:

- EVM: `0xDeAd22Bd5024B8982c99Ecf0F961abD37969afca`
