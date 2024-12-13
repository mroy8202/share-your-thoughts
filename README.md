## Share Your Thoughts - Blog App

This is a full-stack blog application built with React for the frontend and Express for the backend, utilizing MongoDB as the database. It allows users to create, edit, and delete their posts, along with functionalities for user signup, login, and logout. Additionally, the app integrates Cloudinary for image storage.

### Features

* User Authentication (Signup, Login, Logout)
* Create, Edit & Delete Blog Posts
* Infinite Scroll on Homepage for Seamless Post Exploration
* Image Upload Functionality with Cloudinary Integration
* User-Specific Posts for Personal Organization
* Protected Routes for Secure Access (JWT Authentication)

### Tech Stack

**Backend:**

* Node.js (Server-side JavaScript runtime)
* Express.js (Web framework)
* MongoDB (Database)
* Mongoose (MongoDB ODM)
* JWT (JSON Web Token for user authentication)
* Cloudinary (Image hosting)
* Bcrypt (Password hashing)

**Frontend:**

* React (UI framework)
* Redux (State management)
* React Router (Routing)
* Axios (HTTP requests)
* TailwindCSS (CSS framework)
* Vite (Development build tool)

**Other Tools:**

* Nodemon (Automatic server restart during development)
* dotenv (Environment variable management)
* CORS (Cross-Origin Resource Sharing)

### Installation

**Backend Setup**

1. Clone the repository:

```bash
git clone https://github.com/your-username/share-your-thoughts-backend.git
cd share-your-thoughts-backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root and add the following variables (replace with your own values):

```
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=your_preferred_port_number
```

4. Start the server:

```bash
npm run dev
```

**Frontend Setup**

1. Clone the frontend repository:

```bash
git clone https://github.com/your-username/share-your-thoughts-client.git
cd share-your-thoughts-client
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to http://localhost:5173 (default port).

### Endpoints

**Authentication Routes:**

* `POST /api/v1/auth/signup`: Sign up a new user.
* `POST /api/v1/auth/login`: Log in an existing user.
* `POST /api/v1/auth/logout`: Log out the current user.

**Post Routes:**

* `POST /api/v1/post/createPost`: Create a new post (protected).
* `GET /api/v1/post/getHomepagePost`: Fetch posts for the homepage (protected).
* `GET /api/v1/post/getUserPost`: Fetch posts by the logged-in user (protected).
* `PUT /api/v1/post/editPost/:id`: Edit an existing post (protected).
* `DELETE /api/v1/post/deletePost/:id`: Delete a post (protected).