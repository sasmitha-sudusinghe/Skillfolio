# Skillfolio
A full-stack student portfolio platform for tracking projects, skills, learning progress, and showcasing technical achievements.

# 🚀 Skillfolio

> A collaborative project and skill tracker for students.

Skillfolio is a web application that helps students showcase the projects they build, organize the technical skills they use, track their learning progress, and create a shareable public portfolio.

Think of it as a **"GitHub contribution graph, but for your skills."**

---

## 🌟 Why Skillfolio?

Students often build projects using different technologies but don't have an easy way to visualize and showcase the skills they've developed.

Skillfolio solves this by connecting:

**Projects → Technologies → Skills → Portfolio**

Instead of simply listing skills on a CV, Skillfolio allows students to demonstrate those skills through the projects they've actually built.

---

## ✨ Features

### 🔐 Authentication
- User registration and login
- Secure authentication
- GitHub OAuth support *(planned)*

### 📁 Project Management
- Add projects
- Edit projects
- Delete projects
- Track project status
- Add GitHub repository links
- Add live demo links
- Add project descriptions

### 🛠️ Skill Tracking
- Add technical skills to projects
- Connect multiple skills to each project
- Automatically calculate skill usage
- View most-used technologies

### 📊 Dashboard
- Total projects
- Total skills
- Completed projects
- Skill distribution
- Project statistics

### 🌐 Public Profile
Create a shareable portfolio page:

`/u/username`

Your public profile can display:

- Profile information
- Technical skills
- Projects
- GitHub links
- Live demos
- Skill statistics

---

## 🖥️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React | Frontend |
| Tailwind CSS | UI & Styling |
| Node.js | Backend |
| Express.js | REST API |
| PostgreSQL | Database |
| Supabase | Database & Authentication |
| Recharts | Data Visualization |
| Git & GitHub | Version Control |
| Vercel | Deployment |

---

## 🏗️ System Architecture

```text
                    ┌──────────────────┐
                    │     Skillfolio   │
                    │   React Frontend │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   Express API    │
                    │     Backend      │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │    Supabase      │
                    │ PostgreSQL + Auth│
                    └──────────────────┘
