# Maasfa Khan - Portfolio Website

![Portfolio Preview](client/public/favicon.png) <!-- You can replace this with an actual screenshot of your website later -->

Welcome to my personal portfolio website! This project showcases my journey, skills, projects, and certifications in Data Science, Artificial Intelligence, Machine Learning, and Software Engineering. 

You can view the live website here: **[Link to your live website, e.g., maasfa-portfolio.onrender.com]**

## ✨ Features

- **Modern & Responsive Design:** Built with React, Tailwind CSS, and Framer Motion for smooth, dynamic animations and a premium glassmorphism aesthetic.
- **Dynamic Projects Section:** Automatically populated with my latest GitHub repositories, including Data Science analysis, NLP models, and full-stack ML apps.
- **Interactive UI:** Smooth scrolling navigation, interactive project cards, and a clean layout tailored to highlight technical skills.
- **Direct Contact:** A seamless "Get in Touch" section that links directly to my email and professional profiles.
- **Resume Integration:** One-click download for my most up-to-date resume hosted on Google Drive.

## 🛠️ Tech Stack

**Frontend:**
- [React.js](https://reactjs.org/) (via Vite)
- [Tailwind CSS](https://tailwindcss.com/) (for styling)
- [Framer Motion](https://www.framer.com/motion/) (for animations)
- [Radix UI](https://www.radix-ui.com/) (for accessible components)
- [Lucide Icons](https://lucide.dev/)

**Backend (Data Serving):**
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- In-memory storage (for serving portfolio data quickly without a database setup)

## 📂 Project Structure

```text
├── client/
│   ├── public/        # Static assets
│   └── src/
│       ├── components/# Reusable UI components (Navbar, Cards, etc.)
│       ├── pages/     # Main application pages (Home)
│       └── lib/       # Utility functions
├── server/
│   ├── index.ts       # Express server entry point
│   ├── routes.ts      # API routes (serves skills, projects, certs)
│   └── storage.ts     # In-memory data store
├── package.json       # Dependencies and scripts
└── README.md          # Project documentation
```

## 🚀 How to Run Locally

If you'd like to clone and run this project on your local machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MaasFa/Data-Scholar-Portfolio.git
   cd Data-Scholar-Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View the app:**
   Open `http://localhost:5000` in your browser.

## 📬 Contact

- **Email:** khanmasfah@gmail.com
- **LinkedIn:** [maasfakhan](https://linkedin.com/in/maasfakhan)
- **GitHub:** [MaasFa](https://github.com/MaasFa)

---
*Designed and built with ❤️ by Maasfa Khan.*
