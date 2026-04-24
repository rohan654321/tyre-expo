'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  DocumentTextIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CurrencyDollarIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';

interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  issueDate: string;
  dueDate: string;
  description: string;
}

const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    amount: 125000,
    status: 'paid',
    issueDate: '2024-02-15',
    dueDate: '2024-03-15',
    description: 'Booth Registration + Electrical Setup',
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-002',
    amount: 75000,
    status: 'pending',
    issueDate: '2024-03-01',
    dueDate: '2024-04-01',
    description: 'Furniture Rental + Machinery Setup',
  },
  {
    id: '3',
    invoiceNumber: 'INV-2024-003',
    amount: 30000,
    status: 'pending',
    issueDate: '2024-03-10',
    dueDate: '2024-03-25',
    description: 'Hostess Services + Personnel Passes',
  },
];

export default function InvoicesPage() {
  const router = useRouter();
  const [invoices] = useState<Invoice[]>(mockInvoices);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircleIcon className="h-3 w-3" /> Paid</span>;
      case 'pending':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><ClockIcon className="h-3 w-3" /> Pending</span>;
      case 'overdue':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"><ExclamationTriangleIcon className="h-3 w-3" /> Overdue</span>;
      default:
        return null;
    }
  };

  const totalPaid = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0);
  const totalPending = invoices.filter(i => i.status === 'pending').reduce((sum, i) => sum + i.amount, 0);
  const totalAmount = invoices.reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
        <p className="text-gray-500 mt-1">View and manage your exhibition invoices</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="text-2xl font-bold text-gray-900">₹{totalAmount.toLocaleString()}</p>
            </div>
            <CurrencyDollarIcon className="h-8 w-8 text-gray-400" />
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Paid</p>
              <p className="text-2xl font-bold text-green-600">₹{totalPaid.toLocaleString()}</p>
            </div>
            <CheckCircleIcon className="h-8 w-8 text-green-400" />
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">₹{totalPending.toLocaleString()}</p>
            </div>
            <ClockIcon className="h-8 w-8 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Invoice #</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Description</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Issue Date</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Due Date</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Amount</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50 transition cursor-pointer" onClick={() => router.push(`/dashboard/invoice/${invoice.id}`)}>
                  <td className="px-6 py-4">
                    <span className="font-medium text-amber-600">{invoice.invoiceNumber}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">{invoice.description}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="h-3 w-3" />
                      {new Date(invoice.issueDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{new Date(invoice.dueDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">₹{invoice.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">{getStatusBadge(invoice.status)}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-1.5 text-gray-500 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition">
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 text-gray-500 hover:text-green-600 rounded-lg hover:bg-green-50 transition">
                        <ArrowDownTrayIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}