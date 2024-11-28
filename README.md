# React + TypeScript + Vite + Raffle API Integration + Search results customization

This repository provides a minimal setup for integrating Raffle's API into a React application using Vite and TypeScript. It includes a basic project structure, HMR (Hot Module Replacement), ESLint rules, and example API calls to fetch top questions, and search results. Finally, it includes an implementation to use css metadata selectors.

## Prerequisites

Before starting, ensure you have the following:

1. **Development Environment**:

   - Node.js installed (v16+ recommended)
   - A package manager such as npm

2. **Raffle User Interface (UID)**:

   - Create an **API User Interface** (formerly known as "Search UI") in the Raffle Web app. This is required to retrieve the `uid` for API calls.
   - Follow these guides to set up your Search UI and retrieve the UID:
     - [Create a Search UI](https://docs.raffle.ai/search-uis/create/)
     - [Retrieve the UID](https://docs.raffle.ai/search-uis/install/)

3. **Environment Variables**:
   - Copy the `.env.example` file to a new `.env` file in the project root:
     ```bash
     cp .env.example .env
     ```
   - Add your **UID** to the `.env` file:
     ```env
     VITE_RAFFLE_UI_UID=your-uid-here
     ```
     Without the UID, the API integrations will not function correctly.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the local development server URL (usually `http://localhost:5173`).

That's it! You're ready to explore and extend the project.

## Tools Used

This project leverages the following tools to streamline development and enhance the user experience:

- **React**: A powerful library for building dynamic user interfaces.
- **React Query**: Simplifies data fetching, caching, and state management for API calls.
- **Tailwind CSS**: A utility-first CSS framework for rapid and consistent styling.
- **TypeScript**: Adds static typing for better code quality and maintainability.

## Features

This project integrates with the Raffle API to provide the following capabilities:

- **Top Questions**: Fetch commonly asked questions to guide user exploration.
- **Search Results**: Retrieve detailed search results, including titles, descriptions, and links. These include css metadata selectors.

Refer to the [React Implementation Guide](https://docs.raffle.ai/api-guides/react/) for detailed examples of how these features are implemented.

## Resources

- [React Implementation Guide](https://docs.raffle.ai/api-guides/react/): Step-by-step instructions for integrating Raffle's API into React.
- [Raffle API Reference](https://docs.raffle.ai/api): Comprehensive documentation of the Raffle API endpoints.

## Playing Around

Once your environment is set up and the server is running, explore the API features, tweak the components, and adapt the implementation to your use case. Enjoy building!
