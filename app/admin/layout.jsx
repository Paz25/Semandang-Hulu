import AdminSidebar from "@/components/AdminSidebar/AdminSidebar";

export default async function AdminLayout({ children }) {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 mt-10 md:ml-64 md:mt-0 relative">
        {children}
      </main>
    </div>
  );
}
