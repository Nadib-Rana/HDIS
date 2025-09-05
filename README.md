#Information And view: https://www.linkedin.com/feed/update/urn:li:activity:7369691833376866307/

---

# 🧪 Pharmacy Management API Documentation

> Base URL: `/api`

---

## 🔹 Medicines

### `GET /api/medicines`
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

### `POST /api/medicines`
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

### `PUT /api/medicines/:id`
Replace an existing medicine record.

- **Request Body:** Full object with updated fields  
- **Response:** `200 OK` or `404 Not Found`

---

### `PATCH /api/medicines/:id`
Update specific fields of a medicine.

- **Request Body:**
```json
{
  "stock": 75
}
```

- **Response:** `200 OK` or `404 Not Found`

---

### `DELETE /api/medicines/:id`
Remove a medicine from the database.

- **Response:** `200 OK` or `404 Not Found`

---

## 📦 Purchases

> Base URL: `/api/purchases`

---

### `GET /api/purchases`
Fetch all purchase records, including medicine names.

- **Response:** `200 OK`
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

---

### `POST /api/purchases`
Create a new purchase and update medicine stock.

- **Request Body:**
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

- **Response:** `201 Created`
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

- **Status Codes:**
  - `201 Created`: Success  
  - `404 Not Found`: Medicine not found  
  - `500 Internal Server Error`: Purchase creation failed

---

## 💳 Sales

> Base URL: `/api/sales`

---

### `GET /api/sales`
Fetch all sales records.

- **Response:** `200 OK`
```json
[
  {
    "_id": "64f6abc...",
    "medicines": [
      {
        "medicineId": "64f1abc...",
        "quantity": 2,
        "price": 5.5
      }
    ],
    "total": 11,
    "discount": 1,
    "customerName": "John Doe",
    "createdAt": "2025-09-05T14:00:00.000Z"
  }
]
```

---

### `POST /api/sales`
Create a new sale. Optionally include customer name and discount.

- **Request Body:**
```json
{
  "medicines": [
    {
      "medicineId": "64f1abc123...",
      "quantity": 2,
      "price": 5.5
    },
    {
      "medicineId": "64f2def456...",
      "quantity": 1,
      "price": 8.0
    }
  ],
  "total": 19.0,
  "discount": 1.0,
  "customerName": "Jane Smith"
}
```

- **Response:** `201 Created`
```json
{
  "_id": "64f7xyz789...",
  "medicines": [...],
  "total": 19.0,
  "discount": 1.0,
  "customerName": "Jane Smith",
  "createdAt": "2025-09-05T18:40:00.000Z"
}
```

- **Status Codes:**
  - `201 Created`: Success  
  - `400 Bad Request`: Invalid or missing fields  
  - `500 Internal Server Error`: Sale creation failed

---

## 📊 Reports

> Base URL: `/api/reports`

---

### `GET /api/reports/sales`
Generate a sales report filtered by date range.

- **Query Parameters:**

| Name   | Type   | Required | Description           |
|--------|--------|----------|-----------------------|
| `start`| string | ✅       | Start date (ISO format) |
| `end`  | string | ✅       | End date (ISO format)   |

- **Example:**
```
GET /api/reports/sales?start=2025-09-01&end=2025-09-05
```

- **Response:** `200 OK`
```json
[
  {
    "_id": "64f5abc...",
    "medicines": [
      {
        "medicineId": "64f1abc...",
        "quantity": 10,
        "price": 5.5
      }
    ],
    "total": 55,
    "discount": 5,
    "customerName": "John Doe",
    "createdAt": "2025-09-03T14:00:00.000Z"
  }
]
```

---

### `GET /api/reports/stock`
Return medicines with stock less than or equal to a threshold.

- **Query Parameters:**

| Name       | Type   | Required | Description                          |
|------------|--------|----------|--------------------------------------|
| `threshold`| number | ❌       | Stock threshold (default: `5`)       |

- **Example:**
```
GET /api/reports/stock?threshold=10
```

- **Response:** `200 OK`
```json
[
  {
    "_id": "64f1abc...",
    "name": "Paracetamol",
    "stock": 3,
    "category": "Painkiller",
    "price": 5.5
  }
]
```

---


