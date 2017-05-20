# INFRA Reference
![Infra Links](https://photouploads.com/images/1eb72b.jpg)
- [Admin Web UI](#admin-web-ui)
  - 使用者角色
    - [管理者](#管理者)
    - [點數提供者](#點數提供者)
    - [點數門市](#點數門市)
  - Functions
    - [`createBatchVouchers`](#createbatchvouchers)
    - [`getBatchVouchers`](#getbatchvouchers)
    - [`updateVoucherStatus`](#updatevoucherstatus)
    - [`updateBatchVouchersStatus`](#updatebatchvouchersstatus)
    - [`checkIfVoucherIsAvailable`](#checkifvoucherisavailable)
- [Player Web UI](#playerwebui)
  - 使用者角色
    - [玩家](#玩家)
  - Functions
    - [`registerPlayer`](#registerplayer)
    - [`linkRegisteredPlayer`](#linkregisteredplayer)
    - [`applyVoucher`](#applyvoucher)
    - [`transferGamePoint`](#transfergamepoint)
    - [`getVoucherOperationHistory`](#getvoucheroperationhistory)
- [Services](#services)
  - [Admin Service](#admin-service)
  - [Voucher Service](#voucher-service)
  - [Credit Service](#credit-service)
  - [Player Service](#player-service)

# [Admin Web UI](#adminwebui)
- Web UI
- 會連結到 [Admin Service](#adminservice)、[Voucher Service](#voucherservice)、[Credit Service](#creditservice)、[Player Service](#playerservice)
## 使用者角色 ***[Pending]***
用戶在`Admin Web UI`會出現的各種用戶角色。主要分成以下幾個：
- [管理者](#admin)
- [點數提供者](#creditprovider)
- [點數門市](#creditmarket)

用戶可以扮演的角色是可以重複的。例如：登入的用戶可以同時是點數提供者也同時是點數門市，因此用戶在`Admin Web UI`登入後，他就可以產生點數，並且取得要拿去列印的點數。

### 管理者
- 管理員登入 ***[Pending]***
- 管理其他管理員等等 ***[Pending]***
- 查詢玩家帳號
- 修改/查詢玩家點數

### 點數提供者
- 批次產生點數
- 點數註銷
- 點數修改
- 點數產生的歷程查詢

### 點數門市
- 取得點數列印PDF或HTML或其他

## Functions

### [`createBatchVouchers`](#createbatchvouchers)
- In
  - 要產生的點數卷總數
  - 此次批次的敘述，例如用於什麼活動
  - 點數卷生效日 [可選]
  - 點數卷截止日 [可選]
- Out
  - 此次批次的序號，方便一次查詢及取得批次點數卷的列印

### [`getBatchVouchers`](#getbatchvouchers)
- 利用批次來查詢點數卷
- 利用**產生/過期**日期區間來查詢點數卷

### [`updateVoucherStatus`](#updatevoucherstatus)
- 修改點數卷狀態
- 點數卷狀態可視為一系列生命週期
  1. `Initialized` 點數卷剛建立的狀態，此時無法被使用也無法被列印
  2. `Activated` 點數卷只要進入此狀態，代表已被送出列印，無法回復上一週期
  3. **是否需要再加入列印完成的狀態？**
  4. `Deativated` 點數卷已被註銷，無法被使用
  5. `Applied` 點數卷已被使用 (是否需要保留已被使用的點數卷？)

### [`updateBatchVouchersStatus`](#updatebatchvouchersstatus)
- 同 [`updateVoucherStatus`](#updateVoucherStatus) 只是可以批次修改
- 利用批次來修改點數卷狀態
- 利用**產生/過期**日期區間來修改點數卷狀態

### [`checkIfVoucherIsAvailable`](#checkifvoucherisavailable)
- 檢查點數卷是否可被使用
- 只有點數卷狀態為 `Activated` 才是可用
- 因為檢查時可能代表有人使用Api，可以考慮用 `Mongodb` 紀錄查詢活動歷程

# [Player Web UI](#playerwebui)
- Web UI
- 會連結到 [Voucher Service](#voucherservice)、[Credit Service](#creditservice)、[Player Service](#playerservice)

## 使用者角色

### 玩家
- 利用Social Media來進行註冊，例如Facebook
- 儲存/查詢點數
- 遊戲幣操作
- 各遊戲進入點 ***[Pending]***

## Functions

### [`registerPlayer`](#registerplayer)
- 利用Social Media來註冊成為平台玩家
- 如果SocialMedia不存在，則直接產生新的註冊玩家
- 若SocialMedia已存在，則直接登入

### [`linkRegisteredPlayer`](#linkregisteredplayer) ***[Pending]***
- 同 [`registerPlayer`](#registerPlayer) 但是是在已經註冊的平台玩家資訊中，再加入不同的Social Media

### [`applyVoucher`](#applyvoucher)
- 使用點數卷，點數卷將為直接存入總點數額度中

### [`transferGamePoint`](#transfergamepoint)
- 將點數依照遊戲設定轉為遊戲中可用的遊戲幣，目前比率限制為**1:1**
- In
  - 遊戲Id
  - 使用的點數數量

### [`getVoucherOperationHistory`](#getvoucheroperationhistory)
- 取得點數卷儲值的歷程紀錄
- 利用**日期區間**來查詢

# [Services](#services)

## [Admin Service](#admin-service) ***[Pending]***
- Api Server Only
- Http-based
- Admin
  - 管理員帳號資料
  - 管理員登入歷程

## [Voucher Service](#voucher-service)
- Api Server Only
- Http-based
- Batch
  - 每次產生的批次資料，包含多筆Voucher
- Voucher
  - 點數卡代碼
  - 批次編號
  - 批次建立時間
  - 點數到期時間 ***[Pending]***

## [Credit Service](#credit-service)
- Api Server Only
- Http-based
- History  
  - 儲值點數紀錄
  - 點數轉遊戲幣紀錄
- Wallet  
  - 點數
- GamePoint
  - 遊戲幣點數

## [Player Service](#player-service)
- Api Server Only
- Http-based
- Player 
  - 連結的Social Media資料
  - 登入歷程紀錄