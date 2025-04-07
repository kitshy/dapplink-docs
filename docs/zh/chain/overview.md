# 概述

DappLink 模块化公链中间件技术解决方案，致力于简化 Layer2 和 Layer3 网络的部署与运行，为开发者提供开箱即用的基础组件，推动链抽象技术的发展； DappLink 已经实现Rollup 抽象，跨链抽象，L2 多重质押协议，证明系统抽象，快速验证网络抽象和模块化可组合的 Layer3 等技术解决方案。

- Rollup 抽象：支持交易数据和交易证明的 RollUp,  任意 Layer2 和 Layer3 都可以快速接入; 支持多路 DA RollUp, 如 AnyTrust，Celestia，EigenDA，EIP4844 和 NearDA 等，开发者可以根据不同场景选择最适合的数据可用层解决方案。

- 跨链抽象:任意链到任意链的资产，消息跨链；去中心化的 MPC（多签节点） 验证人组成的 Relayer（中继器） 网络进行验证，采用 ZK-Proof 进行交易证明。

- L2 多重质押协议：与 BTC 和 ETH 等效的安全的质押模型，质押用户可以获得多重收益

- 证明系统抽象：DappLink 正在探索欺诈证明与有效性证明的实现
    - 欺诈证明：主要用在 op rollup, 出发点是 sequencer 是不做恶的，但是我们乐观的认为，其实 sequencer 是有做恶的风险，欺诈证明就是用来防止 sequencer 及其相关组件作恶。
    - 有效证明：主要用在 zk(基于零知识证明) rollup, 对每一笔交易都进行 zk 证明，链下 zk prove 生成证明，提交到链上验证
    - 目前 DappLink 正在构建基于 Op, Arbi 的欺诈证明系统抽象，基于 Scroll，Zync Polygon 和 Linea 有效证明系统抽象。

- 快速验证网络抽象:  Rollup 状态快速 Finalized 验证网络，减少欺诈证明等待时间，一层资产快速退出；二层区块快速 Finalized, 让运行在 Layer2 的 Dapp 体验更佳。

- 模块化可以组合的 Layer3:  根据上层业务推导底层应用的链的实现模式，为大规模上层用进入 Web3 而设计，目前已经支持社交，游戏和托管等 Layer3 业务链模块。


