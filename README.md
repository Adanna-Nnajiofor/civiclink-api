# Government Officials Management System

This is a backend application built with **Express.js** to manage government-related data, focusing on issues, government officials, and locations. The system provides a RESTful API for querying and managing these entities.

## Overview

The **Government Officials Management System** is designed to manage and query information about government issues, officials, and locations. It provides a backend API built with **Express.js** and connected to a **PostgreSQL** database. The API allows users to perform CRUD (Create, Read, Update, Delete) operations on government issues, officials, and locations. The system also provides search functionality for retrieving data based on specific parameters like location and issue.

## Features

- **CRUD Operations** for Issues, Government Officials, and Locations.
- **SQL Database** (PostgreSQL) to store data.
- **Cross-Origin Resource Sharing (CORS)** enabled for better flexibility in different environments.
- **JSON** formatted responses for easy integration.

## Technologies Used

- **Express.js**: Web framework for Node.js to handle API requests.
- **PostgreSQL**: Relational database to store issues, officials, and locations.
- **CORS**: Middleware to enable Cross-Origin Resource Sharing for better API accessibility.
- **Node.js**: JavaScript runtime for building the backend server.
- **dotenv**: For managing environment variables.
- **Postman** - API testing tool

## API Endpoints

The following API endpoints are available:

### Issues

- **GET** `/api/v1/issues`  
  Fetches a list of all issues.

- **GET** `/api/v1/issues/:id`  
  Fetches a specific issue by ID.

- **GET** `/api/v1/issues/:id/government-level`  
  Fetches the government level associated with the specific issue by ID.

### Locations

- **GET** `/api/v1/locations`  
  Fetches a list of all locations grouped by state, with their corresponding Local Government Areas (LGAs).

### Officials

- **GET** `/api/v1/officials`  
  Fetches a list of government officials based on specific query parameters: `state`, `lga`, and `issue`.

## How to Start the Development Server

1. Clone the repository:
   ```sh
   git clone https://github.com/Adanna-Nnajiofor/civiclink-api.git
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Compile TypeScript files:
   ```sh
   tsc
   ```
4. Start the development server:
   ```sh
   npm start
   ```

## Deployment

This API has been **deployed on Render** and is accessible at:

**Base URL:** [`https://civiclink-api.onrender.com`](https://civiclink-api.onrender.com)
