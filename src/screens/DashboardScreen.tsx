import React from 'react';
import { ScreenId, InspectionRecord } from '../types';
import { INITIAL_INSPECTIONS } from '../mockData';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  BarChart3,
  ChevronRight,
  Plus
} from 'lucide-react';

interface DashboardScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectInspection: (inspection: InspectionRecord) => void;
}

export function DashboardScreen({ onNavigate, onSelectInspection }: DashboardScreenProps) {
  const recentInspections = INITIAL_INSPECTIONS.slice(0, 5);

  const commonFindings = [
    { title: 'Missing Consumer Care Details', count: 94, trend: '+4%' },
    { title: 'Incorrect MRP Declaration', count: 78, trend: '-2%' },
    { title: 'Net Quantity Issue', count: 62, trend: '+6%' },
    { title: 'Manufacturer Details Missing', count: 34, trend: '-5%' },
    { title: 'Date Declaration Issue', count: 18, trend: '+1%' }
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Good morning, Rajesh</h2>
          <p className="text-sm text-slate-500 mt-0.5">“Here’s an overview of your inspection activity and compliance trends.”</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('new_inspection')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm transition-colors flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>New Inspection</span>
          </button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Inspections</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">1,248</p>
            <span className="text-xs text-emerald-600 font-medium flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3 h-3" /> +12% this month
            </span>
          </div>
          <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Compliant</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">842</p>
            <span className="text-xs text-slate-500 mt-1 block">67.4% compliance rate</span>
          </div>
          <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Potential Issues</p>
            <p className="text-2xl font-bold text-amber-600 mt-1">286</p>
            <span className="text-xs text-slate-500 mt-1 block">Pending officer sign-off</span>
          </div>
          <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Needs Review</p>
            <p className="text-2xl font-bold text-rose-600 mt-1">120</p>
            <span className="text-xs text-rose-600 font-medium mt-1 block">Requires manual audit</span>
          </div>
          <div className="w-12 h-12 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Inspections & Right Sidebar Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Inspections Table (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-900">Recent Inspections</h3>
            <button
              onClick={() => onNavigate('history')}
              className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/75 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  <th className="py-3 px-4">Inspection ID</th>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Manufacturer</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {recentInspections.map((insp) => (
                  <tr
                    key={insp.id}
                    onClick={() => {
                      onSelectInspection(insp);
                      onNavigate('findings');
                    }}
                    className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4 font-mono text-xs font-medium text-blue-600">{insp.inspectionId}</td>
                    <td className="py-3 px-4 font-medium text-slate-900">{insp.productName}</td>
                    <td className="py-3 px-4 text-slate-600">{insp.manufacturer}</td>
                    <td className="py-3 px-4 text-slate-500 text-xs">{insp.date}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        insp.status === 'Compliant' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        insp.status === 'Potential Issue' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                        insp.status === 'Needs Review' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                        'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {insp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Widget: Compliance Trends & Common Findings */}
        <div className="space-y-6">
          {/* Compliance Overview Bar/Line Chart Mock */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-slate-900">Compliance Trends</h3>
              <BarChart3 className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs text-slate-500 mb-4">Weekly inspection outcomes across retail zones</p>
            
            {/* Visual Bar representation */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                  <span>Mon (120 insp)</span>
                  <span className="text-emerald-600">82% Compliant</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
                  <div className="bg-emerald-500 h-full rounded-l-full" style={{ width: '82%' }}></div>
                  <div className="bg-amber-400 h-full" style={{ width: '12%' }}></div>
                  <div className="bg-rose-500 h-full rounded-r-full" style={{ width: '6%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                  <span>Tue (145 insp)</span>
                  <span className="text-emerald-600">79% Compliant</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
                  <div className="bg-emerald-500 h-full rounded-l-full" style={{ width: '79%' }}></div>
                  <div className="bg-amber-400 h-full" style={{ width: '15%' }}></div>
                  <div className="bg-rose-500 h-full rounded-r-full" style={{ width: '6%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                  <span>Wed (160 insp)</span>
                  <span className="text-emerald-600">88% Compliant</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
                  <div className="bg-emerald-500 h-full rounded-l-full" style={{ width: '88%' }}></div>
                  <div className="bg-amber-400 h-full" style={{ width: '8%' }}></div>
                  <div className="bg-rose-500 h-full rounded-r-full" style={{ width: '4%' }}></div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Compliant</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400"></span> Review</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500"></span> Violation</span>
            </div>
          </div>

          {/* Common Findings List */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <h3 className="text-base font-semibold text-slate-900 mb-3">Common Findings</h3>
            <div className="space-y-3">
              {commonFindings.map((finding, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs pb-2.5 border-b border-slate-100 last:border-0 last:pb-0">
                  <span className="font-medium text-slate-800">{finding.title}</span>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-semibold rounded">{finding.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
