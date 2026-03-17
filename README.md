# SafeLink - Disaster Management Application

SafeLink is a modern, responsive, emergency and disaster management platform designed to help communities respond to crises quickly and efficiently. Built with React, Tailwind CSS, and Leaflet, it provides an all-in-one suite for SOS tracking, emergency broadcasts, and location intelligence.

## 🌟 Features

- **Auth & Dashboards**: Dedicated views for regular users, incident coordinators, and administrators.
- **Active SOS Map (Live-Tracking)**: Real-time map displaying critical incidents, shelters, hospitals, and safe zones.
- **Emergency Broadcasts**: System allowing administrators to push global weather warnings and disaster alerts to all users.
- **AI Assistant**: Built-in conversational AI to provide immediate disaster safety advice and first response guidelines.
- **Offline Mode**: Fully capable web app with offline caching and automatic synchronization of disaster reports once connectivity is restored.
- **Push Notifications**: Receive nearby SOS signals and critical broadcasts.

---

## 🚀 Quick Setup & Deployment

SafeLink is currently combined into a **single, portable HTML file** (`index.html`) using React via CDN, making it incredibly easy to deploy instantly on GitHub Pages without any build steps.

### Running Locally
1. Clone the repository: `git clone https://github.com/yourusername/safelink.git`
2. Open `index.html` directly in your browser.
3. No build tools (like Webpack or Vite) are required for this setup.

### Deploying to GitHub Pages
Because the entire application runs natively in the browser without a build step:
1. Push your repository to GitHub.
2. Go to your repository settings on GitHub.
3. Navigate to **Pages** on the left-hand sidebar.
4. Under **Source**, select `main` (or `master`) branch and click **Save**.
5. Within a few minutes, your application will be live at `https://yourusername.github.io/safelink/`.

---

## 🔧 Launching the Production Application

SafeLink now integrates directly with **Real Firebase Services** (Auth, Firestore, Storage) and **OpenAI's API**.

When you first launch `index.html` in your browser, you will be greeted by a **Configuration Setup Screen**.
1. **Firebase Configuration**: Create a project in your Firebase Console, add a Web App, and copy the `firebaseConfig` keys (API Key, Auth Domain, Project ID, etc.) into the modal.
2. **OpenAI API Key**: Provide an active `sk-...` API key to power the AI Chatbot Assistant.
3. The app will securely save these keys to your browser's local storage and initialize the real Firebase SDK. Note: clearing your cache will prompt the setup again.

### Deploying Backend Services (Emails & SMS)

SafeLink includes a Serverless Backend via Firebase Cloud Functions in the `functions` directory. It uses `nodemailer` to alert Founders of new sign-ins, and `twilio` to securely text Emergency Contacts instantly when an SOS is deployed.
1. Open your terminal and navigate to the Functions folder: `cd functions`
2. Install necessary dependencies: `npm install`
3. Set your environment variables to securely transmit notifications:
   ```bash
   firebase functions:config:set twilio.sid="ACxxx" twilio.token="yyy" twilio.from="+1234567890"
   firebase functions:config:set smtp.email="founder@gmail.com" smtp.password="app-password"
   ```
4. Deploy the functions to your live Firebase project: `firebase deploy --only functions`

---

## 🎨 Technology Stack
- **Frontend Framework**: React 18 (via unpkg/Babel)
- **Backend Architecture**: Firebase Cloud Functions (Node.js 20)
- **Styling**: Tailwind CSS (via CDN)
- **Maps**: Leaflet.js
- **Icons**: Custom embedded SVG iconography
- **Fonts**: Inter (Google Fonts)
- **AI Integration**: OpenAI GPT-3.5-turbo (Browser Fetch)

Made for hackathons, emergency response portfolios, and startup concepts.
