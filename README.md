# MERN CRUD Projects Collection

This repository contains a structured collection of full-stack JavaScript CRUD (Create, Read, Update, Delete) applications built with the MERN stack (MongoDB, Express, React, Node.js). The projects are organized by complexity levels to demonstrate progression in web development skills.

## 📂 Repository Structure

- **`01_Basic/`**
  - **`01_SimpleCRUD`**: A foundational CRUD application demonstrating core concepts of RESTful APIs and React state management.
  - **`02_HealthcareApp`**: A basic healthcare management system to track patients and appointments.
- **`02_Intermediate/`** *(Coming Soon)*
- **`03_Advanced/`** *(Coming Soon)*
- **`Docs/`**: Contains documentation and walkthroughs for the repository setup.

## 🚀 Getting Started

Each project folder contains its own `client` and `server` directories. To run any of the applications locally:

1. **Environment Setup**: 
   Navigate to the `server` directory of the project you want to run. Copy the `.env.example` file to create a `.env` file and fill in your local MongoDB URI and JWT Secret.

2. **Backend**:
   ```bash
   cd path/to/project/server
   npm install
   npm run dev
   ```

3. **Frontend**:
   ```bash
   cd path/to/project/client/frontend # or just client
   npm install
   npm run dev
   ```

## 📄 Documentation

For a detailed breakdown of how this repository is structured and secured for version control, refer to [Docs/Walkthrough.md](./Docs/Walkthrough.md).
