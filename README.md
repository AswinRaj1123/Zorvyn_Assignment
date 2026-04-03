# NexVest Finance Dashboard UI

Frontend assessment submission for the Finance Dashboard UI task.

This project is a clean, interactive frontend-only dashboard built to demonstrate UI design, component structure, state handling, and responsive layout decisions. It uses mock data and does not depend on a backend.

## Overview

The dashboard simulates a small personal finance experience where users can:

- View financial summaries
- Explore transactions
- Understand spending patterns through charts and insights
- Switch between `Admin` and `Viewer` roles on the frontend
- Use light mode and dark mode

## Features

### Dashboard Overview

- Summary cards for total balance, income, and expenses
- Time-based visualization for transaction trends
- Categorical visualization for spending breakdown

### Transactions Section

- Transaction table with date, amount, category, and type
- Filtering and search/sorting style interactions
- Empty-state handling for no data scenarios

### Role-Based UI

- `Viewer` mode is read-only
- `Admin` mode can add and edit transactions
- Role switching is handled entirely on the frontend with a toggle

### Insights Section

- Highest spending category
- Monthly comparison
- Smart observation card based on the available data

### Extra Polish

- Dark mode toggle
- Local storage persistence
- Animated UI interactions
- Responsive layout for smaller screens

## Tech Stack

- React
- Vite
- Zustand for state management
- Framer Motion for motion and transitions
- Tailwind CSS for styling
- Recharts for chart visualizations

## Setup

From the repository root:

```bash
cd finance-dashboard
npm install
npm run dev
```

Then open the local development URL shown in the terminal.

## Project Structure

```text
finance-dashboard/
  src/
    components/
      dashboard/
      insights/
      transactions/
      ui/
    data/
    store/
    utils/
```

## How This Meets the Assessment

- Clean and intuitive UI: the layout keeps the dashboard, transactions, and insights easy to scan.
- Responsive behavior: the sidebar and cards adapt to smaller screens.
- Frontend role simulation: `Admin` and `Viewer` change visible actions without backend logic.
- State management: transactions, filters, selected role, and theme are managed in the app state.
- Data handling: the dashboard uses mock data and local persistence to simulate a real application flow.

## Notes

- This is intentionally frontend-focused and not production backend dependent.
- The branding in the UI has been customized to NexVest for the submission.
