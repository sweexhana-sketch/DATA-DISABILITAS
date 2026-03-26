import { useState, useEffect } from "react";
import useUser from "@/utils/useUser";
import { Search, Filter, Download, MoreHorizontal } from "lucide-react";

export default function DisabilityListPage() {
  const { data: user, loading: userLoading } = useUser();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
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
    if (user) {
      fetchData();
    }
  }, [user, userLoading]);

  const filteredData = data.filter(item => 
    item.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    item.nik?.includes(search)
  );

  if (userLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-400">Memuat...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari Nama atau NIK..."
            className="w-full h-12 pl-12 pr-4 bg-white border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
          />
        </div>
        <div className="flex items-center space-x-3">
          <button className="h-12 px-4 bg-white border border-gray-100 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 flex items-center space-x-2 shadow-sm">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="h-12 px-4 bg-white border border-gray-100 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 flex items-center space-x-2 shadow-sm">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Nama Lengkap</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">NIK</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Kabupaten/Kota</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Jenis Disabilitas</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">No. Telepon</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-gray-800">{item.full_name}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{item.nik}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{item.regency}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase rounded-full tracking-wider">
                        {item.disability_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{item.phone}</td>
                    <td className="px-6 py-4">
                      <span className="flex items-center space-x-1.5 container">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        <span className="text-sm text-gray-600 font-medium">Terverifikasi</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-400 text-sm">
                    Tidak ada data ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
