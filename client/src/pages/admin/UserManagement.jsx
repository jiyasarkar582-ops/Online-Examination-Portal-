import React, { useState } from 'react';
import { ROLES } from '../../utils/constants';
import {
  Users,
  PlusCircle,
  Search,
  ShieldCheck,
  UserCheck,
  UserX,
  Mail,
  GraduationCap,
  Briefcase,
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';

const INITIAL_USERS = [
  { id: 101, name: 'Rahul Sharma', email: 'student@examportal.edu', role: ROLES.STUDENT, rollNumber: '2026CSE104', department: 'Computer Science', status: 'ACTIVE' },
  { id: 102, name: 'Sneha Patel', email: 'sneha@examportal.edu', role: ROLES.STUDENT, rollNumber: '2026CSE112', department: 'Computer Science', status: 'ACTIVE' },
  { id: 103, name: 'Amitabh Verma', email: 'amitabh@examportal.edu', role: ROLES.STUDENT, rollNumber: '2026CSE119', department: 'Computer Science', status: 'SUSPENDED' },
  { id: 201, name: 'Prof. Vikram Sen', email: 'teacher@examportal.edu', role: ROLES.TEACHER, employeeCode: 'FAC-CSE-042', department: 'Computer Science', status: 'ACTIVE' },
  { id: 202, name: 'Dr. K. R. Raman', email: 'raman@examportal.edu', role: ROLES.TEACHER, employeeCode: 'FAC-CSE-018', department: 'Computer Science', status: 'ACTIVE' },
  { id: 301, name: 'Dr. Ananya Mukherjee', email: 'admin@examportal.edu', role: ROLES.ADMIN, employeeCode: 'ADM-EXM-001', department: 'Examination Cell', status: 'ACTIVE' },
];

const UserManagement = () => {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [filterRole, setFilterRole] = useState('ALL');
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: ROLES.STUDENT,
    department: 'Computer Science & Engineering',
    identifier: '',
  });

  const toggleStatus = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE' } : u));
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) return;
    const created = {
      id: Date.now(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      department: newUser.department,
      rollNumber: newUser.role === ROLES.STUDENT ? newUser.identifier || '2026CSE' + Math.floor(100 + Math.random() * 800) : null,
      employeeCode: newUser.role !== ROLES.STUDENT ? newUser.identifier || 'FAC-' + Math.floor(100 + Math.random() * 800) : null,
      status: 'ACTIVE',
    };
    setUsers([created, ...users]);
    setShowAddModal(false);
  };

  const filteredUsers = users.filter((u) => {
    const matchesRole = filterRole === 'ALL' || u.role === filterRole;
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      (u.rollNumber && u.rollNumber.toLowerCase().includes(search.toLowerCase()));
    return matchesRole && matchesSearch;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-navy-900 flex items-center gap-2">
              <Users className="w-6 h-6 text-royal-600" />
              Institutional User Directory
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage student enrollments, faculty examiner permissions, and system administrator privileges.
            </p>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowAddModal(true)}
            leftIcon={<PlusCircle className="w-4 h-4" />}
          >
            Provision New User
          </Button>
        </div>

        {/* Filter and Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {['ALL', ROLES.STUDENT, ROLES.TEACHER, ROLES.ADMIN].map((role) => (
              <button
                key={role}
                onClick={() => setFilterRole(role)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  filterRole === role
                    ? 'bg-navy-800 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {role === 'ALL' ? 'All Roles' : role.replace('ROLE_', '')}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search user by name or roll..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-500/20"
            />
          </div>
        </div>

        {/* User Table */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3.5">User Identity</th>
                  <th className="px-6 py-3.5">Role</th>
                  <th className="px-6 py-3.5">Roll / Employee Code</th>
                  <th className="px-6 py-3.5">Department</th>
                  <th className="px-6 py-3.5">Account Status</th>
                  <th className="px-6 py-3.5 text-right">Access Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-bold text-navy-900 block">{user.name}</span>
                      <span className="text-[11px] text-slate-400">{user.email}</span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          user.role === ROLES.STUDENT
                            ? 'primary'
                            : user.role === ROLES.TEACHER
                            ? 'navy'
                            : 'purple'
                        }
                      >
                        {user.role.replace('ROLE_', '')}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 font-mono font-semibold">
                      {user.rollNumber || user.employeeCode || '—'}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{user.department}</td>
                    <td className="px-6 py-4">
                      <Badge variant={user.status === 'ACTIVE' ? 'success' : 'danger'}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        variant={user.status === 'ACTIVE' ? 'outline' : 'success'}
                        size="sm"
                        onClick={() => toggleStatus(user.id)}
                      >
                        {user.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Provision User Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Provision Institutional User"
        maxWidth="max-w-md"
        footer={
          <>
            <Button variant="ghost" size="md" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="md" onClick={handleAddUser}>
              Confirm & Create Account
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              placeholder="e.g. Priya Sharma"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              placeholder="priya@examportal.edu"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Role</label>
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            >
              <option value={ROLES.STUDENT}>Student</option>
              <option value={ROLES.TEACHER}>Teacher / Examiner</option>
              <option value={ROLES.ADMIN}>System Administrator</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Roll / Employee ID</label>
            <input
              type="text"
              value={newUser.identifier}
              onChange={(e) => setNewUser({ ...newUser, identifier: e.target.value })}
              placeholder="e.g. 2026CSE150 or FAC-088"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default UserManagement;

