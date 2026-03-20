import { useState, useEffect } from "react";
import Card from "../ui/Card";
import { fetchAnnouncements } from "../../api/announcements";

export default function AnnouncementsList() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements()
      .then((res) => setAnnouncements(res.data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Card>Memuat pengumuman...</Card>;
  if (announcements.length === 0) return <Card>Belum ada pengumuman.</Card>;

  return (
    <Card>
      <h3 className="font-bold text-gray-800 border-b-2 border-blue-600 pb-1 mb-3 inline-block">
        Pengumuman
      </h3>
      <div className="space-y-3">
        {announcements.map((a) => (
          <div
            key={a.id}
            className="border-b border-gray-100 last:border-0 pb-2 last:pb-0"
          >
            <p className="text-sm font-medium text-gray-800">{a.title}</p>
            <p className="text-xs text-gray-400 mt-1">
              {new Date(a.date).toLocaleDateString("id-ID")}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
