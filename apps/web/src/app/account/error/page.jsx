import { Suspense } from "react";
import { useSearchParams } from "react-router";

function ErrorContent() {
  const [searchParams] = useSearchParams();
  const error = searchParams.get("error");

  const getErrorMessage = (err) => {
    switch (err) {
      case "Configuration":
        return "Terjadi galat konfigurasi pada server.";
      case "AccessDenied":
        return "Akses ditolak. Anda tidak memiliki izin untuk masuk.";
      case "Verification":
        return "Tautan verifikasi telah kedaluwarsa atau sudah digunakan.";
      case "CredentialsSignin":
        return "Email atau password salah.";
      default:
        return "Terjadi kesalahan saat masuk. Silakan coba lagi.";
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F7F9FC]">
      <div className="w-full max-w-md rounded bg-white p-8 border border-[#E4E9F2] text-center">
        <div className="mb-6">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <i className="fa-solid fa-circle-exclamation text-red-500 text-3xl"></i>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-[#2A2E45] mb-2">
            Oops! Terjadi Kesalahan
          </h1>
          <p className="text-sm text-red-500 bg-red-50 p-3 rounded mb-6">
            {getErrorMessage(error)}
          </p>
          <div className="space-y-3">
            <a
              href="/account/signin"
              className="block w-full h-10 leading-10 bg-[#1570FF] text-white rounded text-sm font-semibold hover:bg-[#0F5FE6] transition-colors"
            >
              Kembali ke Login
            </a>
            <p className="text-xs text-[#8A8FA6]">
              Jika masalah terus berlanjut, hubungi administrator sistem.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorContent />
    </Suspense>
  );
}
