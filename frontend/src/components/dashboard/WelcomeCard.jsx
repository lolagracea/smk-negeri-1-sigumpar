import { useAuth } from "../../context/AuthContext";
import Card from "../ui/Card";

export default function WelcomeCard() {
  const { user } = useAuth();
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-white">
      <h2 className="text-xl font-bold text-gray-800">
        Selamat Datang, {user?.name || "Pengguna"}!
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        {new Date().toLocaleDateString("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
    </Card>
  );
}
