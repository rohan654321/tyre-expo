// app/admin/tyres/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, X, Upload, Plus, Trash2 } from "lucide-react";

export default function AddTyrePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [specifications, setSpecifications] = useState<{ key: string; value: string }[]>([
        { key: "", value: "" }
    ]);

    const [formData, setFormData] = useState({
        brand: "",
        model: "",
        category: "",
        size: "",
        loadIndex: "",
        speedRating: "",
        price: "",
        stock: "",
        description: "",
        status: "active",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const addSpecification = () => {
        setSpecifications([...specifications, { key: "", value: "" }]);
    };

    const removeSpecification = (index: number) => {
        setSpecifications(specifications.filter((_, i) => i !== index));
    };

    const updateSpecification = (index: number, field: "key" | "value", value: string) => {
        const updated = [...specifications];
        updated[index][field] = value;
        setSpecifications(updated);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            router.push("/admin/tyres");
        }, 1000);
    };

    const categories = ["Passenger", "Truck/Bus", "Two-Wheeler", "Off-Road", "Agricultural", "Industrial", "Racing"];
    const brands = ["Apollo", "MRF", "Bridgestone", "CEAT", "JK Tyre", "Continental", "Goodyear"];

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button onClick={() => router.back()} className="p-2 hover:bg-gray-800 rounded-lg transition">
                    <ArrowLeft className="h-5 w-5 text-gray-400" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-white">Add New Tyre Product</h1>
                    <p className="text-gray-400 mt-1">Add a new tyre product to the catalog</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="max-w-4xl">
                {/* Basic Information */}
                <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 mb-6">
                    <h2 className="text-lg font-semibold text-white mb-6">Basic Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Brand <span className="text-red-400">*</span>
                            </label>
                            <select
                                name="brand"
                                required
                                value={formData.brand}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                            >
                                <option value="">Select Brand</option>
                                {brands.map(brand => (
                                    <option key={brand} value={brand}>{brand}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Model <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                name="model"
                                required
                                value={formData.model}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                placeholder="e.g., Alnac 4G"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Category <span className="text-red-400">*</span>
                            </label>
                            <select
                                name="category"
                                required
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                            >
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Size <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                name="size"
                                required
                                value={formData.size}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                placeholder="e.g., 185/65 R15"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Load Index
                            </label>
                            <input
                                type="text"
                                name="loadIndex"
                                value={formData.loadIndex}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                placeholder="e.g., 88"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Speed Rating
                            </label>
                            <input
                                type="text"
                                name="speedRating"
                                value={formData.speedRating}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                placeholder="e.g., H"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Price (per tyre)
                            </label>
                            <input
                                type="text"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                placeholder="e.g., ₹4,500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Stock Quantity
                            </label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                placeholder="0"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Description
                            </label>
                            <textarea
                                name="description"
                                rows={3}
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                placeholder="Product description, features, benefits..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Status
                            </label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Specifications */}
                <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 mb-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-semibold text-white">Technical Specifications</h2>
                        <button type="button" onClick={addSpecification} className="px-3 py-1.5 bg-gray-700 rounded-lg text-sm text-gray-300 hover:bg-gray-600 flex items-center gap-1">
                            <Plus size={14} /> Add
                        </button>
                    </div>

                    <div className="space-y-3">
                        {specifications.map((spec, index) => (
                            <div key={index} className="flex gap-3">
                                <input
                                    type="text"
                                    placeholder="Specification name"
                                    value={spec.key}
                                    onChange={(e) => updateSpecification(index, "key", e.target.value)}
                                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                />
                                <input
                                    type="text"
                                    placeholder="Value"
                                    value={spec.value}
                                    onChange={(e) => updateSpecification(index, "value", e.target.value)}
                                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                />
                                <button type="button" onClick={() => removeSpecification(index)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Images */}
                <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 mb-6">
                    <h2 className="text-lg font-semibold text-white mb-6">Product Images</h2>

                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                        <Upload className="h-10 w-10 text-gray-500 mx-auto mb-3" />
                        <p className="text-gray-400 mb-2">Click or drag and drop to upload product images</p>
                        <p className="text-xs text-gray-500">PNG, JPG up to 5MB (Multiple images allowed)</p>
                        <input type="file" accept="image/*" multiple className="hidden" />
                        <button type="button" className="mt-4 px-4 py-2 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition">
                            Choose Images
                        </button>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-2.5 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-800 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition flex items-center gap-2"
                    >
                        {loading ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        ) : (
                            <Save size={18} />
                        )}
                        {loading ? "Saving..." : "Save Product"}
                    </button>
                </div>
            </form>
        </div>
    );
}