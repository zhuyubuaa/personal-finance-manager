# Backend-Frontend api connection

## CRUD

### user/

#### type: post

create a new user

+ frontend to backend
  ```
  {
    "u_name": str,
    "password": str
  }
  ```
+ backend to frontend
  ```
  int(new_id)
  ```
  
#### type: put

Modify u_name/password for certain user. u_id can't be null, while u_name and password should set "" if not be modified.

+ f to b
  ```
  {
    "u_id": int,
    "u_name": str,
    "password": str
  }
  ```
+ b to f
  ```
  0
  ```
   

### login/

#### type: post

+ f to b
  ```
  {
    "u_id": int,
    "password": str
  }
  ```
+ b to f
  ```
  0 // if succeed
  or "password not match"
  or "user not found"
  ```
  
### account/

#### type: get

Search for accounts belonged to certain user.

+ f to b
  ```
  (account/?u_id=...)
  ```
+ b to f
  ```
  0 // if u_id == null
  
  else
  
  [
    {
        "a_id": int,
        "a_name": str,
        "remaining": float
    }
  ] // return the user's account info list
  ```
  
#### type: post

Create a new account for certain user.

+ f to b
  ```
  {
    "a_name": str,
    "remaining": float,
    "u_id": int
  }
  ```
+ b to f
  ```
  0
  ```
  
#### type: put

Modify a_name/remaining for certain account.

+ f to b
  ```
  {
    "a_name": str,
    "remaining": float,
    "a_id": int
  }
  ```
+ b to f
  ```
  0
  ```
  
#### type: delete

Delete an account for certain user.

+ f to b
  ```
  (account/?a_id=...)
  ```
+ b to f
  ```
  0
  ```
  
### accountbook/

#### type: get

Search for accountbooks belonged to certain user.

+ f to b
  ```
  (accountbook/?u_id=...)
  ```
+ b to f
  ```
  0 // if u_id == null
  
  else
  
  [
    {
        "ab_id": int,
        "ab_name": str
    }
  ] // return the user's accountbook info list
  ```
  
#### type: post

Create a new accountbook for certain user.

+ f to b
  ```
  {
    "ab_name": str,
    "u_id": int
  }
  ```
+ b to f
  ```
  0
  ```
  
#### type: put

Modify ab_name for certain accountbook.

+ f to b
  ```
  {
    "ab_name": str,
    "ab_id": int
  }
  ```
+ b to f
  ```
  0
  ```
  
#### type: delete

Delete an accountbook for certain user.

+ f to b
  ```
  (accountbook/?ab_id=...)
  ```
+ b to f
  ```
  0
  ```
  
### type/

#### type: get

Search for types.

+ b to f
  ```
  {
    "income": ["type_name": str],
    "outcome": ["type_name": str]
  }
  ```

This json contains income and outcome type json lists...
for example:
```json
{
  "income": [
    {
      "type_name": "Salary"
    },
    {
      "type_name": "Bonus"
    }
  ],
  "outcome": [
    {
      "type_name": "Dining"
    },
    {
      "type_name": "Sports"
    }
  ]
}

```
### budget/

#### type: get

Search for budgets belonged to certain accountbook.

+ f to b
  ```
  (budget/?ab_id=...)
  ```
+ b to f
  ```
  0 // if ab_id == null
  
  else
  
  [
    {
        "b_id": int,
        "type_name": str,
        "b_amount": float
    }
  ] // return the accountbook's budget info list
  ```
  
#### type: post

Create a new budget for certain accountbook.

+ f to b
  ```
  {
    "b_amount": float
    "ab_id": int,
    "type_name": str
  }
  ```
+ b to f
  ```
  0
  ```
  
#### type: delete

Delete a budget for certain accountbook.

+ f to b
  ```
  (budget/?b_id=...)
  ```
+ b to f
  ```
  0
  1 // if error
  ```
  
### log/

#### type: get

Search for logs belonged to certain accountbook.

+ f to b
  ```
  (log/?ab_id=...)
  ```
+ b to f
  ```
  0 // if ab_id == null
  
  else
  
  [
    {
        "l_id": int,
        "time": str,
        "l_amount": float,
        "remark": str,
        "type_name": str
      }
  ] // return the accountbook's log info list
  ```
  
#### type: post

Create a new log for certain accountbook.

+ f to b
  ```
  {
    "l_amount": flaot,
    "remark": str,
    "a_id": int,
    "ab_id": int,
    "type_name": str
  }
  ```
+ b to f
  ```
  0
  ```
  
#### type: delete

Delete a log for certain user.

+ f to b
  ```
  (log/?l_id=...)
  ```
+ b to f
  ```
  0
  1 // if err
  ```
  