import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as apiLogin } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await apiLogin({
        username: form.username,
        password: form.password,
      });
      const { user, token } = res.data.data;
      login(user, token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/*
        ✅ PERUBAHAN 1: Tambah tag <style> untuk CSS responsif.
        Kenapa tidak pakai inline style saja?
        → Inline style di React TIDAK bisa pakai @media query.
        → @media query hanya bisa ditulis di CSS biasa / <style> tag.
        → Jadi kita pisahkan aturan responsif ke sini.
      */}
      <style>{`
        /* Reset dasar agar halaman benar-benar full screen */
        * { box-sizing: border-box; margin: 0; padding: 0; }

        /*
          ✅ PERUBAHAN 2: Class .login-page menggantikan inline style di <div> luar.
          Ditambahkan: min-height: 100dvh
          → "dvh" = dynamic viewport height, lebih akurat di mobile
            karena memperhitungkan address bar browser yang bisa muncul/hilang.
          → "vh" biasa kadang kepotong di HP karena address bar.
        */
        .login-page {
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #ffffff;
          padding: 16px;
        }

        /*
          ✅ PERUBAHAN 3: Class .login-card menggantikan inline style di card biru.
          Ditambahkan: width: 100% dan max-width: 380px
          → Sebelumnya: width: "360px" (fixed, tidak fleksibel)
          → Sekarang: kartu bisa mengecil di layar kecil (width: 100%)
            tapi tidak akan lebih besar dari 380px di layar besar (max-width).
          → Ini pola "fluid" yang standar untuk layout responsif.
        */
        .login-card {
          background-color: #20639B;
          border-radius: 24px;
          padding: 40px 40px 48px;
          width: 100%;
          max-width: 380px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /*
          ✅ PERUBAHAN 4: @media query untuk layar kecil (HP).
          → max-width: 480px artinya: aturan ini aktif HANYA jika
            lebar layar <= 480px (ukuran HP kebanyakan).
          → Di sini kita kecilkan padding & font supaya tidak sempit.
        */
        @media (max-width: 480px) {
          .login-card {
            padding: 32px 24px 40px;
            border-radius: 18px;
          }
        }
      `}</style>

      {/* 
        ✅ PERUBAHAN 5: Ganti inline style → pakai className.
        Sebelumnya: style={{ minHeight: "100vh", display: "flex", ... }}
        Sekarang:   className="login-page"
        → Lebih bersih, dan bisa pakai @media query dari <style> di atas.
      */}
      <div className="login-page">
        <div className="login-card">
          <img
            src="/logo-tut-wuri.png"
            alt="Tut Wuri Handayani"
            /*
              ✅ PERUBAHAN 6: Ukuran logo pakai clamp().
              Sebelumnya: width={72} height={72} (fixed)
              clamp(min, ideal, max) → otomatis menyesuaikan layar:
              → Di HP kecil: 56px
              → Di layar normal: sekitar 10% lebar viewport
              → Maksimal: 72px
            */
            style={{
              width: "clamp(56px, 10vw, 72px)",
              height: "clamp(56px, 10vw, 72px)",
              marginBottom: "12px",
              objectFit: "contain",
            }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />

          <h1
            style={{
              color: "#ffffff",
              /*
                ✅ PERUBAHAN 7: Font size pakai clamp().
                Sebelumnya: fontSize: "30px" (fixed)
                Sekarang: clamp(22px, 6vw, 30px)
                → Di HP kecil: 22px (tidak terlalu besar)
                → Di layar besar: 30px
                → "6vw" = 6% dari lebar viewport, jadi otomatis naik-turun
              */
              fontSize: "clamp(22px, 6vw, 30px)",
              fontWeight: "700",
              margin: "0 0 28px 0",
              fontFamily: "Arial, sans-serif",
            }}
          >
            Login
          </h1>

          {/* Input username — tidak ada perubahan logika, hanya style tetap sama */}
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="username"
            required
            style={{
              width: "100%",
              padding: "13px 16px",
              borderRadius: "8px",
              border: "none",
              fontSize: "15px",
              color: "#555",
              backgroundColor: "#ffffff",
              outline: "none",
              boxSizing: "border-box",
              marginBottom: "14px",
            }}
          />

          {/* Input password — tidak ada perubahan */}
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="password"
            required
            style={{
              width: "100%",
              padding: "13px 16px",
              borderRadius: "8px",
              border: "none",
              fontSize: "15px",
              color: "#555",
              backgroundColor: "#ffffff",
              outline: "none",
              boxSizing: "border-box",
            }}
          />

          {error && (
            <p
              style={{
                color: "#ffd0d0",
                fontSize: "13px",
                margin: "8px 0 0",
                alignSelf: "flex-start",
              }}
            >
              {error}
            </p>
          )}

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "20px",
            }}
          >
            <button
              type="button"
              disabled={loading}
              onClick={handleSubmit}
              style={{
                backgroundColor: "#e8a020",
                color: "#ffffff",
                border: "none",
                borderRadius: "30px",
                /*
                  ✅ PERUBAHAN 8: Padding tombol pakai clamp().
                  Sebelumnya: padding: "11px 44px" (fixed)
                  Sekarang: padding vertikal tetap 11px,
                  padding horizontal menyesuaikan: minimal 28px, ideal 10vw, max 44px.
                  → Di HP sempit tombol tidak kepotong pinggir.
                */
                padding: "11px clamp(28px, 10vw, 44px)",
                fontSize: "16px",
                fontWeight: "700",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.75 : 1,
                fontFamily: "Arial, sans-serif",
              }}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
