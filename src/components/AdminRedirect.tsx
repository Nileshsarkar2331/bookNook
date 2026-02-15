import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { isAdminEmail } from "@/lib/admin";

const AdminRedirect = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoaded } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress ?? null;

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground">
        Loading...
      </div>
    );
  }

  if (isAdminEmail(email)) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};

export default AdminRedirect;
