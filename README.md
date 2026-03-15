# 🎓 Student Activity Platform (SAP)

A full-stack web application for managing and tracking student activity records in educational institutions.

![SAP Dashboard](https://img.shields.io/badge/Status-Active-brightgreen)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.5-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)
![Java](https://img.shields.io/badge/Java-17-red)

---

## 📌 Project Overview

The **Student Activity Platform** is a centralized digital system designed to record, manage, and track student academic and extracurricular activities. It provides a modern dark-themed dashboard interface with real-time data management capabilities.

---

## ✨ Features

### 🔐 Authentication
- JWT-based secure login system
- BCrypt password encryption
- Token-based session management

### 👨‍🎓 Student Management
- Add, view, edit, and delete student records
- Search and filter by name, roll number, department
- Department-wise filtering chips
- Individual student profile with activity history

### 🏆 Activity Management
- Record academic, sports, cultural, and technical activities
- Filter activities by type
- Link activities to specific students
- Track achievements and certificate URLs

### 📊 Dashboard
- Real-time statistics cards
- Recent students and activities overview
- Activity breakdown with progress bars
- Welcome greeting with date

### 📅 Calendar View
- Monthly calendar with activity markers
- Click on any date to view activities
- Monthly activity summary by type

### 🔔 Notifications
- System notification center
- Mark as read / Mark all as read
- Filter by read/unread status
- Delete notifications

### 👤 Profile Management
- Admin profile view and edit
- Institution details management
- Password change interface

---

## 🛠️ Tech Stack

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Java | 17 | Programming Language |
| Spring Boot | 3.3.5 | Backend Framework |
| Spring Security | 6.x | Authentication & Authorization |
| Spring Data JPA | 3.x | Database ORM |
| Hibernate | 6.5.3 | JPA Implementation |
| JWT (jjwt) | 0.11.5 | Token Generation |
| MySQL Connector | 8.x | Database Driver |
| Maven | 3.x | Build Tool |

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.2.0 | UI Framework |
| React Router DOM | 6.x | Client-side Routing |
| Outfit Font | — | Typography |
| JetBrains Mono | — | Monospace Typography |
| CSS Variables | — | Theming System |

### Database
| Technology | Version |
|-----------|---------|
| MySQL | 8.0 |

---

## 📁 Project Structure
```
student-activity-platform/
│
├── student-activity-platform/          # Spring Boot Backend
│   ├── src/main/java/com/studentactivity/
│   │   ├── config/
│   │   │   ├── CorsConfig.java
│   │   │   ├── PasswordConfig.java
│   │   │   └── SecurityConfig.java
│   │   ├── controller/
│   │   │   ├── AuthController.java
│   │   │   ├── ActivityController.java
│   │   │   ├── DashboardController.java
│   │   │   └── StudentController.java
│   │   ├── dto/
│   │   │   ├── ActivityDTO.java
│   │   │   ├── LoginRequest.java
│   │   │   └── LoginResponse.java
│   │   ├── model/
│   │   │   ├── Activity.java
│   │   │   ├── Student.java
│   │   │   └── User.java
│   │   ├── repository/
│   │   │   ├── ActivityRepository.java
│   │   │   ├── StudentRepository.java
│   │   │   └── UserRepository.java
│   │   ├── security/
│   │   │   ├── JwtFilter.java
│   │   │   └── JwtUtil.java
│   │   └── service/
│   │       ├── ActivityService.java
│   │       ├── StudentService.java
│   │       └── UserService.java
│   └── src/main/resources/
│       └── application.properties
│
└── frontend/                           # React Frontend
    ├── public/
    │   └── index.html
    └── src/
        ├── api/
        │   └── api.js
        ├── components/
        │   ├── Navbar.js
        │   └── Sidebar.js
        ├── pages/
        │   ├── Login.js
        │   ├── Dashboard.js
        │   ├── Students.js
        │   ├── Activities.js
        │   ├── StudentDetail.js
        │   ├── Calendar.js
        │   ├── Notifications.js
        │   └── Profile.js
        ├── styles/
        │   └── global.css
        ├── App.js
        └── index.js
```

---

## ⚙️ Prerequisites

Make sure you have these installed:

- ✅ Java 17 or higher
- ✅ Maven 3.6+
- ✅ Node.js 18+ and npm
- ✅ MySQL 8.0
- ✅ Git

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/student-activity-platform.git
cd student-activity-platform
```

### 2. Setup MySQL Database
```sql
CREATE DATABASE student_activity_db;
```

### 3. Configure Backend

Open `student-activity-platform/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/student_activity_db
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
spring.jpa.hibernate.ddl-auto=update
server.port=8080
jwt.secret=studentactivitysecretkey2024xyzABCDEFGHIJKLMNOP
jwt.expiration=86400000
```

### 4. Run Backend
```bash
cd student-activity-platform/student-activity-platform
mvn clean spring-boot:run
```

Wait for:
```
Tomcat started on port 8080
Started StudentActivityPlatformApplication
```

### 5. Register Admin User
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123","role":"ADMIN"}'
```

Or on Windows PowerShell:
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/auth/register" `
  -Method Post `
  -ContentType "application/json" `
  -Body '{"username":"admin","password":"admin123","role":"ADMIN"}'
```

### 6. Run Frontend
```bash
cd frontend
npm install
npm start
```

### 7. Open in Browser
```
http://localhost:3000
```

Login with:
```
Username: admin
Password: admin123
```

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and get JWT token |

### Students
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students` | Get all students |
| GET | `/api/students/{id}` | Get student by ID |
| POST | `/api/students` | Create new student |
| PUT | `/api/students/{id}` | Update student |
| DELETE | `/api/students/{id}` | Delete student |

### Activities
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/activities` | Get all activities |
| GET | `/api/activities/{id}` | Get activity by ID |
| GET | `/api/activities/student/{id}` | Get activities by student |
| POST | `/api/activities` | Create new activity |
| PUT | `/api/activities/{id}` | Update activity |
| DELETE | `/api/activities/{id}` | Delete activity |

### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard/stats` | Get dashboard statistics |

---

## 🖥️ Screenshots

### Login Page
> Dark space-themed login with animated floating cards

### Dashboard
> Real-time statistics with activity breakdown charts

### Students Page
> Searchable table with department filter chips

### Activities Page
> Type-filtered activity records with achievement tracking

### Calendar View
> Monthly calendar with activity markers per day

---

## 🔒 Security

- All API endpoints (except `/api/auth/**`) require JWT token
- Passwords are encrypted using BCrypt
- CORS configured to allow frontend requests
- Stateless session management with JWT

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/NewFeature`)
3. Commit your changes (`git commit -m 'Add NewFeature'`)
4. Push to the branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Developer

**Vinotha**
- Department: CSE
- Project: Centralized Digital Platform for Comprehensive Student Activity Records

---

## 📞 Support

If you face any issues:
1. Check that MySQL is running
2. Verify backend is on port `8080`
3. Verify frontend is on port `3000`
4. Make sure admin user is registered before login

---

*Built with ❤️ using Spring Boot + React*
