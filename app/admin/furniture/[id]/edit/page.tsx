// app/admin/furniture/[id]/edit/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Image as ImageIcon, X, Upload } from "lucide-react";
import { getFurnitureById, updateFurniture, Furniture } from "@/lib/api/furniture";
import toast from "react-hot-toast";

const categories = ["Tables", "Chairs", "Seating", "Counters", "Storage", "Display", "Decor"];

export default function EditFurniturePage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        code: "",
        description: "",
        size: "",
        cost3Days: "",
        category: "Tables",
        inStock: true,
    });
    const [existingImage, setExistingImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchFurniture = async () => {
            try {
                const response = await getFurnitureById(id);
                if (response.success) {
                    const item = response.data;
                    setFormData({
                        code: item.code,
                        description: item.description,
                        size: item.size || "",
                        cost3Days: item.cost3Days.toString(),
                        category: item.category,
                        inStock: item.inStock,
                    });
                    setExistingImage(item.imageUrl);
                } else {
                    toast.error("Furniture not found");
                    router.push("/admin/furniture");
                }
            } catch (error) {
                console.error("Fetch error:", error);
                toast.error("Failed to load furniture");
                router.push("/admin/furniture");
            } finally {
                setFetching(false);
            }
        };

        fetchFurniture();
    }, [id, router]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error("Image must be less than 5MB");
                return;
            }
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.code) {
            toast.error("Item code is required");
            return;
        }
        if (!formData.description) {
            toast.error("Description is required");
            return;
        }
        if (!formData.cost3Days || parseInt(formData.cost3Days) <= 0) {
            toast.error("Valid rental price is required");
            return;
        }

        setLoading(true);

        try {
            const response = await updateFurniture(id, {
                code: formData.code.toUpperCase(),
                description: formData.description,
                size: formData.size || undefined,
                cost3Days: parseInt(formData.cost3Days),
                category: formData.category,
                inStock: formData.inStock,
            }, imageFile || undefined);

            if (response.success) {
                toast.success("Furniture updated successfully!");
                router.push("/admin/furniture");
            } else {
                toast.error(response.message || "Failed to update furniture");
            }
        } catch (error: any) {
            console.error("Update furniture error:", error);
            const errorMsg = error.response?.data?.message || error.message || "Failed to update furniture";
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 p-6">
            <div className="flex items-center gap-4">
                <button onClick={() => router.back()} className="p-2 hover:bg-gray-800 rounded-lg transition">
                    <ArrowLeft className="h-5 w-5 text-gray-400" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-white">Edit Furniture</h1>
                    <p className="text-gray-400 mt-1">Update furniture item details</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl">
                <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 mb-6">
                    {/* Image Upload */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Furniture Image
                        </label>
                        <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
                            {(imagePreview || existingImage) ? (
                                <div className="relative inline-block">
                                    <img src={imagePreview || existingImage!} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setImageFile(null);
                                            setImagePreview(null);
                                            setExistingImage(null);
                                        }}
                                        className="absolute top-2 right-2 p-1 bg-red-500 rounded-full hover:bg-red-600"
                                    >
                                        <X size={16} className="text-white" />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <ImageIcon className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                                    <p className="text-gray-400 mb-2">Click or drag to upload new image</p>
                                    <p className="text-xs text-gray-500">Leave empty to keep current image</p>
                                    <label className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition cursor-pointer">
                                        <Upload size={16} />
                                        Select Image
                                        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                    </label>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Item Code <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.code}
                                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                placeholder="e.g., TBL-001"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Description <span className="text-red-400">*</span>
                            </label>
                            <textarea
                                rows={3}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                placeholder="Detailed description of the furniture item"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Size
                                </label>
                                <input
                                    type="text"
                                    value={formData.size}
                                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                    placeholder="e.g., 6ft x 3ft"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Category <span className="text-red-400">*</span>
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                >
                                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Rental Price (3 days) <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                                    <input
                                        type="number"
                                        value={formData.cost3Days}
                                        onChange={(e) => setFormData({ ...formData, cost3Days: e.target.value })}
                                        className="w-full pl-8 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                        placeholder="0"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Stock Status
                                </label>
                                <select
                                    value={formData.inStock ? "true" : "false"}
                                    onChange={(e) => setFormData({ ...formData, inStock: e.target.value === "true" })}
                                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                >
                                    <option value="true">In Stock</option>
                                    <option value="false">Out of Stock</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

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
                        className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition flex items-center gap-2 disabled:opacity-50"
                    >
                        {loading ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        ) : (
                            <Save size={18} />
                        )}
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
}