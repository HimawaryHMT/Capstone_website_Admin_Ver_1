import React, { useMemo, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FiEye, FiEdit2, FiTrash2, FiSearch, FiPlus, FiChevronDown, FiChevronUp } from "react-icons/fi";

/**
 * Accounts — refined UI/UX
 * - Clean header with subtle gradient
 * - Polished stat cards
 * - Search + status filter
 * - Sortable columns (Name, Email, Status)
 * - Sticky table header, zebra rows, hover states
 * - Mobile-friendly card layout
 * - Empty state + basic client-side pagination
 */

const STATUS_STYLES = {
  Active: {
    ring: "ring-emerald-200/70",
    text: "text-emerald-700",
    bg: "bg-emerald-50",
    dot: "bg-emerald-500",
  },
  Inactive: {
    ring: "ring-rose-200/70",
    text: "text-rose-700",
    bg: "bg-rose-50",
    dot: "bg-rose-500",
  },
  Pending: {
    ring: "ring-amber-200/70",
    text: "text-amber-700",
    bg: "bg-amber-50",
    dot: "bg-amber-500",
  },
};

const DEFAULT_USERS = [
  { id: 1, name: "Livia Bator", email: "livia@domain.com", phone: "+84 912 345 678", status: "Active"},
  { id: 2, name: "Randy Press", email: "randy@domain.com", phone: "+84 912 345 678", status: "Active"},
  { id: 3, name: "Livia Bator", email: "livia@domain.com", phone: "+84 912 345 678", status: "Pending"},
  { id: 4, name: "Workman", email: "workman@domain.com", phone: "+84 912 345 678", status: "Inactive"},
  { id: 5, name: "Ava Green", email: "ava@domain.com", phone: "+84 912 345 678", status: "Active"},
  { id: 6, name: "Ben Stone", email: "ben@domain.com", phone: "+84 912 345 678", status: "Pending"},
  { id: 7, name: "Chloe Ng", email: "chloe@domain.com", phone: "+84 912 345 678", status: "Inactive"},
  { id: 8, name: "Duy Tran", email: "duy@domain.com", phone: "+84 912 345 678", status: "Active"},
];

const StatCard = ({ icon, label, value, accent }) => (
  <div className="relative overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 transition hover:shadow-md">
    <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-10" style={{ background: accent }} />
    <div className="flex items-center gap-3">
      <div className="rounded-xl p-2 text-white" style={{ background: accent }}>
        {icon}
      </div>
      <div>
        <p className="text-slate-500 text-xs">{label}</p>
        <p className="text-lg font-semibold tracking-tight">{value}</p>
      </div>
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = STATUS_STYLES[status] || STATUS_STYLES.Active;
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${styles.bg} ${styles.text} ring-1 ${styles.ring}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
      {status}
    </span>
  );
};

const SortIcon = ({ dir }) => (dir === "asc" ? <FiChevronUp className="ml-1 inline" /> : dir === "desc" ? <FiChevronDown className="ml-1 inline" /> : null);

const Accounts = () => {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortKey, setSortKey] = useState(null); // name | email | status
  const [sortDir, setSortDir] = useState("asc"); // asc | desc
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const users = DEFAULT_USERS; // replace with API data

  const totals = useMemo(() => {
    const active = users.filter(u => u.status === "Active").length;
    const inactive = users.filter(u => u.status === "Inactive").length;
    const pending = users.filter(u => u.status === "Pending").length;
    return { total: users.length, active, inactive, pending };
  }, [users]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = users.filter(u =>
      (!q || `${u.name} ${u.email} ${u.phone}`.toLowerCase().includes(q)) &&
      (statusFilter === "All" || u.status === statusFilter)
    );

    if (sortKey) {
      list = [...list].sort((a, b) => {
        const va = String(a[sortKey]).toLowerCase();
        const vb = String(b[sortKey]).toLowerCase();
        if (va < vb) return sortDir === "asc" ? -1 : 1;
        if (va > vb) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
    }
    return list;
  }, [users, query, statusFilter, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const toggleSort = (key) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir("asc");
    } else {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    }
  };

  return (
    <div className="flex h-full w-full flex-col gap-6 bg-slate-50 p-6">
      

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<FaUser className="text-xl" />} label="Total Users" value={totals.total.toLocaleString()} accent="#2563eb" />
        <StatCard icon={<div className="h-5 w-5 rounded-full" style={{ background: "#10b981" }} />} label="Active" value={totals.active.toLocaleString()} accent="#10b981" />
        <StatCard icon={<div className="h-5 w-5 rounded-full" style={{ background: "#f59e0b" }} />} label="Pending" value={totals.pending.toLocaleString()} accent="#f59e0b" />
        <StatCard icon={<div className="h-5 w-5 rounded-full" style={{ background: "#ef4444" }} />} label="Inactive" value={totals.inactive.toLocaleString()} accent="#ef4444" />
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-xl items-center gap-3">
          <div className="flex w-full flex-1 items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200 focus-within:ring-2 focus-within:ring-slate-400">
            <FiSearch className="text-slate-400" />
            <input
              value={query}
              onChange={(e) => { setPage(1); setQuery(e.target.value); }}
              placeholder="Search name, email, phone..."
              className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-slate-400"
            />
          </div>
          <div className="rounded-xl bg-white px-3 py-2 text-sm shadow-sm ring-1 ring-slate-200">
            <select
              value={statusFilter}
              onChange={(e) => { setPage(1); setStatusFilter(e.target.value); }}
              className="bg-transparent outline-none"
              aria-label="Filter by status"
            >
              <option>All</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        <button className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
          <FiPlus /> Add Device
        </button>
      </div>

      {/* Table card */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
        {/* Desktop table */}
        <div className="hidden md:block">
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-10 bg-slate-50 text-left text-slate-600">
              <tr>
                <th className="px-4 py-3 font-semibold">ID</th>
              
                <th className="px-4 py-3 font-semibold cursor-pointer select-none" onClick={() => toggleSort("name")}>
                  Name <SortIcon dir={sortKey === "name" ? sortDir : null} />
                </th>
                <th className="px-4 py-3 font-semibold cursor-pointer select-none" onClick={() => toggleSort("email")}>
                  Email <SortIcon dir={sortKey === "email" ? sortDir : null} />
                </th>
                <th className="px-4 py-3 font-semibold">Phone</th>
                <th className="px-4 py-3 font-semibold cursor-pointer select-none" onClick={() => toggleSort("status")}>
                  Status <SortIcon dir={sortKey === "status" ? sortDir : null} />
                </th>
                <th className="px-4 py-3 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-slate-500">
                    No users found. Try a different search or filter.
                  </td>
                </tr>
              ) : (
                paged.map((u, idx) => (
                  <tr key={u.id} className={`${idx % 2 === 1 ? "bg-slate-50/50" : "bg-white"} border-t border-slate-100 hover:bg-slate-50`}> 
                    <td className="px-4 py-3 align-middle text-slate-700">{u.id}</td>
                    <td className="px-4 py-3 align-middle font-medium text-slate-800">{u.name}</td>
                    <td className="px-4 py-3 align-middle text-slate-600">{u.email}</td>
                    <td className="px-4 py-3 align-middle text-slate-600">{u.phone}</td>
                    <td className="px-4 py-3 align-middle"><StatusBadge status={u.status} /></td>
                    <td className="px-4 py-3 align-middle">
                      <div className="flex items-center justify-center gap-2">
                        <button title="View" className="rounded-full p-2 text-blue-600 transition hover:bg-blue-50">
                          <FiEye className="text-lg" />
                        </button>
                        <button title="Edit" className="rounded-full p-2 text-emerald-600 transition hover:bg-emerald-50">
                          <FiEdit2 className="text-lg" />
                        </button>
                        <button title="Delete" className="rounded-full p-2 text-rose-600 transition hover:bg-rose-50">
                          <FiTrash2 className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden">
          {paged.length === 0 ? (
            <div className="px-4 py-10 text-center text-slate-500">No users found.</div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {paged.map((u) => (
                <li key={u.id} className="flex items-center gap-3 px-4 py-4">
                  
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800">{u.name}</p>
                    <p className="truncate text-xs text-slate-500">{u.email}</p>
                    <div className="mt-2"><StatusBadge status={u.status} /></div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="rounded-full p-2 text-blue-600 hover:bg-blue-50"><FiEye /></button>
                    <button className="rounded-full p-2 text-emerald-600 hover:bg-emerald-50"><FiEdit2 /></button>
                    <button className="rounded-full p-2 text-rose-600 hover:bg-rose-50"><FiTrash2 /></button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between gap-2 border-t border-slate-100 px-4 py-3 text-sm">
          <p className="text-slate-500">
            Showing <span className="font-semibold text-slate-700">{paged.length === 0 ? 0 : (page - 1) * pageSize + 1}</span>
            –<span className="font-semibold text-slate-700">{(page - 1) * pageSize + paged.length}</span> of
            <span className="font-semibold text-slate-700"> {filtered.length}</span>
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-slate-600">
              Page <span className="font-semibold text-slate-800">{page}</span> / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
