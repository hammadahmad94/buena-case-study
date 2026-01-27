# Property Management Wizard

A comprehensive dashboard and property creation wizard designed for the Buena case study. This application streamlines the process of extracting property data from "Declaration of Division" (Teilungserklärung) PDFs and managing complex property structures.

## Features

- **Property Overview**: A dashboard to view and manage existing properties.
- **Creation Wizard**: A 4-step flow to create new properties:
    1.  **General Info**: Manual entry or AI-accelerated auto-fill via PDF upload.
    2.  **Buildings**: Manage multiple buildings with address validation.
    3.  **Units**: High-density table for managing units with auto-numbering.
    4.  **Review**: Summary view before submission.
- **AI Integration**: Uses Google Gemini to extract structured data from unstructured PDF documents.

## Tech Stack

- **Frontend**: React, Material UI (MUI), localized state management.
- **Backend**: Node.js, Express.
- **Database**: SQLite with Prisma ORM.
- **AI**: Google Generative AI SDK.

## Setup

### 1. Server

```bash
cd server
npm install
npx prisma db push
npm run dev
```

### 2. Client

```bash
cd client
npm install
npm run dev
```

## Environment Variables

Create a `server/.env` file:

```env
DATABASE_URL="file:./dev.db"
GEMINI_KEY="your_api_key"
```
