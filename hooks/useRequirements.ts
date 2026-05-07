import { useState, useEffect } from 'react';
import { extraRequirementsAPI, Requirement } from '@/lib/api/exhibitorClient';

export const useRequirements = () => {
    const [requirements, setRequirements] = useState<Requirement[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRequirements = async () => {
        try {
            setLoading(true);
            const response = await extraRequirementsAPI.getAll();
            if (response.success) {
                setRequirements(response.data);
            } else {
                setError('Failed to load requirements');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const submitRequirement = async (data: any) => {
        try {
            const response = await extraRequirementsAPI.submit(data);
            if (response.success) {
                await fetchRequirements(); // Refresh list
                return { success: true, data: response.data };
            }
            return { success: false, error: response.error };
        } catch (err: any) {
            return { success: false, error: err.message };
        }
    };

    useEffect(() => {
        fetchRequirements();
    }, []);

    return {
        requirements,
        loading,
        error,
        fetchRequirements,
        submitRequirement
    };
};