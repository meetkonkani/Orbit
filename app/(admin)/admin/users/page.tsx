import { prisma } from "@/app/lib/prisma"; 
import { toggleUserRole } from "@/app/actions/admin";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8 md:p-12 text-white min-h-screen bg-black">
      <div className="mb-20 border-b border-white/10 pb-12">
        <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.5em] mb-4">// NODE_ACCESS_CONTROL</p>
        <h1 className="text-7xl font-black uppercase tracking-tighter italic leading-none">Users.</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
        {users.map((user) => (
          <div key={user.id} className="p-10 bg-black flex flex-col justify-between group">
            <div className="mb-12">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 bg-neutral-900 border border-white/10 flex items-center justify-center text-xl font-black italic">
                  {user.name?.charAt(0) || "U"}
                </div>
                <div>
                  <p className="text-xl font-bold uppercase italic tracking-tighter">{user.name || "GUEST_USER"}</p>
                  <p className="text-[10px] text-neutral-600 font-mono">{user.email}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between border-y border-white/5 py-4">
                <span className="text-[9px] font-black text-neutral-500 uppercase tracking-widest italic">Clearance_Level</span>
                <span className={`text-[10px] font-black px-3 py-1 border uppercase tracking-widest ${
                  user.role === 'ADMIN' ? 'border-white text-white italic' : 'border-zinc-800 text-zinc-600'
                }`}>
                  {user.role}
                </span>
              </div>
            </div>

            <form action={async () => { "use server"; await toggleUserRole(user.id, user.role); }}>
              <button className="w-full text-[10px] font-black py-4 uppercase tracking-[0.3em] border border-white/10 hover:bg-white hover:text-black transition-all duration-500">
                {user.role === 'ADMIN' ? "Revoke_Admin" : "Grant_Admin"}
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}