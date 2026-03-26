import { useState, useEffect } from "react";
import useUser from "@/utils/useUser";
import { Users, MapPin, LayoutDashboard, PieChart } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';

export default function DisabilityDashboard() {
  const { data: user, loading: userLoading } = useUser();
  const [stats, setStats] = useState({
    total: 0,
    regencies: 6,
    categories: 4
  });

  const [chartData] = useState([
    { name: 'Kota Sorong', value: 0 },
    { name: 'Kab. Sorong', value: 0 },
    { name: 'Sorong Selatan', value: 0 },
    { name: 'Raja Ampat', value: 0 },
    { name: 'Tambrauw', value: 0 },
    { name: 'Maybrat', value: 0 },
  ]);

  useEffect(() => {
    if (!userLoading && !user) {
      window.location.href = "/account/signin";
    }
  }, [user, userLoading]);

  if (userLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-400">Memuat...</div>
      </div>
    );
  }

  const COLORS = ['#1570FF', '#0F5FE6', '#0A4ED2', '#063CBF', '#042BAB', '#021A97'];

  return (
    <div className="space-y-8">
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-6">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
            <Users className="w-7 h-7 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Total Terdata</p>
            <h3 className="text-3xl font-black text-gray-800">{stats.total}</h3>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-6">
          <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center">
            <MapPin className="w-7 h-7 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Kabupaten/Kota</p>
            <h3 className="text-3xl font-black text-gray-800">{stats.regencies}</h3>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-6">
          <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center">
            <PieChart className="w-7 h-7 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Kategori Disabilitas</p>
            <h3 className="text-3xl font-black text-gray-800">{stats.categories}</h3>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-8">Sebaran Wilayah</h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                interval={0}
                angle={-15}
                textAnchor="end"
              />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
              <Tooltip 
                cursor={{ fill: '#F9FAFB' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
