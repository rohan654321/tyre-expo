'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    EyeIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    CreditCardIcon,
    BanknotesIcon,
    ArrowLeftIcon,
    DocumentTextIcon,
    BuildingOfficeIcon,
    UserIcon,
    MapPinIcon,
    CurrencyRupeeIcon,
} from '@heroicons/react/24/outline';
import { extraRequirementsAPI } from '@/lib/api/exhibitorClient';
import toast from 'react-hot-toast';

interface SummaryItem {
    id: string;
    name: string;
    category: string;
    totalPrice: number;
    details?: string;
    quantity?: number;
    unitPrice?: number;
}

export default function PreviewAndPaymentPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [summary, setSummary] = useState<SummaryItem[]>([]);
    const [allFormData, setAllFormData] = useState<any>({});
    const [gstPercentage] = useState(18);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'netbanking' | 'upi' | 'demanddraft'>('card');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadAllData();
    }, []);

    const loadAllData = () => {
        try {
            // Load all data from localStorage
            const generalInfo = JSON.parse(localStorage.getItem('exhibitorGeneralInfo') || '{}');
            const boothDetails = JSON.parse(localStorage.getItem('exhibitorBoothDetails') || '{}');
            const personnel = JSON.parse(localStorage.getItem('exhibitorPersonnel') || '[]');
            const machineryDisplay = JSON.parse(localStorage.getItem('exhibitorMachineryDisplay') || '[]');
            const furnitureCart = JSON.parse(localStorage.getItem('furnitureCart') || '[]');
            const electricalLoad = JSON.parse(localStorage.getItem('electricalRequirement') || 'null');
            const hostessReq = JSON.parse(localStorage.getItem('hostessRequirement') || 'null');
            const compressedAir = JSON.parse(localStorage.getItem('compressedAirRequirement') || 'null');
            const waterConnection = JSON.parse(localStorage.getItem('waterConnectionRequirement') || 'null');
            const securityGuard = JSON.parse(localStorage.getItem('securityGuardRequirement') || 'null');
            const housekeeping = JSON.parse(localStorage.getItem('housekeepingRequirement') || 'null');
            const securityDeposit = JSON.parse(localStorage.getItem('securityDeposit') || 'null');

            // Store all data for submission
            setAllFormData({
                generalInfo,
                boothDetails,
                personnel,
                machineryDisplay,
                furnitureCart,
                electricalLoad,
                hostessReq,
                compressedAir,
                waterConnection,
                securityGuard,
                housekeeping,
                securityDeposit,
            });

            // Build summary items for display
            const items: SummaryItem[] = [];

            // Booth Booking
            if (boothDetails.sqMtrBooked) {
                const boothArea = parseFloat(boothDetails.sqMtrBooked) || 0;
                const boothCost = boothArea * 5000;
                if (boothCost > 0) {
                    items.push({
                        id: 'booth_booking',
                        name: `Booth Booking - ${boothDetails.boothNo || 'TBA'}`,
                        category: 'Booth',
                        totalPrice: boothCost,
                        details: `${boothArea} sq.m @ ₹5,000/sq.m`
                    });
                }
            }

            // Electrical
            if (electricalLoad && (electricalLoad.temporaryLoad || electricalLoad.exhibitionLoad)) {
                const tempKW = parseFloat(electricalLoad.temporaryLoad) || 0;
                const exhKW = parseFloat(electricalLoad.exhibitionLoad) || 0;
                const tempCost = tempKW * 3500;
                const exhCost = exhKW * 3500;
                const socketCost = (electricalLoad.sockets || 0) * 1500;
                const lightingCost = (electricalLoad.lightingPoints || 0) * 800;
                const electricalTotal = tempCost + exhCost + socketCost + lightingCost;

                if (electricalTotal > 0) {
                    items.push({
                        id: 'electrical',
                        name: 'Electrical Connection',
                        category: 'Utilities',
                        totalPrice: electricalTotal,
                        details: `Temp: ${tempKW}KW, Exhib: ${exhKW}KW, Sockets: ${electricalLoad.sockets || 0}, Lights: ${electricalLoad.lightingPoints || 0}`
                    });
                }
            }

            // Furniture Items
            if (furnitureCart.length > 0) {
                const furnitureTotal = furnitureCart.reduce((sum: number, item: any) => sum + (item.totalCost || 0), 0);
                if (furnitureTotal > 0) {
                    items.push({
                        id: 'furniture',
                        name: 'Furniture & Equipment Rental',
                        category: 'Rental',
                        totalPrice: furnitureTotal,
                        quantity: furnitureCart.length,
                        details: `${furnitureCart.length} items rented`
                    });
                }
            }

            // Hostess Services
            if (hostessReq && (hostessReq.categoryA > 0 || hostessReq.categoryB > 0)) {
                const hostessTotal = (hostessReq.categoryA * 5000 * hostessReq.days) + (hostessReq.categoryB * 4000 * hostessReq.days);
                if (hostessTotal > 0) {
                    items.push({
                        id: 'hostess',
                        name: 'Hostess Services',
                        category: 'Staff',
                        totalPrice: hostessTotal,
                        details: `Cat A: ${hostessReq.categoryA}, Cat B: ${hostessReq.categoryB}, Days: ${hostessReq.days}`
                    });
                }
            }

            // Compressed Air
            if (compressedAir && compressedAir.connections > 0) {
                items.push({
                    id: 'compressed_air',
                    name: 'Compressed Air Connection',
                    category: 'Utilities',
                    totalPrice: compressedAir.totalCost || (compressedAir.connections * 5000),
                    details: `${compressedAir.connections} connection(s)`
                });
            }

            // Water Connection
            if (waterConnection && waterConnection.connections > 0) {
                items.push({
                    id: 'water',
                    name: 'Water Connection',
                    category: 'Utilities',
                    totalPrice: waterConnection.totalCost || (waterConnection.connections * 5000),
                    details: `${waterConnection.connections} connection(s)`
                });
            }

            // Security Guards
            if (securityGuard && securityGuard.quantity > 0) {
                items.push({
                    id: 'security',
                    name: 'Security Guards',
                    category: 'Staff',
                    totalPrice: securityGuard.totalCost || (securityGuard.quantity * 2500 * securityGuard.days),
                    details: `${securityGuard.quantity} guard(s) × ${securityGuard.days} days`
                });
            }

            // Housekeeping
            if (housekeeping && housekeeping.staff > 0) {
                items.push({
                    id: 'housekeeping',
                    name: 'Housekeeping Staff',
                    category: 'Staff',
                    totalPrice: housekeeping.totalCost || (housekeeping.staff * 2000 * housekeeping.shifts * housekeeping.days),
                    details: `${housekeeping.staff} staff × ${housekeeping.shifts} shifts × ${housekeeping.days} days`
                });
            }

            // Machinery Display
            if (machineryDisplay.length > 0) {
                items.push({
                    id: 'machinery',
                    name: 'Machinery Display',
                    category: 'Equipment',
                    totalPrice: 0,
                    details: `${machineryDisplay.length} machine(s) to be displayed`
                });
            }

            // Security Deposit
            if (securityDeposit && securityDeposit.amountINR) {
                items.push({
                    id: 'security_deposit',
                    name: 'Security Deposit (Refundable)',
                    category: 'Deposit',
                    totalPrice: securityDeposit.amountINR,
                    details: `${securityDeposit.category} sq.m (Booth area: ${securityDeposit.boothArea || '?'} sq.m)`
                });

                // Track payment status for security deposit
                if (securityDeposit.isPaid) {
                    items.push({
                        id: 'security_deposit_paid',
                        name: 'Security Deposit - Payment Status',
                        category: 'Payment',
                        totalPrice: 0,
                        details: `✓ Paid - Reference: ${securityDeposit.paymentReference}`
                    });
                } else {
                    items.push({
                        id: 'security_deposit_pending',
                        name: 'Security Deposit - Payment Status',
                        category: 'Payment',
                        totalPrice: 0,
                        details: `⏳ Pending - Amount: ₹${securityDeposit.amountINR.toLocaleString()}`
                    });
                }
            }

            // Personnel Passes
            if (personnel.length > 0) {
                const validPersonnel = personnel.filter((p: any) => p.name);
                const paidPasses = Math.max(0, validPersonnel.length - 5);
                const passesCost = paidPasses * 1000;
                if (passesCost > 0) {
                    items.push({
                        id: 'personnel_passes',
                        name: 'Additional Exhibitor Passes',
                        category: 'Passes',
                        totalPrice: passesCost,
                        details: `${paidPasses} additional passes @ ₹1000 each`
                    });
                }
            }

            setSummary(items);
        } catch (err) {
            console.error('Error loading data:', err);
            setError('Failed to load requirement data');
        } finally {
            setLoading(false);
        }
    };

    const calculateSubtotal = () => {
        return summary.reduce((sum, item) => sum + item.totalPrice, 0);
    };

    const calculateGST = () => {
        return (calculateSubtotal() * gstPercentage) / 100;
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateGST();
    };

    const handleSubmit = async () => {
        if (!acceptedTerms) {
            toast.error('Please accept the terms and conditions');
            return;
        }

        if (summary.filter(item => item.totalPrice > 0).length === 0) {
            toast.error('Please add at least one requirement');
            return;
        }

        setSubmitting(true);
        setError(null);

        try {
            // Transform furniture items to expected format
            const furnitureItems = allFormData.furnitureCart.map((item: any) => ({
                id: item.id,
                code: item.code || item.id,
                name: item.name,
                quantity: item.quantity,
                cost: item.pricePerDay || item.cost,
                totalCost: (item.pricePerDay || item.cost) * item.quantity
            }));

            // Transform hostess requirements
            let hostessRequirements: any[] = [];
            if (allFormData.hostessReq) {
                if (allFormData.hostessReq.categoryA > 0) {
                    hostessRequirements.push({
                        category: 'A',
                        quantity: allFormData.hostessReq.categoryA,
                        noOfDays: allFormData.hostessReq.days,
                        ratePerDay: 5000,
                        amount: allFormData.hostessReq.categoryA * 5000 * allFormData.hostessReq.days
                    });
                }
                if (allFormData.hostessReq.categoryB > 0) {
                    hostessRequirements.push({
                        category: 'B',
                        quantity: allFormData.hostessReq.categoryB,
                        noOfDays: allFormData.hostessReq.days,
                        ratePerDay: 4000,
                        amount: allFormData.hostessReq.categoryB * 4000 * allFormData.hostessReq.days
                    });
                }
            }

            // Prepare security deposit data
            let securityDepositData = undefined;
            if (allFormData.securityDeposit && allFormData.securityDeposit.amountINR) {
                securityDepositData = {
                    boothSq: parseFloat(allFormData.boothDetails?.sqMtrBooked) || 0,
                    amountINR: allFormData.securityDeposit.amountINR,
                    category: allFormData.securityDeposit.category,
                    isPaid: allFormData.securityDeposit.isPaid || false,
                    paymentReference: allFormData.securityDeposit.paymentReference || '',
                    paidAt: allFormData.securityDeposit.paidAt || null
                };
            }

            // Prepare data for API submission using the existing submit method
            const submissionData = {
                generalInfo: {
                    companyName: allFormData.generalInfo?.companyName || '',
                    firstName: allFormData.generalInfo?.firstName || '',
                    lastName: allFormData.generalInfo?.lastName || '',
                    email: allFormData.generalInfo?.email || '',
                    mobile: allFormData.generalInfo?.mobile || '',
                    gstNumber: allFormData.generalInfo?.gstNumber || '',
                },
                boothDetails: {
                    boothNo: allFormData.boothDetails?.boothNo || '',
                    sqMtrBooked: allFormData.boothDetails?.sqMtrBooked || '',
                    contactPerson: allFormData.boothDetails?.contactPerson || '',
                },
                eventName: 'Tyre Expo 2024',
                eventDate: new Date().toISOString(),
                furnitureItems: furnitureItems,
                electricalLoad: allFormData.electricalLoad ? {
                    temporaryLoad: allFormData.electricalLoad.temporaryLoad || '',
                    temporaryTotal: (parseFloat(allFormData.electricalLoad.temporaryLoad) || 0) * 3500,
                    exhibitionLoad: allFormData.electricalLoad.exhibitionLoad || '',
                    exhibitionTotal: (parseFloat(allFormData.electricalLoad.exhibitionLoad) || 0) * 3500,
                } : undefined,
                hostessRequirements: hostessRequirements,
                compressedAir: allFormData.compressedAir ? {
                    qty: allFormData.compressedAir.connections || 0,
                    cfmRange: allFormData.compressedAir.cfmRange || 'Standard',
                    powerKW: allFormData.compressedAir.powerKW || 0,
                    costPerConnection: allFormData.compressedAir.costPerConnection || 5000,
                    totalCost: allFormData.compressedAir.totalCost || (allFormData.compressedAir.connections * 5000)
                } : undefined,
                waterConnection: allFormData.waterConnection ? {
                    connections: allFormData.waterConnection.connections || 0,
                    costPerConnection: allFormData.waterConnection.costPerConnection || 5000,
                    totalCost: allFormData.waterConnection.totalCost || (allFormData.waterConnection.connections * 5000)
                } : undefined,
                securityGuard: allFormData.securityGuard ? {
                    quantity: allFormData.securityGuard.quantity || 0,
                    noOfDays: allFormData.securityGuard.days || 3,
                    totalCost: allFormData.securityGuard.totalCost || (allFormData.securityGuard.quantity * 2500 * allFormData.securityGuard.days)
                } : undefined,
                housekeepingStaff: allFormData.housekeeping ? {
                    quantity: allFormData.housekeeping.staff || 0,
                    noOfDays: allFormData.housekeeping.days || 3,
                    chargesPerShift: allFormData.housekeeping.costPerStaffPerShift || 2000,
                    totalCost: allFormData.housekeeping.totalCost || (allFormData.housekeeping.staff * 2000 * allFormData.housekeeping.shifts * allFormData.housekeeping.days)
                } : undefined,
                securityDeposit: securityDepositData,
                notes: `Payment Method: ${paymentMethod}, Subtotal: ₹${calculateSubtotal()}, GST: ${gstPercentage}%, Total: ₹${calculateTotal()}`
            };

            // Use the existing submit method
            const response = await extraRequirementsAPI.submit(submissionData);

            if (response.success) {
                toast.success('Requirements submitted successfully!');

                // Clear all temporary storage
                const keysToRemove = [
                    'exhibitorGeneralInfo', 'exhibitorBoothDetails', 'exhibitorPersonnel',
                    'exhibitorMachineryDisplay', 'furnitureCart', 'electricalRequirement',
                    'hostessRequirement', 'compressedAirRequirement', 'waterConnectionRequirement',
                    'securityGuardRequirement', 'housekeepingRequirement', 'securityDeposit'
                ];
                keysToRemove.forEach(key => localStorage.removeItem(key));

                // Redirect to success/confirmation page
                router.push('/dashboard/requirements/confirmed');
            } else {
                setError(response.error || 'Failed to submit requirements');
                toast.error(response.error || 'Failed to submit');
            }
        } catch (err: any) {
            console.error('Error submitting:', err);
            const errorMsg = err.response?.data?.error || err.message || 'Failed to submit';
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setSubmitting(false);
        }
    };

    const handlePayment = async () => {
        if (!acceptedTerms) {
            toast.error('Please accept the terms and conditions');
            return;
        }

        if (summary.filter(item => item.totalPrice > 0).length === 0) {
            toast.error('Please add at least one requirement');
            return;
        }

        // For payment gateway integration
        toast.loading('Redirecting to payment gateway...');

        setTimeout(async () => {
            toast.dismiss();
            await handleSubmit();
        }, 1500);
    };

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading your requirements preview...</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <button onClick={() => router.back()} className="p-2 text-gray-500 hover:text-gray-700 rounded-lg transition">
                    <ArrowLeftIcon className="h-5 w-5" />
                </button>
                <div className="h-12 w-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <EyeIcon className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Preview & Confirm</h1>
                    <p className="text-gray-500 text-sm">Review your requirements and make payment</p>
                </div>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-start gap-2">
                    <ExclamationTriangleIcon className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content - Summary Items */}
                <div className="lg:col-span-2 space-y-6">
                    {/* General Info Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
                            <UserIcon className="h-5 w-5 text-gray-500" />
                            <h2 className="font-semibold text-gray-800">Exhibitor Information</h2>
                        </div>
                        <div className="p-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                <div>
                                    <span className="text-gray-500">Company Name:</span>
                                    <p className="font-medium text-gray-800">{allFormData.generalInfo?.companyName || 'Not provided'}</p>
                                </div>
                                <div>
                                    <span className="text-gray-500">Contact Person:</span>
                                    <p className="font-medium text-gray-800">{allFormData.generalInfo?.firstName} {allFormData.generalInfo?.lastName}</p>
                                </div>
                                <div>
                                    <span className="text-gray-500">Email:</span>
                                    <p className="font-medium text-gray-800">{allFormData.generalInfo?.email || 'Not provided'}</p>
                                </div>
                                <div>
                                    <span className="text-gray-500">Mobile:</span>
                                    <p className="font-medium text-gray-800">{allFormData.generalInfo?.mobile || 'Not provided'}</p>
                                </div>
                                <div>
                                    <span className="text-gray-500">GST Number:</span>
                                    <p className="font-medium text-gray-800">{allFormData.generalInfo?.gstNumber || 'Not provided'}</p>
                                </div>
                                <div>
                                    <span className="text-gray-500">PAN Number:</span>
                                    <p className="font-medium text-gray-800">{allFormData.generalInfo?.panNumber || 'Not provided'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Booth Details Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
                            <MapPinIcon className="h-5 w-5 text-gray-500" />
                            <h2 className="font-semibold text-gray-800">Booth Details</h2>
                        </div>
                        <div className="p-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                <div>
                                    <span className="text-gray-500">Booth Number:</span>
                                    <p className="font-medium text-gray-800">{allFormData.boothDetails?.boothNo || 'Not assigned'}</p>
                                </div>
                                <div>
                                    <span className="text-gray-500">Area Booked:</span>
                                    <p className="font-medium text-gray-800">{allFormData.boothDetails?.sqMtrBooked || '0'} sq.m</p>
                                </div>
                                <div>
                                    <span className="text-gray-500">Contact Person:</span>
                                    <p className="font-medium text-gray-800">{allFormData.boothDetails?.contactPerson || 'Not provided'}</p>
                                </div>
                                <div>
                                    <span className="text-gray-500">Contractor:</span>
                                    <p className="font-medium text-gray-800">{allFormData.boothDetails?.contractorCompany || 'Not specified'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Requirements Summary Table */}
                    {summary.filter(item => item.totalPrice > 0).length > 0 && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
                                <h2 className="font-semibold text-gray-800">Selected Requirements</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-gray-600 font-medium">Item</th>
                                            <th className="px-4 py-3 text-left text-gray-600 font-medium">Category</th>
                                            <th className="px-4 py-3 text-right text-gray-600 font-medium">Amount (₹)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {summary.filter(item => item.totalPrice > 0 && item.category !== 'Payment').map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-3">
                                                    <p className="font-medium text-gray-800">{item.name}</p>
                                                    {item.details && (
                                                        <p className="text-xs text-gray-400 mt-0.5">{item.details}</p>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                                        {item.category}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-right font-medium text-gray-800">
                                                    ₹{item.totalPrice.toLocaleString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Payment Status Items */}
                    {summary.filter(item => item.category === 'Payment').length > 0 && (
                        <div className={`rounded-2xl p-5 border ${summary.some(item => item.id === 'security_deposit_pending') ? 'bg-yellow-50 border-yellow-200' : 'bg-green-50 border-green-200'}`}>
                            <h3 className={`font-semibold mb-2 ${summary.some(item => item.id === 'security_deposit_pending') ? 'text-yellow-800' : 'text-green-800'}`}>
                                Payment Information
                            </h3>
                            <div className="space-y-2">
                                {summary.filter(item => item.category === 'Payment').map((item) => (
                                    <div key={item.id} className={`text-sm ${item.id.includes('pending') ? 'text-yellow-700' : 'text-green-700'}`}>
                                        {item.details}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Additional Information Items */}
                    {summary.filter(item => item.totalPrice === 0 && item.category !== 'Payment').length > 0 && (
                        <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
                            <h3 className="font-semibold text-blue-800 mb-2">Additional Information Provided</h3>
                            <div className="space-y-2">
                                {summary.filter(item => item.totalPrice === 0 && item.category !== 'Payment').map((item) => (
                                    <div key={item.id} className="text-sm text-blue-700">
                                        ✓ {item.name}: {item.details}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* No Requirements Message */}
                    {summary.filter(item => item.totalPrice > 0).length === 0 && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 text-center">
                            <ExclamationTriangleIcon className="h-12 w-12 text-yellow-500 mx-auto mb-3" />
                            <h3 className="text-lg font-semibold text-yellow-800 mb-1">No Requirements Added</h3>
                            <p className="text-yellow-600 text-sm mb-4">You haven't added any requirements yet.</p>
                            <button
                                onClick={() => router.push('/dashboard/requirements/wizard')}
                                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                            >
                                Add Requirements
                            </button>
                        </div>
                    )}
                </div>

                {/* Sidebar - Cost Summary & Payment */}
                <div className="lg:col-span-1">
                    {/* Cost Summary Card */}
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-5 text-white sticky top-24">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <CurrencyRupeeIcon className="h-5 w-5" />
                            Cost Summary
                        </h3>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-white/80">Subtotal:</span>
                                <span className="font-semibold">₹{calculateSubtotal().toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-white/80">GST ({gstPercentage}%):</span>
                                <span className="font-semibold">₹{calculateGST().toLocaleString()}</span>
                            </div>
                            <div className="border-t border-white/20 pt-3 mt-2">
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total Amount:</span>
                                    <span>₹{calculateTotal().toLocaleString()}</span>
                                </div>
                                <p className="text-xs text-white/70 mt-1">Including all taxes</p>
                            </div>
                        </div>

                        {/* Security Deposit Status in Sidebar */}
                        {allFormData.securityDeposit && allFormData.securityDeposit.amountINR && (
                            <div className={`mt-4 p-3 rounded-xl ${allFormData.securityDeposit.isPaid ? 'bg-green-500/30' : 'bg-yellow-500/30'}`}>
                                <p className="text-xs font-medium">Security Deposit</p>
                                <p className="text-sm font-bold">₹{allFormData.securityDeposit.amountINR.toLocaleString()}</p>
                                <p className={`text-xs mt-1 ${allFormData.securityDeposit.isPaid ? 'text-green-200' : 'text-yellow-200'}`}>
                                    {allFormData.securityDeposit.isPaid ? '✓ Paid' : '⏳ Pending'}
                                </p>
                            </div>
                        )}

                        {/* Payment Method Selection */}
                        <div className="mt-5 pt-4 border-t border-white/20">
                            <label className="block text-sm font-medium mb-2">Payment Method</label>
                            <div className="space-y-2">
                                {[
                                    { id: 'card', name: 'Credit / Debit Card', icon: CreditCardIcon },
                                    { id: 'netbanking', name: 'Net Banking', icon: BuildingOfficeIcon },
                                    { id: 'upi', name: 'UPI', icon: BanknotesIcon },
                                    { id: 'demanddraft', name: 'Demand Draft (Offline)', icon: DocumentTextIcon },
                                ].map((method) => (
                                    <label
                                        key={method.id}
                                        className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition ${paymentMethod === method.id ? 'bg-white/20' : 'hover:bg-white/10'}`}
                                    >
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value={method.id}
                                            checked={paymentMethod === method.id}
                                            onChange={() => setPaymentMethod(method.id as any)}
                                            className="w-4 h-4 accent-white"
                                        />
                                        <method.icon className="h-4 w-4" />
                                        <span className="text-sm">{method.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Terms & Conditions */}
                        <div className="mt-4 flex items-start gap-2">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={acceptedTerms}
                                onChange={(e) => setAcceptedTerms(e.target.checked)}
                                className="mt-0.5 w-4 h-4 rounded border-white/30 bg-transparent checked:bg-white checked:border-white"
                            />
                            <label htmlFor="terms" className="text-xs text-white/80">
                                I confirm that all information provided is correct and agree to the{' '}
                                <button
                                    type="button"
                                    className="underline hover:text-white"
                                    onClick={() => router.push('/terms')}
                                >
                                    Terms & Conditions
                                </button>
                            </label>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-5 space-y-2">
                            <button
                                onClick={handlePayment}
                                disabled={submitting || summary.filter(item => item.totalPrice > 0).length === 0}
                                className="w-full py-2.5 bg-white text-amber-600 font-semibold rounded-lg hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {submitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-amber-600 border-t-transparent"></div>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <CreditCardIcon className="h-4 w-4" />
                                        Proceed to Payment
                                    </>
                                )}
                            </button>

                            <button
                                onClick={handleSubmit}
                                disabled={submitting}
                                className="w-full py-2 bg-white/20 text-white font-medium rounded-lg hover:bg-white/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Save as Draft
                            </button>
                        </div>

                        <p className="text-[10px] text-white/60 text-center mt-3">
                            By proceeding, you agree to our payment terms. Security deposit is refundable as per policy.
                        </p>
                    </div>

                    {/* Need Help Card */}
                    <div className="mt-4 bg-gray-50 rounded-2xl p-4">
                        <h4 className="font-semibold text-gray-800 text-sm mb-2">Need Assistance?</h4>
                        <p className="text-xs text-gray-600 mb-2">
                            For any queries regarding your requirements or payment, contact our support team.
                        </p>
                        <div className="text-xs text-gray-500">
                            <p>📞 +91-XXXXXXXXXX</p>
                            <p>✉️ support@tyre-expo.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}