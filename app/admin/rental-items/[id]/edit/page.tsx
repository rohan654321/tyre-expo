// app/admin/rental-items/[id]/edit/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Upload, Image as ImageIcon, X } from "lucide-react";
import { getRentalItemById, updateRentalItem, RentalItem } from "@/lib/api/rentalItems";
import toast from "react-hot-toast";

const categories = [
    { value: "AV", label: "AV Equipment" },
    { value: "IT", label: "IT Equipment" },
    { value: "Other", label: "Other" }
];

export default function EditRentalItemPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [existingImage, setExistingImage] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        code: "",
        name: "",
        description: "",
        costFor3Days: "",
        category: "AV" as "AV" | "IT" | "Other",
        isActive: true,
        displayOrder: 1,
    });

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await getRentalItemById(id);
                if (response.success) {
                    const item = response.data;
                    setFormData({
                        code: item.code,
                        name: item.name,
                        description: item.description,
                        costFor3Days: item.costFor3Days.toString(),
                        category: item.category,
                        isActive: item.isActive,
                        displayOrder: item.displayOrder || 1,
                    });
                    setExistingImage(item.imageUrl);
                } else {
                    toast.error("Rental item not found");
                    router.push("/admin/rental-items");
                }
            } catch (error) {
                console.error("Fetch error:", error);
                toast.error("Failed to load rental item");
                router.push("/admin/rental-items");
            } finally {
                setFetching(false);
            }
        };

        fetchItem();
    }, [id, router]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error("Image must be less than 5MB");
                return;
            }
            if (!file.type.startsWith('image/')) {
                toast.error("Please upload an image file");
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
        if (!formData.name) {
            toast.error("Item name is required");
            return;
        }
        if (!formData.description) {
            toast.error("Description is required");
            return;
        }
        if (!formData.costFor3Days || parseInt(formData.costFor3Days) <= 0) {
            toast.error("Valid rental cost for 3 days is required");
            return;
        }

        setLoading(true);

        try {
            const response = await updateRentalItem(id, {
                code: formData.code.toUpperCase(),
                name: formData.name,
                description: formData.description,
                costFor3Days: parseInt(formData.costFor3Days),
                category: formData.category,
                isActive: formData.isActive,
                displayOrder: formData.displayOrder,
            }, imageFile || undefined);

            if (response.success) {
                toast.success("Rental item updated successfully!");
                router.push("/admin/rental-items");
            } else {
                toast.error(response.message || "Failed to update rental item");
            }
        } catch (error: any) {
            console.error("Update rental item error:", error);
            toast.error(error.response?.data?.message || "Failed to update rental item");
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
                    <h1 className="text-2xl font-bold text-white">Edit Rental Item</h1>
                    <p className="text-gray-400 mt-1">Update rental item details</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl">
                <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 mb-6">
                    {/* Image Upload Section */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Item Image
                        </label>
                        <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
                            {(imagePreview || existingImage) ? (
                                <div className="relative inline-block">
                                    <img
                                        src={imagePreview || existingImage!}
                                        alt="Preview"
                                        className="max-h-48 rounded-lg mx-auto"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setImageFile(null);
                                            setImagePreview(null);
                                            setExistingImage(null);
                                        }}
                                        className="absolute top-2 right-2 p-1 bg-red-500 rounded-full hover:bg-red-600 transition"
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
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
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
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Item Name <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
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
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Category <span className="text-red-400">*</span>
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                >
                                    {categories.map(cat => (
                                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Rental Cost (3 days) <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                                    <input
                                        type="number"
                                        value={formData.costFor3Days}
                                        onChange={(e) => setFormData({ ...formData, costFor3Days: e.target.value })}
                                        className="w-full pl-8 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Display Order
                                </label>
                                <input
                                    type="number"
                                    value={formData.displayOrder}
                                    onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
                                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Status
                                </label>
                                <select
                                    value={formData.isActive ? "active" : "inactive"}
                                    onChange={(e) => setFormData({ ...formData, isActive: e.target.value === "active" })}
                                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                >
                                    <option value="active">Active (Visible to exhibitors)</option>
                                    <option value="inactive">Inactive (Hidden from exhibitors)</option>
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