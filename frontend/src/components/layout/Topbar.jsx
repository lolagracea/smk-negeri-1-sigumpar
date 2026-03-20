export default function Topbar({ toggleSidebar }) {
  return (
    <header className="bg-[#20639B] flex items-center justify-between px-4 h-14 text-white">
      <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
        ☰
      </button>
      <div className="flex items-center gap-2">
        <img
          src="/logo-tut-wuri.png"
          alt="Logo"
          className="w-9 h-9 rounded-full bg-white p-1 object-contain"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        <span className="font-bold text-sm sm:text-base">
          SMK NEGERI 1 SIGUMPAR
        </span>
      </div>
    </header>
  );
}
