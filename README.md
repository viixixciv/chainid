# RPC Chain ID Checker
A lightweight and elegant command-line tool to retrieve a blockchain's `chainId` from any RPC endpoint.

## Features
* ✨ **Elegant Interface:** A clean, minimal UI with an interactive loading spinner.
* ⚡ **Dual Mode:** Run with a URL argument for instant results (Direct Mode), or without for an interactive prompt (Interactive Mode).
* ✔ **Dual-Protocol Support:** Seamlessly works with `http://`, `https://`, `ws://`, and `wss://` endpoints.
* 🚀 **Smart Defaults:** Automatically prefixes URLs with `https://` if no protocol is specified.
* 🔄 **Automatic Fallback:** If an `https://` connection fails, it automatically retries with `http://`.
* ⏱️ **Timeout Protection:** Includes a 5-second timeout to prevent indefinite hanging.
* ⚙️ **Zero-Configuration:** No setup or API keys needed.

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
```

## Usage
This tool can be run in two modes:

### Direct Mode (Recommended)
Pass the RPC URL directly as an argument for a quick, non-interactive result.
```bash
chainid <rpc-url>
```

### Examples:
```bash
chainid https://ethereum-rpc.publicnode.com
```

### Interactive Mode
Run the command without any arguments to enter the interactive prompt.
```bash
chainid
```
The tool will then ask you to enter the RPC URL.

## Sample Outputs

### Direct Mode
```bash
$ chainid ethereum-rpc.publicnode.com
⠋ Fetching Chain ID...

✅ Success! Chain ID: 1 (0x1)
```

### Interactive Mode
```bash
$ chainid

🔗 RPC Chain ID Checker
========================
Enter an RPC URL or run with an argument:
e.g., chainid https://ethereum-rpc.publicnode.com

🌐 RPC URL: https://ethereum-rpc.publicnode.com
⠋ Fetching Chain ID...

✅ Success! Chain ID: 1 (0x1)
```

## License
This project is licensed under the MIT License. See the [LICENSE](https://github.com/viixixciv/chainid/blob/main/LICENSE) file for details.

## Support
Like this tool? Consider supporting its development:
* EVM: `0xDeAd22Bd5024B8982c99Ecf0F961abD37969afca`