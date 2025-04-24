# TemuDataku Project

TemuDataku adalah platform yang menghubungkan mentor dan mentee untuk sesi mentoring. Platform ini menyediakan sistem lengkap untuk manajemen pengguna, profil mentor, sesi mentoring, pemesanan, pembayaran, dan fitur-fitur lainnya.

## Struktur Proyek

Proyek ini menggunakan arsitektur monorepo dengan struktur berikut:

```
projek_tim_temudataku/
├── backend/               # Backend API (Node.js, Express, TypeScript)
│   ├── prisma/            # Database schema dan migrations
│   ├── src/               # Source code
│   │   ├── config/        # Konfigurasi
│   │   ├── controllers/   # Controller untuk menangani HTTP requests
│   │   ├── middlewares/   # Middleware Express
│   │   ├── routes/        # Definisi route API
│   │   ├── services/      # Business logic
│   │   ├── utils/         # Utilitas
│   │   ├── validations/   # Validasi data
│   │   ├── app.ts         # Aplikasi Express
│   │   └── server.ts      # Entry point
├── frontend/              # Frontend application (React, TypeScript)
```

## Teknologi yang Digunakan

### Backend
- **Node.js** dan **Express** - Framework web
- **TypeScript** - Bahasa pemrograman
- **Prisma** - ORM untuk database PostgreSQL
- **JWT** - Autentikasi
- **Joi** - Validasi data
- **Multer** - Upload file

### Frontend
- **React** - Library UI
- **TypeScript** - Bahasa pemrograman
- **Vite** - Bundler
- **Tailwind CSS** - Utility-first CSS framework

## Database Schema

Database menggunakan PostgreSQL dengan skema berikut:

- `User` - Informasi pengguna
- `Role` - Peran pengguna dalam sistem
- `UserRole` - Relasi antara pengguna dan peran
- `MentorProfile` - Profil mentor
- `MentoringService` - Layanan yang ditawarkan mentor
- `MentoringSession` - Sesi mentoring
- `Booking` - Pemesanan sesi
- `Payment` - Pembayaran untuk pemesanan
- `Feedback` - Umpan balik untuk sesi mentoring
- `Project` - Proyek mentee
- `Notification` - Notifikasi pengguna
- `ReferralCode` - Kode referral
- `UserBehavior` - Pelacakan perilaku pengguna

## API Endpoints

Dokumentasi lengkap API tersedia di Postman: [TemuDataku API Documentation](https://documenter.getpostman.com/view/41309207/2sAYkBu2Ad)

### Auth API
- `POST /api/auth/register` - Pendaftaran pengguna baru
- `POST /api/auth/login` - Login pengguna
- `POST /api/auth/verify-email/:token` - Verifikasi email
- `POST /api/auth/logout` - Logout
- `POST /api/auth/request-reset` - Request reset password
- `POST /api/auth/reset-password` - Reset password

### User Management API
- `GET /api/admin/users` - Mendapatkan semua pengguna (admin)
- `POST /api/admin/users` - Membuat pengguna baru (admin)
- `PATCH /api/admin/users/:id/toggle-status` - Mengubah status pengguna (admin)
- `GET /api/users/profile` - Mendapatkan profil pengguna
- `PUT /api/users/profile` - Memperbarui profil pengguna
- `PATCH /api/users/profile/picture` - Mengunggah foto profil
- `PUT /api/users/change-password` - Mengubah password

### Role Management API
- `GET /api/admin/roles` - Mendapatkan semua role
- `GET /api/admin/roles/:id` - Mendapatkan detail role
- `POST /api/admin/roles` - Membuat role baru
- `PUT /api/admin/roles/:id` - Memperbarui role
- `DELETE /api/admin/roles/:id` - Menghapus role
- `GET /api/admin/users/:id/roles` - Mendapatkan role pengguna
- `POST /api/admin/users/:id/roles` - Menambahkan role ke pengguna
- `DELETE /api/admin/users/:id/roles/:roleId` - Menghapus role dari pengguna

## Cara Menjalankan

### Prerequisites
- Node.js (v14+)
- PostgreSQL
- npm or yarn

### Backend

1. Clone repository
```bash
git clone https://github.com/zycro21/projek_tim_temudataku.git
cd projek_tim_temudataku
```

2. Install dependencies
```bash
cd backend
npm install
```

3. Setup environment variables
```bash
cp .env.example .env
# Edit file .env dengan konfigurasi database dan JWT secret
```

4. Jalankan migrasi database
```bash
npx prisma migrate dev
```

5. Seed database (opsional)
```bash
npx prisma db seed
```

6. Jalankan server
```bash
npm run dev
```

Server akan berjalan di `http://localhost:5000`

### Frontend

1. Install dependencies
```bash
cd frontend
npm install
```

2. Jalankan development server
```bash
npm run dev
```

Frontend akan berjalan di `http://localhost:5173`

## Contoh Penggunaan API

### Register User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Password123!",
    "full_name": "John Doe"
  }'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Password123!"
  }'
```

### Update Profile

```bash
curl -X PUT http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "John Smith",
    "phone_number": "081234567890",
    "city": "Jakarta",
    "province": "DKI Jakarta"
  }'
```

### Create Role (Admin Only)

```bash
curl -X POST http://localhost:5000/api/admin/roles \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "role_name": "MENTOR",
    "description": "User who can provide mentoring services"
  }'
```

## Diagram Alur Aplikasi

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│             │       │             │       │             │
│    User     │──────▶│   Mentor    │──────▶│  Services   │
│  Register   │       │   Profile   │       │  Creation   │
│             │       │             │       │             │
└─────────────┘       └─────────────┘       └─────────────┘
                                                   │
                                                   ▼
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│             │       │             │       │             │
│   Payment   │◀──────│   Booking   │◀──────│   Session   │
│  Processing │       │   System    │       │  Scheduling │
│             │       │             │       │             │
└─────────────┘       └─────────────┘       └─────────────┘
       │                                            ▲
       │                    ┌─────────────┐        │
       │                    │             │        │
       └───────────────────▶│  Feedback   │────────┘
                            │   System    │
                            │             │
                            └─────────────┘
```