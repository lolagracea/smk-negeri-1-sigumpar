import { useState } from "react";

const user = {
  name: "Ivana Pasaribu",
  role: "Guru",
  avatar: "/avatar.jpg",
};

const menuItems = [
  { id: "beranda", label: "Beranda" },
  { id: "rekap-kehadiran", label: "Rekap Kehadiran" },
  { id: "rekap-nilai", label: "Rekap Nilai" },
  { id: "parenting", label: "Parenting" },
  { id: "kebersihan-kelas", label: "Kebersihan Kelas" },
  { id: "refleksi", label: "Refleksi" },
];

const announcements = [
  {
    id: 1,
    title: "Pengumuman Kenaikan Pangkat Guru Maret 2026",
    date: "18 Mar 2026",
  },
  {
    id: 2,
    title: "Pembaruan Data Kepegawaian Semester Genap",
    date: "15 Mar 2026",
  },
  {
    id: 3,
    title: "Imbauan Ketertiban dan Disiplin Sekolah",
    date: "10 Mar 2026",
  },
];

export default function Dashboard() {
  const [active, setActive] = useState("beranda");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        fontFamily: "'Segoe UI', sans-serif",
        background: "#f5f6fa",
      }}
    >
      {/* TOPBAR */}
      <header
        style={{
          background: "#20639B",
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          height: 56,
          gap: 16,
          flexShrink: 0,
        }}
      >
        <img
          src="/logo-tut-wuri.png"
          alt="Logo"
          width={38}
          height={38}
          style={{
            objectFit: "contain",
            borderRadius: "50%",
            background: "#fff",
            padding: 2,
          }}
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        <span
          style={{
            color: "#fff",
            fontWeight: 700,
            fontSize: 18,
            letterSpacing: 0.5,
          }}
        >
          SMK NEGERI 1 SIGUMPAR
        </span>
      </header>

      {/* BODY */}
      <div style={{ display: "flex", flex: 1 }}>
        {/* SIDEBAR */}
        <aside
          style={{
            width: 200,
            background: "#fff",
            borderRight: "1px solid #e2e8f0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 28,
            flexShrink: 0,
          }}
        >
          {/* School label */}
          <p
            style={{
              fontSize: 12,
              color: "#64748b",
              fontWeight: 600,
              marginBottom: 18,
              letterSpacing: 0.3,
            }}
          >
            SMKN 1 Sigumpar
          </p>

          {/* Avatar */}
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              overflow: "hidden",
              border: "3px solid #20639B",
              marginBottom: 10,
            }}
          >
            <img
              src={user.avatar}
              alt={user.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentNode.style.background = "#20639B";
                e.target.parentNode.style.display = "flex";
                e.target.parentNode.style.alignItems = "center";
                e.target.parentNode.style.justifyContent = "center";
                e.target.parentNode.innerHTML = `<span style="color:#fff;font-size:26px;font-weight:700">${user.name.charAt(0)}</span>`;
              }}
            />
          </div>
          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#1e293b",
              margin: "0 0 20px",
              textAlign: "center",
            }}
          >
            {user.name}
          </p>

          {/* Divider */}
          <div
            style={{
              width: "80%",
              height: 1,
              background: "#e2e8f0",
              marginBottom: 16,
            }}
          />

          {/* Nav */}
          <nav
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              padding: "0 12px",
              boxSizing: "border-box",
            }}
          >
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                style={{
                  background: active === item.id ? "#e8f1f8" : "transparent",
                  color: active === item.id ? "#20639B" : "#475569",
                  fontWeight: active === item.id ? 600 : 400,
                  border: "none",
                  borderRadius: 6,
                  padding: "8px 12px",
                  textAlign: "left",
                  fontSize: 13,
                  cursor: "pointer",
                  width: "100%",
                  borderLeft:
                    active === item.id
                      ? "3px solid #20639B"
                      : "3px solid transparent",
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main
          style={{
            flex: 1,
            padding: 28,
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {/* Welcome card */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: 10,
              padding: "20px 24px",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 20,
                fontWeight: 700,
                color: "#1e293b",
              }}
            >
              Selamat Datang {user.name}!
            </p>
            <p style={{ margin: "6px 0 0", fontSize: 13, color: "#64748b" }}>
              {new Date().toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          {/* Bottom: two columns */}
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}
          >
            {/* Left placeholder (like original blank area) */}
            <div
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 10,
                padding: "20px 24px",
                minHeight: 280,
              }}
            >
              <p
                style={{
                  margin: "0 0 12px",
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#1e293b",
                  borderBottom: "2px solid #20639B",
                  paddingBottom: 8,
                  display: "inline-block",
                }}
              >
                Aktivitas Terbaru
              </p>
              <p style={{ fontSize: 13, color: "#94a3b8", marginTop: 24 }}>
                Belum ada aktivitas terbaru.
              </p>
            </div>

            {/* Right: Announcements */}
            <div
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 10,
                padding: "20px 24px",
              }}
            >
              <p
                style={{
                  margin: "0 0 16px",
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#1e293b",
                  borderBottom: "2px solid #20639B",
                  paddingBottom: 8,
                  display: "inline-block",
                }}
              >
                Pengumuman
              </p>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {announcements.map((a) => (
                  <div
                    key={a.id}
                    style={{
                      borderBottom: "1px solid #f1f5f9",
                      paddingBottom: 12,
                      cursor: "pointer",
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontSize: 13,
                        color: "#1e293b",
                        fontWeight: 500,
                      }}
                    >
                      {a.title}
                    </p>
                    <p
                      style={{
                        margin: "4px 0 0",
                        fontSize: 11,
                        color: "#94a3b8",
                      }}
                    >
                      {a.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
