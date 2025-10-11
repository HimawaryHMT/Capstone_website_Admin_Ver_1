import React from "react";
import { ArrowRight, Calendar, Send } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const MainPages = () => {
  const pieData = [
    { name: "New", value: 62, color: "#6366F1" },
    { name: "Active", value: 13, color: "#818CF8" },
    { name: "Inactive", value: 23, color: "#CBD5E1" },
  ];

  const barData = [
    { name: "Sat", alert: 480, normal: 320 },
    { name: "Sun", alert: 300, normal: 180 },
    { name: "Mon", alert: 320, normal: 250 },
    { name: "Tue", alert: 470, normal: 300 },
    { name: "Wed", alert: 200, normal: 150 },
    { name: "Thu", alert: 400, normal: 270 },
    { name: "Fri", alert: 390, normal: 290 },
  ];

  const revenue = [
    { name: "Aug", value: 8500 },
    { name: "Sep", value: 9500 },
    { name: "Oct", value: 7000 },
    { name: "Nov", value: 9000 },
    { name: "Dec", value: 12500 },
    { name: "Jan", value: 8700 },
  ];

  const newCustomers = [
    {
      name: "Livia Bator",
      role: "CEO",
      img: "https://i.pravatar.cc/100?img=1",
    },
    {
      name: "Randy Press",
      role: "Director",
      img: "https://i.pravatar.cc/100?img=2",
    },
    {
      name: "Workman",
      role: "Designer",
      img: "https://i.pravatar.cc/100?img=3",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-6 p-6 bg-gradient-to-br from-gray-50 to-indigo-50  min-h-screen">
      {/* LEFT SIDE */}
      <div className="col-span-2 flex flex-col gap-6">
        {/* Banner */}
        <div className="flex justify-between bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div>
            <h2 className="text-xl font-semibold">
              Hello <span className="font-bold">Tassy Omah</span>,
            </h2>
            <p className="text-sm opacity-90 mt-1">
              Have a nice day and don’t forget to take care of your health!
            </p>
            <button className="mt-5 flex items-center gap-2 text-sm bg-white/90 text-indigo-700 px-4 py-2 rounded-full shadow hover:bg-white transition">
              Learn More <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/4163/4163765.png"
            alt="Yoga"
            className="w-40 h-40 object-contain drop-shadow-lg"
          />
        </div>

        {/* Customers + Revenue */}
        <div className="grid grid-cols-2 gap-6">
          {/* Customers */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-md hover:shadow-lg p-5 transition">
            <h3 className="text-gray-700 font-semibold mb-3">Customers</h3>
            <p className="text-4xl font-bold text-indigo-600 mb-4">4,209</p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={4}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <ul className="flex justify-around text-sm text-gray-600 mt-2">
              {pieData.map((item) => (
                <li key={item.name}>
                  <span
                    className="inline-block w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  {item.name} {item.value}%
                </li>
              ))}
            </ul>
          </div>

          {/* Revenue */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-md hover:shadow-lg p-5 transition">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-gray-700 font-semibold">Revenue Growth</h3>
              <span className="text-sm text-indigo-600 cursor-pointer hover:underline">
                See All
              </span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={revenue}>
                <XAxis dataKey="name" stroke="#A1A1AA" />
                <YAxis stroke="#A1A1AA" />
                <Tooltip />
                <Bar dataKey="value" fill="#10B981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-right text-gray-700 mt-2 text-sm">
              Highest: <span className="text-green-600 font-semibold">$12,500</span> (Dec)
            </p>
          </div>
        </div>

        {/* Alert Chart */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-md hover:shadow-lg p-5 transition">
          <h3 className="text-gray-700 font-semibold mb-3">Alert Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" stroke="#A1A1AA" />
              <YAxis stroke="#A1A1AA" />
              <Tooltip />
              <Bar dataKey="alert" fill="#6366F1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="normal" fill="#22D3EE" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-2 text-sm text-gray-600">
            <span>
              <span className="inline-block w-3 h-3 bg-indigo-500 rounded-full mr-2"></span>
              Alert
            </span>
            <span>
              <span className="inline-block w-3 h-3 bg-cyan-400 rounded-full mr-2"></span>
              Normal
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-col gap-6">
        {/* New Customers */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-md hover:shadow-lg p-5 transition">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-base font-semibold text-gray-800">New Customers</h3>
            <span className="text-xs text-indigo-500 font-medium cursor-pointer hover:underline">
              View all
            </span>
          </div>

          <div className="flex justify-evenly mb-4">
            {newCustomers.map((user) => (
              <div key={user.name} className="flex flex-col items-center group w-[90px]">
                <div className="relative">
                  <img
                    src={user.img}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm group-hover:ring-4 ring-indigo-300 transition"
                  />
                  <div className="absolute -bottom-0.5 right-0.5 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full"></div>
                </div>
                <p className="font-medium text-gray-800 mt-1 text-[13px] truncate max-w-[80px] text-center group-hover:text-indigo-600">
                  {user.name}
                </p>
                <p className="text-[11px] text-gray-400">{user.role}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center bg-gray-50 rounded-full border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-indigo-400 transition">
            <input
              type="number"
              placeholder="Enter amount..."
              className="flex-1 px-4 py-2 bg-transparent outline-none text-sm text-gray-700"
            />
            <button className="flex items-center justify-center gap-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-sm font-medium px-4 py-2 rounded-full transition-all">
              <Send className="w-4 h-4" />
              Send
            </button>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-md hover:shadow-lg p-6 transition">
          <div className="flex justify-between items-center mb-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
              <Calendar className="w-5 h-5 text-indigo-500" />
              March 2025
            </h3>
            <button className="bg-indigo-100 text-indigo-600 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-indigo-200 transition">
              + Add Reminder
            </button>
          </div>

          <div className="grid grid-cols-7 text-center text-gray-500 text-sm gap-2 mb-4">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div key={day} className="font-medium text-gray-600">
                {day}
              </div>
            ))}
            {Array.from({ length: 31 }).map((_, i) => {
              const day = i + 1;
              const isToday = day === 11;
              return (
                <div
                  key={day}
                  className={`py-2 rounded-full cursor-pointer transition-all ${
                    isToday
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-md"
                      : "hover:bg-indigo-50 text-gray-700"
                  }`}
                >
                  {day}
                </div>
              );
            })}
          </div>

          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl p-4 flex flex-col items-start shadow-md">
            <h4 className="font-semibold text-sm mb-1">Upcoming Reminder</h4>
            <p className="text-xs opacity-90">Team meeting at 10:00 AM</p>
            <button className="mt-3 bg-white text-indigo-600 px-3 py-1 rounded-full text-xs font-semibold hover:bg-gray-100 transition">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPages;
