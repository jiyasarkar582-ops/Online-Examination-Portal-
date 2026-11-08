import React from 'react';
import { ShieldCheck } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200/80 py-6 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-royal-600" />
          <span className="font-semibold text-slate-700">Online Examination Portal</span>
          <span>— Enterprise Smart Proctoring v1.0</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-navy-900 transition-colors">Privacy & Data Governance</a>
          <a href="#" className="hover:text-navy-900 transition-colors">Anti-Cheating Policy</a>
          <a href="#" className="hover:text-navy-900 transition-colors">Academic Appeals</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

