import React, { useState } from 'react';
import { ScreenId, SystemUser } from '../types';
import { SYSTEM_USERS } from '../mockData';
import { UserPlus, Shield, Mail, MoreHorizontal, Edit, Trash2 } from 'lucide-react';

interface UsersScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export function UsersScreen({ onNavigate }: UsersScreenProps) {
  const [users, setUsers] = useState<SystemUser[]>(SYSTEM_USERS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<'Enforcement Officer' | 'Reviewer' | 'Administrator'>('Enforcement Officer');

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: SystemUser = {
      id: `u-${Date.now()}`,
      name: newName,
      role: newRole,
      department: 'Central Circle - Zone 1',
      status: 'Active',
      lastActive: 'Just now',
      email: newEmail
    };
    setUsers([...users, newUser]);
    setShowAddModal(false);
    setNewName('');
    setNewEmail('');
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Users & Access Management</h2>
          <p className="text-xs text-slate-500 mt-0.5">Manage enforcement officers, reviewers, and system administrator roles.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm transition-colors flex items-center gap-2 shadow-sm"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add User</span>
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                <th className="py-3 px-4">Name & Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Active</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {users.map((usr) => (
                <tr key={usr.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center">
                        {usr.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{usr.name}</p>
                        <p className="text-xs text-slate-500">{usr.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      usr.role === 'Administrator' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                      usr.role === 'Reviewer' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                      'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}>
                      {usr.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 text-xs">{usr.department}</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {usr.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 text-xs">{usr.lastActive}</td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => alert(`Editing user: ${usr.name}`)}
                        className="p-1.5 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors"
                        title="Edit User"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setUsers(users.map(u => u.id === usr.id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u))}
                        className="p-1.5 hover:bg-rose-50 text-slate-600 hover:text-rose-600 rounded-lg transition-colors"
                        title="Deactivate / Activate"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-md p-6 space-y-5">
            <h3 className="text-lg font-bold text-slate-900">Add New System User</h3>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900"
                  placeholder="e.g. Priya Sharma"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Official Government Email</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900"
                  placeholder="priya.sharma@legalmetrology.gov.in"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">System Role</label>
                <select
                  value={newRole}
                  onChange={(e: any) => setNewRole(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900"
                >
                  <option value="Enforcement Officer">Enforcement Officer</option>
                  <option value="Reviewer">Reviewer</option>
                  <option value="Administrator">Administrator</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 shadow-sm"
                >
                  Create User Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
