## Session Resources

### **玩家使用uuid註冊**
* **URL:** `/api/v1/session/uuid`
* **Method:** `POST`
* **Body:**
```
{
  "displayName": "<玩家顯示的名字>"
}
```
* **Response** 
```
{
  "uuid": "xxxx-xxxx-xxxx-xxxx"
  "token": "xxxxxxxxxxxxxxxxxxxxxxxx"
}
```

### **玩家登入**
* **URL:** `/api/v1/session`
* **Method:** `POST`
* **Body:**
```
{
  // 使用uuid登入
  "uuid": "xxxx-xxxx-xxxx-xxxx",
  // 使用facebook登入
  "facebookId": "xxxxxxxxxxxxxxxxx"
}
```
* **Response** 
```
{
  "token": "xxxxxxxxxxxxxxxxxxxxxxxx"
}
```
