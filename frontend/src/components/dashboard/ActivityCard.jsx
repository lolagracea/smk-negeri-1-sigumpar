import Card from "../ui/Card";

export default function ActivityCard() {
  return (
    <Card>
      <h3 className="font-bold text-gray-800 border-b-2 border-blue-600 pb-1 mb-3 inline-block">
        Aktivitas Terbaru
      </h3>
      <p className="text-sm text-gray-400">Belum ada aktivitas terbaru.</p>
    </Card>
  );
}
