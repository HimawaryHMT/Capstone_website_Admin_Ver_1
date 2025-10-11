import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Users, Bell, DollarSign, TrendingUp } from "lucide-react";

export default function Reports() {
  // === Dữ liệu thống kê giả lập ===
  const userStats = [
    { month: "Jan", total: 1200, paid: 300 },
    { month: "Feb", total: 1500, paid: 420 },
    { month: "Mar", total: 2000, paid: 600 },
    { month: "Apr", total: 2400, paid: 850 },
    { month: "May", total: 2700, paid: 1050 },
    { month: "Jun", total: 3100, paid: 1300 },
  ];

  const alertData = [
    { date: "Mon", count: 8 },
    { date: "Tue", count: 12 },
    { date: "Wed", count: 7 },
    { date: "Thu", count: 9 },
    { date: "Fri", count: 15 },
    { date: "Sat", count: 11 },
    { date: "Sun", count: 6 },
  ];

  const pieData = [
    { name: "Free Users", value: 4800, color: "#93C5FD" },
    { name: "Paid Users", value: 1300, color: "#2563EB" },
  ];

  const topUsers = [
    { name: "Nguyễn Văn A", activity: 98, alerts: 3 },
    { name: "Lê Thị B", activity: 89, alerts: 5 },
    { name: "Workman", activity: 76, alerts: 2 },
    { name: "Randy Press", activity: 65, alerts: 7 },
  ];

  // === Tổng quan nhanh ===
  const summary = [
    {
      title: "Total Users",
      value: "6,100",
      icon: <Users className="text-indigo-500" />,
      color: "from-blue-500 to-indigo-500",
    },
    {
      title: "Paid Users",
      value: "1,300",
      icon: <DollarSign className="text-green-500" />,
      color: "from-green-400 to-emerald-500",
    },
    {
      title: "Total Alerts",
      value: "580",
      icon: <Bell className="text-red-500" />,
      color: "from-red-500 to-rose-500",
    },
    {
      title: "Growth Rate",
      value: "+27%",
      icon: <TrendingUp className="text-yellow-500" />,
      color: "from-yellow-400 to-orange-400",
    },
  ];

  return (
    <div className="flex flex-col p-6 gap-6 bg-gradient-to-br from-gray-50 to-indigo-50 min-h-screen">
      {/* ===== Header ===== */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Reports & Analytics</h1>
        <p className="text-sm text-gray-500">
          Overview of user activities, growth trends, and system alerts.
        </p>
      </div>

      {/* ===== Cards Row ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {summary.map((card, i) => (
          <div
            key={i}
            className={`bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 flex items-center justify-between transition-all`}
          >
            <div>
              <p className="text-gray-500 text-sm">{card.title}</p>
              <h2
                className={`text-3xl font-bold bg-gradient-to-r ${card.color} text-transparent bg-clip-text`}
              >
                {card.value}
              </h2>
            </div>
            <div className="text-3xl opacity-80">{card.icon}</div>
          </div>
        ))}
      </div>

      {/* ===== Charts Section ===== */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Users BarChart */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition">
          <h3 className="text-gray-700 font-semibold mb-3">User Growth (Total vs Paid)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={userStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#93C5FD" radius={[4, 4, 0, 0]} name="Total Users" />
              <Bar dataKey="paid" fill="#2563EB" radius={[4, 4, 0, 0]} name="Paid Users" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Alerts LineChart */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition">
          <h3 className="text-gray-700 font-semibold mb-3">Weekly Alerts Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={alertData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="date" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#EF4444"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Paid vs Free PieChart */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition">
          <h3 className="text-gray-700 font-semibold mb-3">User Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
              >
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ===== Table Section ===== */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition">
        <h3 className="text-gray-700 font-semibold mb-3">Top Active Users</h3>
        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Activity Score</th>
              <th className="p-3 text-left">Alerts Triggered</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {topUsers.map((u, i) => (
              <tr key={i} className="border-t hover:bg-indigo-50/50 transition">
                <td className="p-3 font-medium text-gray-700">{u.name}</td>
                <td className="p-3">{u.activity}%</td>
                <td className="p-3">{u.alerts}</td>
                <td className="p-3">
                  {u.activity > 85 ? (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                      Excellent
                    </span>
                  ) : u.activity > 70 ? (
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
                      Active
                    </span>
                  ) : (
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">
                      Moderate
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== Footer Summary ===== */}
      <div className="bg-white/80 backdrop-blur-md p-4 rounded-xl text-gray-600 text-sm text-center shadow-inner">
        📊 Report generated on <span className="font-semibold">{new Date().toLocaleDateString()}</span> ·
        Data refreshed every 24 hours.
      </div>
    </div>
  );
}
