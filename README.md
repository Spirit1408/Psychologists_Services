# Psychologists Services

A modern React application that connects users with professional psychologists. This platform allows users to browse through a curated list of psychologists, view their profiles, and save favorites for future reference.

## Project Overview

This application provides a seamless experience for users seeking psychological services. It features user authentication, a comprehensive listing of psychologists with detailed profiles, and the ability for registered users to maintain a personalized list of favorite psychologists.

## Features

- **User Authentication**: Secure login and registration system
- **Psychologists Catalog**: Browse through a comprehensive list of professional psychologists
- **Search & Filtering**: Find psychologists based on various criteria with sorting options
- **Favorites System**: Authenticated users can save psychologists to their favorites list
- **Responsive Design**: Fully responsive interface that works on desktop and mobile devices
- **Toast Notifications**: User-friendly notifications for various actions

## Technologies Used

### Frontend
- **React 19**: Modern UI library for building component-based interfaces
- **Redux Toolkit**: State management with Redux Toolkit for efficient data flow
- **React Router 7**: Navigation and routing within the application
- **React Hook Form**: Form handling with validation
- **Yup**: Schema validation for forms
- **React Hot Toast**: Toast notifications for improved user experience
- **React Spinners**: Loading indicators for asynchronous operations

### Backend & Data
- **Firebase**: Authentication and data storage
- **Redux Persist**: Persistence of Redux store data

### Development Tools
- **Vite**: Fast, modern frontend build tool
- **ESLint**: Code linting and formatting
- **SWC**: Fast JavaScript/TypeScript compiler

## Project Structure

```
src/
├── components/       # Reusable UI components
├── images/           # Static image assets
├── pages/            # Application pages
│   ├── Favorites/    # Favorites page
│   ├── Home/         # Home page
│   ├── NotFoundPage/ # 404 page
│   └── Psychologists/# Psychologists catalog page
├── redux/            # Redux state management
│   ├── auth/         # Authentication state
│   ├── favorites/    # Favorites state
│   └── psychologists/# Psychologists state
├── firebase.js       # Firebase configuration
├── main.jsx          # Application entry point
└── index.css         # Global styles
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Build for production:
   ```
   npm run build
   ```

## Documentation

- [Requirements Specification](#) https://docs.google.com/document/d/1PrTxBn6HQbb0Oz17g5_zvyLGIOZg0TIP3HPaEEp6ZLs/edit?tab=t.0
- [Design Mockup](#) https://www.figma.com/file/I5vjNb0NsJOpQRnRpMloSY/Psychologists.Services?type=design&node-id=0-1&mode=design&t=4zfT2zFANRbp1fCK-0
