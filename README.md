
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



Base URL: `/api/purchases`

---

### 6 `GET /api/purchases`

**Description:**  
Fetches all purchase records, including populated medicine names.

**Response:**
```json
[
  {
    "_id": "64f3abc...",
    "supplierName": "HealthCorp Ltd.",
    "medicines": [
      {
        "medicineId": {
          "_id": "64f1abc...",
          "name": "Paracetamol"
        },
        "quantity": 100,
        "price": 5.5
      }
    ],
    "total": 550,
    "createdAt": "2025-09-05T10:00:00.000Z"
  }
]
```

**Status Codes:**
- `200 OK`: Success
- `500 Internal Server Error`: Fetch failure

---

### 7 `POST /api/purchases`

**Description:**  
Creates a new purchase record and updates medicine stock accordingly.

**Request Body:**
```json
{
  "supplierName": "MediSupply Co.",
  "medicines": [
    {
      "medicineId": "64f1abc123...",
      "quantity": 50,
      "price": 6.0
    },
    {
      "medicineId": "64f2def456...",
      "quantity": 30,
      "price": 8.0
    }
  ]
}
```

**Response:**
```json
{
  "_id": "64f4xyz789...",
  "supplierName": "MediSupply Co.",
  "medicines": [
    {
      "medicineId": {
        "_id": "64f1abc123...",
        "name": "Paracetamol"
      },
      "quantity": 50,
      "price": 6.0
    },
    {
      "medicineId": {
        "_id": "64f2def456...",
        "name": "Ibuprofen"
      },
      "quantity": 30,
      "price": 8.0
    }
  ],
  "total": 540,
  "createdAt": "2025-09-05T18:37:00.000Z"
}
```

**Status Codes:**
- `201 Created`: Success
- `404 Not Found`: Medicine not found
- `500 Internal Server Error`: Purchase creation failed

---

