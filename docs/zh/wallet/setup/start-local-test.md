# 本地运行 DappLink 一键发钱包项目

## 一.概述

DappLink 一键发钱包分为基础版和企业版本，目前基础版本已经开源，企业版本微开源，基础版本开源地址如下:

- 签名机: https://github.com/dapplink-labs/wallet-sign-go, 签名机代码
- wallet-chain-account: https://github.com/dapplink-labs/wallet-chain-account, 钱包 account 类型的链 RPC 代码封装
- wallet-chain-utxo: https://github.com/dapplink-labs/wallet-chain-utxo, 钱包 utxo 类型的链的代码封装
- multichain-sync-account: https://github.com/dapplink-labs/multichain-sync-account, 钱包 account 类型扫链代码封装
- multichain-sync-btc: https://github.com/dapplink-labs/multichain-sync-btc， 钱包 utxo 类型扫链代码封装

以上是本地网络启动用到的代码仓库，接下来我们以 Ethereum 钱包为例开始本地测试流程。


## 二.签名机配置启动

### 1. 启动 wallet-sign 签名机
- 克隆代码
```
git clone git@github.com:dapplink-labs/wallet-sign-go.git
```
- 安装依赖
```
cd wallet-sign-go
确定 go 的版本和 go mod 里面版本是一致的, 可以使用 gvm 管理不同的 go 版本
go 1.22.8
go mod tidy
```

- 构建项目
```
  make
```
#### 相关命令解释
- 运行 unit test
```
make test
```
- 将 proto 构建成为 go
```  
  make proto
```

### 2.运行签名机测试
- 配置 env
```
export SIGNATURE_RPC_PORT=8983
export SIGNATURE_RPC_HOST="127.0.0.1"
export SIGNATURE_LEVEL_DB_PATH="./data"
```

- 启动服务
```
./signature rpc
 ``` 
- 启动成功的日志如下
 ``` 
INFO [03-24|10:05:19.383] start rpc services                       addr=127.0.0.1:8983
INFO [03-24|10:05:19.384] Grpc info                                port=8983 address=127.0.0.1:8983
 ``` 

## 三.wallet-chain-account 的配置启动
- 克隆代码
```
git clone git@github.com:dapplink-labs/wallet-chain-account.git
```

- 安装依赖
```
cd wallet-chain-account
go mod tidy
```

- 构建项目
```
go 1.22.8
make
```

- 配置配置文件
 ```
server:
port: 8189


network: mainnet

chains: [Ethereum, Solana, Tron, Aptos, Sui, Arbitrum,BscChain,Mantle ,Optimism,Linea,Scroll,Polygon,Xlm,Btt]

wallet_node:
eth:
rpc_url: 'https://eth-holesky.g.alchemy.com/v2/QySv9gLuQUaXy0BJnpNwW1d1N8ve0as4'
rpc_user: ''
rpc_pass: ''
data_api_url: 'https://api-holesky.etherscan.io/api?'
data_api_key: 'HZEZGEPJJDA633N421AYW9NE8JFNZZC7JT'
data_api_token: ''
time_out: 15

cosmos:
rpc_url: 'https://cosmos-rpc.publicnode.com:443'
rpc_user: ''
rpc_pass: ''
data_api_url: 'https://cosmos-rest.publicnode.com/'
data_api_key: 'HZEZGEPJJDA633N421AYW9NE8JFNZZC7JT'
data_api_token: ''
time_out: 15

solana:
rpc_url: 'https://go.getblock.io/70f479b9ed834b5f96a26934e0492b36'
rpc_user: ''
rpc_pass: ''
data_api_url: 'https://public-api.solscan.io'
data_api_key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkQXQiOjE3MjQwNjIxMzk5MDYsImVtYWlsIjoiemFja2d1by5ndW9AZ21haWwuY29tIiwiYWN0aW9uIjoidG9rZW4tYXBpIiwiYXBpVmVyc2lvbiI6InYxIiwiaWF0IjoxNzI0MDYyMTM5fQ.EaWDC25lyGNx_LqRL5sAYYKLMbq10brnexKnAz9C3UY'
data_api_token: ''
time_out: 15
```

- 启动服务
```
./wallet-chain-account -c ./config.yml
```

## 四.手动离线签名测试
### 1.调用签名机生成密钥对列表
- Request
```
  grpcurl -plaintext -d '{
      "type": "ecdsa",
      "number": "10"
  }' 127.0.0.1:8983 dapplink.wallet.WalletService.exportPublicKeyList
```
- Response
```
{
"Code": "SUCCESS",
"msg": "create keys success",
"public_key": [
    {
        "compress_pubkey": "034cabfc7e5fc65849172f39bd35d3df008e8e90a494ed01ea439c52bfc68117a5",
        "pubkey": "044cabfc7e5fc65849172f39bd35d3df008e8e90a494ed01ea439c52bfc68117a5f34b7cf102f9d9414d11a2bb407d00ab90d43679cda1cf7174ac8694b399eadf"
    },
    {
        "compress_pubkey": "03cfa6118cf55d14447911524357ca8d5f55d089f5b391dc7239e4b2cb750dbb45",
        "pubkey": "04cfa6118cf55d14447911524357ca8d5f55d089f5b391dc7239e4b2cb750dbb4589b7e179ca15b9a31d7a97436c985001be410eeeb4be477b918a5046ee7fb907"
    }
}
```
### 2.使用公钥导出地址
生成 1 用户，1 个热钱包地址

```
- Request
grpcurl -plaintext -d '{
  "chain": "Ethereum",
  "network": "testnet",
  "publicKey": "044cabfc7e5fc65849172f39bd35d3df008e8e90a494ed01ea439c52bfc68117a5f34b7cf102f9d9414d11a2bb407d00ab90d43679cda1cf7174ac8694b399eadf"
}' 127.0.0.1:8189 dapplink.account.WalletAccountService.convertAddress
```
- Response
```
{
    "code": "SUCCESS",
    "msg": "convert address success",
    "address": "0x64bF0d4F82ddd3a371Ce105060CDEb80718744C1"
}
```
往 0x64bF0d4F82ddd3a371Ce105060CDEb80718744C1 地址打入一笔钱，用于测试。https://holesky.etherscan.io/tx/0x3db48fd88821c8a71e26e4c66b11f8eb7f6ffa08f5825bb2e16974bee916a09b

### 3.构建 32 字节 Message
 
#### 3.1 获取地址的 nonce
- Request
```
grpcurl -plaintext -d '{
  "chain": "Ethereum",
  "coin": "ETH",
  "network": "testnet",
  "address": "0x64bF0d4F82ddd3a371Ce105060CDEb80718744C1",
  "contractAddress": "0x00"
}' 127.0.0.1:8189 dapplink.account.WalletAccountService.getAccount
```
- Response
```
{
  "code": "SUCCESS",
  "msg": "get account response success",
  "network": "",
  "account_number": "0",
  "sequence": "0",
  "balance": "500000000000000000"
}
``` 
 
#### 3.2 获取手续费

- Request
``` 
grpcurl -plaintext -d '{
  "chain": "Ethereum",
  "coin": "ETH",
  "network": "testnet",
  "rawTx": "0x00000"
}' 127.0.0.1:8189 dapplink.account.WalletAccountService.getFee
``` 
- Response
```  
{
  "code": "SUCCESS",
  "msg": "get gas price success",
  "slow_fee": "2973903|970000",
  "normal_fee": "2973903|970000|*2",
  "fast_fee": "2973903|970000|*3"
}
``` 
- slow_fee 可以直接使用
- normal_fee *2 之后使用
- 2973903 * 3 之后使用
#### 3.3 构建交易生成 32 字节 MessageHash
- 构建 Base64 前的 Json
``` 
{
    "chain_id": "17000",
    "nonce": 0,
    "from_address": "0x64bF0d4F82ddd3a371Ce105060CDEb80718744C1",
    "to_address": "0xBdcbd2e489Dae44FD2774c746B60b14D61Fcf214",
    "gas_limit": 21000,
    "gas": 0,
    "max_fee_per_gas": "8921709",
    "max_priority_fee_per_gas": "2910000",
    "amount": "400000000000000000",
    "contract_address": "0x00"
}
``` 
- 编码成 64 的字符串
``` 
ewogICAgImNoYWluX2lkIjogIjE3MDAwIiwgCiAgICAibm9uY2UiOiAxLAogICAgImZyb21fYWRkcmVzcyI6ICIweDY0YkYwZDRGODJkZGQzYTM3MUNlMTA1MDYwQ0RFYjgwNzE4NzQ0QzEiLAogICAgInRvX2FkZHJlc3MiOiAiMHhCZGNiZDJlNDg5RGFlNDRGRDI3NzRjNzQ2QjYwYjE0RDYxRmNmMjE0IiwKICAgICJnYXNfbGltaXQiOiAyMTAwMCwKICAgICJnYXMiOiAwLAogICAgIm1heF9mZWVfcGVyX2dhcyI6ICIxMDE2Mzg1NiIsCiAgICAibWF4X3ByaW9yaXR5X2ZlZV9wZXJfZ2FzIjogIjMwMDAwMDAiLAogICAgImFtb3VudCI6ICI0MDAwMDAwMDAwMDAwMDAwMDAiLAogICAgImNvbnRyYWN0X2FkZHJlc3MiOiAiMHgwMCIKfQ==
``` 

- Request
```   
grpcurl -plaintext -d '{
  "chain": "Ethereum",
  "network": "testnet",
  "base64Tx": "ewogICAgImNoYWluX2lkIjogIjE3MDAwIiwgCiAgICAibm9uY2UiOiAxLAogICAgImZyb21fYWRkcmVzcyI6ICIweDY0YkYwZDRGODJkZGQzYTM3MUNlMTA1MDYwQ0RFYjgwNzE4NzQ0QzEiLAogICAgInRvX2FkZHJlc3MiOiAiMHhCZGNiZDJlNDg5RGFlNDRGRDI3NzRjNzQ2QjYwYjE0RDYxRmNmMjE0IiwKICAgICJnYXNfbGltaXQiOiAyMTAwMCwKICAgICJnYXMiOiAwLAogICAgIm1heF9mZWVfcGVyX2dhcyI6ICIxMDE2Mzg1NiIsCiAgICAibWF4X3ByaW9yaXR5X2ZlZV9wZXJfZ2FzIjogIjMwMDAwMDAiLAogICAgImFtb3VudCI6ICI0MDAwMDAwMDAwMDAwMDAwMDAiLAogICAgImNvbnRyYWN0X2FkZHJlc3MiOiAiMHgwMCIKfQ=="
}' 127.0.0.1:8189 dapplink.account.WalletAccountService.buildUnSignTransaction
``` 
- Response
``` 
{
  "code": "SUCCESS",
  "msg": "create un sign tx success",
  "un_sign_tx": "0x67cd3deb47bd9af967223998517bc838fae0f69dbda2a5ae820560273a2b73a8"
}
``` 
### 4.签名机签名

- Request
``` 
grpcurl -plaintext -d '{
  "type": "ecdsa",
  "publicKey": "044cabfc7e5fc65849172f39bd35d3df008e8e90a494ed01ea439c52bfc68117a5f34b7cf102f9d9414d11a2bb407d00ab90d43679cda1cf7174ac8694b399eadf",
  "messageHash": "0x67cd3deb47bd9af967223998517bc838fae0f69dbda2a5ae820560273a2b73a8"
}' 127.0.0.1:8983 dapplink.wallet.WalletService.signTxMessage
 ``` 
- Response
``` 
{
  "Code": "SUCCESS",
  "msg": "sign tx message success",
  "signature": "c5965ddd6e8f221ec667c57e63c6a6d50b256fb2d691842dcf54cb580a85d3734fe0355f61824114c62c3764343a4f3e499003c748360857b6fa4943c95de69a00"
}
```  
  
### 5.构建完整的交易
- Request
``` 
grpcurl -plaintext -d '{
    "chain": "Ethereum",
    "network": "testnet",
    "base64Tx": "ewogICAgImNoYWluX2lkIjogIjE3MDAwIiwgCiAgICAibm9uY2UiOiAxLAogICAgImZyb21fYWRkcmVzcyI6ICIweDY0YkYwZDRGODJkZGQzYTM3MUNlMTA1MDYwQ0RFYjgwNzE4NzQ0QzEiLAogICAgInRvX2FkZHJlc3MiOiAiMHhCZGNiZDJlNDg5RGFlNDRGRDI3NzRjNzQ2QjYwYjE0RDYxRmNmMjE0IiwKICAgICJnYXNfbGltaXQiOiAyMTAwMCwKICAgICJnYXMiOiAwLAogICAgIm1heF9mZWVfcGVyX2dhcyI6ICIxMDE2Mzg1NiIsCiAgICAibWF4X3ByaW9yaXR5X2ZlZV9wZXJfZ2FzIjogIjMwMDAwMDAiLAogICAgImFtb3VudCI6ICI0MDAwMDAwMDAwMDAwMDAwMDAiLAogICAgImNvbnRyYWN0X2FkZHJlc3MiOiAiMHgwMCIKfQ==",
    "signature": "c5965ddd6e8f221ec667c57e63c6a6d50b256fb2d691842dcf54cb580a85d3734fe0355f61824114c62c3764343a4f3e499003c748360857b6fa4943c95de69a00"
}' 127.0.0.1:8189 dapplink.account.WalletAccountService.buildSignedTransaction
```
- Response
```
{
  "code": "SUCCESS",
  "msg": "0xcbe0cddcfbaede1efa1bd865f8f7b6e218e7bb1609b8006ba3a5d313eab3ca70",
  "signed_tx": "0x02f87282426801832dc6c0839b169082520894bdcbd2e489dae44fd2774c746b60b14d61fcf21488058d15e17628000080c080a0c5965ddd6e8f221ec667c57e63c6a6d50b256fb2d691842dcf54cb580a85d373a04fe0355f61824114c62c3764343a4f3e499003c748360857b6fa4943c95de69a"
}
```
### 6. 发送交易到区块链网络
- Request
```
grpcurl -plaintext -d '{
    "rawTx": "0x02f87282426801832dc6c0839b169082520894bdcbd2e489dae44fd2774c746b60b14d61fcf21488058d15e17628000080c080a0c5965ddd6e8f221ec667c57e63c6a6d50b256fb2d691842dcf54cb580a85d373a04fe0355f61824114c62c3764343a4f3e499003c748360857b6fa4943c95de69a",
    "network": "testnet",
    "coin": "ETH",
    "chain": "Ethereum"
}' 127.0.0.1:8189 dapplink.account.WalletAccountService.SendTx
```
- Response
```
{
  "code": "SUCCESS",
  "msg": "send tx success",
  "tx_hash": "0xcbe0cddcfbaede1efa1bd865f8f7b6e218e7bb1609b8006ba3a5d313eab3ca70"
}
```

## 五.联合业务平台测试(业务平台手动模拟)

### 1.构建

- 克隆代码
```
git clone git@github.com:dapplink-labs/multichain-sync-account.git
```

- 构建
```
cd multichain-sync-account
go 1.22.0
make
```

- 配置环境变量
```
export WALLET_MIGRATIONS_DIR=""./migrations""
export WALLET_CHAIN_ID="1"
export WALLET_CHAIN_NAME="Ethereum"
export WALLET_TRADING_MODEL="Ethereum"
export WALLET_RPC_RUL="127.0.0.1:8289"
export WALLET_STARTING_HEIGHT=3524168
export WALLET_CONFIRMATIONS=10
export WALLET_SYNC_INTERVAL=5s
export WALLET_WORKER_INTERVAL=3s
export WALLET_BLOCKS_STEP=5
export WALLET_RPC_HOST="127.0.0.1"
export WALLET_RPC_PORT=8985
export WALLET_CHAIN_ACCOUNT_RPC="127.0.0.1:8189"
export WALLET_METRICS_HOST="127.0.0.1"
export WALLET_METRICS_PORT=8986
export WALLET_SLAVE_DB_ENABLE=false
export WALLET_API_CACHE_ENABLE=false
export WALLET_MASTER_DB_HOST="127.0.0.1"
export WALLET_MASTER_DB_PORT=5432
export WALLET_MASTER_DB_USER="guoshijiang"
export WALLET_MASTER_DB_PASSWORD=""
export WALLET_MASTER_DB_NAME="multichain"
export WALLET_SLAVE_DB_HOST="127.0.0.1"
export WALLET_SLAVE_DB_PORT=5432
export WALLET_SLAVE_DB_USER="guoshijiang"
export WALLET_SLAVE_DB_PASSWORD=""
export WALLET_SLAVE_DB_NAME="multichain"
export WALLET_API_CACHE_LIST_SIZE=100000
export WALLET_API_CACHE_LIST_DETAIL=100000
export WALLET_API_CACHE_LIST_EXPIRE_TIME=10s
export WALLET_API_CACHE_DETAIL_EXPIRE_TIME=10s
```
- 数据的migrate
```
./multichain-sync migrate
```
- 启动 rpc 服务
```
./multichain-sync rpc
```
- 启动成功看到的命令
```
guoshijiang@guoshijiangdeMacBook-Pro multichain-sync-account % ./multichain-sync rpc
running grpc server...
INFO [03-24|10:53:59.201] loaded chain config                      config="{ChainId:1 ChainName:Ethereum RpcUrl:127.0.0.1:8289 StartingHeight:3524168 Confirmations:10 SynchronizerInterval:5s WorkerInterval:3s BlocksStep:5}"
INFO [03-24|10:53:59.205] Chain account rpc                        "rpc uri"=127.0.0.1:8189
INFO [03-24|10:53:59.206] New account chain rpc client             chainName=Ethereum
INFO [03-24|10:53:59.206] start rpc server                         addr=127.0.0.1:8985
INFO [03-24|10:53:59.206] Grpc info                                port=8985 address=127.0.0.1:8985
```
### 2.业务方注册

- 注册之前表结构
```
      架构模式 |     名称     |  类型  |   拥有者
      ----------+--------------+--------+-------------
      public   | addresses    | 数据表 | guoshijiang
      public   | balances     | 数据表 | guoshijiang
      public   | blocks       | 数据表 | guoshijiang
      public   | business     | 数据表 | guoshijiang
      public   | deposits     | 数据表 | guoshijiang
      public   | internals    | 数据表 | guoshijiang
      public   | reorg_blocks | 数据表 | guoshijiang
      public   | tokens       | 数据表 | guoshijiang
      public   | transactions | 数据表 | guoshijiang
      public   | withdraws    | 数据表 | guoshijiang
      (10 行记录)
```
- Request
```
  grpcurl -plaintext -d '{
      "requestId": "dapplink",
      "notifyUrl": "http://127.0.0.1:50949/"
  }' 127.0.0.1:8985 syncs.BusinessMiddleWireServices.businessRegister
```
- Response
```
  {
      "Code": "SUCCESS",
      "Msg": "config business success"
  }
```
- 注册之后的表结构
```
  架构模式 |         名称          |  类型  |   拥有者
  ----------+-----------------------+--------+-------------
  public   | addresses             | 数据表 | guoshijiang
  public   | addresses_dapplink    | 数据表 | guoshijiang
  public   | balances              | 数据表 | guoshijiang
  public   | balances_dapplink     | 数据表 | guoshijiang
  public   | blocks                | 数据表 | guoshijiang
  public   | business              | 数据表 | guoshijiang
  public   | deposits              | 数据表 | guoshijiang
  public   | deposits_dapplink     | 数据表 | guoshijiang
  public   | internals             | 数据表 | guoshijiang
  public   | internals_dapplink    | 数据表 | guoshijiang
  public   | reorg_blocks          | 数据表 | guoshijiang
  public   | tokens                | 数据表 | guoshijiang
  public   | tokens_dapplink       | 数据表 | guoshijiang
  public   | transactions          | 数据表 | guoshijiang
  public   | transactions_dapplink | 数据表 | guoshijiang
  public   | withdraws             | 数据表 | guoshijiang
  public   | withdraws_dapplink    | 数据表 | guoshijiang
  (17 行记录)
```
### 3.批量生成钱包地址
签名机生成密钥对
- Request
```
grpcurl -plaintext -d '{
    "type": "ecdsa",
    "number": "3"
}' 127.0.0.1:8983 dapplink.wallet.WalletService.exportPublicKeyList
```
- Response
```
  {
  "Code": "SUCCESS",
  "msg": "create keys success",
  "public_key": [
          {
              "compress_pubkey": "03c6aa3a2be751c3e8aca7ca4850afab5d0b24730310bd56840dbf85df9a58bbe0",
              "pubkey": "04c6aa3a2be751c3e8aca7ca4850afab5d0b24730310bd56840dbf85df9a58bbe0ddf5b4300aff0cc36c773beb7898dc10ca95d237a241669f58ac7a4f4461fb29"
          },
          {
              "compress_pubkey": "03897929ed0793a7790936c7d0646f210d52ca4bf6a4e262ac0a8346d87fe3830e",
              "pubkey": "04897929ed0793a7790936c7d0646f210d52ca4bf6a4e262ac0a8346d87fe3830e3f85000037f10a4fb5d0dd45a154c02dbf2981ff04af9cb6910f0849ebf532e7"
          },
          {
              "compress_pubkey": "021b7a733e00ce94883857e7e4129ff87735d7a7fbf58780d6cf7d9d8d6bfc111c",
              "pubkey": "041b7a733e00ce94883857e7e4129ff87735d7a7fbf58780d6cf7d9d8d6bfc111c6d6fc0cf7214164d8ac6bfbf01bd057079a447189e23a353ae7455cca3469f40"
          }
      ]
  }
```
业务方调用扫链平台生成地址
- Request
```
grpcurl -plaintext -d '{
    "publicKeys": [
        {
            "type": "user",
            "publicKey": "04c6aa3a2be751c3e8aca7ca4850afab5d0b24730310bd56840dbf85df9a58bbe0ddf5b4300aff0cc36c773beb7898dc10ca95d237a241669f58ac7a4f4461fb29"
        },
        {
            "type": "user",
            "publicKey": "04897929ed0793a7790936c7d0646f210d52ca4bf6a4e262ac0a8346d87fe3830e3f85000037f10a4fb5d0dd45a154c02dbf2981ff04af9cb6910f0849ebf532e7"
        },
        {
            "type": "hot",
            "publicKey": "041b7a733e00ce94883857e7e4129ff87735d7a7fbf58780d6cf7d9d8d6bfc111c6d6fc0cf7214164d8ac6bfbf01bd057079a447189e23a353ae7455cca3469f40"
        }
    ],
    "requestId": "dapplink"
}' 127.0.0.1:8985 syncs.BusinessMiddleWireServices.exportAddressesByPublicKeys
``` 
- Response
```   
{
    "Code": "SUCCESS",
    "msg": "generate address success",
    "addresses": [
          {
              "type": "user",
              "address": "0xE7937a13003eFc13eE5A5816bdf6DFdbf56af7D0"
          },
          {
              "type": "user",
              "address": "0x59e655CaAe4411db26d5D52920379575Fa8512F4"
          },
          {
              "type": "hot",
              "address": "0x6d2e06CeC97edeF06c38b3D23d7Df46F35377b20"
          }
      ]
}
```     

### 3.充值
- 转入一笔资金
``` 
https://holesky.etherscan.io/tx/0x4a806babac21592a894f78c82539da69124ba8d8943304338dd4df3598150cd7
```

### 4.归集

#### 4.1 构建未签名的 32 字节的 MessageHash
- Request
```
{
  "requestId": "dapplink",
  "chainId": "17000",
  "chain": "Ethereum",
  "from": "0xe7937a13003efc13ee5a5816bdf6dfdbf56af7d0",
  "to": "0x6d2e06cec97edef06c38b3d23d7df46f35377b20",
  "value": "400000000000000000",
  "contractAddress": "0x00",
  "txType": "collection"
}
```
- Reponse
```
{
  "code": "SUCCESS",
  "msg": "submit withdraw and build un sign tranaction success",
  "transaction_id": "7c192bfd-5b6c-460f-9b00-8d5f4a8e7b58",
  "un_sign_tx": "0x59ce4be8cb7f936ca35ec13529a6043ddee368356c7dc60e4fd6b8e74459e28e"
}
```

#### 4.2 签名机签名
- Request
```
{
  "messageHash": "0x59ce4be8cb7f936ca35ec13529a6043ddee368356c7dc60e4fd6b8e74459e28e",
  "publicKey": "04c6aa3a2be751c3e8aca7ca4850afab5d0b24730310bd56840dbf85df9a58bbe0ddf5b4300aff0cc36c773beb7898dc10ca95d237a241669f58ac7a4f4461fb29",
  "type": "ecdsa"
}
```
- Response
```
{
  "Code": "SUCCESS",
  "msg": "sign tx message success",
  "signature": "d32cccfddae93280d31e02fa1fa27533ab57df4b948f52a7056e06ba480ede891a3c33646864a1c46e90bd3c503b0099b08224d0f4688b088414404f4818903301"
}
```

#### 4.3 构建完整的交易
- Request
```
{
  "requestId": "dapplink",
  "chain": "Ethereum",
  "chainId": "17000",
  "transactionId": "7c192bfd-5b6c-460f-9b00-8d5f4a8e7b58",
  "signature": "d32cccfddae93280d31e02fa1fa27533ab57df4b948f52a7056e06ba480ede891a3c33646864a1c46e90bd3c503b0099b08224d0f4688b088414404f4818903301",
  "txType": "collection"
}
```
- Response
```
{
    "code": "SUCCESS",
    "msg": "build signed tx success",
    "signed_tx": "0x02f87282426880832dc6c0838ec97582ea60946d2e06cec97edef06c38b3d23d7df46f35377b2088058d15e17628000080c001a0d32cccfddae93280d31e02fa1fa27533ab57df4b948f52a7056e06ba480ede89a01a3c33646864a1c46e90bd3c503b0099b08224d0f4688b088414404f48189033"
}
```
#### 4.4.提现
提现流程和归集是一样操作方式, 只是交易的类别不一样

#### 4.5.回滚测试
模拟测试：扫块，扫到对应交易之后，将数据的 block 表里面的 hash 和 parentHash 改掉，是的当前区块的 parentHash 不等于上一个区块的 Hash, 测试结束后，可以看到回滚的区块进入 reorg_block, 相关区块的 block 里面的交易被回滚掉。
