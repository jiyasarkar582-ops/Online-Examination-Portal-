import React, { useState } from 'react';
import { Building2, PlusCircle, BookOpen, Users, GraduationCap } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

const INITIAL_DEPTS = [
  { id: 1, name: 'Computer Science & Engineering', code: 'CSE', head: 'Dr. S. K. Roy', facultyCount: 34, studentCount: 480, coursesCount: 16 },
  { id: 2, name: 'Electronics & Communication Engineering', code: 'ECE', head: 'Dr. P. Sen', facultyCount: 22, studentCount: 360, coursesCount: 12 },
  { id: 3, name: 'Information Technology', code: 'IT', head: 'Dr. M. Nambiar', facultyCount: 18, studentCount: 320, coursesCount: 10 },
  { id: 4, name: 'Mechanical Engineering', code: 'ME', head: 'Dr. A. Verma', facultyCount: 16, studentCount: 260, coursesCount: 8 },
];

const Departments = () => {
  const [departments] = useState(INITIAL_DEPTS);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-navy-900 flex items-center gap-2">
              <Building2 className="w-6 h-6 text-royal-600" />
              Academic Departments & Faculties
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Organizational hierarchy, course allocations, and faculty department assignments.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {departments.map((dept) => (
            <div
              key={dept.id}
              className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-royal-100 text-royal-800">
                  {dept.code}
                </span>
                <Badge variant="primary">{dept.coursesCount} Active Courses</Badge>
              </div>

              <div>
                <h3 className="text-base font-bold text-navy-900">{dept.name}</h3>
                <span className="text-xs text-slate-500">Department Head: {dept.head}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-royal-600" />
                  <span><strong>{dept.studentCount}</strong> Students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-navy-800" />
                  <span><strong>{dept.facultyCount}</strong> Faculty Examiners</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Departments;

