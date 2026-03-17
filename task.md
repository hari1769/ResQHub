# SafeLink App

- [x] Initial project setup with React, Babel, and Tailwind via CDN
- [x] Build overall layout and navigation (Navbar, Sidebar)
- [x] Build Dashboard Component
- [x] Build Emergency SOS Button Component
- [x] Build Map Section Component 
- [x] Build Notification Panel Component
- [x] Build User Profile Section Component
- [x] Final UI Polish (Startup-level design)

## Authentication Integration
## Authentication Integration
- [x] Add Firebase SDK to index.html
- [x] Create Login / Register UI Components
- [x] Implement Firebase Auth logic
- [x] Protect Dashboard Routes

## Database Integration (Firestore)
- [x] Add Firestore SDK
- [x] Define collections schema (users, alerts, resources, broadcasts)
- [x] Mock real-time data fetching via hooks
- [x] Update Dashboard UI with real-time data

## Storage Integration (Firebase Storage)
- [x] Add Storage SDK to index.html
- [x] Implement simulated file upload logic
- [x] Create "Create Report" modal with image upload support
- [x] Build Profile Settings page for avatar uploads

## Interactive Map (Leaflet.js)
- [x] Add Leaflet CSS and JS via CDN
- [x] Create `LiveMap` React Component
- [x] Implement map initialization and controls
- [x] Add markers for user location, hospitals, shelters, petrol buns, and relief centers
- [x] Implement marker popups with details

## One-Tap SOS System
- [x] Add `navigator.geolocation` call to capture user GPS location
- [x] Create Confirmation Popup for SOS button
- [x] Implement `createAlert` mock Firestore call for SOS
- [x] Add toast notification for "nearby users" alert
- [x] Ensure SOS alert appears on the interactive map

## Push Notifications (FCM)
- [x] Import FCM SDK into [index.html](file:///c:/Users/Admin/Desktop/safelink/index.html)
- [x] Add `requestPermission` mock logic to simulate notification opt-in
- [x] Simulate receiving foreground notifications for SOS, Disasters, and Broadcasts
- [x] Update Navbar Notification bell state on incoming messages
- [x] Create UI Toast implementation for incoming simulated push notifications

## AI Emergency Assistant
- [x] Create floating AI Chatbot UI in the Dashboard
- [x] Implement messages state and auto-scroll logic
- [x] Add OpenAI API integration for chat completions
- [x] Add API Key input prompt if no key is configured
- [x] Provide system prompts for safety, first aid, and shelter suggestions

## Offline Functionality
- [x] Add global offline/online state detection to App
- [x] Update `createAlert` mock function to save to local storage if offline
- [x] Implement sync queue mechanism to retry queued alerts on reconnect
- [x] Show offline banner in UI

## Admin Dashboard
- [ ] Add Admin Panel component to navigation and UI
- [ ] Implement "Send Emergency Broadcast" functionality
- [ ] Implement "Add Disaster Alert" functionality (Admin view)
- [ ] Implement resource management (add/remove shelters and hospitals)
- [ ] Display active SOS alerts/map for Admins
