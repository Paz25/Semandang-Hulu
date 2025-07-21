import AdminSidebar from "@/components/AdminSidebar/AdminSidebar";

export default async function AdminLayout({ children }) {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 relative">
        {children}
      </main>
    </div>
  );
}
