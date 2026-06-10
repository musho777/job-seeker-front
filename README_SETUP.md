# Job Seeker Mobile App

React Native CLI app for browsing and managing job applications from staff.am.

## Prerequisites

- Node.js (v18 or higher)
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)
- Your backend API running on `http://localhost:3000`

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Install iOS pods (macOS only):**
   ```bash
   cd ios && bundle install && bundle exec pod install && cd ..
   ```

## Configuration

### Backend API URL

Update the API URL in `src/services/api.ts` based on your platform:

- **iOS Simulator:** `http://localhost:3000`
- **Android Emulator:** `http://10.0.2.2:3000`
- **Physical Device:** `http://YOUR_COMPUTER_IP:3000` (find your IP with `ipconfig` or `ifconfig`)

Example:
```typescript
const API_BASE_URL = 'http://localhost:3000'; // Change this
```

## Running the App

### iOS

```bash
npx react-native run-ios
```

Or open in Xcode:
```bash
open ios/JobSeekerApp.xcworkspace
```

### Android

```bash
npx react-native run-android
```

Make sure you have an Android emulator running or a physical device connected.

## Features

- ✅ View all jobs from staff.am
- ✅ Real-time job statistics (Total, Applying, New)
- ✅ Mark jobs as "Applying"
- ✅ Pull to refresh
- ✅ Manual sync with backend
- ✅ Beautiful, native mobile UI

## Backend Setup

Make sure your backend is running:

```bash
cd /Users/musho99icloud.com/Desktop/job-seeker
npm run start:dev
```

The backend should be accessible at `http://localhost:3000`

## API Endpoints Used

- `GET /jobs` - Fetch all jobs
- `GET /jobs/:id` - Get job details
- `PUT /jobs/:id` - Update job (e.g., isApplying status)
- `POST /jobs/sync` - Manually trigger job sync from staff.am

## Troubleshooting

### Cannot connect to backend

1. **iOS Simulator:**
   - Use `http://localhost:3000`
   - Make sure backend is running

2. **Android Emulator:**
   - Use `http://10.0.2.2:3000` (Android's special alias for localhost)
   - Check if emulator can reach your computer

3. **Physical Device:**
   - Use your computer's IP address (e.g., `http://192.168.1.100:3000`)
   - Make sure device and computer are on the same WiFi network
   - Check firewall settings

### iOS Build Errors

```bash
cd ios
bundle exec pod install
cd ..
npx react-native run-ios
```

### Android Build Errors

```bash
cd android
./gradlew clean
cd ..
npx react-native run-android
```

## Project Structure

```
JobSeekerApp/
├── src/
│   ├── components/
│   │   └── JobCard.tsx         # Job card component
│   ├── screens/
│   │   └── JobsScreen.tsx      # Main jobs list screen
│   ├── services/
│   │   └── api.ts              # API service for backend
│   └── types/
│       └── Job.ts              # TypeScript types
├── App.tsx                     # App entry point
└── package.json
```

## Development

- The app uses React Navigation for routing
- Axios for API calls
- TypeScript for type safety
- Native components (no Expo)

## Keywords Searched

The backend automatically searches for jobs with these keywords:
- react
- js
- javascript
- react native
- nest js
- node js
- backend
- frontend
- mobile developer
