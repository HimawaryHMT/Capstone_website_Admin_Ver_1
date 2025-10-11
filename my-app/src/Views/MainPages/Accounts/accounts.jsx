import { FaUser } from "react-icons/fa";
import { FiEye, FiEdit2, FiTrash2, FiSearch, FiPlus } from "react-icons/fi";

const Accounts = () => {
  const users = [
    { id: 1, name: "Livia Bator", email: "livia@domain.com", phone: "+84 912 345 678", status: "Active", avatar: "https://i.pravatar.cc/40?img=1" },
    { id: 2, name: "Randy Press", email: "randy@domain.com", phone: "+84 912 345 678", status: "Active", avatar: "https://i.pravatar.cc/40?img=2" },
    { id: 3, name: "Livia Bator", email: "livia@domain.com", phone: "+84 912 345 678", status: "Active", avatar: "https://i.pravatar.cc/40?img=3" },
    { id: 4, name: "Workman", email: "workman@domain.com", phone: "+84 912 345 678", status: "Active", avatar: "https://i.pravatar.cc/40?img=4" },
  ];

  return (
    <div className="flex flex-col bg-gray-50 p-6 gap-6 w-full h-full overflow-auto">

      {/* ===== Cards Row ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-xl p-4 flex items-center gap-3">
          <FaUser className="text-blue-500 text-2xl" />
          <div>
            <p className="text-gray-500 text-sm">Total Users</p>
            <h2 className="text-lg font-bold">4,209</h2>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-4 flex items-center gap-3">
          <span className="bg-green-100 p-2 rounded-full">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 01.083 1.32l-.083.094-7.5 7.5a1 1 0 01-1.32.083l-.094-.083-3.5-3.5a1 1 0 011.32-1.497l.094.083L8 11.585l6.793-6.792a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
          </span>
          <div>
            <p className="text-gray-500 text-sm">Active Users</p>
            <h2 className="text-lg font-bold">3,200</h2>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-4 flex items-center gap-3">
          <span className="bg-red-100 p-2 rounded-full">
            <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 00-1.414-1.414L10 8.586 7.707 6.293A1 1 0 006.293 7.707L8.586 10l-2.293 2.293a1 1 0 001.414 1.414L10 11.414l2.293 2.293a1 1 0 001.414-1.414L11.414 10l2.293-2.293z" clipRule="evenodd"/></svg>
          </span>
          <div>
            <p className="text-gray-500 text-sm">Non-active Users</p>
            <h2 className="text-lg font-bold">1,009</h2>
          </div>
        </div>
      </div>

      {/* ===== Search + Add Button ===== */}
      <div className="flex justify-between items-center">
        <div className="flex items-center bg-white shadow rounded-xl px-3 w-full max-w-sm">
          <FiSearch className="text-gray-500 mr-2" />
          <input type="text" placeholder="Search name, email..." className="flex-1 py-2 outline-none" />
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 ml-4">
          <FiPlus /> Add Device
        </button>
      </div>

      {/* ===== Table Wrapper ===== */}
      <div className="bg-white shadow rounded-xl p-4 overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="py-3 px-2 text-center font-semibold">ID</th>
              <th className="py-3 px-2 text-center font-semibold">Avatar</th>
              <th className="py-3 px-2 text-center font-semibold">Name</th>
              <th className="py-3 px-2 text-center font-semibold">Email</th>
              <th className="py-3 px-2 text-center font-semibold">Phone</th>
              <th className="py-3 px-2 text-center font-semibold">Status</th>
              <th className="py-3 px-2 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b hover:bg-gray-50 text-center">
                <td className="py-3">{u.id}</td>
                <td className="py-3"><img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-full mx-auto" /></td>
                <td className="py-3 font-medium text-gray-800">{u.name}</td>
                <td className="py-3 text-gray-600">{u.email}</td>
                <td className="py-3 text-gray-600">{u.phone}</td>
                <td className="py-3"><span className="px-14 py-1.5 rounded-full text-sm font-medium border border-green-500 text-green-600 bg-green-50">{u.status}</span></td>
                <td className="py-3 flex justify-center gap-3">
                  <button className="p-2 rounded-full hover:bg-blue-50 text-blue-500"><FiEye className="text-xl" /></button>
                  <button className="p-2 rounded-full hover:bg-green-50 text-green-500"><FiEdit2 className="text-xl" /></button>
                  <button className="p-2 rounded-full hover:bg-red-50 text-red-500"><FiTrash2 className="text-xl" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Accounts;
