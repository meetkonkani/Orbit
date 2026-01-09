import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/app/components/admin/Sidebar";
import CustomCursor from "@/app/components/CustomCursor";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/auth/login?callbackUrl=/admin");
  }

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      <CustomCursor />
      
      {/* SIDEBAR: Ensure it has a fixed width */}
      <div className="hidden md:block w-72 h-full flex-shrink-0 border-r border-white/10">
        <Sidebar />
      </div>

      {/* MAIN CONTENT: This container handles the scroll */}
      <main className="flex-1 h-full overflow-y-auto overflow-x-hidden scrollbar-hide selection:bg-white selection:text-black">
        <div className="max-w-[1600px] mx-auto min-h-full">
           {children}
        </div>
      </main>
    </div>
  );
}