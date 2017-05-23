
# 概圖
![Schema](https://photouploads.com/images/ac97af.png)

# References
- [Schemas](#schemas)
  - [`players`](#players)
  - [`facebookIdentity`](#facebookidentity)
  - [`mailIdentity`](#mailidentity)
  - [`wallets`](#wallets)
  - [`walletTransfers`](#wallettransfers)

# Schemas

## [`players`](#players)
每個玩家代表一個player資料列，視玩家第三方不同的社群媒體連結狀況，而關聯到不同 [`facebookIdentity`](#facebookidentity) 或 [`mailIdentity`](#mailidentity) 或其他的Table
- `id`: PK
- `createdAt`: 帳號產生時間的 UNIX Timestamp
- `loginAt`: 最後登入時間的 UNIX Timestamp

## [`facebookIdentity`](#facebookidentity)
若玩家Facebook帳號來註冊，則 [`players`](#players) 會關聯到此Table
- `facebookId`: PK，Facebook User的Id
- `playerId`: FK Reference to [`players`](#players)

## [`mailIdentity`](#mailidentity)
若玩家郵件信箱帳號來註冊，並且自訂登入密碼，則 [`players`](#players) 會關聯到此Table
- `mail`: PK，註冊的信箱
- `password`: 登入密碼，會經過 one-way hash 處理
- `playerId`: FK Reference to [`players`](#players)

## [`wallets`](#wallets)
代表玩家的點數錢包(總點數)，以及遊戲錢包
- `id`: PK
- `playerId`: FK Reference to [`players`](#players)，持有此錢包的玩家
- `type`: 錢包種類，點數錢包的type為保留值**0**，遊戲錢包目前為**1**
- `credit`: 錢包的內可用額度

## [`walletTransfers`](#wallettransfers)
一筆資料代表玩家每次的點數轉換紀錄
- `id`: PK
- `playerId`: FK Reference to [`players`](#players)，做出轉換的玩家
- `srcId`: FK Reference to [`wallets`](#wallets)，點數**轉出**的錢包
- `destId`: FK Reference to [`wallets`](#wallets)，點數**轉入**的錢包
- `amount`: 此次轉換點數的數值