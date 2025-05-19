// src/components/middleware/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { ReactNode } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children?: ReactNode;
  redirectPath?: string;
  requireAuth?: boolean; // true untuk rute yang memerlukan autentikasi, false untuk rute yang hanya bisa diakses jika TIDAK autentikasi
  requiredRoles?: string[]; // array peran yang diizinkan untuk mengakses rute ini
}

// Komponen middleware untuk mengontrol akses ke rute tertentu
const ProtectedRoute = ({
  children,
  redirectPath = "/",
  requireAuth = true,
  requiredRoles = [],
}: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  
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

  // Memeriksa apakah user memiliki peran yang diperlukan
  if (requireAuth && isAuthenticated && requiredRoles.length > 0) {
    const userRoles = user?.roles || [];
    const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));
    
    if (!hasRequiredRole) {
      toast.error("Anda tidak memiliki izin untuk mengakses halaman ini");
      return <Navigate to="/" replace />;
    }
  }

  // Jika requireAuth false, tapi terautentikasi, redirect ke redirectPath (misal, login page seharusnya tidak bisa diakses jika sudah login)
  if (!requireAuth && isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  // Render children atau Outlet (untuk nested routes)
  return <>{children ? children : <Outlet />}</>;
};

export default ProtectedRoute;