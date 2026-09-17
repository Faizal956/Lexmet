import React, { useState } from 'react';
import { ScreenId, InspectionRecord } from '../types';
import { INITIAL_INSPECTIONS } from '../mockData';
import { CheckCircle, AlertTriangle, FileText, Check, X, MessageSquare, ExternalLink } from 'lucide-react';

interface FindingsScreenProps {
  onNavigate: (screen: ScreenId) => void;
  selectedInspection: InspectionRecord | null;
}

export function FindingsScreen({ onNavigate, selectedInspection }: FindingsScreenProps) {
  const insp = selectedInspection || INITIAL_INSPECTIONS[1]; // default to cooking oil or rice with findings

  const [findings, setFindings] = useState(insp.findings.length > 0 ? insp.findings : [
    {
      id: 'F-01',
      title: 'Consumer Care Details',
      explanation: 'Consumer care helpline information could not be clearly identified or font size is below mandatory threshold.',
      ruleRef: 'LM-PC-Consumer-Care',
      confidence: 89,
      status: 'Needs Review' as const
    },
    {
      id: 'F-02',
      title: 'Net Quantity',
      explanation: 'Net quantity declaration detected but requires manual verification against package gross weight.',
      ruleRef: 'LM-PC-Net-Qty',
      confidence: 76,
      status: 'Needs Review' as const
    }
  ]);

  const handleVerify = (id: string) => {
    setFindings(findings.map(f => f.id === id ? { ...f, status: 'Verified' } : f));
  };

  const handleDismiss = (id: string) => {
    setFindings(findings.filter(f => f.id !== id));
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-slate-900">Inspection Findings</h2>
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-medium bg-blue-50 text-blue-700 border border-blue-200">
              {insp.inspectionId}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Product: <strong className="text-slate-800">{insp.productName}</strong> ({insp.brand}) &bull; Date: {insp.date} &bull; Manufacturer: {insp.manufacturer}
          </p>
        </div>

        <button
          onClick={() => onNavigate('report_preview')}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm transition-colors flex items-center gap-2 shadow-sm shrink-0"
        >
          <FileText className="w-4 h-4" />
          <span>Generate Report</span>
        </button>
      </div>

      {/* Compliance Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Checks Passed</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">18</p>
            <span className="text-xs text-slate-500 mt-0.5 block">Mandatory rules verified</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Potential Issues</p>
            <p className="text-2xl font-bold text-amber-600 mt-1">{findings.length}</p>
            <span className="text-xs text-slate-500 mt-0.5 block">Requires attention</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Need Review</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">2</p>
            <span className="text-xs text-slate-500 mt-0.5 block">Manual confirmation</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Section: Potential Findings */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-900">Potential Findings ({findings.length})</h3>
          <span className="text-xs text-slate-500">Click Evidence Viewer to inspect package regions</span>
        </div>

        {findings.length === 0 ? (
          <div className="bg-white p-12 rounded-xl border border-slate-200 text-center space-y-3">
            <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="text-base font-semibold text-slate-900">All Findings Addressed or Verified</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">No outstanding potential violations remain for this inspection item. You can now proceed to generate the official compliance report.</p>
            <button
              onClick={() => onNavigate('report_preview')}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold"
            >
              Generate Official Report →
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {findings.map((finding) => (
              <div key={finding.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                      {finding.status}
                    </span>
                    <span className="text-xs font-mono text-slate-500">Rule Ref: <strong className="text-blue-600">{finding.ruleRef}</strong></span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-slate-900">{finding.title}</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{finding.explanation}</p>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                    <span>AI Confidence: <strong className="text-slate-800 font-semibold">{finding.confidence}%</strong></span>
                    <span>&bull;</span>
                    <button
                      onClick={() => onNavigate('evidence_viewer')}
                      className="text-blue-600 hover:underline font-medium flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Inspect Evidence Bounding Box</span>
                    </button>
                  </div>
                </div>

                {/* Evidence Thumbnail / Action Buttons */}
                <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
                  <div className="w-32 h-20 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden relative">
                    <img
                      src={insp.images[0] || 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800'}
                      alt="Evidence thumbnail"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 border-2 border-amber-500/80 m-1 rounded"></div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleVerify(finding.id)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-xs transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Verify</span>
                    </button>
                    <button
                      onClick={() => handleDismiss(finding.id)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Dismiss</span>
                    </button>
                    <button
                      onClick={() => alert('Add Note dialog opened for finding ' + finding.id)}
                      className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                      title="Add Note"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
