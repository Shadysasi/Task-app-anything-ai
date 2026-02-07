🚀 TaskFlow:
 Scalable MERN Stack with RBACTaskFlow is a robust, full-stack application featuring a Node.js/Express REST API and a React/Tailwind CSS frontend. It implements secure JWT authentication and Role-Based Access Control (RBAC) to distinguish between standard users and administrators.

✨ Features
# Backend (Core)
    . JWT Authentication: Secure login and registration with password hashing via bcryptjs.
    . RBAC (Role-Based Access Control): Middleware to protect routes based on user roles (user vs admin).
    . API Versioning: All endpoints are prefixed with /api/v1/ for future-proofing.
    . Task CRUD: Full Create, Read, and Delete operations.
    . Input Validation: Secure handling of user inputs to prevent common vulnerabilities.
     .Error Handling: Global middleware providing consistent JSON error responses.
Frontend (UI)
    . Modern Design: Built with React and Tailwind CSS.
    . Responsive Layout: Fully optimized for mobile, tablet, and desktop.
    . Dynamic UI: Context-aware components (e.g., Delete button only visible to Admins).
    . Lucide Icons: Clean, professional iconography.
🛠️ Tech Stack
 # Frontend: React.js, Tailwind CSS, Lucide React, Axios.
 # Backend: Node.js, Express.js.
 # Database: MongoDB (via Mongoose).
 # Security: JSON Web Tokens (JWT), Bcrypt.js, Helmet.

📂 Project StructurePlaintext/my-app
  /backend
    /src
      /config         # Database and Swagger configuration
      /controllers    # Logic for Auth and Tasks
      /middleware     # Auth guards and Error handlers
      /models         # Mongoose Schemas (User, Task)
      /routes         # API Endpoint definitions
    .env              # Environment variables
  /frontend
    /src
      /components     # Reusable UI (Navbar, etc.)
      /pages          # Login, Register, Dashboard
      api.js          # Axios configuration


⚙️ Installation & Setup
1. PrerequisitesNode.js installed.MongoDB running locally or a MongoDB Atlas URI.
2. Backend Setup
cd backend
npm install

Create a .env file in the backend folder:
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_super_secret_key
NODE_ENV=development
Start the server:npm start

3. Frontend Setup
cd frontend
npm install
npm start
The app will run on http://localhost:3000.

🔌 API Endpoints
# Authentication
POST/api/v1/auth/register   Register a new user    Public
POST/api/v1/auth/login      Login and get JWT      Public 
# Tasks
GET/api/v1/tasks   Get all tasks for user    Authenticated
POST/api/v1/tasks  Create a new task         Authenticated
DELETE/api/v1/tasks/:id  Delete a task         Admin Only

🛡️ Role-Based Access Control (RBAC) Logic
# User Role:
 Can view the dashboard and manage their own tasks. They cannot delete tasks.
# Admin Role: 
 Inherits all User permissions plus the ability to delete any task.
# Security Note: 
 Deletion is blocked at the API level. Even if the frontend UI is bypassed, the backend middleware verifies the JWT payload before allowing a delete operation.

📝 Testing with Postman
1. Register a user with role: "admin".
2. Login to receive your JWT.
3. Go to Authorization, select Bearer Token, and paste the token.
4. Test the POST /tasks and DELETE /tasks/:id endpoints.