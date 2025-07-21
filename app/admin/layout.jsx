import AdminSidebar from "@/components/AdminSidebar/AdminSidebar";

export default async function AdminLayout({ children }) {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 relative">
        {/* <div className="absolute top-6 right-6 z-10">
          <AdminProfileButton user={user} />
        </div> */}
        {children}
      </main>
    </div>
  );
}
