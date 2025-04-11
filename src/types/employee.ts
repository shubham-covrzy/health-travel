// src/types/employee.ts

export interface User {
    userId: string;
    email: string | null;
    phone?: string;
    fullName?: string | null;
    isAuthenticated: boolean;
    role: string;
    policyDetails?: PolicyMembersResponse;
}

export interface PolicyMember {
    id: string;
    name: string;
    relation: string;
    dob?: string;
    healthId?: string;
    gender?: string;
    isActive: boolean;
}

export interface Policy {
    policyId: string;
    policyNumber: string;
    startDate: string;
    endDate: string;
    status: string;
    provider: string;
}

export interface PolicyMembersResponse {
    policies: Policy;
    members: PolicyMember[];
}