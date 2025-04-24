# CareerLink

**CareerLink** is an AI-powered career development platform designed to help students and professionals navigate their career paths with ease. It combines personalized AI tools like a Career Advisor, Resume Builder, Interview Bot, and Skill Roadmaps into a single platform.

## 🚀 Features

- **AI Career Advisor** – Get tailored career recommendations based on your background and goals.  
- **Resume Builder** – Generate professional resume bullet points using AI.  
- **Interview Bot** – Practice mock interviews with role-specific questions and instant feedback.  
- **Roadmaps** – Explore predefined career paths to guide your skill development.

## 🛠 Tech Stack

- **Frontend:** Next.js, Tailwind CSS  
- **Backend:** Node.js, Express.js, MongoDB  
- **AI:** Mistral AI, Gemini AI  
- **Authentication:** Clerk  
- **Deployment:** Local setup (development mode)

## 💻 Running Locally

### Prerequisites

- Node.js (v14 or later)  
- npm or yarn

### Steps to Install and Run

1. Clone the repository
    ```
    git clone "https://github.com/PrathamShenoy14/CareerLink"
    ``` 

2. Install dependencies  
- Navigate to the `client` folder and install frontend dependencies:  
  ```
  cd client
  npm install
  ```
- Then, navigate to the `server` folder and install backend dependencies:  
  ```
  cd ../server
  npm install
  ```

3. Set up environment variables  
- In the `server` folder, create a `.env` file and add:  
  ```
  PORT=5000
  MongoURI=your_mongodb_connection_string
  CLIENT_URL=http://localhost:3000
  ```
- In the `client` folder, create a `.env.local` file and add:  
  ```
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
  CLERK_SECRET_KEY=your_clerk_secret_key
  NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
  MISTRAL_API_KEY=your_mistral_api_key
  NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
  NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
  ```

4. Run the application locally  
- Start the backend server:  
  ```
  cd server
  npm run dev
  ```
- Start the frontend server:  
  ```
  cd ../client
  npm run dev
  ```

5. Visit `http://localhost:3000` in your browser to explore the platform.

## 📬 Contact

For any questions or feedback, feel free to reach out:

**Email:** prathamshenoy7@gmail.com  
**GitHub:** https://github.com/PrathamShenoy14
