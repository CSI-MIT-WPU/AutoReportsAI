# AutoReportsAI

AutoReportsAI is a powerful tool designed to streamline the creation of reports based on GitHub commits. This application eliminates the tedious and time-consuming process of manual report generation by automating it with AI. AutoReportsAI is particularly useful for companies that require periodic reports of employees' work, such as weekly or monthly updates.

## Features

- **Automated Report Generation:** Generate detailed reports from GitHub repositories based on specified criteria (repository name, branch, and date range).
- **Custom Templates:** Select and apply custom templates to tailor reports to specific needs.
- **Authentication:** Secure access using Clerk for authentication.
- **Modern Dashboard:** Intuitive UI built with Shadcn.
- **AI-Powered Insights:** Leverages Worqhat's AiCon-V2 AI model for intelligent report generation.

---

## Architecture

AutoReportsAI follows a modern architecture with the following technologies:

- **Frontend:** Built with [Next.js](https://nextjs.org/) using TypeScript for robust and maintainable code.
- **Backend:** Firebase is used to store and manage data efficiently.
- **AI Integration:** Worqhat's [AiCon-V2](https://docs.worqhat.com/api-8951034) AI model processes commits to generate insightful and structured reports.
- **Authentication:** Powered by [Clerk](https://clerk.com/) for a seamless and secure user experience.
- **Styling:** UI components crafted using [Shadcn](https://ui.shadcn.com/) for a clean, modern appearance.

---

## Purpose

In many workplaces, employees must submit regular reports detailing their progress. Manually compiling these reports from GitHub commits is tedious and prone to errors. AutoReportsAI automates this process, saving time and ensuring consistency in reporting.

---

## Problem Solved

- **Time Efficiency:** Automates repetitive tasks, allowing employees to focus on their core work.
- **Accuracy:** Eliminates human errors in summarizing commits.
- **Customization:** Supports customizable templates for professional-grade reports.
- **Scalability:** Efficiently handles multiple repositories and users.

---

## Getting Started

Follow these steps to set up and run AutoReportsAI on your local machine:

# Installation

### Clone the Repository
```bash
git clone https://github.com/CSI-MIT-WPU/AutoReportsAI.git
```

### Navigate to the Project Directory
```bash
cd AutoReportsAI
```
### Install Dependencies
```bash
npm install
```

### Set API Keys
### Create a .env.local file in the project root and add the following keys:
```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
WEBHOOK_SECRET=your_webhook_secret
UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token
WORQHAT_API_KEY=your_worqhat_api_key
NEXT_PUBLIC_DB_USERS_DOC=your_db_users_doc
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
```

### Run the Development Server
```bash
npm run dev
```

### Access the Application
### Open your browser and navigate to:
## http://localhost:3000
