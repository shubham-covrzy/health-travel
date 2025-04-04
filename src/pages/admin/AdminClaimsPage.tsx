// AdminClaimsPage.tsx - For managing all claims
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { ChevronDown, Filter, Download, MoreVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";

// Mock claims data
const mockClaims = [
    { id: "CL001", member: "Ankit Kamra", type: "Reimbursement", amount: "₹12,500", status: "PENDING", date: "12 Apr 2025" },
    { id: "CL002", member: "Thota Veera Venkata Ratna Kumar", type: "Cashless", amount: "₹45,750", status: "APPROVED", date: "10 Apr 2025" },
    { id: "CL003", member: "Chaithanya Ganesha", type: "Reimbursement", amount: "₹8,250", status: "IN_PROGRESS", date: "09 Apr 2025" },
    { id: "CL004", member: "Rohit Suresh", type: "Cashless", amount: "₹32,000", status: "REJECTED", date: "07 Apr 2025" },
    { id: "CL005", member: "Sachin Bhusal", type: "Reimbursement", amount: "₹18,600", status: "APPROVED", date: "05 Apr 2025" },
    { id: "CL006", member: "Gourav Banerjee", type: "Cashless", amount: "₹65,000", status: "PENDING", date: "03 Apr 2025" },
    { id: "CL007", member: "Yash Uppal", type: "Reimbursement", amount: "₹9,800", status: "APPROVED", date: "01 Apr 2025" },
];

const AdminClaimsPage = () => {
    const isMobile = useIsMobile();
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");

    // Simple filtering
    const filteredClaims = mockClaims.filter(claim => {
        const matchesSearch = claim.member.toLowerCase().includes(searchQuery.toLowerCase()) ||
            claim.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || claim.status === statusFilter;
        const matchesType = typeFilter === 'all' || claim.type === typeFilter;

        return matchesSearch && matchesStatus && matchesType;
    });

    return (
        <div className="space-y-6 pb-16 md:pb-0">
            <h1 className="text-2xl font-bold text-gray-800">Claims Management</h1>

            {/* Stats cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-white">
                    <CardContent className="p-4">
                        <p className="text-sm text-gray-500">Total Claims</p>
                        <p className="text-2xl font-bold">142</p>
                    </CardContent>
                </Card>
                <Card className="bg-white">
                    <CardContent className="p-4">
                        <p className="text-sm text-gray-500">Pending</p>
                        <p className="text-2xl font-bold">24</p>
                    </CardContent>
                </Card>
                <Card className="bg-white">
                    <CardContent className="p-4">
                        <p className="text-sm text-gray-500">Approved</p>
                        <p className="text-2xl font-bold">98</p>
                    </CardContent>
                </Card>
                <Card className="bg-white">
                    <CardContent className="p-4">
                        <p className="text-sm text-gray-500">Rejected</p>
                        <p className="text-2xl font-bold">20</p>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
                <div className="relative flex-grow max-w-md">
                    <Input
                        type="text"
                        placeholder="Search by name or claim ID"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pr-10 bg-white"
                    />
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px] bg-white">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                        <SelectItem value="APPROVED">Approved</SelectItem>
                        <SelectItem value="REJECTED">Rejected</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[180px] bg-white">
                        <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="Cashless">Cashless</SelectItem>
                        <SelectItem value="Reimbursement">Reimbursement</SelectItem>
                    </SelectContent>
                </Select>

                <Button variant="outline" className="bg-white">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                </Button>

                <Button variant="outline" className="bg-white ml-auto">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                </Button>
            </div>

            {/* Claims Table */}
            <Card className="bg-white">
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b">
                                    <th className="text-left py-3 px-4 font-medium text-gray-600">Claim ID</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-600">Member</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-600">Type</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                                    <th className="text-right py-3 px-4"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredClaims.map((claim) => (
                                    <tr key={claim.id} className="border-b hover:bg-gray-50">
                                        <td className="py-3 px-4 font-medium">{claim.id}</td>
                                        <td className="py-3 px-4">{claim.member}</td>
                                        <td className="py-3 px-4">{claim.type}</td>
                                        <td className="py-3 px-4">{claim.amount}</td>
                                        <td className="py-3 px-4">{claim.date}</td>
                                        <td className="py-3 px-4">
                                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${claim.status === "APPROVED" ? "bg-green-100 text-green-800" :
                                                    claim.status === "REJECTED" ? "bg-red-100 text-red-800" :
                                                        claim.status === "PENDING" ? "bg-yellow-100 text-yellow-800" :
                                                            "bg-blue-100 text-blue-800"
                                                }`}>
                                                {claim.status.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>View Details</DropdownMenuItem>
                                                    <DropdownMenuItem>Update Status</DropdownMenuItem>
                                                    <DropdownMenuItem>Download Documents</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredClaims.length === 0 && (
                        <div className="py-8 text-center text-gray-500">
                            No claims match your search criteria
                        </div>
                    )}

                    {/* Pagination */}
                    <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
                        <div className="text-sm text-gray-500">
                            Showing 1-7 of 142 claims
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                <span>&lt;</span>
                            </Button>
                            <span className="text-sm">1</span>
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                <span>&gt;</span>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {isMobile && (
                <div className="h-16"></div> // Space for mobile navigation
            )}
        </div>
    );
};

export default AdminClaimsPage;