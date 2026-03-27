import { useState, useEffect } from "react";
import useUser from "@/utils/useUser";
import { ArrowLeft, Save } from "lucide-react";

export default function DisabilityRegisterPage() {
  const { data: user, loading: userLoading } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [nik, setNik] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("Laki-laki");
  const [regency, setRegency] = useState("Kota Sorong");
  const [disabilityType, setDisabilityType] = useState("Disabilitas Fisik");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [kkNumber, setKkNumber] = useState("");
  const [ktpPhoto, setKtpPhoto] = useState("");
  const [kkPhoto, setKkPhoto] = useState("");

  useEffect(() => {
    if (!userLoading && !user) {
      window.location.href = "/account/signin";
    }
  }, [user, userLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const disabilityData = {
        full_name: fullName,
        nik,
        birth_place: birthPlace,
        birth_date: birthDate,
        gender,
        regency,
        disability_type: disabilityType,
        phone,
        address,
        kk_number: kkNumber,
        ktp_url: ktpPhoto,
        kk_url: kkPhoto,
      };

      const res = await fetch("/api/disability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(disabilityData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Terjadi kesalahan saat menyimpan data");
      }

      setSuccess("Pendaftaran berhasil! Data telah tersimpan.");
      
      // Reset form
      setFullName("");
      setNik("");
      setBirthPlace("");
      setBirthDate("");
      setPhone("");
      setAddress("");
      setKkNumber("");
      setKtpPhoto("");
      setKkPhoto("");
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (userLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-400">Memuat...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nama Lengkap */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Nama Lengkap</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Masukkan nama sesuai KTP"
                required
                className="w-full h-12 px-4 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all shadow-inner"
              />
            </div>

            {/* NIK */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">NIK (16 Digit)</label>
              <input
                type="text"
                value={nik}
                onChange={(e) => setNik(e.target.value)}
                placeholder="33xxxxxxxxxxxxxx"
                required
                maxLength={16}
                className="w-full h-12 px-4 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all shadow-inner"
              />
            </div>

            {/* Nomor KK */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Nomor Kartu Keluarga (KK)</label>
              <input
                type="text"
                value={kkNumber}
                onChange={(e) => setKkNumber(e.target.value)}
                placeholder="Masukkan 16 digit nomor KK"
                required
                maxLength={16}
                className="w-full h-12 px-4 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all shadow-inner"
              />
            </div>

            {/* Tempat Lahir */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Tempat Lahir</label>
              <input
                type="text"
                value={birthPlace}
                onChange={(e) => setBirthPlace(e.target.value)}
                placeholder="Contoh: Sorong"
                className="w-full h-12 px-4 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all shadow-inner"
              />
            </div>

            {/* Tanggal Lahir */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Tanggal Lahir</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full h-12 px-4 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all shadow-inner"
              />
            </div>

            {/* Jenis Kelamin */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Jenis Kelamin</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full h-12 px-4 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all shadow-inner appearance-none"
              >
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            {/* Kabupaten/Kota */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Kabupaten/Kota</label>
              <select
                value={regency}
                onChange={(e) => setRegency(e.target.value)}
                className="w-full h-12 px-4 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all shadow-inner appearance-none"
              >
                <option value="Kota Sorong">Kota Sorong</option>
                <option value="Kab. Sorong">Kab. Sorong</option>
                <option value="Kab. Sorong Selatan">Kab. Sorong Selatan</option>
                <option value="Kab. Raja Ampat">Kab. Raja Ampat</option>
                <option value="Kab. Tambrauw">Kab. Tambrauw</option>
                <option value="Kab. Maybrat">Kab. Maybrat</option>
              </select>
            </div>

            {/* Jenis Disabilitas */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Jenis Disabilitas</label>
              <select
                value={disabilityType}
                onChange={(e) => setDisabilityType(e.target.value)}
                className="w-full h-12 px-4 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all shadow-inner appearance-none"
              >
                <option value="Disabilitas Fisik">Disabilitas Fisik</option>
                <option value="Disabilitas Intelektual">Disabilitas Intelektual</option>
                <option value="Disabilitas Mental">Disabilitas Mental</option>
                <option value="Disabilitas Sensorik">Disabilitas Sensorik</option>
              </select>
            </div>

            {/* No Telepon */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">No. Telepon/WA</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="08xxxxxxxxxx"
                className="w-full h-12 px-4 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all shadow-inner"
              />
            </div>

            {/* Alamat Lengkap */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-gray-700">Alamat Lengkap</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Alamat detail (Jalan, No Rumah, RT/RW, Desa/Kelurahan)"
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all shadow-inner"
              />
            </div>

            {/* Upload KTP */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 font-bold">Upload Foto KTP</label>
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
                  id="ktp-upload-dash"
                />
                <label
                  htmlFor="ktp-upload-dash"
                  className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-blue-500 bg-gray-50 transition-all overflow-hidden"
                >
                  {ktpPhoto ? (
                    <img src={ktpPhoto} alt="KTP Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center group-hover:scale-110 transition-transform">
                      <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-2">
                        <i className="fa-solid fa-id-card text-blue-500 text-xl"></i>
                      </div>
                      <p className="text-[12px] text-gray-500 font-medium">Klik untuk Pilih Foto KTP</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Upload KK */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 font-bold">Upload Foto KK</label>
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
                  id="kk-upload-dash"
                />
                <label
                  htmlFor="kk-upload-dash"
                  className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-blue-500 bg-gray-50 transition-all overflow-hidden"
                >
                  {kkPhoto ? (
                    <img src={kkPhoto} alt="KK Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center group-hover:scale-110 transition-transform">
                      <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-2">
                        <i className="fa-solid fa-users text-blue-500 text-xl"></i>
                      </div>
                      <p className="text-[12px] text-gray-500 font-medium">Klik untuk Pilih Foto KK</p>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>

          {/* Alert messages */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="p-4 bg-green-50 border border-green-100 rounded-xl text-green-600 text-sm">
              {success}
            </div>
          )}

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-10 h-14 bg-blue-600 text-white rounded-2xl text-sm font-bold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all disabled:opacity-50 shadow-lg shadow-blue-200 flex items-center space-x-2"
            >
              {loading ? (
                "Menyimpan..."
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Simpan Data</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
