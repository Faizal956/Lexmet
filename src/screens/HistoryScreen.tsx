import React, { useState } from 'react';
import { ScreenId, InspectionRecord } from '../types';
import { INITIAL_INSPECTIONS } from '../mockData';
import { Search, Filter, Download, Eye, FileText, ChevronLeft, ChevronRight } from 'lucide-react';

interface HistoryScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectInspection: (inspection: InspectionRecord) => void;
}

export function HistoryScreen({ onNavigate, onSelectInspection }: HistoryScreenProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filtered = INITIAL_INSPECTIONS.filter((insp) => {
    const matchesSearch =
      insp.inspectionId.toLowerCase().includes(search.toLowerCase()) ||
      insp.productName.toLowerCase().includes(search.toLowerCase()) ||
      insp.manufacturer.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || insp.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleExport = () => {
    alert('Exporting inspection history records as CSV / Excel...');
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Inspection History</h2>
          <p className="text-xs text-slate-500 mt-0.5">Comprehensive audit log of packaged commodity inspections across retail zones.</p>
        </div>
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-medium rounded-lg text-sm transition-colors flex items-center gap-2 shadow-xs"
        >
          <Download className="w-4 h-4 text-slate-500" />
          <span>Export Records</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search ID, product name, manufacturer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-medium text-slate-600">Status:</span>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="All">All Statuses</option>
            <option value="Compliant">Compliant</option>
            <option value="Potential Issue">Potential Issue</option>
            <option value="Needs Review">Needs Review</option>
            <option value="Violation">Violation</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                <th className="py-3 px-4">Inspection ID</th>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Manufacturer</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500 text-sm">
                    No inspection records found matching your search criteria.
                  </td>
                </tr>
              ) : (
                paginated.map((insp) => (
                  <tr key={insp.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-xs font-semibold text-blue-600">{insp.inspectionId}</td>
                    <td className="py-3.5 px-4 font-medium text-slate-900">{insp.productName}</td>
                    <td className="py-3.5 px-4 text-slate-600">{insp.manufacturer}</td>
                    <td className="py-3.5 px-4 text-slate-500 text-xs">{insp.date}</td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        insp.status === 'Compliant' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        insp.status === 'Potential Issue' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                        insp.status === 'Needs Review' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                        'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {insp.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            onSelectInspection(insp);
                            onNavigate('product_details');
                          }}
                          className="p-1.5 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors"
                          title="View Product Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            onSelectInspection(insp);
                            onNavigate('report_preview');
                          }}
                          className="p-1.5 hover:bg-slate-100 text-blue-600 rounded-lg transition-colors"
                          title="Official Report"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <span>Showing {paginated.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} entries</span>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className="p-1.5 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-medium px-2">Page {currentPage} of {totalPages}</span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              className="p-1.5 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
