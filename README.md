# 📰 Fullstack News Aggregator - Case Study

This is a fullstack news aggregator application built as part of the Fullstack Developer take-home challenge. It provides authenticated users with a personalized news feed fetched from external APIs, filtered and stored locally in a MySQL database.

## 📦 Tech Stack

### 🔧 Backend
- **Framework**: Laravel 10 (PHP 8.2)
- **Database**: MySQL
- **API Consumption**: NewsAPI.org
- **Scheduling**: Laravel Artisan Commands (for scraping)

### 💻 Frontend
- **Library**: React.js (with TypeScript)
- **State Management**: React Hooks
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM

### ⚙️ DevOps
- Dockerized with `docker-compose`  
- `.env` based configuration  
- Volumes used for database persistence

---

## 🔐 Features

- ✅ User Registration & Login with token-based auth
- ✅ Protected routes with localStorage-based session
- ✅ News feed with:
  - Keyword search
  - Filter by **source**, **category**, **date range**
- ✅ Articles fetched from **NewsAPI**, stored in MySQL
- ✅ Responsive design using Tailwind CSS
- ✅ Dockerized backend & frontend with easy startup
- ✅ Scheduled job to fetch and store articles locally

---

## 🐳 How to Run Locally (Dockerized)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/news-aggregator-case-study.git
cd news-aggregator-case-study
