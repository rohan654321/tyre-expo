// app/admin/media/page.tsx
"use client";

import { useState } from "react";
import { Search, Plus, Trash2, Download, Image, Video, File, Grid, List, Upload } from "lucide-react";

interface MediaItem {
    id: string;
    name: string;
    type: "image" | "video" | "document";
    url: string;
    size: string;
    uploadedAt: string;
    category: string;
}

const sampleMedia: MediaItem[] = [
    { id: "1", name: "exhibition-hall.jpg", type: "image", url: "/placeholder.jpg", size: "2.4 MB", uploadedAt: "2024-01-15", category: "Floor Plan" },
    { id: "2", name: "tyre-showcase-video.mp4", type: "video", url: "/placeholder.mp4", size: "45.2 MB", uploadedAt: "2024-01-14", category: "Promotional" },
    { id: "3", name: "exhibitor-manual.pdf", type: "document", url: "/placeholder.pdf", size: "1.8 MB", uploadedAt: "2024-01-13", category: "Documents" },
    { id: "4", name: "apollo-tyre-booth.jpg", type: "image", url: "/placeholder.jpg", size: "3.1 MB", uploadedAt: "2024-01-12", category: "Booth Images" },
    { id: "5", name: "mrf-product-line.jpg", type: "image", url: "/placeholder.jpg", size: "2.8 MB", uploadedAt: "2024-01-11", category: "Product Images" },
    { id: "6", name: "opening-ceremony.mp4", type: "video", url: "/placeholder.mp4", size: "68.3 MB", uploadedAt: "2024-01-10", category: "Event" },
];

export default function MediaPage() {
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    const categories = ["all", "Floor Plan", "Promotional", "Documents", "Booth Images", "Product Images", "Event"];

    const filteredMedia = sampleMedia.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "image": return <Image className="h-8 w-8 text-blue-400" />;
            case "video": return <Video className="h-8 w-8 text-red-400" />;
            default: return <File className="h-8 w-8 text-gray-400" />;
        }
    };

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Media Gallery</h1>
                    <p className="text-gray-400 mt-1">Manage images, videos, and documents</p>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition flex items-center gap-2">
                    <Upload size={18} />
                    Upload Media
                </button>
            </div>

            {/* Filters */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search media..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                        />
                    </div>
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat === "all" ? "All Categories" : cat}</option>
                        ))}
                    </select>
                    <div className="flex gap-2">
                        <button onClick={() => setViewMode("grid")} className={`p-2 rounded-lg transition ${viewMode === "grid" ? "bg-orange-500 text-white" : "bg-gray-700 text-gray-400 hover:text-white"}`}>
                            <Grid size={18} />
                        </button>
                        <button onClick={() => setViewMode("list")} className={`p-2 rounded-lg transition ${viewMode === "list" ? "bg-orange-500 text-white" : "bg-gray-700 text-gray-400 hover:text-white"}`}>
                            <List size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Media Grid/List */}
            {viewMode === "grid" ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredMedia.map((item) => (
                        <div key={item.id} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden group relative">
                            <div className="aspect-square bg-gray-900 flex items-center justify-center">
                                {getTypeIcon(item.type)}
                            </div>
                            <div className="p-3">
                                <p className="text-sm font-medium text-white truncate">{item.name}</p>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-xs text-gray-400">{item.size}</span>
                                    <span className="text-xs text-gray-500 capitalize">{item.type}</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                            </div>
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
                                <button className="p-2 bg-white rounded-full hover:bg-gray-100">
                                    <Download size={16} className="text-gray-800" />
                                </button>
                                <button className="p-2 bg-white rounded-full hover:bg-gray-100 text-red-500">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
                    <div className="divide-y divide-gray-700">
                        {filteredMedia.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-4 hover:bg-gray-700/50 transition">
                                <div className="flex items-center gap-4">
                                    {getTypeIcon(item.type)}
                                    <div>
                                        <p className="font-medium text-white">{item.name}</p>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className="text-xs text-gray-400">{item.category}</span>
                                            <span className="text-xs text-gray-500">•</span>
                                            <span className="text-xs text-gray-400">{item.size}</span>
                                            <span className="text-xs text-gray-500">•</span>
                                            <span className="text-xs text-gray-400">{item.uploadedAt}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition">
                                        <Download size={16} />
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {filteredMedia.length === 0 && (
                <div className="text-center py-12 bg-gray-800/50 rounded-xl border border-gray-700">
                    <Image className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-400">No media found</p>
                </div>
            )}
        </div>
    );
}