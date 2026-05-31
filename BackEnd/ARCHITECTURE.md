# WinkAndWear Backend Architecture

Welcome to the backend of the WinkAndWear MERN application. This document describes the application architecture, request lifecycle, and design patterns, making it easy to onboard and understand the professional standards implemented here.

## 📁 Directory Structure

The backend follows a layered, service-oriented architecture:

```text
BackEnd/
├── src/
│   ├── config/       # Environment & Database Configurations
│   ├── controllers/  # Request/Response Handling
│   ├── services/     # Core Business Logic & Database Queries
│   ├── routes/       # Express Route Declarations
│   ├── middleware/   # Express Middlewares (Auth, Error Handler, Uploads)
│   ├── models/       # Mongoose Schemas (Data Layer)
│   ├── utils/        # Reusable Utility Functions (Email)
│   ├── app.js        # Express Application Setup
│   └── server.js     # Entry Point & DB Connection
```

## 🔄 Request Lifecycle

Every request follows a strict unidirectional flow:

1. **Request**: The client sends an HTTP request.
2. **Route (`src/routes/`)**: The router maps the endpoint to a specific Controller method. Middlewares (e.g., authentication) run here.
3. **Controller (`src/controllers/`)**: The controller extracts data from the `req` object, validates input formats, and delegates to the Service.
4. **Service (`src/services/`)**: The service applies business rules, makes external API calls (e.g., Gemini, Postal API), and interacts with the Data Layer (Mongoose).
5. **Model (`src/models/`)**: Mongoose models execute the MongoDB queries.
6. **Response (`src/controllers/`)**: The controller receives the data from the service and sends a strictly formatted JSON response back to the client.

## 🛠️ Design Patterns Applied

### 1. Separation of Concerns
The previous monolithic structure was decoupled into discrete layers. Controllers no longer perform direct database queries. Services are isolated from Express request objects, making them highly testable and reusable.

### 2. Centralized Configuration & Environment Validation
All environment variables are validated at startup in `src/config/env.js`. If critical variables (e.g., `MONGODB_URI`) are missing, the server warns immediately, preventing ambiguous runtime errors.

### 3. Centralized Error Handling
A global `errorHandler` middleware ensures that any unhandled errors bubble up and are caught. This provides a consistent JSON structure for error responses across the entire application and prevents server crashes.

### 4. Modular Routing
Each domain (Users, Products, Cart, Orders, Chatbot) manages its own router. These are assembled in `src/app.js`, ensuring that adding a new domain is as simple as registering a new route file.

### 5. Dependency Injection / Service Layer Pattern
Instead of writing inline logic for features like Nodemailer, we extract these into `utils/emailSender.js`. Services import this utility, meaning we can swap our email provider out (e.g., to SendGrid or Amazon SES) without changing any logic in the Order or Newsletter services.
