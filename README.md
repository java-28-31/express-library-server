#  Library API


![Node.js](https://img.shields.io/badge/node-%3E=18-green)
![MongoDB](https://img.shields.io/badge/db-mongodb-green)
![License](https://img.shields.io/badge/license-MIT-blue)


REST API for library enterprise: reader's accounts, roles, books and book's pick/return operations.

Project use:

- JWT -authentication
- Standart login/password authentication
- RBAC (role-based access control)
- MongoDB through Mongoose
- middleware-pipline Express

---

##  Features

-  JWT authentication
-  Role-based authorization (reader / librarian / admin / super)
-  Book management (CRUD and pick/return)
-  Account management
-  Joi validation
-  Request rate limiting
-  Centralized error handling

---

##  Quick Start

```bash
git clone https://github.com/your-username/library-api.git
cd library-api
npm install
npm run start
```

Server URL:

```
http://localhost:3050
```

---

## ️ Configuration

### Environment variables (`.env`)

```env
DB="mongodb+srv://<user>:<password>@cluster0.mongodb.net/library"

JWT_SECRET=<super-extra-secret-key-for-jwt>
JWT_EXP=<1h>
```

### App config (`lib-config.json`)

```json
{
  "port": 3050,
  "skipRoutesArr": ["POST/account", "POST/account/login"],
  "pathRoles": {
    "GET/account/byId": ["reader"],
    "PATCH/account/password": ["reader"],
    "PATCH/account/update": ["admin"],
    "DELETE/account": ["super"],
    "PATCH/account/roles": ["super"],
    "GET/api/books": ["reader"],
    "POST/api/books": ["librarian"],
    "DELETE/api/books": ["librarian"],
    "GET/api/books/author": ["reader"],
    "PATCH/api/books/pick": ["librarian"],
    "PATCH/api/books/return": ["librarian"]
  },
  "timeWindowMs": 60000,
  "requestLimit": 3
}
```

---

## 🔐 Authentication

You can use **Login/Password** or **JWT**.

Token or login/password as Base64 must be attached at request header:
```http
Authorization: Basic <BASE64_CODED_LOGIN:PASSWORD>
```
--------------or---------------
```http
Authorization: Bearer <JWT_TOKEN>
```

---

##  Roles & Permissions

| Role      | Permissions                  |
| --------- | ---------------------------- |
| reader    | View books, view own account |
| librarian | Manage books                 |
| admin     | Edit accounts                |
| super     | Full access                  |

---

##  Account API

### Create account

`POST /account`

```json
{
  "_id": 1,
  "username": "John",
  "email": "john@mail.com",
  "password": "123456"
}
```

---

### Login

`POST /account/login`

```bash
curl -X POST http://localhost:3050/account/login \
-H "Content-Type: application/json" \
-d '{"id":1,"password":"123456"}'
```

---

### Get account by ID

`GET /account/byId?id=111222333`

---

### Change password

`PATCH /account/password`

```json
{
  "id": 1,
  "oldPassword": "123456",
  "newPassword": "newPass"
}
```

---

### Update account

`PATCH /account/update?id=1`

---

### Add role

`PATCH /account/roles?id=1&role=librarian`

---

## Books API

### Get all books

`GET /api/books`

---

### Add book

`POST /api/books`

```json
{
  "title": "Clean Code",
  "author": "Robert Martin",
  "year": 2008
}
```

---

### Remove book

`DELETE /api/books?bookId=<uuid>`

---

### Pick book

`PATCH /api/books/pick?bookId=<uuid>&readerId=1`

---

### Return book

`PATCH /api/books/return?bookId=<uuid>`

---

### Get books by author

`GET /api/books/author?author=Robert Martin`

---

## Project Structure

```
src/
 ├── controllers/
 ├── routers/
 ├── service/
 ├── middleware/
 ├── databases/
 ├── utils/
 ├── errorHandler/
 └── server.ts
```

---

## Roadmap

- Swagger OpenApi documentation

---

## License

TelRan, 2025

---

## Author

Backend API project for learning purposes. Group 28-31Java (Haifa)

