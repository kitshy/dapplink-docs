# 去中心化 U 卡支付

- U 卡不存储私钥:  完全去中心化，离线签名，需要 APP 来将私钥存储在本地，提供离线签名的功能。
- U 卡(数字货币卡)里面存储私钥：U 卡里面集成签名芯片和存储，私钥通过口令加密，POS 机里面构建 32 位的 Message, Message, 通过 NFC 的方式通信传递给 U 签名，这里的 U 卡相当于一个小型的硬件钱包。