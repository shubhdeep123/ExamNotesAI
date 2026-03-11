# 📚 ExamNotesAI

**ExamNotesAI** is an AI-powered platform that helps students quickly generate **structured exam notes from PDFs and study material**.  
Upload a PDF, let AI process the content, and receive **clear, concise notes optimized for exam preparation**.

The platform also includes a **credit-based payment system using Stripe**, allowing users to purchase credits for generating notes.

---

# 🚀 Features

✨ AI-powered exam notes generation  
📄 Upload and process PDF documents  
🧠 Smart summarization and key concept extraction  
💳 Credit-based usage system  
💰 Stripe payment integration  
🔐 Google authentication  
📂 Manage generated notes  
⚡ Fast backend processing  

---

# 🖥️ Tech Stack

## Frontend
- React
- Vite
- Tailwind CSS
- Axios

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## Authentication
- Google OAuth

## Payments
- Stripe Checkout
- Stripe Webhooks

## AI Processing
- GeminiAI API (or similar LLM service)

---

# 📂 Project Structure

```
ExamNotesAI
│
├── client
│   ├── src
│   ├── components
│   ├── pages
│   └── utils
│
├── server
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── middleware
│   ├── utils
│   └── server.js
│
├── uploads
│
└── README.md
```

---

# ⚙️ Installation

## 1️⃣ Clone the repository

```bash
git clone https://github.com/shubhdeep123/ExamNotesAI.git
cd ExamNotesAI
```

---

## 2️⃣ Install dependencies

### Backend

```bash
cd server
npm install
```

### Frontend

```bash
cd client
npm install
```

---

# 3️⃣ Setup Environment Variables

Create a `.env` file inside the **server folder**.

Example configuration:

```env
PORT=8000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CLIENT_URL=http://localhost:5173

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

---

# ▶️ Running the Project

### Start backend

```bash
cd server
npm run dev
```

### Start frontend

```bash
cd client
npm run dev
```

The application should now be running at:

```
Frontend: http://localhost:5173
Backend: http://localhost:8000
```

---

# 💳 Stripe Webhook Setup

Stripe webhooks are required to securely add credits after payment.

### Install Stripe CLI

https://stripe.com/docs/stripe-cli

### Login to Stripe

```bash
stripe login
```

### Forward events to your local server

```bash
stripe listen --forward-to localhost:8000/api/credits/webhook
```

This will provide a webhook secret.

Add it to your `.env` file:

```
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxx
```

---

# 🔑 Credit System

The platform uses a **credit-based model**.

Flow:

```
User purchases credits
        ↓
Stripe Checkout
        ↓
Stripe Webhook verifies payment
        ↓
Credits added to user's account
```

This ensures **secure payment verification before granting credits**.

---

# 📌 API Routes

## Authentication

```
POST /api/auth/google
GET  /api/auth/logout
```

---

## User

```
GET /api/user/currentuser
```

---

## Notes

```
GET /api/getnotes
POST /api/generate-notes
GET /api/notes/:id
```

---

## PDF Processing

```
POST /api/pdf/generate-pdf
```

---

## Credits

```
POST /api/credits/order
POST /api/credits/webhook
```

---

# 🧠 Future Improvements

- AI flashcards generation
- Quiz creation from notes
- Study planner
- Collaborative note sharing
- Mobile app version

---

# 👨‍💻 Author

**Shubhdeep Sharma**

GitHub  
https://github.com/shubhdeep123

---

# ⭐ Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Commit changes
4. Open a Pull Request

---

⭐ If you like this project, consider giving it a star on GitHub!
