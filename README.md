# BrightPath

BrightPath is an inclusive online learning platform that allows users to enroll in courses, manage their profile, and track their learning journey. Admins have full control over course management.

## 🚀 Live Demo

- **Frontend:** [BrightPath Frontend](https://bright-path-seven.vercel.app)  
- **Backend:** [BrightPath Backend](https://brightpath.azurewebsites.net)

## 💻 Tech Stack

- **Frontend:** Vite, React.js, CSS  
- **Backend:** Spring Boot, Java  
- **Database:** MySQL (hosted on Azure)  
- **Hosting / Deployment:**  
  - Frontend: Vercel  
  - Backend: Azure App Service  
- **File Storage:** Azure Blob Storage  

## 📌 Features

### Admin
- Add, update, and delete courses  
- Manage course content efficiently  

### User
- Register and log in securely  
- Update personal details (name, email, password)  
- Update profile photo  
- Enroll in courses  
- View list of enrolled courses  

### General
- Responsive design for desktop and mobile  
- Secure authentication and profile management  

## ⚙️ Getting Started

### Clone the repository

```bash
git clone (https://github.com/pavani-edirisinghe/BrightPath-Project)
cd brightpath
```

### Backend

1. Navigate to the backend folder:

```bash
cd backend
```
2. Create a .env or application.properties file with your database and storage credentials.

3. Run the Spring Boot application:
   
```bash
./mvnw spring-boot:run
```

### Frontend

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:
   
```bash
npm run dev
```

## 📁 Folder Structure

```bash
brightpath/
├─ frontend/       # React + Vite frontend
├─ backend/        # Spring Boot backend
├─ README.md

```

##  🔗 Deployment

- Frontend is deployed on Vercel

- Backend is deployed on Azure App Service

- Images and files are stored in Azure Blob Storage














