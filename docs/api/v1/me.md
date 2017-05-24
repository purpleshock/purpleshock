## Me Resources

### **取得玩家資訊**
* **URL:** `/api/v1/me`
* **Method:** `GET`
* **Header:** `Authorization: JWT <Token String>`
* **Response:**
```
{
  "displayName": "<玩家顯示的名字>"
}
```

### **更新玩家資訊**
* **URL:** `/api/v1/me`
* **Method:** `PUT`
* **Body:**
```
{
  "displayName": "<玩家顯示的名字>"
}
```