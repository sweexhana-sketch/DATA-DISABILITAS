import { useState } from "react";
import useAuth from "@/utils/useAuth";

export default function SignUpPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [kkNumber, setKkNumber] = useState("");
  const [ktpPhoto, setKtpPhoto] = useState("");
  const [kkPhoto, setKkPhoto] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { signUpWithCredentials } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!name || !email || !password || !confirmPassword || !kkNumber) {
      setError("Mohon isi semua kolom termasuk Nomor KK");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Password tidak cocok");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      setLoading(false);
      return;
    }

    try {
      const result = await signUpWithCredentials({
        name,
        email,
        password,
        kkNumber,
        ktpUrl: ktpPhoto,
        kkUrl: kkPhoto,
        callbackUrl: "/dashboard",
        redirect: false,
      });

      if (result?.error) {
        setError("Email sudah terdaftar atau terjadi kesalahan. Silakan coba lagi.");
        setLoading(false);
      } else {
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setError("Email sudah terdaftar atau terjadi kesalahan. Silakan coba lagi.");
      setLoading(false);
    }
  };

  const EyeIcon = ({ visible }) => visible ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F7F9FC]">
      <form
        noValidate
        onSubmit={onSubmit}
        className="w-full max-w-md rounded bg-white p-8 border border-[#E4E9F2]"
      >
        <div className="mb-6 text-center">
          <div className="flex justify-center mb-6">
            <img
              src="/logo-pbd.png"
              alt="Logo Papua Barat Daya"
              className="w-24 h-24 object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-[#2A2E45] mb-2">
            Daftar Akun Baru
          </h1>
          <p className="text-sm text-[#8A8FA6]">DINSOS &amp; PPPA Papua Barat Daya</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#2A2E45] mb-2">
              Nama Lengkap
            </label>
            <input
              required
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama lengkap Anda"
              className="w-full h-10 px-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]"
            />
          </div>
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
              Nomor Kartu Keluarga (KK)
            </label>
            <input
              required
              name="kkNumber"
              type="text"
              value={kkNumber}
              onChange={(e) => setKkNumber(e.target.value)}
              placeholder="Masukkan 16 digit nomor KK"
              className="w-full h-10 px-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-bold text-[#2A2E45] mb-2">
                Upload Foto KTP
              </label>
              <div className="relative group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setKtpPhoto(reader.result);
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="hidden"
                  id="ktp-upload"
                />
                <label
                  htmlFor="ktp-upload"
                  className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-[#E4E9F2] rounded-lg cursor-pointer hover:border-[#1570FF] bg-gray-50 transition-colors overflow-hidden"
                >
                  {ktpPhoto ? (
                    <img src={ktpPhoto} alt="KTP Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-2">
                      <i className="fa-solid fa-id-card text-gray-300 text-xl mb-1"></i>
                      <p className="text-[10px] text-gray-400">Pilih Foto KTP</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-[#2A2E45] mb-2">
                Upload Foto KK
              </label>
              <div className="relative group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setKkPhoto(reader.result);
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="hidden"
                  id="kk-upload"
                />
                <label
                  htmlFor="kk-upload"
                  className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-[#E4E9F2] rounded-lg cursor-pointer hover:border-[#1570FF] bg-gray-50 transition-colors overflow-hidden"
                >
                  {kkPhoto ? (
                    <img src={kkPhoto} alt="KK Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-2">
                      <i className="fa-solid fa-users text-gray-300 text-xl mb-1"></i>
                      <p className="text-[10px] text-gray-400">Pilih Foto KK</p>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2A2E45] mb-2">
              Password
            </label>
            <div className="relative">
              <input
                required
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-10 px-3 pr-10 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]"
                placeholder="Minimal 6 karakter"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-[#8A8FA6] hover:text-[#2A2E45]"
                tabIndex={-1}
              >
                <EyeIcon visible={showPassword} />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2A2E45] mb-2">
              Konfirmasi Password
            </label>
            <div className="relative">
              <input
                required
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-10 px-3 pr-10 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]"
                placeholder="Ulangi password Anda"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-[#8A8FA6] hover:text-[#2A2E45]"
                tabIndex={-1}
              >
                <EyeIcon visible={showConfirm} />
              </button>
            </div>
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
            {loading ? "Memuat..." : "Daftar"}
          </button>

          <p className="text-center text-sm text-[#8A8FA6]">
            Sudah punya akun?{" "}
            <a
              href="/account/signin"
              className="text-[#1570FF] hover:text-[#0F5FE6] font-semibold"
            >
              Masuk
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
