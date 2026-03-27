import { useState, useEffect } from "react";
import useUser from "@/utils/useUser";
import { Users, MapPin, PieChart, Activity, TrendingUp, ChevronRight, AlertCircle } from "lucide-react";

const KABUPATEN = [
  "Kota Sorong", "Kab. Sorong", "Kab. Sorong Selatan",
  "Kab. Raja Ampat", "Kab. Tambrauw", "Kab. Maybrat"
];

const DISABILITY_COLORS = {
  "Fisik (Daksa)": { bg: "bg-blue-100", text: "text-blue-700", icon: "🦽" },
  "Sensorik Netra": { bg: "bg-purple-100", text: "text-purple-700", icon: "👁️" },
  "Sensorik Rungu": { bg: "bg-indigo-100", text: "text-indigo-700", icon: "👂" },
  "Sensorik Wicara": { bg: "bg-cyan-100", text: "text-cyan-700", icon: "🗣️" },
  "Intelektual": { bg: "bg-yellow-100", text: "text-yellow-700", icon: "🧠" },
  "Mental": { bg: "bg-red-100", text: "text-red-700", icon: "💙" },
  "Fisik & Sensorik": { bg: "bg-green-100", text: "text-green-700", icon: "♿" },
};

export default function DisabilityDashboard() {
  const { data: user, loading: userLoading } = useUser();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userLoading && !user) {
      window.location.href = "/account/signin";
    }
    if (user) {
      fetch("/api/disability")
        .then(r => r.json())
        .then(j => setData(j.data || []))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [user, userLoading]);

  if (userLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-gray-500 text-sm">Memuat dashboard...</div>
        </div>
      </div>
    );
  }

  // Derived stats
  const total = data.length;
  const belumTerjangkau = data.filter(d => d.status_layanan === "Belum Terjangkau" || !d.status_layanan).length;
  const prosesPendataan = data.filter(d => d.status_layanan === "Proses Pendataan").length;
  const sudahTerlayani = data.filter(d => d.status_layanan === "Sudah Terlayani").length;

  // Count by regency
  const byRegency = KABUPATEN.map(k => ({
    name: k.replace("Kab. ", "").replace("Kota ", "Kota "),
    fullName: k,
    count: data.filter(d => d.regency === k).length,
    pct: total > 0 ? Math.round((data.filter(d => d.regency === k).length / total) * 100) : 0,
  }));

  // Count by disability type
  const byType = Object.entries(
    data.reduce((acc, d) => {
      const t = d.disability_type || "Lainnya";
      acc[t] = (acc[t] || 0) + 1;
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1]);

  // Recent 5
  const recentData = [...data].slice(0, 5);

  return (
    <div className="space-y-6">

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Terdata", value: total, icon: "👥", color: "blue", sub: "Penyandang disabilitas" },
          { label: "Belum Terjangkau", value: belumTerjangkau, icon: "🔴", color: "red", sub: `${total > 0 ? Math.round(belumTerjangkau/total*100) : 0}% dari total` },
          { label: "Proses Pendataan", value: prosesPendataan, icon: "🟡", color: "amber", sub: `${total > 0 ? Math.round(prosesPendataan/total*100) : 0}% dari total` },
          { label: "Sudah Terlayani", value: sudahTerlayani, icon: "🟢", color: "green", sub: `${total > 0 ? Math.round(sudahTerlayani/total*100) : 0}% dari total` },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className={`text-3xl font-black mb-1 ${
              s.color === "blue" ? "text-blue-600" : s.color === "red" ? "text-red-500" :
              s.color === "amber" ? "text-amber-500" : "text-green-600"
            }`}>{loading ? <div className="h-8 w-12 bg-gray-100 rounded animate-pulse" /> : s.value}</div>
            <div className="text-xs font-semibold text-gray-600">{s.label}</div>
            <div className="text-xs text-gray-400 mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sebaran Wilayah */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" /> Sebaran Wilayah
            </h3>
            <span className="text-xs text-gray-400">Papua Barat Daya</span>
          </div>
          <div className="space-y-3">
            {byRegency.map((r) => (
              <div key={r.fullName}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600 font-medium">{r.fullName}</span>
                  <span className="text-sm font-bold text-gray-800">{loading ? "..." : r.count}</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full transition-all duration-700"
                    style={{ width: `${r.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ragam Disabilitas */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-purple-600" /> Ragam Disabilitas
            </h3>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[1,2,3,4].map(i => <div key={i} className="h-8 bg-gray-100 rounded-xl animate-pulse" />)}
            </div>
          ) : byType.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-gray-400">
              <AlertCircle className="w-10 h-10 mb-2 text-gray-200" />
              <p className="text-sm">Belum ada data</p>
              <p className="text-xs mt-1">Mulai input data melalui menu Tambah Data</p>
            </div>
          ) : (
            <div className="space-y-2">
              {byType.map(([type, count]) => {
                const style = DISABILITY_COLORS[type] || { bg: "bg-gray-100", text: "text-gray-600", icon: "♿" };
                return (
                  <div key={type} className={`flex items-center justify-between px-3 py-2.5 rounded-xl ${style.bg}`}>
                    <div className="flex items-center gap-2">
                      <span>{style.icon}</span>
                      <span className={`text-sm font-semibold ${style.text}`}>{type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${style.text}`}>{count}</span>
                      <span className={`text-xs ${style.text} opacity-70`}>
                        ({total > 0 ? Math.round(count/total*100) : 0}%)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Recent Data */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <Activity className="w-4 h-4 text-green-600" /> Data Terbaru
          </h3>
          <a href="/daftar-data" className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1">
            Lihat Semua <ChevronRight className="w-3 h-3" />
          </a>
        </div>
        {loading ? (
          <div className="p-6 space-y-3">
            {[1,2,3].map(i => <div key={i} className="h-12 bg-gray-100 rounded-xl animate-pulse" />)}
          </div>
        ) : recentData.length === 0 ? (
          <div className="text-center py-10">
            <div className="text-4xl mb-2">📋</div>
            <p className="text-gray-400 text-sm font-medium">Belum ada data tersimpan</p>
            <a href="/tambah-data" className="mt-3 inline-flex items-center gap-1 text-xs text-blue-600 font-bold hover:underline">
              + Input Data Sekarang
            </a>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {recentData.map((item, i) => {
              const style = DISABILITY_COLORS[item.disability_type] || { bg: "bg-gray-50", text: "text-gray-600", icon: "♿" };
              const statusStyle = item.status_layanan === "Sudah Terlayani" ? "bg-green-100 text-green-700"
                : item.status_layanan === "Proses Pendataan" ? "bg-amber-100 text-amber-700"
                : "bg-red-100 text-red-700";
              return (
                <div key={i} className="px-6 py-3.5 flex items-center justify-between hover:bg-gray-50 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{style.icon}</span>
                    <div>
                      <div className="text-sm font-semibold text-gray-800">{item.full_name}</div>
                      <div className="text-xs text-gray-400">{item.regency} · {item.disability_type}</div>
                    </div>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${statusStyle}`}>
                    {item.status_layanan || "Belum Terjangkau"}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
