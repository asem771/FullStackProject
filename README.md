# Full Stack Project — Jamiati

A university student portal built with React and Laravel.

## Technologies

### Frontend

- React 19.3.1
- Vite
- TypeScript
- Tailwind CSS 4
- shadcn/ui
- Lucide React

### Backend

- Laravel 13
- PHP 8.4+
- Laravel Sanctum

### Database

- XAMPP / MariaDB
- MySQL connection through Laravel
- Database name: `fullstack_db`

## Project Structure

```text
FullStackProject/
├── frontend/
└── backend/
```

## Requirements

- Node.js and npm
- PHP 8.3 or newer
- Composer
- Git
- XAMPP with MySQL/MariaDB

## Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

Build the frontend:

```bash
npm run build
```

## Run the Backend

Configure the database in `backend/.env`:

```dotenv
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=fullstack_db
DB_USERNAME=root
DB_PASSWORD=
```

Set `DB_PASSWORD` to match your local MySQL configuration.

Then run:

```bash
cd backend
composer install
php artisan migrate
php artisan serve
```

The backend runs at `http://127.0.0.1:8000`.

Health endpoint:

`http://127.0.0.1:8000/api/health`

## Notes

- Start MySQL in the XAMPP Control Panel before running migrations.
- Do not commit `.env`, passwords, or other secrets to GitHub.
- The assignment data shown in the frontend is currently demo data.
