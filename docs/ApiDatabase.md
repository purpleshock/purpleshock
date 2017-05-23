
# 概圖
![Schemas](https://photouploads.com/images/6c36bb.png)

# References
- [Schemas](#schemas)
  - [`admins`](#admins)
  - [`batches`](#batches)
  - [`vouchers`](#vouchers)
  - [`voucherStatusHistories`](#voucherstatushistories)
  - [`players`](#players)
  - [`facebookIdentity`](#facebookidentity)
  - [`mailIdentity`](#mailidentity)
  - [`wallets`](#wallets)
  - [`walletTransfers`](#wallettransfers)
  - [`voucherHistories`](#voucherhistories)

# Schemas

## Definitions

### [`admins`](#admins)
管理員登入資料
- `id`: PK
- `createdAt`: 帳號產生時間的 UNIX Timestamp
- `loginAt`: 最後登入時間的 UNIX Timestamp
- `mail`: 註冊的信箱
- `password`: 登入密碼，會經過 one-way hash 處理

### [`batches`](#batches)
每個`批次`操作後產生的紀錄
- `id`: PK
- `createdAt`: 帳號產生時間的 UNIX Timestamp
- `startAt`: 此批點數卷的**生效**時間
- `endAt`: 此批點數卷的**失效**時間
- `adminId`: FK Reference to [`admins`](#admins)，此批點數卷的建立管理員

### [`vouchers`](#vouchers)
每筆代表一張點數卷
- `id`: PK
- `code`: 點數卷代碼
- `batchId`: FK Reference to [`batches`](#batches)，產生此張點數卷的`批次`
- `status`: 點數卷目前的生命週期，ENUM(`Initialized`，`Activated`，`Deactivated`，`Applied`)
- `amount`: 此張點數卷的面額

### [`voucherStatusHistories`](#voucherstatushistories)
點數卷狀態從 `Initiailzed` 到 `Sold` 之間的變更記錄
- `id`: PK
- `adminId`: FK Reference to [`admins`](#admins)，此次操作的管理員
- `voucherId`: FK Reference to [`vouchers`](#vouchers)，此次操作的點數卷
- `operatedAt`: 此次操作時間
- `fromStatus`: 起始狀態
- `toStatus`: 變更狀態

### [`players`](#players)
每個玩家代表一個player資料列，視玩家第三方不同的社群媒體連結狀況，而關聯到不同 [`facebookIdentity`](#facebookidentity) 或 [`mailIdentity`](#mailidentity) 或其他的Table
- `id`: PK
- `createdAt`: 帳號產生時間的 UNIX Timestamp
- `loginAt`: 最後登入時間的 UNIX Timestamp

### [`facebookIdentity`](#facebookidentity)
若玩家Facebook帳號來註冊，則 [`players`](#players) 會關聯到此Table
- `facebookId`: PK，Facebook User的Id
- `playerId`: FK Reference to [`players`](#players)

### [`mailIdentity`](#mailidentity)
若玩家郵件信箱帳號來註冊，並且自訂登入密碼，則 [`players`](#players) 會關聯到此Table
- `mail`: PK，註冊的信箱
- `password`: 登入密碼，會經過 one-way hash 處理
- `playerId`: FK Reference to [`players`](#players)

### [`wallets`](#wallets)
代表玩家的點數錢包(總點數)，以及遊戲錢包
- `id`: PK
- `playerId`: FK Reference to [`players`](#players)，持有此錢包的玩家
- `type`: 錢包種類，點數錢包的type為保留值**0**，遊戲錢包目前為**1**
- `credit`: 錢包的內可用額度

### [`walletTransfers`](#wallettransfers)
一筆資料代表玩家每次的點數轉換紀錄
- `id`: PK
- `playerId`: FK Reference to [`players`](#players)，做出轉換的玩家
- `srcId`: FK Reference to [`wallets`](#wallets)，點數**轉出**的錢包
- `destId`: FK Reference to [`wallets`](#wallets)，點數**轉入**的錢包
- `amount`: 此次轉換點數的數值

### [`voucherHistories`](#voucherhistories)
玩家將點數卷轉換回點數的紀錄，也代表點數卷狀態改為 `Applied` 的紀錄
- `id`: PK
- `playerId`: FK Reference to [`players`](#players)，做出轉換的玩家
- `voucherId`: FK Reference to [`vouchers`](#vouchers)，轉換的點數卷
- `operatedAt`: 此次操作時間
