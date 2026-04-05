# Points Arena Leaderboard Setup Guide

Welcome to the Points Arena game! This application provides a real-time multiplayer leaderboard experience using only a single HTML file and Firebase as the backend, staying well within the free tier.

## 🚀 Quick Start (Frontend)
Simply open the `leaderboard-game.html` file in any web browser to see the interface. To make it communicate with your Firebase project, follow the backend setup steps below.

## 🔥 Backend Setup (Firebase)

### 1. Enable Realtime Database
1. Go to your [Firebase Console](https://console.firebase.google.com/).
2. Select your project (`mdwnhpoints`).
3. On the left sidebar, click **Build** > **Realtime Database**.
4. Click **Create Database**.
5. Choose your nearest location and start in **Test Mode** (or start in Locked mode and update rules later).
6. Go to the **Rules** tab in the database and paste the contents of `database.rules.json`:
   ```json
   {
     "rules": {
       ".read": true,
       ".write": true
     }
   }
   ```
   > **Note**: These rules are completely open which is great for testing and basic games. If you want production security later, you would add Firebase Authentication and write rules to only allow authenticated users to post points.

### 2. Set Up Cloud Functions (Notifications)
We use a Cloud Function to automatically notify the current leaderboard leader whenever any other player scores points.

1. Install the Firebase Command Line Tools if you haven't already:
   ```bash
   npm install -g firebase-tools
   ```
2. Log in to Firebase via terminal:
   ```bash
   firebase login
   ```
3. Initialize Firebase Functions in this project directory. **Skip this if you just want to deploy the existing folder!** 
   Since the `functions` directory is already created for you in this repository, you only need to run:
   ```bash
   firebase use mdwnhpoints
   ```
4. Deploy the cloud functions to your project:
   ```bash
   firebase deploy --only functions
   ```
   > **Note**: Firebase Cloud Functions require your project to be on the **Blaze (Pay as you go)** plan. However, usage will fall under the massive free monthly quota (2 million invocations/month). If you absolutely cannot upgrade to Blaze, the game will still function perfectly without the Cloud Function, you just won't get the server-side pop-up notifications for the leader!

## 🎮 How it Works
1. **Joining**: Users enter their name. It's stored in `localStorage` so they stay logged in if they refresh the page.
2. **Adding Points**: When a player clicks +5, +10, or +20, the frontend transactionally adds it to their total in Firebase (`/players/Name`) and adds a log to `/history`.
3. **Leaderboard**: The main grid listens to `/players` and automatically sorts them. The player with rank 1 is visually crowned.
4. **Notifications**: The Cloud Function listens to new nodes in `/history`. It calculates the current leader, formats a message, and writes it to `/notifications/LeaderName`. The React frontend listens for updates to this node and displays a sliding toast!
