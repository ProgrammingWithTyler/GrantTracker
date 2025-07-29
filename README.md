# 🎓 GrantTracker

**GrantTracker** is a full-stack web application designed to streamline the lifecycle of educational grants—from submission and review to approval and reporting. Built with enterprise-grade patterns and real-world architecture, it emphasizes clarity, security, and maintainability.

> Powered by Angular 19 (standalone components + Angular Material) and ASP.NET Core Web API, GrantTracker delivers rapid development with a strong foundation for extensibility.

-----

## 🧱 Project Structure

```bash
GrantTracker/
├── GrantTracker.API/       # ASP.NET Core Web API (C#)
├── grant-tracker/          # Angular 19 frontend (standalone components + Angular Material)
├── LICENSE                 # Project license
├── GrantTracker.sln        # .NET solution file
```

-----

## 🚀 Tech Stack

### 🔧 Backend — `GrantTracker.API`

- ASP.NET Core 9 Web API
- Entity Framework Core
- AutoMapper
- FluentValidation
- Swagger / OpenAPI for contract visibility

### 🎨 Frontend — `grant-tracker/`

- Angular 19 (Standalone Components Architecture)
- Angular Material for UI components and theming
- Reactive Forms
- Angular Router
- RxJS for reactive state and HTTP calls

-----

## 🛠️ Getting Started

### Prerequisites

- [.NET 9 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/9.0)
- [Node.js + npm](https://nodejs.org/)
- Angular CLI: `npm install -g @angular/cli`

### 1. Clone the repository

```bash
git clone https://github.com/your-username/GrantTracker.git
cd GrantTracker
```

### 2. Run the Backend

```bash
cd GrantTracker.API
dotnet build
dotnet run
```

Backend will be available at `https://localhost:5001`.

### 3. Run the Frontend

```bash
cd grant-tracker
npm install
ng serve
```

Frontend will be available at `http://localhost:4200`.

-----

## 📌 Features

- ✅ Track and manage grant applications, statuses, and award amounts
- ✅ Role-based access control (Admins, Reviewers, Submitters)
- ✅ Clean and responsive UI built with Angular Material
- ✅ Reactive form validation for robust input handling
- ✅ Modular architecture with strong separation of concerns
- 🧩 **Planned**: Audit logging, reporting exports, multi-tenant support

-----

## 🧪 Testing

### Backend

```bash
dotnet test
```

### Frontend

```bash
ng test
```

-----

## 🧭 Roadmap

- [ ] Integrate ASP.NET Identity or JWT-based authentication
- [ ] Excel/CSV export support from Angular
- [ ] Full audit log module with change history
- [ ] Role and permission editor for admins
- [ ] CI/CD pipelines and containerized deployment

-----

## 🤝 Contributing

This project is currently a solo effort focused on building production-grade portfolio applications. You’re welcome to fork and adapt for your own use or propose improvements via pull request.

-----

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.

-----

## 🧠 A Final Note

Grant funding is a lever for opportunity. With better tools, that opportunity can be distributed more transparently and efficiently.

**Track with precision. Comply with confidence. Build with clarity.**
