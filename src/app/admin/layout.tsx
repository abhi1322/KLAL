import { AdminLayout } from "@/components/admin/AdminLayout";

// Auth protection is handled by src/middleware.ts
// This layout just wraps admin pages in the sidebar shell
export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
