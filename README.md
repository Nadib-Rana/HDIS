
---

## 🔗 Endpoints

### 1. `GET /api/medicines`
Retrieve all medicines.

- **Response:** `200 OK`
```json
[
  {
    "_id": "64f1...",
    "name": "Paracetamol",
    "category": "Painkiller",
    "price": 5.5,
    "stock": 120,
    "description": "Used for fever and mild pain",
    "createdAt": "2025-09-05T10:00:00.000Z"
  }
]
```

---

### 2. `POST /api/medicines`
Create a new medicine entry.

- **Request Body:**
```json
{
  "name": "Ibuprofen",
  "category": "Anti-inflammatory",
  "price": 8.0,
  "stock": 50,
  "description": "Relieves pain and inflammation"
}
```

- **Response:** `201 Created`
```json
{
  "_id": "64f2...",
  "name": "Ibuprofen",
  ...
}
```

---

### 3. `PUT /api/medicines/:id`
Replace an existing medicine record.

- **Request Body:** Full object with updated fields
- **Response:** `200 OK` or `404 Not Found`

---

### 4. `PATCH /api/medicines/:id`
Update specific fields of a medicine.

- **Request Body:** Partial object
```json
{
  "stock": 75
}
```

- **Response:** `200 OK` or `404 Not Found`

---

### 5. `DELETE /api/medicines/:id`
Remove a medicine from the database.

- **Response:** `200 OK` or `404 Not Found`

---



---

Would you like me to help you write Swagger/OpenAPI specs for this next? Or maybe generate a Postman collection for testing?
