// app/admin/floor-plan/page.tsx
"use client";

import { useState, useRef } from "react";
import { ZoomIn, ZoomOut, Upload, Map, RefreshCw, X, Grid, Download } from "lucide-react";

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

const sampleBooths: Booth[] = [
    { id: "1", number: "A-101", status: "available", x: 10, y: 10, width: 80, height: 60 },
    { id: "2", number: "A-102", status: "booked", company: "Apollo Tyres", x: 120, y: 10, width: 80, height: 60 },
    { id: "3", number: "A-103", status: "reserved", company: "MRF", x: 230, y: 10, width: 80, height: 60 },
    { id: "4", number: "B-101", status: "available", x: 10, y: 100, width: 80, height: 60 },
    { id: "5", number: "B-102", status: "booked", company: "Bridgestone", x: 340, y: 100, width: 80, height: 60 },
    { id: "6", number: "C-101", status: "available", x: 10, y: 190, width: 80, height: 60 },
    { id: "7", number: "C-102", status: "booked", company: "CEAT", x: 450, y: 190, width: 80, height: 60 },
    { id: "8", number: "D-101", status: "available", x: 10, y: 280, width: 80, height: 60 },
];

const getStatusColor = (status: string) => {
    switch (status) {
        case "available": return "bg-green-500/40 border-green-400";
        case "booked": return "bg-blue-500/40 border-blue-400";
        case "reserved": return "bg-yellow-500/40 border-yellow-400";
        default: return "bg-gray-500/40 border-gray-400";
    }
};

export default function FloorPlanPage() {
    const [zoom, setZoom] = useState(1);
    const [selectedBooth, setSelectedBooth] = useState<Booth | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [hasImage, setHasImage] = useState(true);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));
    const handleZoomReset = () => setZoom(1);

    const handleBoothClick = (booth: Booth) => {
        setSelectedBooth(booth);
        setShowModal(true);
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case "available": return "Available";
            case "booked": return "Booked";
            case "reserved": return "Reserved";
            default: return status;
        }
    };

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Floor Plan Manager</h1>
                    <p className="text-gray-400 mt-1">Manage exhibition hall floor plan and booth allocation</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-gray-800 rounded-lg text-gray-300 hover:bg-gray-700 transition flex items-center gap-2">
                        <Download size={16} />
                        Export
                    </button>
                    <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition flex items-center gap-2">
                        <Upload size={16} />
                        Upload Layout
                    </button>
                </div>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-3">
                <button onClick={handleZoomOut} className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
                    <ZoomOut size={18} className="text-gray-300" />
                </button>
                <span className="text-white font-medium">{Math.round(zoom * 100)}%</span>
                <button onClick={handleZoomIn} className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
                    <ZoomIn size={18} className="text-gray-300" />
                </button>
                <button onClick={handleZoomReset} className="px-3 py-2 bg-gray-800 rounded-lg text-sm text-gray-300 hover:bg-gray-700 transition">
                    Reset
                </button>
            </div>

            {/* Floor Plan Canvas */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-auto" style={{ height: "600px" }}>
                <div
                    className="relative"
                    style={{
                        transform: `scale(${zoom})`,
                        transformOrigin: "top left",
                        width: "fit-content",
                        minWidth: "100%"
                    }}
                >
                    {/* Background Grid */}
                    <div className="relative w-[800px] h-[500px] bg-gray-900">
                        {/* Grid lines */}
                        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, #444 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>

                        {/* Booth rectangles */}
                        {sampleBooths.map((booth) => (
                            <div
                                key={booth.id}
                                onClick={() => handleBoothClick(booth)}
                                className={`absolute border-2 rounded-lg cursor-pointer transition-all hover:shadow-lg ${getStatusColor(booth.status)}`}
                                style={{
                                    left: `${booth.x}px`,
                                    top: `${booth.y}px`,
                                    width: `${booth.width}px`,
                                    height: `${booth.height}px`,
                                }}
                            >
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-white font-bold text-sm">{booth.number}</span>
                                    {booth.company && (
                                        <span className="text-xs text-gray-300 truncate max-w-[70px]">{booth.company}</span>
                                    )}
                                </div>
                                <div className="absolute -top-6 left-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition whitespace-nowrap pointer-events-none">
                                    {booth.number} - {getStatusLabel(booth.status)}
                                </div>
                            </div>
                        ))}

                        {/* Legend */}
                        <div className="absolute bottom-4 right-4 bg-gray-800 rounded-lg p-3 border border-gray-700">
                            <p className="text-xs font-medium text-gray-400 mb-2">Legend</p>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded bg-green-500/40 border border-green-400"></div>
                                    <span className="text-xs text-gray-300">Available</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded bg-blue-500/40 border border-blue-400"></div>
                                    <span className="text-xs text-gray-300">Booked</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded bg-yellow-500/40 border border-yellow-400"></div>
                                    <span className="text-xs text-gray-300">Reserved</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-700">
                    <p className="text-2xl font-bold text-white">{sampleBooths.length}</p>
                    <p className="text-xs text-gray-400">Total Booths</p>
                </div>
                <div className="bg-green-500/10 rounded-xl p-4 text-center border border-green-500/30">
                    <p className="text-2xl font-bold text-green-400">{sampleBooths.filter(b => b.status === "available").length}</p>
                    <p className="text-xs text-gray-400">Available</p>
                </div>
                <div className="bg-blue-500/10 rounded-xl p-4 text-center border border-blue-500/30">
                    <p className="text-2xl font-bold text-blue-400">{sampleBooths.filter(b => b.status === "booked").length}</p>
                    <p className="text-xs text-gray-400">Booked</p>
                </div>
                <div className="bg-yellow-500/10 rounded-xl p-4 text-center border border-yellow-500/30">
                    <p className="text-2xl font-bold text-yellow-400">{sampleBooths.filter(b => b.status === "reserved").length}</p>
                    <p className="text-xs text-gray-400">Reserved</p>
                </div>
            </div>

            {/* Booth Details Modal */}
            {showModal && selectedBooth && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 rounded-2xl max-w-md w-full p-6 border border-gray-700">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-white">Booth {selectedBooth.number}</h3>
                            <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-700 rounded-lg transition">
                                <X size={20} className="text-gray-400" />
                            </button>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between py-2 border-b border-gray-700">
                                <span className="text-gray-400">Status:</span>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${selectedBooth.status === "available" ? "bg-green-500/20 text-green-400" :
                                        selectedBooth.status === "booked" ? "bg-blue-500/20 text-blue-400" :
                                            "bg-yellow-500/20 text-yellow-400"
                                    }`}>
                                    {getStatusLabel(selectedBooth.status)}
                                </span>
                            </div>

                            {selectedBooth.company && (
                                <div className="flex justify-between py-2 border-b border-gray-700">
                                    <span className="text-gray-400">Company:</span>
                                    <span className="text-white">{selectedBooth.company}</span>
                                </div>
                            )}

                            <div className="flex justify-between py-2">
                                <span className="text-gray-400">Dimensions:</span>
                                <span className="text-white">{selectedBooth.width} x {selectedBooth.height} sq ft</span>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6 pt-4 border-t border-gray-700">
                            <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                                Edit Booth
                            </button>
                            {selectedBooth.status === "available" && (
                                <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                                    Assign Exhibitor
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}