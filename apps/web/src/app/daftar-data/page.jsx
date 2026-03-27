import { useState, useEffect } from "react";
import useUser from "@/utils/useUser";
import { Search, MapPin, User, RefreshCw } from "lucide-react";

const STATUS_COLORS = {
  "Belum Terjangkau": "bg-red-100 text-red-700 border-red-200",
  "Proses Pendataan": "bg-amber-100 text-amber-700 border-amber-200",
  "Sudah Terlayani": "bg-green-100 text-green-700 border-green-200",
};

const SEVERITY_COLORS = {
  "Ringan (Dapat Mandiri)": "text-green-600",
  "Sedang (Perlu Bantuan)": "text-amber-600",
  "Berat (Bergantung Penuh)": "text-red-600",
};

const DISABILITY_ICONS = {
  "Fisik (Daksa)": "🦽",
  "Sensorik Netra": "👁️",
  "Sensorik Rungu": "👂",
  "Sensorik Wicara": "🗣️",
  "Intelektual": "🧠",
  "Mental": "💙",
  "Fisik & Sensorik": "♿",
  "default": "♿",
};

export default function DisabilityListPage() {
  const { data: user, loading: userLoading } = useUser();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("semua");
  const [filterRegency, setFilterRegency] = useState("semua");
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/disability");
      if (res.ok) {
        const json = await res.json();
        setData(json.data || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userLoading && !user) {
      window.location.href = "/account/signin";
    }
    if (user) fetchData();
  }, [user, userLoading]);

  const regencies = [...new Set(data.map(d => d.regency).filter(Boolean))];

  const filteredData = data.filter(item => {
    const matchSearch = item.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      item.nik?.includes(search) || item.regency?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "semua" || item.status_layanan === filterStatus;
    const matchRegency = filterRegency === "semua" || item.regency === filterRegency;
    return matchSearch && matchStatus && matchRegency;
  });

  const stats = {
    total: data.length,
    belumTerjangkau: data.filter(d => d.status_layanan === "Belum Terjangkau").length,
    prosesPendataan: data.filter(d => d.status_layanan === "Proses Pendataan").length,
    sudahTerlayani: data.filter(d => d.status_layanan === "Sudah Terlayani").length,
  };

  if (userLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-gray-500 text-sm">Memuat data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Terdata", value: stats.total, color: "blue", icon: "👥" },
          { label: "Belum Terjangkau", value: stats.belumTerjangkau, color: "red", icon: "🔴" },
          { label: "Proses Pendataan", value: stats.prosesPendataan, color: "amber", icon: "🟡" },
          { label: "Sudah Terlayani", value: stats.sudahTerlayani, color: "green", icon: "🟢" },
        ].map((s) => (
          <div key={s.label} className={`bg-white rounded-2xl p-4 border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-all`}
            onClick={() => setFilterStatus(s.label === "Total Terdata" ? "semua" : s.label)}>
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className={`text-2xl font-bold ${s.color === "blue" ? "text-blue-600" : s.color === "red" ? "text-red-600" : s.color === "amber" ? "text-amber-600" : "text-green-600"}`}>
              {s.value}
            </div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama, NIK, atau wilayah..." 
              className="w-full h-11 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
            className="h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
            <option value="semua">Semua Status</option>
            <option value="Belum Terjangkau">Belum Terjangkau</option>
            <option value="Proses Pendataan">Proses Pendataan</option>
            <option value="Sudah Terlayani">Sudah Terlayani</option>
          </select>
          <select value={filterRegency} onChange={(e) => setFilterRegency(e.target.value)}
            className="h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
            <option value="semua">Semua Wilayah</option>
            {regencies.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <button onClick={fetchData}
            className="h-11 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2 text-sm font-semibold">
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
          <h3 className="font-bold text-gray-800">Daftar Responden Lapangan</h3>
          <span className="text-sm text-gray-500">{filteredData.length} dari {data.length} data</span>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">🗒️</div>
            <p className="text-gray-400 text-sm">Data tidak ditemukan</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {filteredData.map((item, i) => (
              <div key={item.id || i} 
                className="px-6 py-4 hover:bg-gray-50 transition-all cursor-pointer"
                onClick={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 text-lg">
                      {DISABILITY_ICONS[item.disability_type] || DISABILITY_ICONS.default}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-gray-800 text-sm">{item.full_name}</span>
                        {item.gender && (
                          <span className="text-xs text-gray-400">{item.gender === "Laki-laki" ? "♂" : "♀"}</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5 font-mono">{item.nik}</div>
                      <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-semibold">
                          {item.disability_type || "—"}
                        </span>
                        {item.severity && (
                          <span className={`text-xs font-semibold ${SEVERITY_COLORS[item.severity] || "text-gray-500"}`}>
                            • {item.severity.split(" ")[0]}
                          </span>
                        )}
                        {item.regency && (
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />{item.regency}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border whitespace-nowrap ${STATUS_COLORS[item.status_layanan] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
                      {item.status_layanan || "Belum Terjangkau"}
                    </span>
                    {item.alat_bantu && (
                      <span className="text-xs text-gray-400">🦯 {item.alat_bantu}</span>
                    )}
                  </div>
                </div>

                {/* Expanded Detail */}
                {selectedItem?.id === item.id && (
                  <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-3 text-sm">
                    {[
                      { label: "Tempat/Tgl Lahir", value: item.birth_place && item.birth_date ? `${item.birth_place}, ${new Date(item.birth_date).toLocaleDateString("id-ID")}` : item.birth_place || item.birth_date },
                      { label: "No. Telepon", value: item.phone },
                      { label: "No. KK", value: item.kk_number },
                      { label: "Koordinat", value: item.latitude && item.longitude ? `${item.latitude}, ${item.longitude}` : null },
                      { label: "Alamat", value: item.address, fullWidth: true },
                      { label: "Catatan Layanan", value: item.catatan_layanan, fullWidth: true },
                    ].filter(f => f.value).map((field) => (
                      <div key={field.label} className={field.fullWidth ? "col-span-2" : ""}>
                        <div className="text-xs text-gray-400 font-semibold mb-0.5">{field.label}</div>
                        <div className="text-gray-700">{field.value}</div>
                      </div>
                    ))}
                    <div className="col-span-2 text-xs text-gray-400">
                      Diinput: {item.created_at ? new Date(item.created_at).toLocaleString("id-ID") : "—"}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
