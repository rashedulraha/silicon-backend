# Silicon Real Estate (Pvt.) Ltd. — Backend API

This is the secure Node.js/Express backend built using TypeScript and Prisma (PostgreSQL) for the Silicon Real Estate platform. It connects to the Next.js 16 premium frontend and handles authentication, property listing CRUD operations, and client inquiries.

---

## Technical Features

1. **Secure Session Guard:** Token authentication implemented via secure, `httpOnly`, `sameSite: strict`, and SSL/TLS `secure` flags configured on HTTP cookie response headers. This defends against both XSS and CSRF.
2. **Role-Based Access Control (RBAC):** Middleware checks `req.user.role` to restrict administrative actions to verified admins.
3. **Optimized SQL Persistence:** Flattened structure for Property attributes in PostgreSQL to enable efficient database query index performance, coupled with nested data transformers (mappers) returning structured JSONs matching frontend blueprints.
4. **Environment Swappability:** Environment configs managed cleanly inside `.env`.

---

## Project Structure

```
siliconpvt-backend/
├── prisma/
│   └── schema.prisma        # Database schema models
├── src/
│   ├── config/
│   │   └── db.ts            # Prisma client instantiation
│   ├── controllers/
│   │   ├── auth.ts          # Register, Login, Logout, getMe controllers
│   │   ├── properties.ts    # Public lists and Admin property CRUD
│   │   └── inquiries.ts     # Client and Admin inquiry management
│   ├── middleware/
│   │   └── auth.ts          # JWT authentication and Role guards
│   ├── routes/
│   │   ├── auth.ts          # /api/v1/auth mounts
│   │   ├── properties.ts    # /api/v1/properties mounts
│   │   ├── inquiries.ts     # /api/v1/inquiries mounts (User)
│   │   └── adminInquiries.ts# /api/v1/admin/inquiries mounts (Admin)
│   ├── types/
│   │   ├── db.ts            # Type contracts matching Section 1 blueprint
│   │   └── express.d.ts     # Request object declaration merging for req.user
│   ├── utils/
│   │   ├── auth.ts          # Bcrypt hashing and Cookie helpers
│   │   └── mappers.ts       # Prisma model data structure transformers
│   ├── app.ts               # Global Express and CORS setup
│   └── server.ts            # Server bootstrapper
├── .env.example
├── .env
├── package.json
└── tsconfig.json
```

---

## Installation & Getting Started

### 1. Prerequisite Packages
Install dependencies (already complete):
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` into a `.env` file:
```bash
cp .env.example .env
```
Ensure you update the `DATABASE_URL` with your valid PostgreSQL connection string, and set a custom `JWT_SECRET`.

### 3. Generate Database Client and Migrate
Prisma uses the schema inside `prisma/schema.prisma` to configure schemas. Run:
```bash
# Generate the Prisma client files
npx prisma generate

# Create and apply migrations (requires live DB connection)
npx prisma migrate dev --name init
```

### 4. Running the Project
* **Development Server** (Runs with live reloading via `ts-node-dev` on port `5000`):
  ```bash
  npm run dev
  ```
* **Production Build**:
  ```bash
  npm run build
  npm start
  ```

---

## API Matrix Reference

### 1. Authentication (`/api/v1/auth`)
* `POST /register`: Registers user, hashes password, returns set-cookie `token`.
* `POST /login`: Authenticates user, returns set-cookie `token`.
* `POST /logout`: Clears the `token` cookie.
* `GET /me` (Auth required): Returns the logged-in user profile.

### 2. Properties (`/api/v1/properties`)
* `GET /`: Retrieves paginated property listings. Filters: `page`, `limit`, `city`, `minPrice`, `maxPrice`, `bedrooms`, `bathrooms`, `status`, `search`.
* `GET /:slug`: Retrieves a single property listing by SEO slug.
* `POST /` (Admin required): Creates a property listing. Generates a unique SEO slug from title.
* `PUT /:id` (Admin required): Updates property attributes (accepts nested details and updates database).
* `DELETE /:id` (Admin required): Deletes listing.

### 3. Inquiries (`/api/v1/inquiries` and `/api/v1/admin/inquiries`)
* `POST /api/v1/inquiries` (Auth required): Client submits property inquiry.
* `GET /api/v1/inquiries/my-inquiries` (Auth required): Client lists their submitted inquiries.
* `GET /api/v1/admin/inquiries` (Admin required): Admin lists all inquiries. Filter: `?status=pending`.
* `PUT /api/v1/admin/inquiries/:id` (Admin required): Admin updates inquiry status (`pending`, `reviewed`, `contacted`, `resolved`).
