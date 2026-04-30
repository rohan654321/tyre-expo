// app/admin/floor-plan/page.tsx - UPDATED
"use client";

import { useState, useEffect, useRef } from "react";
import { ZoomIn, ZoomOut, Upload, Map, RefreshCw, X, Save, Image as ImageIcon, Maximize, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import { getAdminToken } from "@/lib/api/auth";

interface Booth {
    id: string;
    number: string;
    status: "available" | "booked" | "reserved";
    company?: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

interface FloorPlanData {
    imageUrl: string | null;
    booths: Booth[];
}

const getStatusColor = (status: string) => {
    switch (status) {
        case "available": return "bg-green-500/60 border-green-400 hover:bg-green-500/80";
        case "booked": return "bg-blue-500/60 border-blue-400 hover:bg-blue-500/80";
        case "reserved": return "bg-yellow-500/60 border-yellow-400 hover:bg-yellow-500/80";
        default: return "bg-gray-500/60 border-gray-400";
    }
};

const getStatusLabel = (status: string) => {
    switch (status) {
        case "available": return "Available";
        case "booked": return "Booked";
        case "reserved": return "Reserved";
        default: return status;
    }
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function FloorPlanPage() {
    const { isAuthenticated, isLoading: authLoading } = useAuth();
    const [floorPlan, setFloorPlan] = useState<FloorPlanData | null>(null);
    const [loading, setLoading] = useState(true);
    const [zoom, setZoom] = useState(1);
    const [selectedBooth, setSelectedBooth] = useState<Booth | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [updatingBooth, setUpdatingBooth] = useState(false);
    const [editBoothData, setEditBoothData] = useState<Partial<Booth>>({});
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Redirect if not authenticated
    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            console.log("❌ Not authenticated, redirecting to login");
            window.location.href = "/admin/login";
        }
    }, [isAuthenticated, authLoading]);

    // Fetch floor plan data
    const fetchFloorPlan = async () => {
        const token = getAdminToken();
        if (!token) {
            console.log("❌ No token found");
            toast.error("Please login again");
            window.location.href = "/admin/login";
            return;
        }

        try {
            setLoading(true);
            setError(null);

            console.log("📡 Fetching floor plan with token:", token.substring(0, 20) + "...");

            const response = await fetch(`${API_BASE_URL}/floor-plan`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log("📡 Response status:", response.status);

            // If unauthorized, redirect to login
            if (response.status === 401) {
                console.log("❌ Unauthorized - Token invalid or expired");
                localStorage.removeItem('adminToken');
                localStorage.removeItem('adminUser');
                toast.error("Session expired. Please login again.");
                window.location.href = "/admin/login";
                return;
            }

            const data = await response.json();
            console.log('📡 Floor plan response:', data);

            if (data.success && data.data) {
                const imageUrl = data.data.imageUrl || data.data.baseImageUrl || null;
                const booths = data.data.booths || [];
                setFloorPlan({ imageUrl, booths });

                if (!imageUrl) {
                    setShowUploadModal(true);
                }
            } else {
                setFloorPlan({ imageUrl: null, booths: [] });
                setShowUploadModal(true);
            }
        } catch (error) {
            console.error("Failed to fetch floor plan:", error);
            setError("Failed to load floor plan. Please check if backend is running.");
            toast.error("Failed to load floor plan");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchFloorPlan();
        }
    }, [isAuthenticated]);

    // Rest of your component remains the same...
    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2.5));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));
    const handleZoomReset = () => setZoom(1);

    const handleBoothClick = (booth: Booth) => {
        setSelectedBooth(booth);
        setEditBoothData({ ...booth });
        setShowModal(true);
    };

    const handleUpdateBooth = async () => {
        if (!selectedBooth) return;

        const token = getAdminToken();
        if (!token) {
            toast.error("Please login again");
            window.location.href = "/admin/login";
            return;
        }

        setUpdatingBooth(true);
        try {
            const response = await fetch(`${API_BASE_URL}/floor-plan/booth/${selectedBooth.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editBoothData)
            });

            const data = await response.json();

            if (data.success) {
                toast.success("Booth updated successfully");
                await fetchFloorPlan();
                setShowModal(false);
            } else {
                toast.error(data.error || "Failed to update booth");
            }
        } catch (error) {
            console.error("Update booth error:", error);
            toast.error("Failed to update booth");
        } finally {
            setUpdatingBooth(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const token = getAdminToken();
        if (!token) {
            toast.error("Please login again");
            window.location.href = "/admin/login";
            return;
        }

        if (!file.type.startsWith('image/')) {
            toast.error("Please upload an image file");
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            toast.error("Image must be less than 10MB");
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch(`${API_BASE_URL}/floor-plan/upload-image`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                toast.success("Floor plan uploaded successfully");
                await fetchFloorPlan();
                setShowUploadModal(false);
            } else {
                toast.error(data.error || "Failed to upload image");
            }
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Failed to upload floor plan image");
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    if (authLoading || loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    const stats = {
        total: floorPlan?.booths?.length || 0,
        available: floorPlan?.booths?.filter(b => b.status === "available").length || 0,
        booked: floorPlan?.booths?.filter(b => b.status === "booked").length || 0,
        reserved: floorPlan?.booths?.filter(b => b.status === "reserved").length || 0,
    };

    return (
        <div className="space-y-6 p-6">
            {/* Your existing JSX here */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Floor Plan Manager</h1>
                    <p className="text-gray-400 mt-1">
                        {floorPlan?.imageUrl ? "Floor plan active" : "No floor plan uploaded"}
                    </p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowUploadModal(true)}
                        className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition flex items-center gap-2"
                    >
                        <Upload size={16} />
                        Upload Layout
                    </button>
                    <button
                        onClick={fetchFloorPlan}
                        className="px-4 py-2 bg-gray-800 rounded-lg text-gray-300 hover:bg-gray-700 transition flex items-center gap-2"
                    >
                        <RefreshCw size={16} />
                        Refresh
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-red-400" />
                        <p className="text-red-300">{error}</p>
                    </div>
                    <button onClick={fetchFloorPlan} className="mt-2 text-sm text-orange-400 hover:text-orange-300">
                        Try again
                    </button>
                </div>
            )}

            {!floorPlan?.imageUrl && !error && (
                <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-12 text-center">
                    <Map className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No Floor Plan Uploaded</h3>
                    <p className="text-gray-400 mb-6">Upload a floor plan image to get started</p>
                    <button
                        onClick={() => setShowUploadModal(true)}
                        className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition flex items-center gap-2 mx-auto"
                    >
                        <Upload size={18} />
                        Upload Floor Plan
                    </button>
                </div>
            )}

            {floorPlan?.imageUrl && (
                <>
                    <div className="flex items-center gap-3">
                        <button onClick={handleZoomOut} className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
                            <ZoomOut size={18} className="text-gray-300" />
                        </button>
                        <span className="text-white font-medium">{Math.round(zoom * 100)}%</span>
                        <button onClick={handleZoomIn} className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
                            <ZoomIn size={18} className="text-gray-300" />
                        </button>
                        <button onClick={handleZoomReset} className="px-3 py-2 bg-gray-800 rounded-lg text-sm text-gray-300 hover:bg-gray-700 transition">
                            <Maximize size={14} className="inline mr-1" />
                            Reset
                        </button>
                    </div>

                    <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-auto" style={{ height: "600px" }}>
                        <div className="relative" style={{ transform: `scale(${zoom})`, transformOrigin: "top left", width: "fit-content", minWidth: "100%" }}>
                            <div className="relative inline-block">
                                <img src={floorPlan.imageUrl} alt="Floor Plan" className="block max-w-none" />
                                {floorPlan.booths?.map((booth) => (
                                    <div
                                        key={booth.id}
                                        onClick={() => handleBoothClick(booth)}
                                        className={`absolute border-2 rounded-lg cursor-pointer transition-all hover:shadow-lg hover:brightness-110 ${getStatusColor(booth.status)}`}
                                        style={{
                                            left: `${booth.x}%`,
                                            top: `${booth.y}%`,
                                            width: `${booth.width}%`,
                                            height: `${booth.height}%`,
                                        }}
                                    >
                                        <div className="absolute inset-0 flex flex-col items-center justify-center p-1">
                                            <span className="text-white font-bold text-xs md:text-sm text-center truncate w-full">{booth.number}</span>
                                            {booth.company && <span className="text-xs text-gray-200 truncate w-full text-center hidden sm:block">{booth.company}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-700">
                            <p className="text-2xl font-bold text-white">{stats.total}</p>
                            <p className="text-xs text-gray-400">Total Booths</p>
                        </div>
                        <div className="bg-green-500/10 rounded-xl p-4 text-center border border-green-500/30">
                            <p className="text-2xl font-bold text-green-400">{stats.available}</p>
                            <p className="text-xs text-gray-400">Available</p>
                        </div>
                        <div className="bg-blue-500/10 rounded-xl p-4 text-center border border-blue-500/30">
                            <p className="text-2xl font-bold text-blue-400">{stats.booked}</p>
                            <p className="text-xs text-gray-400">Booked</p>
                        </div>
                        <div className="bg-yellow-500/10 rounded-xl p-4 text-center border border-yellow-500/30">
                            <p className="text-2xl font-bold text-yellow-400">{stats.reserved}</p>
                            <p className="text-xs text-gray-400">Reserved</p>
                        </div>
                    </div>
                </>
            )}

            {/* Modals remain the same */}
            {showModal && selectedBooth && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 rounded-2xl max-w-md w-full p-6 border border-gray-700">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-white">Booth {selectedBooth.number}</h3>
                            <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-700 rounded-lg transition">
                                <X size={20} className="text-gray-400" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Booth Number</label>
                                <input type="text" value={editBoothData.number || ""} onChange={(e) => setEditBoothData({ ...editBoothData, number: e.target.value })} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                                <select value={editBoothData.status || "available"} onChange={(e) => setEditBoothData({ ...editBoothData, status: e.target.value as any })} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                                    <option value="available">Available</option>
                                    <option value="booked">Booked</option>
                                    <option value="reserved">Reserved</option>
                                </select>
                            </div>
                            {(editBoothData.status === "booked" || editBoothData.status === "reserved") && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Company Name</label>
                                    <input type="text" value={editBoothData.company || ""} onChange={(e) => setEditBoothData({ ...editBoothData, company: e.target.value })} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" />
                                </div>
                            )}
                        </div>
                        <div className="flex gap-3 mt-6 pt-4 border-t border-gray-700">
                            <button onClick={handleUpdateBooth} disabled={updatingBooth} className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition disabled:opacity-50 flex items-center justify-center gap-2">
                                {updatingBooth ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div> : <Save size={16} />}
                                {updatingBooth ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showUploadModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 rounded-2xl max-w-md w-full p-6 border border-gray-700">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-white">Upload Floor Plan</h3>
                            <button onClick={() => setShowUploadModal(false)} className="p-1 hover:bg-gray-700 rounded-lg transition">
                                <X size={20} className="text-gray-400" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                                <ImageIcon className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                                <p className="text-gray-400 mb-2">Click or drag to upload floor plan image</p>
                                <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 10MB</p>
                                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="floorPlanUpload" />
                                <label htmlFor="floorPlanUpload" className="mt-4 inline-block px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition cursor-pointer">Select Image</label>
                            </div>
                            {uploading && (
                                <div className="flex items-center justify-center gap-2 text-gray-300">
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-orange-500 border-t-transparent"></div>
                                    <span>Uploading...</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}