# Instagram Clone

An Instagram-like application built with **Node.js**, **Next.js**, and **MongoDB**. This project includes full-stack functionality, allowing users to create, update, delete posts, and manage their profiles. The application is fully responsive and offers a seamless user experience across all devices.

---

## 🚀 [Live Demo](https://instagram-clone-nine-chi.vercel.app/accounts)

---

## 📋 Features

- **User Authentication**  
  - Secure signup and login functionality.  
  - User sessions managed with cookies.

- **Responsive Design**  
  - Fully optimized for mobile, tablet, and desktop.

- **Post Management**  
  - Create, edit, and delete posts.  
  - Supports multimedia uploads (images/videos).  
  - Real-time updates with optimized UI.

- **Profile Section**  
  - Update user profiles with profile pictures and bio.  
  - View and manage all posts by a specific user.

- **Feed**  
  - Display all user posts in a feed-like interface.  
  - Optimized for infinite scrolling.

- **Like & Comment**  
  - Engage with posts through likes and comments (optional).

---

## 🛠️ Tech Stack

### **Frontend**
- **Next.js**: For server-side rendering and building responsive, dynamic web pages.
- **Tailwind CSS**: For fast and efficient styling.

### **Backend**
- **Node.js**: RESTful APIs to handle all server-side logic.
- **MongoDB**: NoSQL database for storing user and post data.

### **Hosting**
- **Vercel**: For fast and scalable deployment of the frontend.
- **Cloudinary**: (if used) For handling multimedia uploads.


## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB instance running (local or cloud)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/instagram-clone.git
   cd instagram-clone
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
   Here’s an updated section for the **Environment Variables** in your README to reflect your setup:

---

3. 🛠 Setup Environment Variables

The following environment variables are required to configure the project. Add them to a `.env` file in the root directory of your project:

```env
# General Configuration
NODE_ENV=                # 'development' or 'production'
BASE_URL=                # Base URL of the deployed app
API_BASE_URL=            # Base URL for backend APIs
SOCKET_BASE_URL=         # URL for socket connections

# Authentication & Security
JWT_SECRET=              # Secret key for JWT token generation
ENCRYPTION_KEY=          # Encryption key for sensitive data
CRYPTO_KEY=              # Key for encrypting user data

# Database
DATABASE_URL=            # MongoDB connection string

# Email Configuration
SENDER_EMAIL=            # Email address used for sending notifications
SENDER_EMAIL_PASSWORD=   # Password or app key for the email account

# Cloudinary Configuration (Media Management)
NEXT_PUBLIC_CLOUDINARY_API_KEY=       # Cloudinary API Key
NEXT_PUBLIC_CLOUDINARY_API_SECRET=    # Cloudinary API Secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=    # Cloudinary cloud name
NEXT_PUBLIC_UPLOAD_PRESET=            # Cloudinary upload preset

# Search & Public APIs
NEXT_PUBLIC_SEARCH_API_KEY=           # API key for the search service (if applicable)
NEXT_PUBLIC_OTP_OPTIONAL=             # Enable/disable OTP functionality (true/false)

# Firebase Configuration (optional, if used)
FIREBASE_API_KEY=                     # Firebase API key
FIREBASE_AUTH_DOMAIN=                 # Firebase Auth domain
FIREBASE_PROJECT_ID=                  # Firebase project ID
FIREBASE_STORAGE_BUCKET=              # Firebase storage bucket
FIREBASE_MESSAGING_SENDER_ID=         # Firebase messaging sender ID
FIREBASE_APP_ID=                      # Firebase app ID
FIREBASE_MEASUREMENT_ID=              # Firebase measurement ID

# Default Settings
DEFAULT_PROFILE=                      # Default profile image URL
```

---

### 🔑 Notes
1. **Security**: Never expose your `.env` file in version control. Use a `.gitignore` file to exclude it.
2. **Optional Variables**: Variables such as Firebase settings are optional based on your feature set. Configure them only if required.

This should align well with your existing environment variables and provide clarity to collaborators or other developers setting up the project.

4. Run the application locally:
   ```bash
   npm run dev
   ```
   Access the app at `http://localhost:3000`.

## 🤝 Contributing

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Create a pull request.

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🌟 Acknowledgments

- [Next.js](https://nextjs.org/)  
- [MongoDB](https://www.mongodb.com/)  
- [Tailwind CSS](https://tailwindcss.com/)  
- [Node.js](https://nodejs.org/)  

---

Feel free to modify and update the README further to suit your project's specifics.
