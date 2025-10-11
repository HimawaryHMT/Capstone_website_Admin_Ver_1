import React, { useState } from "react";
import { FiEye, FiCheck, FiX } from "react-icons/fi";

export default function UserRegistration() {
  const [requests] = useState([
    { id: "REQ-20250918-001", name: "Nguyễn Văn A", email: "usera@email.com", phone: "+84 912 345 678", role: "User", date: "2025-09-18", status: "Pending" },
    { id: "REQ-20250918-002", name: "Workman", email: "userb@email.com", phone: "+84 912 345 678", role: "User", date: "2025-09-17", status: "Approved" },
    { id: "REQ-20250918-003", name: "Livia Bator", email: "userc@email.com", phone: "+84 912 345 678", role: "User", date: "2025-09-15", status: "Rejected" },
  ]);

  const [selected, setSelected] = useState(null);

  const devices = [
    { id: "CAM-001", type: "Camera (IP)", model: "Hikvision DS-2CD2T", mac: "A4:5E:60:1B:2C:3D", location: "Phòng 101 – Tòa A", status: "Pending" },
    { id: "ACC-202", type: "Sensor (Accelerometer)", model: "ADXL345", mac: "N/A", location: "Phòng 202 – Tòa A", status: "Pending" },
  ];

  return (
    <div className="flex flex-col p-6 gap-6 bg-gradient-to-br from-gray-50 to-indigo-50 min-h-screen transition-all duration-300">
      {/* === Header Cards === */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: "Total Requests", value: 56, color: "from-blue-500 to-indigo-500" },
          { label: "Pending", value: 18, color: "from-yellow-400 to-orange-400" },
          { label: "Approved Today", value: 4, color: "from-green-400 to-emerald-500" },
        ].map((card, i) => (
          <div
            key={i}
            className={`bg-white/70 backdrop-blur-md p-5 rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-100`}
          >
            <p className="text-gray-500 text-sm">{card.label}</p>
            <h2
              className={`text-3xl font-bold bg-gradient-to-r ${card.color} text-transparent bg-clip-text`}
            >
              {card.value}
            </h2>
          </div>
        ))}
      </div>

      {/* === Requests Table === */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-md hover:shadow-lg overflow-hidden border border-gray-100 transition-all">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-semibold text-gray-700 text-lg">Registration Requests</h3>
          <span className="text-sm text-gray-500">
            Showing {requests.length} requests
          </span>
        </div>

        <table className="w-full text-left text-sm border-collapse">
          <thead className="bg-gray-50 text-gray-600 font-medium">
            <tr>
              <th className="p-3">Request ID</th>
              <th className="p-3 text-center">Avatar</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Reg. Date</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, index) => (
              <tr
                key={index}
                className="border-t border-gray-100 hover:bg-indigo-50/50 transition"
              >
                <td className="p-3 font-medium text-gray-700">{req.id}</td>
                <td className="p-3 text-center">
                  <img
                    src={`https://i.pravatar.cc/40?img=${index + 1}`}
                    alt={req.name}
                    className="w-8 h-8 rounded-full shadow-sm mx-auto"
                  />
                </td>
                <td className="p-3">{req.name}</td>
                <td className="p-3 text-gray-600">{req.email}</td>
                <td className="p-3">{req.role}</td>
                <td className="p-3 text-gray-500">{req.date}</td>
                <td className="p-3">
                  {req.status === "Pending" && (
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
                      ⏳ Pending
                    </span>
                  )}
                  {req.status === "Approved" && (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                      ✅ Approved
                    </span>
                  )}
                  {req.status === "Rejected" && (
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-medium">
                      ❌ Rejected
                    </span>
                  )}
                </td>
                <td className="p-3 text-center flex justify-center gap-3">
                  <button
                    className="p-2 rounded-full hover:bg-indigo-100 text-indigo-600"
                    onClick={() => setSelected(req)}
                  >
                    <FiEye className="text-lg" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-green-100 text-green-500">
                    <FiCheck className="text-lg" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-red-100 text-red-500">
                    <FiX className="text-lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* === Detail View Section === */}
      {selected && (
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 mt-4 border border-gray-100 animate-[fadeIn_0.3s_ease-in-out]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-gray-700 font-semibold text-lg">
              Approval Request •{" "}
              <span className="text-indigo-600">{selected.id}</span>
            </h2>
            <button
              onClick={() => setSelected(null)}
              className="text-gray-400 hover:text-red-500 transition text-xl"
            >
              ×
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-700 mb-6">
            <p><strong>Applicant:</strong> {selected.name}</p>
            <p><strong>Email:</strong> {selected.email}</p>
            <p><strong>Phone:</strong> {selected.phone}</p>
            <p><strong>Role:</strong> {selected.role}</p>
            <p><strong>Registration Date:</strong> {selected.date}</p>
          </div>

          <h3 className="text-gray-700 font-medium mb-3">Registered Devices</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead className="bg-gray-50 text-gray-600 font-medium">
                <tr>
                  <th className="p-3">Device ID</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Model</th>
                  <th className="p-3">MAC Address</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {devices.map((d, i) => (
                  <tr
                    key={i}
                    className="border-t border-gray-100 hover:bg-indigo-50/50 transition"
                  >
                    <td className="p-3">{d.id}</td>
                    <td className="p-3">{d.type}</td>
                    <td className="p-3">{d.model}</td>
                    <td className="p-3">{d.mac}</td>
                    <td className="p-3">{d.location}</td>
                    <td className="p-3">
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-lg shadow hover:opacity-90 transition">
              Approve
            </button>
            <button className="bg-gradient-to-r from-red-500 to-rose-600 text-white px-6 py-2 rounded-lg shadow hover:opacity-90 transition">
              Reject
            </button>
            <button
              onClick={() => setSelected(null)}
              className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
