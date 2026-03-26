import { useState } from "react";
import useAuth from "@/utils/useAuth";

export default function SignInPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signInWithCredentials } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Mohon isi semua kolom");
      setLoading(false);
      return;
    }

    try {
      await signInWithCredentials({
        email,
        password,
        callbackUrl: "/",
        redirect: true,
      });
    } catch (err) {
      setError("Email atau password salah. Silakan coba lagi.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F7F9FC]">
      <form
        noValidate
        onSubmit={onSubmit}
        className="w-full max-w-md rounded bg-white p-8 border border-[#E4E9F2]"
      >
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-[#2A2E45] mb-2">
            Masuk ke Sistem
          </h1>
          <p className="text-sm text-[#8A8FA6]">Dinas PUPR Papua Barat Daya</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#2A2E45] mb-2">
              Email
            </label>
            <input
              required
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email Anda"
              className="w-full h-10 px-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2A2E45] mb-2">
              Password
            </label>
            <input
              required
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-10 px-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]"
              placeholder="Masukkan password Anda"
            />
          </div>

          {error && (
            <div className="rounded bg-red-50 p-3 text-sm text-red-500">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 bg-[#1570FF] text-white rounded text-sm font-semibold hover:bg-[#0F5FE6] disabled:opacity-50"
          >
            {loading ? "Memuat..." : "Masuk"}
          </button>

          <p className="text-center text-sm text-[#8A8FA6]">
            Belum punya akun?{" "}
            <a
              href="/account/signup"
              className="text-[#1570FF] hover:text-[#0F5FE6] font-semibold"
            >
              Daftar
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
