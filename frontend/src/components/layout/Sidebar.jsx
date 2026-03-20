import { useAuth } from "../../context/AuthContext";

const menuItems = [
  { id: "beranda", label: "Beranda" },
  { id: "rekap-kehadiran", label: "Rekap Kehadiran" },
  { id: "rekap-nilai", label: "Rekap Nilai" },
  { id: "parenting", label: "Parenting" },
  { id: "kebersihan-kelas", label: "Kebersihan Kelas" },
  { id: "refleksi", label: "Refleksi" },
];

export default function Sidebar({ active, setActive, isOpen, onClose }) {
  const { user } = useAuth();

  return (
    <div className="w-64 h-full bg-white border-r border-gray-200 flex flex-col items-center py-5">
      <p className="text-xs text-gray-500 font-semibold mb-4">
        SMKN 1 Sigumpar
      </p>

      <div className="w-16 h-16 rounded-full border-2 border-[#20639B] overflow-hidden mb-2 bg-[#20639B] flex items-center justify-center">
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-white text-2xl font-bold">
            {user?.name?.charAt(0) || "U"}
          </span>
        )}
      </div>

      <p className="text-sm font-semibold text-center px-2">
        {user?.name || "Pengguna"}
      </p>
      <hr className="w-3/4 my-3" />

      <nav className="w-full px-3 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActive(item.id);
              onClose(); // Tutup sidebar setelah memilih menu
            }}
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${
              active === item.id
                ? "bg-blue-50 text-blue-700 font-medium border-l-2 border-blue-600"
                : "hover:bg-gray-100"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
