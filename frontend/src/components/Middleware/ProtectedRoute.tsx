// src/components/middleware/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { ReactNode } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children?: ReactNode;
  redirectPath?: string;
  requireAuth?: boolean; // true untuk rute yang memerlukan autentikasi, false untuk rute yang hanya bisa diakses jika TIDAK autentikasi
}

// Komponen middleware untuk mengontrol akses ke rute tertentu
const ProtectedRoute = ({
  children,
  redirectPath = "/",
  requireAuth = true,
}: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // Tampilkan loading state jika sedang mengecek autentikasi
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // Jika requireAuth true, tapi tidak terautentikasi, redirect ke redirectPath
  if (requireAuth && !isAuthenticated) {
    toast.error("Anda harus login terlebih dahulu");
    return <Navigate to={redirectPath} replace />;
  }

  // Jika requireAuth false, tapi terautentikasi, redirect ke redirectPath (misal, login page seharusnya tidak bisa diakses jika sudah login)
  if (!requireAuth && isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  // Render children atau Outlet (untuk nested routes)
  return <>{children ? children : <Outlet />}</>;
};

export default ProtectedRoute;