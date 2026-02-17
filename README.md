# 🎓 AITR CMS — Frontend

> **College Management System** built for AITR to manage students, faculty, departments, and institute-level data — all behind a secure, role-based dashboard.

---

## ✨ Features

- 🔐 **Authentication & Authorization** — JWT-based login with protected routes. Unauthorized users are redirected to `/login`.
- 📊 **Dashboard** — Central hub for managing all data (students, faculty, institute, departments).
- 📋 **Data Tables** — Sortable, filterable, exportable tables for every data category.
- 📝 **Forms** — Dedicated forms for creating/editing records across all modules.
- 📤 **Excel Upload & CSV Export** — Bulk data operations supported.
- 🔍 **Universal Search** — Search across the entire system.
- 👤 **Profile Management** — View and update student & faculty profiles.

---

## 🛠️ Tech Stack

| Category       | Technology                                           |
| -------------- | ---------------------------------------------------- |
| Framework      | React 19 + Vite 7                                    |
| Routing        | React Router DOM v7                                  |
| Styling        | Tailwind CSS 3                                       |
| HTTP Client    | Axios                                                |
| Forms          | React Hook Form                                      |
| Tables         | React Data Table Component                           |
| Icons          | Lucide React, React Icons                            |
| State          | React Context API + TanStack React Query             |
| Excel Handling | SheetJS (xlsx)                                       |

---

## 📁 Folder Structure

```
aitrfrontend/
├── config/
│   └── config.js                  # API endpoints & BASE_URL
├── public/
├── src/
│   ├── AddDataForms/              # Forms for adding new data
│   │   ├── departmentData/
│   │   ├── facultyData/
│   │   ├── intituteData/
│   │   └── studentData/
│   │
│   ├── Forms/                     # All data-entry forms
│   │   ├── Department/            # Consultancy, Events, MoUs, R&D
│   │   ├── FacultyForms/          # Patents, Research, Awards, Conferences...
│   │   ├── InstituteForms/        # Events, Grants, MoUs, Consultancy...
│   │   └── StudentForms/          # Internships, Placements, Hackathons, Sports...
│   │
│   ├── table/                     # All data tables
│   │   ├── StudentTable.jsx
│   │   ├── FacultyTable.jsx
│   │   ├── PlacementTable.jsx
│   │   ├── InternshipTable.jsx
│   │   ├── HackathonTable.jsx
│   │   ├── ResearchPaperTable.jsx
│   │   ├── PatentsTable.jsx
│   │   ├── CertificateTable.jsx
│   │   ├── ConferenceTable.jsx
│   │   ├── AwardsTable.jsx
│   │   ├── SportsTable.jsx
│   │   ├── HigherStudiesTable.jsx
│   │   ├── DevelopmentProgramTable.jsx
│   │   ├── ProfessionalMembershipTable.jsx
│   │   └── StudentResearchPaper.jsx
│   │
│   ├── components/                # Reusable UI components
│   │   ├── dashboardUI/
│   │   │   └── Dashboard.jsx      # Main dashboard (auth-gated)
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── SuperAdminNavbar.jsx
│   │   ├── StudentProfile.jsx
│   │   ├── FacultyProfile.jsx
│   │   ├── AdminTabs.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── DateRangeFilter.jsx
│   │   ├── UploadForm.jsx
│   │   └── ...                    # Buttons, Cards, InputBoxes, etc.
│   │
│   ├── pages/                     # Route-level page components
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Student.jsx
│   │   ├── Faculty.jsx
│   │   ├── Institute.jsx
│   │   ├── Department.jsx
│   │   ├── Admin.jsx
│   │   ├── SuperAdmin.jsx
│   │   ├── HomePage.jsx
│   │   ├── NotFound404.jsx
│   │   └── ...
│   │
│   ├── context/                   # React Context for global state
│   │   ├── AuthContext.jsx
│   │   └── AuthProvider.jsx
│   │
│   ├── hooks/                     # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useFilter.js
│   │   ├── useStats.js
│   │   ├── useGetFacultyProfile.js
│   │   ├── useGetStudentProfile.js
│   │   └── useTableExport.js
│   │
│   ├── routes/                    # Route guards
│   │   ├── ProtectedRoutes.jsx    # Requires authentication
│   │   └── PublicRoutes.jsx       # Login/Signup only
│   │
│   ├── utils/                     # Utility functions
│   │   ├── axiosInstance.js
│   │   ├── token.js
│   │   ├── auth.js
│   │   ├── universalSearch.js
│   │   ├── capitalizeFirstLetter.js
│   │   └── convertArrayOfObjectsToCSV.js
│   │
│   ├── assets/                    # Static assets & images
│   ├── App.jsx                    # Root component with all routes
│   ├── App.css
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Global styles
│
├── .env.example
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- Backend server running (see [backend README](../aitr-cms-be/README.md))

### 1. Clone the repository

```bash
git clone <repo-url>
cd aitr-fullstack-program/aitrfrontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

<!-- TODO: Add the required env variables here -->

Create a `.env` file in the `src/` directory. Refer to `.env.example` for the required variables.

The API base URL is configured in `config/config.js`:

```js
export const BASE_URL = 'http://localhost:3000'
```

> ⚠️ Update `BASE_URL` if your backend runs on a different port or host.

### 4. Start the dev server

```bash
npm run dev
```

The app will be available at **http://localhost:5173** (default Vite port).

---

## 🔐 Authentication Flow

```
┌─────────────┐       ┌──────────────────┐       ┌───────────────┐
│  User opens  │──────▶│  ProtectedRoute  │──────▶│   Dashboard   │
│   the app    │       │  checks JWT token│       │   (authorized)│
└─────────────┘       └──────────────────┘       └───────────────┘
                              │ No token / invalid
                              ▼
                      ┌──────────────────┐
                      │   /login page    │
                      │  (Login.jsx)     │
                      └──────────────────┘
```

- On load, the **Dashboard** verifies the JWT token stored in `localStorage`.
- If the token is **valid** → user stays on the dashboard.
- If the token is **invalid or missing** → token is removed and user is redirected to `/login`.

---

## 📜 Available Scripts

| Command           | Description                     |
| ----------------- | ------------------------------- |
| `npm run dev`     | Start Vite dev server           |
| `npm run build`   | Build for production            |
| `npm run preview` | Preview the production build    |
| `npm run lint`    | Run ESLint                      |

---

## 🤝 Contributing

1. Create a new branch from `main`
2. Make your changes
3. Test locally with `npm run dev`
4. Submit a pull request

---

> Built with ❤️ for **AITR**
