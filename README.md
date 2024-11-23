
# Decentralized Web Node (DWN)

A **Decentralized Web Node (DWN)** is a distributed system for managing verifiable data and interactions between decentralized identities (DIDs). This project is a TypeScript-based implementation of a DWN that adheres to the [Decentralized Web Node specification](https://identity.foundation/decentralized-web-node/spec/).

---

## Features

- **DWNMessage Protocol**: Supports dynamic validation based on protocol definitions and roles.
- **Protocol Roles**: Implements role-based access control (e.g., `author`, `viewer`, `writer`).
- **In-memory Storage**: Saves and retrieves messages for testing and development.
- **API Endpoints**: RESTful API for interacting with the node.
- **Validation Middleware**: Role-based and protocol-driven action validation.
- **TypeScript**: Fully typed for reliability and maintainability.
- **Hot Reloading**: Uses `nodemon` for development convenience.

---

## Requirements

- **Node.js**: Version 22 or later
- **npm**: Version 10.8.1 or later

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AnonymityAdvoc8/basic-dwn.git
   cd basic-dwn
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

4. Run the server:
   ```bash
   npm start
   ```

   Alternatively, for development with hot-reloading:
   ```bash
   npm run dev
   ```

The server will be available at `http://localhost:3000`.

---

## API Endpoints

### 1. **Create a Message (POST `/messages`)**

Send a DWNMessage to the node.

#### **Payload**
```json
{
  "id": "123",
  "type": "image-sharing:image",
  "role": "author",
  "author": "did:example:123",
  "recipient": "did:example:456",
  "data": {
    "schema": "https://example.com/schemas/image",
    "dataFormat": "image/png",
    "payload": "<binary-image-data>"
  },
  "timestamp": "2024-11-22T12:00:00Z",
  "signature": "0xabcdef"
}
```

#### **Example Request**
```bash
curl -X POST http://localhost:3000/messages \
-H "Content-Type: application/json" \
-H "x-user-id: user2" \
-d '{
  "id": "123",
  "type": "image-sharing:image",
  "role": "author",
  "author": "did:example:123",
  "recipient": "did:example:456",
  "data": {
    "schema": "https://example.com/schemas/image",
    "dataFormat": "image/png",
    "payload": "<binary-image-data>"
  },
  "timestamp": "2024-11-22T12:00:00Z",
  "signature": "0xabcdef"
}'
```

#### **Example Response**
```json
{
  "status": "success",
  "message": "Message processed successfully"
}
```

---

### 2. **Fetch a Message (GET `/messages/:id`)**

Retrieve a message by its unique identifier.

#### **Example Request**
```bash
curl -X GET http://localhost:3000/messages/123 \
-H "x-user-id: user2"
```

#### **Example Response**
```json
{
  "id": "123",
  "type": "image-sharing:image",
  "role": "author",
  "author": "did:example:123",
  "recipient": "did:example:456",
  "data": {
    "schema": "https://example.com/schemas/image",
    "dataFormat": "image/png",
    "payload": "<binary-image-data>"
  },
  "timestamp": "2024-11-22T12:00:00Z",
  "signature": "0xabcdef"
}
```

---

### 3. **Invalid Role Example**

Test the role-based access control by using an unauthorized role.

#### **Example Request**
```bash
curl -X GET http://localhost:3000/messages/123 \
-H "x-user-id: user1" # user1 has the role 'viewer', not 'author'
```

#### **Expected Response**
```json
{
  "error": "Role viewer is not allowed to perform read on type image"
}
```

---

### 4. **Malformed JSON**

Test the server's error handling for malformed JSON.

#### **Example Request**
```bash
curl -X POST http://localhost:3000/messages \
-H "Content-Type: application/json" \
-d '{ "id": "123","data": "Invalid JSON }'
```

#### **Expected Response**
```json
{
  "error": "Invalid JSON payload"
}
```

---

## Project Structure

```plaintext
basic-dwn/
├── src/
│   ├── core/
|   |   |── protocolDefinitions.ts 
│   │   ├── protocols.ts            # Processes messages
│   │   ├── resolver.ts             # DID resolution (stubbed)
│   │   └── storage.ts              # In-memory storage
│   ├── interfaces/
│   │   |── message.ts              # DWNMessage interface definition
│   │   └── protocol.ts   
│   ├── middleware/
│   │   ├── protocolValidator.ts    # Protocol-based validation middleware
│   │   └── roleAssigner.ts         # Role assignment middleware
│   ├── transport/
│   │   └── api.ts                  # Express API definition
│   └── index.ts                    # Application entry point
├── package.json                    # Project dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # Project documentation
```

---

## Development Scripts

- **Start in Production**:
  ```bash
  npm start
  ```
  Runs the compiled JavaScript code.

- **Start in Development**:
  ```bash
  npm run dev
  ```
  Uses `nodemon` to reload on changes.

- **Build TypeScript**:
  ```bash
  npm run build
  ```

- **Clean Build Directory**:
  ```bash
  npm run clean
  ```

---

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Add new feature"`).
4. Push to the branch (`git push origin feature-name`).
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
