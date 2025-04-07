# 核心模块

DappLink 作为模块化公链中间件，致力于简化 Layer2 和 Layer3 的部署与运行，推动链抽象技术的发展。DappLink 通过 Rollup 抽象、跨链抽象、L2 多重质押协议、证明系统抽象、快速验证网络抽象、模块化 Layer3 解决方案等技术，为开发者提供高效、灵活的基础组件。

- Rollup 抽象： DappLink 支持交易数据 Rollup 和交易证明 Rollup，兼容多种 数据可用性（DA）方案，包括 EIP-4844、EigenDA、Celestia、NearDA 和 AnyTrust，开发者可根据需求选择最优方案。此外，Rollup 证明系统支持 欺诈证明（适用于 Optimistic Rollup）和有效性证明（适用于 ZK Rollup），确保交易的安全性和可验证性。

- 跨链抽象： DappLink 实现了 去中心化跨链桥，支持 任意链到任意链的资产和消息传输。采用去中心化 Relayer 网络，通过 MPC 验证和 ZK 交易证明，确保跨链交易的安全性、抗审查性和高效性。同时，流动性池（FundingPool）管理跨链资金流动，支持 LP 参与质押和收益分配。

- L2 多重质押协议： DappLink 提供 BTC 和 ETH 等效的安全质押模型，允许用户通过 EigenLayer 进行 Restaking，获得多重收益。此外，CCIP 负责 Layer1 与 Layer2 之间的质押信息同步，确保奖励和 Slashing 机制的透明性和执行力。

- 快速验证网络：DappLink 通过 Babylon 和 Symbiotic 质押机制，构建 快速 Finalized 验证网络，减少欺诈证明等待时间，加速 Layer2 资产的快速提现，提高二层 Dapp 的用户体验。

- 模块化 Layer3 解决方案： DappLink 设计了可组合的 Layer3 框架，支持社交、游戏、托管等 Web3 业务链，帮助上层应用快速进入 Web3 生态。
