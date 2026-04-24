'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  ArrowLeftIcon,
  ArrowDownTrayIcon,
  PrinterIcon,
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

const mockInvoice: Record<string, any> = {
  '1': {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    amount: 125000,
    status: 'paid',
    issueDate: '2024-02-15',
    dueDate: '2024-03-15',
    company: 'TyreTech Industries',
    exhibitorName: 'Rajesh Kumar',
    email: 'rajesh@tyretech.com',
    phone: '+91 98765 43210',
    items: [
      { description: 'Booth Registration Fee', quantity: 1, unitPrice: 50000, total: 50000 },
      { description: 'Electrical Setup - 50 KVA', quantity: 1, unitPrice: 25000, total: 25000 },
      { description: 'Furniture Rental', quantity: 1, unitPrice: 30000, total: 30000 },
      { description: 'Security Deposit', quantity: 1, unitPrice: 20000, total: 20000 },
    ],
    subtotal: 125000,
    gst: 22500,
    grandTotal: 147500,
  },
};

export default function InvoiceDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [invoice, setInvoice] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setInvoice(mockInvoice[id] || mockInvoice['1']);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Invoice Details</h1>
            <p className="text-gray-500 text-sm">{invoice?.invoiceNumber}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            <ArrowDownTrayIcon className="h-4 w-4" />
            Download
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            <PrinterIcon className="h-4 w-4" />
            Print
          </button>
        </div>
      </div>

      {/* Invoice Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className={`px-6 py-5 ${invoice?.status === 'paid' ? 'bg-gradient-to-r from-green-600 to-green-700' : 'bg-gradient-to-r from-amber-500 to-orange-500'} text-white`}>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">INVOICE</p>
              <p className="text-2xl font-bold">{invoice?.invoiceNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-80">Total Amount</p>
              <p className="text-2xl font-bold">₹{invoice?.amount?.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Meta Info */}
        <div className="px-6 py-4 border-b bg-gray-50 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-gray-500">Issue Date</p>
            <p className="font-semibold">{new Date(invoice?.issueDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Due Date</p>
            <p className="font-semibold">{new Date(invoice?.dueDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Status</p>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${invoice?.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
              {invoice?.status === 'paid' ? <CheckCircleIcon className="h-3 w-3" /> : <ClockIcon className="h-3 w-3" />}
              {invoice?.status?.toUpperCase()}
            </span>
          </div>
          <div>
            <p className="text-xs text-gray-500">Payment Mode</p>
            <p className="font-semibold">Online Transfer</p>
          </div>
        </div>

        {/* Exhibitor Info */}
        <div className="px-6 py-4 border-b">
          <h3 className="font-semibold text-gray-800 mb-3">Bill To</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-gray-500">Company</p>
              <p className="font-medium">{invoice?.company}</p>
            </div>
            <div>
              <p className="text-gray-500">Contact Person</p>
              <p className="font-medium">{invoice?.exhibitorName}</p>
            </div>
            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-medium">{invoice?.email}</p>
            </div>
            <div>
              <p className="text-gray-500">Phone</p>
              <p className="font-medium">{invoice?.phone}</p>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="px-6 py-4">
          <h3 className="font-semibold text-gray-800 mb-3">Items</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-3 py-2">Description</th>
                  <th className="text-center px-3 py-2">Qty</th>
                  <th className="text-right px-3 py-2">Unit Price</th>
                  <th className="text-right px-3 py-2">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {invoice?.items?.map((item: any, idx: number) => (
                  <tr key={idx}>
                    <td className="px-3 py-2">{item.description}</td>
                    <td className="text-center px-3 py-2">{item.quantity}</td>
                    <td className="text-right px-3 py-2">₹{item.unitPrice?.toLocaleString()}</td>
                    <td className="text-right px-3 py-2">₹{item.total?.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totals */}
        <div className="px-6 py-4 bg-gray-50 border-t">
          <div className="max-w-xs ml-auto">
            <div className="flex justify-between text-sm py-1">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">₹{invoice?.subtotal?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm py-1">
              <span className="text-gray-600">GST (18%):</span>
              <span className="font-medium">₹{invoice?.gst?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-lg font-bold py-2 border-t border-gray-200 mt-1 pt-2">
              <span>Grand Total:</span>
              <span className="text-amber-600">₹{invoice?.grandTotal?.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}