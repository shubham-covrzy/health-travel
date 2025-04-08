export interface User {
    userId: string;
    email: string;
    isAuthenticated: boolean;
    role: "USER" | "ADMIN";
    policyDetails?: PolicyMembersResponse;
}
export interface PolicyMember {
    memberId: string;
    policyId: string;
    userId: string | null;
    name: string;
    relation: string;
    dob: string | null;
    healthId: string | null;
}

export interface PolicyMembersResponse {
    inclusions: string;
    exclusions: string;
    members: PolicyMember[];
}
