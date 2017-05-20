
# 概圖
![Inputfra LInputks](https://photouploads.com/images/1eb72b.jpg)
# References
- [Admin Web UI](#admin-web-ui)
  - 用戶角色
    - [管理者](#管理者)
    - [點數提供者](#點數提供者)
    - [點數門市](#點數門市)
  - 平台功能
    - [`createBatchVouchers`](#createbatchvouchers)
    - [`getBatchVouchers`](#getbatchvouchers)
    - [`updateVoucherStatus`](#updatevoucherstatus)
    - [`updateVoucherInfo`](#updatevoucherinfo)
    - [`updateBatchVouchersStatus`](#updatebatchvouchersstatus)
    - [`checkIfVoucherIsAvailable`](#checkifvoucherisavailable)
- [Player Web UI](#player-web-ui)
  - [點數轉換](#點數轉換)
  - 平台功能
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

# [Admin Web UI](#admin-web-ui)
- 使用者介面為Web UI
- 用戶對象為公司內部人員，或是協力第三方：例如印刷商，遊戲維運合作人員等等。
- 用戶可以在此控管點數卷的產生、註銷或者是列印
- 公司內部人員應在此處擁有控管其他第三方登入帳戶權限的能力
- 程式內部會連結到 [Admin Service](#admInputservice)、[Voucher Service](#voucherservice)、[Credit Service](#creditservice)、[Player Service](#playerservice)
## 用戶角色 ***[Pending]***
- 用戶在`Admin Web UI`會出現的各種用戶角色。主要分成以下幾個：
  - [管理者](#Admin)
  - [點數提供者](#creditprovider)
  - [點數門市](#creditmarket)

- 用戶可以扮演的角色是可以重複的。
  
  例如：登入的用戶可以同時是點數提供者也同時是點數門市，因此登入後，他就可以產生點數，並且取得要拿去列印的點數。

### 管理者
- 通常為公司內部人員，擁有管理其他管理員的權限，例如新增修改帳號、修改密碼等等 ***[Pending]***
- 可以查詢點數平台上所有玩家帳號
- 修改/查詢玩家所擁有的點數

### 點數提供者
- 通常為遊戲提供方
- 擁有產生點數卷的權限，可以批次產生點數
- 可以使點數生效，使其可以被列印
- 可以在此處操作點數註銷，讓點數無法被使用
- 修改尚未生效的點數卷內容，例如點數卷失效日期。
- 點數卷的所有操作的歷程查詢

### 點數門市
- 通常為第三方協力印刷人員
- 擁有取得已生效點數卷的權限
- 可選取可列印的輸出檔案，例如：HTML表格，或是PDF。

## 平台功能
### [`createBatchVouchers`](#createbatchvouchers)
- Batch/批次，一次產生點數卷的總稱
- 為節省操作資源和時間，用戶可以直接一口氣產生一批點數卷，除點數卷代碼不同外，其餘的資訊，例如簡介、發行時間、失效日期都會相同。
- Batch操作會得到此次批次操作的序號，方便後續做查詢或修改的動作
- Input
  - 要產生的點數卷總數
  - 此次批次的敘述，例如用於什麼活動
  - 點數卷生效日 [可選]
  - 點數卷截止日 [可選]
- Output
  - 此次批次的序號，方便一次查詢及取得批次點數卷的列印

### [`getBatchVouchers`](#getbatchvouchers)
- 利用Batch批次來查詢包含在內的點數卷
- 提供兩種查詢方法
  - 利用**Batch序號**來查詢
  - 利用**產生/過期**的日期區間來查詢

### [`updateVoucherStatus`](#updatevoucherstatus)
- 用來修改點數卷狀態
- 點數卷狀態可視為一系列順序的**生命週期**
  1. `Inputitialized` 點數卷剛建立的狀態，此時無法被使用也無法被列印
  2. `Activated` 點數卷只要進入此狀態，代表已被送出列印，無法回復上一週期
  3. **是否需要再加入列印完成的狀態？**
  4. `Deativated` 點數卷已被註銷，無法被使用
  5. `Applied` 點數卷已被使用 (是否需要保留已被使用的點數卷？)

### [`updateVoucherInfo`](#updatevoucherinfo)
- 用來修改點數卷內容資訊，例如簡介，時間等等。
- **僅可**修改生命週期為`Initialized`的點數卷，點數卷若被啟用後或被使用後將**無法**被修改！若希望停用已啟用之點數卷，需將點數卷狀態修改為`Deativated`，若需修改玩家以儲存之點數，因會有爭議，請溝通後直接修改玩家所擁有之點數！

### [`updateBatchVouchersStatus`](#updatebatchvouchersstatus)
- 同 [`updateVoucherStatus`](#updateVoucherStatus) 只是可以批次修改
- 利用批次來修改點數卷狀態
- 利用**產生/過期**日期區間來修改點數卷狀態

### [`checkIfVoucherIsAvailable`](#checkifvoucherisavailable)
- 檢查點數卷是否可被使用
- 只有點數卷狀態為 `Activated` 才是可用
- 因為檢查時可能代表有人使用Api，可以考慮用 `Mongodb` 紀錄查詢活動歷程

# [Player Web UI](#player-web-ui)
- 使用者介面為Web UI
- 用戶對象為遊戲玩家。
- 用戶可以在此進行儲值、或是查詢儲值紀錄
- 可以查詢過往的點數操作記錄
- 可以在此處將點數轉換為遊戲中實際可以用的遊戲幣
- 可以在此處進入或下載各遊戲，作為玩家的遊戲進入點 ***[Pending]***
- 程式內部會連結到 [Voucher Service](#voucher-service)、[Credit Service](#credit-service)、[Player Service](#player-service)
## 玩家註冊
- **目前是建議透過第三方社群媒體註冊，讓玩家快速上手**
- 未註冊之用戶，可以在此通過第三方社群媒體OAuth，例如Facebook、Google+，進行註冊成為平台的玩家
- 方便未來可能會有的其他優惠活動需要，例如利用分享貼文換取點數等等。已註冊之用戶可以在此，進行更多其他家第三方社群媒體的連結。(此處為額外功能，不一定要加入)

## 點數轉換
1. 玩家於實體商店購買點數卷後，即進入此平台，利用點數卷上的代碼進行點數儲值
2. 儲值後的點數會直接加入於平台的總點數內，點數卷隨即失效
3. 每加入一個新的遊戲，玩家即會擁有該遊戲對應的錢包，錢包內即為可以在該遊戲內使用的遊戲幣
4. 點數轉移到錢包會依照個遊戲需求經過換算，但目前僅為**1:1**
5. 點數轉移到遊戲幣的過程**不可逆**

## 平台功能

### [`registerPlayer`](#registerplayer)
- 利用社群媒體來註冊成為平台玩家
- 如果SocialMedia不存在，則會直接產生新的註冊玩家
- 若SocialMedia已存在，則直接可以登入

### [`linkRegisteredPlayer`](#linkregisteredplayer)
- 已註冊之玩家才可使用
- 在已經註冊的平台玩家資訊中，再加入不同的社群媒體做連結

### [`applyVoucher`](#applyvoucher)
- 使用點數卷進行儲值，點數直接存入玩家的總點數額度中

### [`transferGamePoint`](#transfergamepoint)
- 將點數依照遊戲設定轉為遊戲中可用的遊戲幣，目前比率限制為**1:1**
- 點數一旦轉為遊戲幣，將不可再度轉回點數！
- Input
  - 遊戲Id
  - 欲轉換的點數數量

### [`getVoucherOperationHistory`](#getvoucheroperationhistory)
- 取得點數卷儲值的歷程紀錄
- 玩家可以使用利用**日期區間**來查詢過往的點數操作記錄

# [Services](#services)
- Web UI應該各自為兩台獨立的對外Web Server。除此之外，為了方便擴展。商業邏輯將會包裝成獨立的Service服務。
- 為了開發速度，目前尚不考慮微服務方式，基本上程式碼會放一起但是會拆成獨立的商業邏輯結構
- 資料結構非Schema，僅表示概念上的Data Model
- 之後視文件情況，API將會跟著Service來走

## [Admin Service](#admin-service) ***[Pending]***
- 主司管理所有Admin資料的Service
- 包含新增帳戶，修改帳戶資料，凍結帳戶
- 之後視情況需要加入平台角色權限控管時，商業邏輯也是放於此
- Admin資料結構：
  - 帳戶
  - 建立/最後登入時間
  - 所屬角色，例如：管理員、點數提供者
- 角色資料結構：
  - 被允許的對應操作 

## [Voucher Service](#voucher-service)
- 主司管理所有點數卷、批次紀錄的資料
- Batch資料結構：一次批次操作即會產生一筆Batch
  - Batch序號
  - 包含在此批次的多筆Voucher
- Voucher資料結構：即代表一張點數卷
  - 點數卡代碼
  - 批次編號
  - 建立時間
  - 失效時間
  - 面額(即使用者使用了此點數卷後，總點數會增加的數量)
- Batch History資料結構：一次批次操作即會產生一筆Batch History
  - 操作Admin使用者ID
  - 操作時間
  - 操作總量

## [Credit Service](#credit-service)
- 主司管理玩家可以動用的點數，還有遊戲中的各個錢包和遊戲幣
- Credit資料結構：表示使用者的總點數
  - 使用者總點數
  - 關聯玩家ID
- GameWallet資料結構：
  - 遊戲ID
  - 關聯玩家ID
  - 遊戲幣點數
- Transfer資料結構：將Credit轉到GameWallet中，即會產生一筆Transfer紀錄
  - GameWallet ID
  - 操作者(因為有可能是由客服幫忙玩家進行操作)
  - 轉換額度數量
  - 操作時間

## [Player Service](#player-service)
- 主司管理玩家的個人資訊，包含第三方媒體資訊，和登入歷程
- Player資料結構：
  - 創建時間
  - 最後登入時間
  - 連結的各社群媒體資料
- 登入歷程資料結構：玩家登入平台的歷史紀錄
  - 登入IP
  - 登入時間