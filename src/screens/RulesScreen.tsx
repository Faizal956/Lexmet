import React, { useState } from 'react';
import { ScreenId, ComplianceRule } from '../types';
import { COMPLIANCE_RULES } from '../mockData';
import { Search, Shield, X, BookOpen } from 'lucide-react';

interface RulesScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export function RulesScreen({ onNavigate }: RulesScreenProps) {
  const [search, setSearch] = useState('');
  const [selectedRule, setSelectedRule] = useState<ComplianceRule | null>(COMPLIANCE_RULES[0]);

  const filteredRules = COMPLIANCE_RULES.filter(
    r =>
      r.requirement.toLowerCase().includes(search.toLowerCase()) ||
      r.ruleId.toLowerCase().includes(search.toLowerCase()) ||
      r.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Compliance Rules Library</h2>
          <p className="text-xs text-slate-500 mt-0.5">Statutory regulations under Legal Metrology (Packaged Commodities) Rules, 2011.</p>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search rule ID, requirement..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Rules Table (7 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  <th className="py-3 px-4">Rule ID</th>
                  <th className="py-3 px-4">Requirement</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Last Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredRules.map((rule) => {
                  const isSelected = selectedRule?.id === rule.id;
                  return (
                    <tr
                      key={rule.id}
                      onClick={() => setSelectedRule(rule)}
                      className={`cursor-pointer transition-colors ${isSelected ? 'bg-blue-50/70' : 'hover:bg-slate-50'}`}
                    >
                      <td className="py-3.5 px-4 font-mono text-xs font-semibold text-blue-600">{rule.ruleId}</td>
                      <td className="py-3.5 px-4 font-medium text-slate-900">{rule.requirement}</td>
                      <td className="py-3.5 px-4 text-slate-600 text-xs">{rule.category}</td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {rule.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 text-xs">{rule.lastUpdated}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Side Panel for Rule Details (4 cols) */}
        {selectedRule && (
          <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-5 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-600" />
                <h3 className="text-base font-bold text-slate-950 font-mono">{selectedRule.ruleId}</h3>
              </div>
              <button
                onClick={() => setSelectedRule(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-slate-400 block uppercase font-medium mb-1">Requirement</span>
                <p className="font-bold text-slate-900 text-sm">{selectedRule.requirement}</p>
              </div>

              <div>
                <span className="text-slate-400 block uppercase font-medium mb-1">Description</span>
                <p className="text-slate-700 leading-relaxed">{selectedRule.description}</p>
              </div>

              <div>
                <span className="text-slate-400 block uppercase font-medium mb-1">Validation Criteria</span>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-800 leading-relaxed">
                  {selectedRule.validationCriteria}
                </div>
              </div>

              <div>
                <span className="text-slate-400 block uppercase font-medium mb-1">Legal Reference</span>
                <p className="font-mono text-blue-700 bg-blue-50 p-2 rounded border border-blue-200">{selectedRule.reference}</p>
              </div>

              <div className="pt-2 text-[11px] text-slate-400">
                Last Updated: {selectedRule.lastUpdated}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
