# Affordmed Notification Dashboard

## Overview
The Affordmed Notification Dashboard is a professional, production-ready frontend application designed to display, filter, and track organizational broadcasts in real-time. The application processes raw API notification data and visualizes it through an enterprise-grade Material UI interface, complete with a persistent state engine and an intelligent priority ranking system.

## Stage 1 Features
- Notification fetching
- All notifications page
- Priority sorting
- Top priority notifications
- Material UI interface

## Stage 2 Features
- Search functionality
- Category filtering
- Viewed status persistence using localStorage
- New and Viewed indicators
- Loading states
- Error handling
- Responsive dashboard
- Statistics cards

## Tech Stack
- React
- Material UI
- Axios
- React Router

## Folder Structure
```
notification-app-fe/
├── public/
├── src/
│   ├── components/
│   │   ├── DashboardStats.jsx
│   │   ├── FilterToolbar.jsx
│   │   ├── Footer.jsx
│   │   └── NavigationBar.jsx
│   ├── hooks/
│   │   └── useViewedStatus.js
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   └── PriorityPage.jsx
│   ├── services/
│   │   └── notificationService.js
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## Installation
```bash
npm install
npm start
```
