# NoSeed App

This repository contains a minimal example of a React application with a Node.js backend. The application allows users to upload a picture of a product and returns whether or not the product contains seed oil. When seed oil is detected, the app suggests alternative products.

This code is only a prototype and uses a mocked list of products to simulate seed oil detection. It does not implement real image recognition or nutrition analysis.

## Structure

- `backend/` – Express server that accepts image uploads.
- `frontend/` – React client for uploading images and displaying results.

## Running the app

1. Install dependencies for the backend and frontend.
2. Start the Express server using `node backend/server.js`.
3. Start the React development server in the `frontend` directory.

