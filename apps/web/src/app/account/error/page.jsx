export default function AuthErrorPage() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>Oops! Terjadi Kesalahan</h1>
      <p style={{ color: 'red' }}>Terjadi kesalahan saat masuk. Silakan coba lagi.</p>
      <a href="/account/signin">Kembali ke Login</a>
    </div>
  );
}
