# Tiko Todo App

This project is a Todo application built using React Native with TypeScript. The app allows users to manage their tasks with functionalities such as registration, login, creating todos, updating todo status, editing, deleting, and handling user sessions with token rotation.

## Features

- User registration and login ✅
- Token-based authentication with token rotation ✅
  - API provides `access_token` and `refresh_token` ✅
  - Endpoints to refresh and validate ✅
  - `access_token` lifetime: 1 hour ✅
  - `refresh_token` lifetime: 1 day ✅
- Create todos ✅
- Update the "done" state of a todo ✅
- Edit the description of a todo ✅
- Delete todos ✅
- Logout functionality ✅
- Display loading indicators during network requests ✅
- Error handling and UI notifications ✅
  - Redirect to logout state if the token is invalid ✅
- Good UI/UX experience ✅
- Caching Ready & Realtime UI Update ✅

## Technology Stack

- React Native CLI
- TypeScript
- @react-navigation
- @reduxjs/toolkit
- @tanstack/react-query
- axios
- react-native-mmkv
- react-native-reanimated
- react-redux
- redux-persist

## Running the Project

### Prerequisites

- Node.js
- Yarn
- Android Studio (for Android)
- Xcode (for iOS)

### Installation

1. Install dependencies:
    ```sh
    yarn install
    ```

### Running on Android

1. run the Android app:
    ```sh
    yarn android
    ```

### Running on iOS

1. Install CocoaPods dependencies:
    ```sh
    cd ios
    pod install
    cd ..
    ```

3. Run the iOS app:
    ```sh
    yarn ios
    ```

Made with ❤️ and 🎵 By Pasquale Palena
