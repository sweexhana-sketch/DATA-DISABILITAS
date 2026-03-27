import { useState, useEffect, useRef } from "react";
import useUser from "@/utils/useUser";
import { Save, MapPin, ChevronRight, User, FileText, Heart, Map } from "lucide-react";

const PAPUA_BARAT_DAYA_KABUPATEN = [
  "Kota Sorong",
  "Kab. Sorong",
  "Kab. Sorong Selatan",
  "Kab. Raja Ampat",
  "Kab. Tambrauw",
  "Kab. Maybrat",
];

const RAGAM_DISABILITAS = [
  { value: "Fisik (Daksa)", label: "Fisik (Daksa)", icon: "🦽", color: "blue" },
  { value: "Sensorik Netra", label: "Sensorik Netra", icon: "👁️", color: "purple" },
  { value: "Sensorik Rungu", label: "Sensorik Rungu", icon: "👂", color: "indigo" },
  { value: "Sensorik Wicara", label: "Sensorik Wicara", icon: "🗣️", color: "cyan" },
  { value: "Intelektual", label: "Intelektual", icon: "🧠", color: "yellow" },
  { value: "Mental", label: "Mental", icon: "💙", color: "red" },
  { value: "Fisik & Sensorik", label: "Fisik & Sensorik (Ganda)", icon: "♿", color: "green" },
];

const DERAJAT_HAMBATAN = [
  { value: "Ringan (Dapat Mandiri)", label: "Ringan", sublabel: "Dapat Mandiri", color: "green" },
  { value: "Sedang (Perlu Bantuan)", label: "Sedang", sublabel: "Perlu Bantuan", color: "yellow" },
  { value: "Berat (Bergantung Penuh)", label: "Berat", sublabel: "Bergantung Penuh", color: "red" },
];

const STATUS_LAYANAN = [
  { value: "Belum Terjangkau", label: "Belum Terjangkau", color: "red", bg: "bg-red-100 text-red-700 border-red-200" },
  { value: "Proses Pendataan", label: "Proses Pendataan", color: "yellow", bg: "bg-amber-100 text-amber-700 border-amber-200" },
  { value: "Sudah Terlayani", label: "Sudah Terlayani", color: "green", bg: "bg-green-100 text-green-700 border-green-200" },
];

const ALAT_BANTU_OPTIONS = [
  "Kursi Roda", "Tongkat", "Tongkat Putih", "Walker", "Prostetik", "Alat Bantu Dengar",
  "Kacamata Khusus", "Alat Bantu Komunikasi", "Kruk"
];

const STEPS = ["Data Pribadi", "Disabilitas", "Lokasi & Dokumen"];

export default function TambahDataPage() {
  const { data: user, loading: userLoading } = useUser();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Step 1 - Data Pribadi
  const [fullName, setFullName] = useState("");
  const [nik, setNik] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("Laki-laki");
  const [phone, setPhone] = useState("");
  const [kkNumber, setKkNumber] = useState("");

  // Step 2 - Disabilitas
  const [regency, setRegency] = useState("Kota Sorong");
  const [disabilityType, setDisabilityType] = useState("Fisik (Daksa)");
  const [severity, setSeverity] = useState("Ringan (Dapat Mandiri)");
  const [alatBantu, setAlatBantu] = useState("");
  const [statusLayanan, setStatusLayanan] = useState("Belum Terjangkau");
  const [catatanLayanan, setCatatanLayanan] = useState("");

  // Step 3 - Lokasi & Dokumen
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [gpsLoading, setGpsLoading] = useState(false);
  const [ktpPhoto, setKtpPhoto] = useState("");
  const [kkPhoto, setKkPhoto] = useState("");

  useEffect(() => {
    if (!userLoading && !user) {
      window.location.href = "/account/signin";
    }
  }, [user, userLoading]);

  const getGpsLocation = () => {
    setGpsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLatitude(pos.coords.latitude.toFixed(6));
          setLongitude(pos.coords.longitude.toFixed(6));
          setGpsLoading(false);
        },
        (err) => {
          setGpsLoading(false);
          alert("Tidak dapat mengakses lokasi. Pastikan izin lokasi diaktifkan.");
        }
      );
    } else {
      setGpsLoading(false);
      alert("Browser tidak mendukung GPS.");
    }
  };

  const nextStep = () => {
    if (currentStep === 0 && (!fullName || !nik)) {
      setError("Nama Lengkap dan NIK wajib diisi.");
      return;
    }
    setError(null);
    setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const prevStep = () => {
    setError(null);
    setCurrentStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address) {
      setError("Alamat wajib diisi pada langkah terakhir.");
      return;
    }
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
        severity,
        alat_bantu: alatBantu,
        status_layanan: statusLayanan,
        catatan_layanan: catatanLayanan,
        phone,
        address,
        latitude: latitude || null,
        longitude: longitude || null,
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

      setSuccess("✅ Data berhasil disimpan! Penyandang disabilitas telah terdaftar dalam sistem.");
      // Reset
      setFullName(""); setNik(""); setBirthPlace(""); setBirthDate(""); setPhone(""); setKkNumber("");
      setAlatBantu(""); setCatatanLayanan(""); setAddress(""); setLatitude(""); setLongitude("");
      setKtpPhoto(""); setKkPhoto("");
      setCurrentStep(0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (userLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-gray-500 text-sm">Memuat...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((step, i) => (
            <div key={i} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  i < currentStep ? "bg-green-500 text-white" :
                  i === currentStep ? "bg-blue-600 text-white shadow-lg shadow-blue-200" :
                  "bg-gray-100 text-gray-400"
                }`}>
                  {i < currentStep ? "✓" : i + 1}
                </div>
                <span className={`mt-1 text-xs font-medium ${i === currentStep ? "text-blue-600" : "text-gray-400"}`}>
                  {step}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-1 mx-2 rounded-full transition-all ${i < currentStep ? "bg-green-500" : "bg-gray-100"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl text-green-700 text-sm font-medium flex items-center gap-3">
          <span className="text-2xl">✅</span>
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm">
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Step Headers */}
          <div className={`px-8 py-5 border-b border-gray-50 ${currentStep === 0 ? "bg-gradient-to-r from-blue-50 to-indigo-50" : currentStep === 1 ? "bg-gradient-to-r from-purple-50 to-pink-50" : "bg-gradient-to-r from-green-50 to-teal-50"}`}>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${currentStep === 0 ? "bg-blue-100" : currentStep === 1 ? "bg-purple-100" : "bg-green-100"}`}>
                {currentStep === 0 ? <User className="w-5 h-5 text-blue-600" /> :
                 currentStep === 1 ? <Heart className="w-5 h-5 text-purple-600" /> :
                 <MapPin className="w-5 h-5 text-green-600" />}
              </div>
              <div>
                <h2 className="font-bold text-gray-800">
                  {currentStep === 0 ? "Data Pribadi Responden" : currentStep === 1 ? "Profil Disabilitas" : "Lokasi & Dokumen"}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  {currentStep === 0 ? "Identitas diri penyandang disabilitas" : currentStep === 1 ? "Ragam, derajat hambatan, dan status layanan" : "Koordinat GPS, alamat & dokumen pendukung"}
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">

            {/* ===== STEP 1 ===== */}
            {currentStep === 0 && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Nama Lengkap <span className="text-red-500">*</span></label>
                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}
                      placeholder="Sesuai KTP" required
                      className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">NIK (16 Digit) <span className="text-red-500">*</span></label>
                    <input type="text" value={nik} onChange={(e) => setNik(e.target.value.replace(/\D/g, ""))}
                      placeholder="3300xxxxxxxxxx" required maxLength={16}
                      className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    <p className="text-xs text-gray-400">{nik.length}/16 digit</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">No. KK (16 Digit)</label>
                    <input type="text" value={kkNumber} onChange={(e) => setKkNumber(e.target.value.replace(/\D/g, ""))}
                      placeholder="3300xxxxxxxxxx" maxLength={16}
                      className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Tempat Lahir</label>
                    <input type="text" value={birthPlace} onChange={(e) => setBirthPlace(e.target.value)}
                      placeholder="Contoh: Sorong"
                      className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Tanggal Lahir</label>
                    <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)}
                      className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Jenis Kelamin</label>
                    <div className="flex gap-3">
                      {["Laki-laki", "Perempuan"].map((g) => (
                        <button key={g} type="button" onClick={() => setGender(g)}
                          className={`flex-1 h-12 rounded-xl text-sm font-semibold border-2 transition-all ${gender === g ? "bg-blue-600 text-white border-blue-600" : "bg-gray-50 text-gray-600 border-gray-200 hover:border-blue-300"}`}>
                          {g === "Laki-laki" ? "♂ Laki-laki" : "♀ Perempuan"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">No. Telepon/WA</label>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                      placeholder="08xxxxxxxxxx"
                      className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Kabupaten/Kota</label>
                    <select value={regency} onChange={(e) => setRegency(e.target.value)}
                      className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none">
                      {PAPUA_BARAT_DAYA_KABUPATEN.map((k) => (
                        <option key={k} value={k}>{k}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* ===== STEP 2 ===== */}
            {currentStep === 1 && (
              <div className="space-y-7">
                {/* Ragam Disabilitas */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700">Ragam Disabilitas <span className="text-red-500">*</span></label>
                  <div className="grid grid-cols-2 gap-3">
                    {RAGAM_DISABILITAS.map((d) => (
                      <button key={d.value} type="button" onClick={() => setDisabilityType(d.value)}
                        className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                          disabilityType === d.value
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-300"
                        }`}>
                        <span className="text-xl">{d.icon}</span>
                        <span className="text-sm font-semibold">{d.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Derajat Hambatan */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700">Derajat Hambatan</label>
                  <div className="flex gap-3">
                    {DERAJAT_HAMBATAN.map((d) => (
                      <button key={d.value} type="button" onClick={() => setSeverity(d.value)}
                        className={`flex-1 py-3 px-2 rounded-xl border-2 text-center transition-all ${
                          severity === d.value
                            ? d.color === "green" ? "border-green-500 bg-green-50" : d.color === "yellow" ? "border-amber-400 bg-amber-50" : "border-red-500 bg-red-50"
                            : "border-gray-100 bg-gray-50 hover:border-gray-300"
                        }`}>
                        <div className={`text-xs font-bold ${severity === d.value ? (d.color === "green" ? "text-green-700" : d.color === "yellow" ? "text-amber-700" : "text-red-700") : "text-gray-600"}`}>{d.label}</div>
                        <div className={`text-[10px] mt-0.5 ${severity === d.value ? (d.color === "green" ? "text-green-500" : d.color === "yellow" ? "text-amber-500" : "text-red-400") : "text-gray-400"}`}>{d.sublabel}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Kebutuhan Alat Bantu */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700">Kebutuhan Alat Bantu</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {ALAT_BANTU_OPTIONS.map((alat) => (
                      <button key={alat} type="button" onClick={() => setAlatBantu(alat === alatBantu ? "" : alat)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${alatBantu === alat ? "bg-blue-600 text-white border-blue-600" : "bg-gray-50 text-gray-600 border-gray-200 hover:border-blue-300"}`}>
                        {alat}
                      </button>
                    ))}
                  </div>
                  <input type="text" value={alatBantu} onChange={(e) => setAlatBantu(e.target.value)}
                    placeholder="Atau ketik kebutuhn alat bantu lainnya..."
                    className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>

                {/* Status Layanan */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700">Status Layanan</label>
                  <div className="space-y-2">
                    {STATUS_LAYANAN.map((s) => (
                      <button key={s.value} type="button" onClick={() => setStatusLayanan(s.value)}
                        className={`w-full flex items-center justify-between p-3.5 rounded-xl border-2 transition-all ${statusLayanan === s.value ? "border-blue-500 bg-blue-50" : "border-gray-100 hover:border-gray-300"}`}>
                        <span className="text-sm font-semibold text-gray-700">{s.label}</span>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${s.bg}`}>{s.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Catatan Layanan */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Catatan Layanan</label>
                  <textarea value={catatanLayanan} onChange={(e) => setCatatanLayanan(e.target.value)}
                    placeholder="Informasi tambahan tentang layanan yang dibutuhkan atau sudah diterima..."
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" />
                </div>
              </div>
            )}

            {/* ===== STEP 3 ===== */}
            {currentStep === 2 && (
              <div className="space-y-6">
                {/* Koordinat GPS */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Koordinat Lokasi (GPS)</label>
                  <div className="flex gap-2">
                    <input type="text" value={latitude && longitude ? `${latitude}, ${longitude}` : ""} readOnly
                      placeholder="Klik tombol GPS untuk mengambil koordinat"
                      className="flex-1 h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono text-gray-600 focus:outline-none" />
                    <button type="button" onClick={getGpsLocation} disabled={gpsLoading}
                      className="h-12 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2 disabled:opacity-50">
                      {gpsLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : <MapPin className="w-5 h-5" />}
                    </button>
                  </div>
                  {latitude && longitude && (
                    <p className="text-xs text-green-600">✓ Koordinat berhasil diambil: {latitude}, {longitude}</p>
                  )}
                </div>

                {/* Alamat */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Alamat Lengkap <span className="text-red-500">*</span></label>
                  <textarea value={address} onChange={(e) => setAddress(e.target.value)} required
                    placeholder="Jalan, No Rumah, RT/RW, Desa/Kelurahan, Distrik" rows={3}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" />
                </div>

                {/* Upload KTP & KK */}
                <div className="grid grid-cols-2 gap-4">
                  {[{ id: "ktp", label: "Foto KTP", state: ktpPhoto, setter: setKtpPhoto, icon: "fa-id-card" },
                    { id: "kk", label: "Foto KK", state: kkPhoto, setter: setKkPhoto, icon: "fa-users" }].map((doc) => (
                    <div key={doc.id} className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">{doc.label}</label>
                      <div>
                        <input type="file" accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => doc.setter(reader.result);
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="hidden" id={`${doc.id}-upload`} />
                        <label htmlFor={`${doc.id}-upload`}
                          className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-blue-400 bg-gray-50 transition-all overflow-hidden group">
                          {doc.state ? (
                            <img src={doc.state} alt={doc.label} className="w-full h-full object-cover" />
                          ) : (
                            <div className="text-center group-hover:scale-105 transition-transform p-2">
                              <i className={`fa-solid ${doc.icon} text-gray-300 text-3xl mb-2`}></i>
                              <p className="text-[11px] text-gray-400 font-medium">Klik untuk Upload</p>
                            </div>
                          )}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary Card */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100">
                  <h4 className="text-sm font-bold text-blue-800 mb-3">📋 Ringkasan Data</h4>
                  <div className="space-y-1.5 text-sm text-gray-600">
                    <div className="flex justify-between"><span>Nama:</span><span className="font-semibold text-gray-800">{fullName || "-"}</span></div>
                    <div className="flex justify-between"><span>NIK:</span><span className="font-mono text-gray-800">{nik || "-"}</span></div>
                    <div className="flex justify-between"><span>Wilayah:</span><span className="font-semibold text-gray-800">{regency}</span></div>
                    <div className="flex justify-between"><span>Ragam Disabilitas:</span><span className="font-semibold text-gray-800">{disabilityType}</span></div>
                    <div className="flex justify-between"><span>Derajat:</span><span className="font-semibold text-gray-800">{severity}</span></div>
                    <div className="flex justify-between"><span>Status Layanan:</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${STATUS_LAYANAN.find(s => s.value === statusLayanan)?.bg}`}>{statusLayanan}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer navigation */}
          <div className="px-8 py-5 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
            <button type="button" onClick={prevStep} disabled={currentStep === 0}
              className="px-6 h-12 border-2 border-gray-200 text-gray-600 rounded-xl text-sm font-semibold hover:border-gray-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
              ← Kembali
            </button>

            {currentStep < STEPS.length - 1 ? (
              <button type="button" onClick={nextStep}
                className="px-8 h-12 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 focus:ring-4 focus:ring-blue-100 transition-all flex items-center gap-2">
                Lanjut <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button type="submit" disabled={loading}
                className="px-8 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-bold hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-100 transition-all disabled:opacity-50 shadow-lg shadow-blue-200 flex items-center gap-2">
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    SIMPAN DATA
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
