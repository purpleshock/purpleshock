# INFRA Reference
![Infra Links](https://photouploads.com/images/1eb72b.jpg)
- [Admin Web UI](#adminwebui)
  - [使用者角色](#adminwebuiroles)
    - [管理者](#admin)
    - [點數提供者](#creditprovider)
    - [點數門市](#creditmarket)
  - [Functions](#adminwebuifunctions)
    - [`createBatchVouchers`](#createBatchVouchers)
    - [`geBatchVouchers`](#geBatchVouchers)
    - [`updateVoucherStatus`](#updateVoucherStatus)
    - [`updateBatchVouchersStatus`](#updateBatchVouchersStatus)
    - [`checkIfVoucherIsAvailable`](#checkIfVoucherIsAvailable)
- [Player Web UI](#playerwebui)
  - [使用者角色](#playerwebuirole)
    - [玩家](#player)
  - [Functions](#playerwebuifunctions)
    - [`registerPlayer`](#registerPlayer)
    - [`linkRegisteredPlayer`](#linkRegisteredPlayer)
    - [`applyVoucher`](#applyVoucher)
    - [`transferGamePoint`](#transferGamePoint)
    - [`getVoucherOperationHistory`](#getVoucherOperationHistory)
- [Services](#services)
  - [Admin Service](#adminservice)
  - [Voucher Service](#voucherservice)
  - [Credit Service](#creditservice)
  - [Player Service](#playerservice)

# [Admin Web UI](#adminwebui)

## [使用者角色 ***[Pending]***](#adminwebuiroles)
用戶在`Admin Client`會出現的各種用戶角色。主要分成以下幾個：
- [管理者](#admin)
- [點數提供者](#creditprovider)
- [點數門市](#creditmarket)

用戶可以扮演的角色是可以重複的。例如：登入的用戶可以同時是點數提供者也同時是點數門市，因此用戶在`Admin Client`登入後，他就可以產生點數，並且取得要拿去列印的點數。

### [管理者](#admin)
- 管理員登入 ***[Pending]***
- 管理其他管理員等等 ***[Pending]***
- 查詢玩家帳號
- 修改/查詢玩家點數

### [點數提供者](#creditprovider)
- 批次產生點數
- 點數註銷
- 點數修改
- 點數產生的歷程查詢

### [點數門市](#creditmarket)
- 取得點數列印PDF或HTML或其他

## [Functions](#adminwebuifunctions)

### [`createBatchVouchers`](#createBatchVouchers)
- In
  - 要產生的點數卷總數
  - 此次批次的敘述，例如用於什麼活動
  - 點數卷生效日 [可選]
  - 點數卷截止日 [可選]
- Out
  - 此次批次的序號，方便一次查詢及取得批次點數卷的列印

### [`geBatchVouchers`](#geBatchVouchers)
- 利用批次來查詢點數卷
- 利用**產生/過期**日期區間來查詢點數卷

### [`updateVoucherStatus`](#updateVoucherStatus)
- 修改點數卷狀態
- 點數卷狀態可視為一系列生命週期
  1. `Initialized` 點數卷剛建立的狀態，此時無法被使用也無法被列印
  2. `Activated` 點數卷只要進入此狀態，代表已被送出列印，無法回復上一週期
  3. **是否需要再加入列印完成的狀態？**
  4. `Deativated` 點數卷已被註銷，無法被使用
  5. `Applied` 點數卷已被使用 (是否需要保留已被使用的點數卷？)

### [`updateBatchVouchersStatus`](#updateBatchVouchersStatus)
- 同 [`updateVoucherStatus`](#updateVoucherStatus) 只是可以批次修改
- 利用批次來修改點數卷狀態
- 利用**產生/過期**日期區間來修改點數卷狀態

### [`checkIfVoucherIsAvailable`](#checkIfVoucherIsAvailable)
- 檢查點數卷是否可被使用
- 只有點數卷狀態為 `Activated` 才是可用
- 因為檢查時可能代表有人使用Api，可以考慮用 `Mongodb` 紀錄查詢活動歷程

# [Player Web UI](#playerwebui)
- Web UI
- 玩家可以在此管理自己的點數

## [使用者角色](#playerwebuirole)

### [玩家](#player)
- 利用Social Media來進行註冊，例如Facebook
- 儲存/查詢點數
- 遊戲幣操作
- 各遊戲進入點 ***[Pending]***

## [Functions](#playerwebuifunctions)

### [`registerPlayer`](#registerPlayer)
- 利用Social Media來註冊成為平台玩家
- 如果SocialMedia不存在，則直接產生新的註冊玩家
- 若SocialMedia已存在，則直接登入

### [`linkRegisteredPlayer`](#linkRegisteredPlayer) ***[Pending]***
- 同 [`registerPlayer`](#registerPlayer) 但是是在已經註冊的平台玩家資訊中，再加入不同的Social Media

### [`applyVoucher`](#applyVoucher)
- 使用點數卷，點數卷將為直接存入總點數額度中

### [`transferGamePoint`](#transferGamePoint)
- 將點數依照遊戲設定轉為遊戲中可用的遊戲幣，目前比率限制為**1:1**
- In
  - 遊戲Id
  - 使用的點數數量

### [`getVoucherOperationHistory`](#getVoucherOperationHistory)
- 取得點數卷儲值的歷程紀錄
- 利用**日期區間**來查詢

# [Services](#services)

## [Admin Service](#adminservice) ***[Pending]***
- Api Server Only
- Http-based
- Admin
  - 管理員帳號資料
  - 管理員登入歷程

## [Voucher Service](#voucherservice)
- Api Server Only
- Http-based
- Batch
  - 每次產生的批次資料，包含多筆Voucher
- Voucher
  - 點數卡代碼
  - 批次編號
  - 批次建立時間
  - 點數到期時間 ***[Pending]***

## [Credit Service](#creditservice)
- Api Server Only
- Http-based
- History  
  - 儲值點數紀錄
  - 點數轉遊戲幣紀錄
- Wallet  
  - 點數
- GamePoint
  - 遊戲幣點數

## [Player Service](#playerservice)
- Api Server Only
- Http-based
- Api Server，不包含UI，僅提供Http-based API
- Player 
  - 連結的Social Media資料
  - 登入歷程紀錄