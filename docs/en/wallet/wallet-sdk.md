# Offline Sign SDK {#dapplink-wallet}

Wallet-SDK is a powerful wallet development toolkit that encapsulates core wallet-related functionalities, including offline signing, mnemonic management, import/export and validation of public and private keys, and more. The SDK supports all mainstream public blockchains and offers high flexibility. It can be deployed directly or integrated into environments such as TEE (Trusted Execution Environment), KMS (Key Management System), and wallet.data.

### Features
- Offline Signing:
    - Supports offline signing for transactions of various mainstream cryptocurrencies, ensuring the security of private keys.
    - Provides standardized signing interfaces adaptable to various scenarios.
- Mnemonic Management:
    - Generates mnemonics compliant with the BIP39 standard.
    - Restores wallets from mnemonics (supports multiple path formats).
    - Validates the legality of mnemonics.
- Public and Private Key Management:
    - Supports the import and export of public and private keys (supports multiple formats, such as PEM and HEX).
    - Provides interfaces for validating the legitimacy of public and private keys.
- Multi-chain Support:
    - Fully supports all mainstream public blockchains, including Bitcoin (BTC), Ethereum (ETH), Polkadot, Tron, and more.
    - Supports multi-chain ecosystems based on EVM.

### High Compatibility
Wallet-SDK can be deployed in various environments, including:
- TEE (Trusted Execution Environment):
    - Operates in hardware-isolated environments to enhance security.
- KMS (Key Management System):
    - Seamlessly integrates with existing key management systems.
- Wallet.data:
    - Supports wallet data service interfaces for unified data management.

### Use Cases
- Multi-chain Wallet Development:
    - Quickly build cross-chain wallets supporting multiple cryptocurrencies, reducing development efforts.
- Enterprise-level Key Management:
    - Integrate into existing TEE or KMS systems to enhance key security management capabilities.
- Transaction Signing Services:
    - Provides secure and convenient offline signing capabilities for various mainstream cryptocurrencies and transaction types.