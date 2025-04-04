// Updated MembersPage.tsx with Excel import functionality
import React, { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {
    ChevronDown,
    Download,
    MoreVertical,
    Upload,
    FileSpreadsheet,
    Info
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import {Link} from 'react-router-dom'

// Mock data for members
const mockMembers = [
    { id: "BZ11", name: "Ankit Kamra", product: "Group Health Insurance", dependents: 4, status: "ACTIVE" },
    { id: "BZ7", name: "Thota Veera Venkata Ratna Kumar", product: "Group Health Insurance", dependents: 5, status: "ACTIVE" },
    { id: "BZ10", name: "Chaithanya Ganesha", product: "Group Health Insurance", dependents: 2, status: "ACTIVE" },
    { id: "BZ9", name: "Rohit Suresh", product: "Group Health Insurance", dependents: 2, status: "ACTIVE" },
    { id: "BZ8", name: "Sachin Bhusal", product: "Group Health Insurance", dependents: 2, status: "ACTIVE" },
    { id: "BZ3", name: "Gourav Banerjee", product: "Group Health Insurance", dependents: 2, status: "ACTIVE" },
    { id: "BZ1", name: "Yash Uppal", product: "Group Health Insurance", dependents: 1, status: "ACTIVE" },
    { id: "BZ6", name: "Nisha Prasad", product: "Group Health Insurance", dependents: 0, status: "INACTIVE" },
    { id: "BZ2", name: "Hetvi Vashi", product: "Group Health Insurance", dependents: 0, status: "INACTIVE" },
];

const MembersPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [members] = useState(mockMembers);
    const [entriesPerPage, setEntriesPerPage] = useState("10");
    const [currentPage, setCurrentPage] = useState(1);
    const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            // Check if the file is an Excel file
            if (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                file.type === "application/vnd.ms-excel") {
                setSelectedFile(file);
            } else {
                toast({
                    title: "Invalid file format",
                    description: "Please upload an Excel file (.xlsx or .xls)",
                    variant: "destructive"
                });
            }
        }
    };

    const handleImport = () => {
        if (!selectedFile) {
            toast({
                title: "No file selected",
                description: "Please select an Excel file to import",
                variant: "destructive"
            });
            return;
        }

        // Here you would implement the actual file import logic
        // This is just a simulation for demo purposes
        toast({
            title: "Import started",
            description: `Processing ${selectedFile.name}. This may take a moment.`,
        });

        // Simulate import process
        setTimeout(() => {
            toast({
                title: "Import successful",
                description: "Members have been imported successfully",
            });
            setIsImportDialogOpen(false);
            setSelectedFile(null);
        }, 2000);
    };

    const downloadTemplate = () => {
        // In a real application, this would download an actual Excel template
        toast({
            title: "Template downloaded",
            description: "The Excel template has been downloaded to your device",
        });
    };

    return (
        <div className="space-y-6 p-6">
            <h1 className="text-2xl font-bold">Members</h1>

            {/* Stats Section */}
            <div className="flex flex-wrap gap-4">
                <div className="min-w-[180px] flex-1 bg-white p-4 rounded-md shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="bg-pink-100 p-2 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E91E63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500">Total Lives</div>
                            <div className="text-xl font-semibold">25</div>
                        </div>
                    </div>
                </div>

                <div className="min-w-[180px] flex-1 bg-white p-4 rounded-md shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2196F3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                                <path d="M12 11h.01"></path>
                                <rect x="3" y="21" width="18" height="2" rx="1"></rect>
                            </svg>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500">Employees</div>
                            <div className="text-xl font-semibold">7</div>
                        </div>
                    </div>
                </div>

                <div className="min-w-[180px] flex-1 bg-white p-4 rounded-md shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-2 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                <path d="M12 13l1.5 1.5"></path>
                            </svg>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500">Spouse</div>
                            <div className="text-xl font-semibold">2</div>
                        </div>
                    </div>
                </div>

                <div className="min-w-[180px] flex-1 bg-white p-4 rounded-md shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2196F3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="10" cy="6" r="3"></circle>
                                <circle cx="16" cy="8" r="2"></circle>
                                <path d="M10 9v12"></path>
                                <path d="M6 13l4 3"></path>
                                <path d="M14 13l-4 3"></path>
                                <path d="M16 10v7"></path>
                                <path d="M13 14l3 2"></path>
                                <path d="M19 14l-3 2"></path>
                            </svg>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500">Children</div>
                            <div className="text-xl font-semibold">3</div>
                        </div>
                    </div>
                </div>

                <div className="min-w-[180px] flex-1 bg-white p-4 rounded-md shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="bg-yellow-100 p-2 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFC107" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                <path d="M6 16h6"></path>
                                <path d="M13 10l2 2l4-4"></path>
                            </svg>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500">Parents</div>
                            <div className="text-xl font-semibold">13</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters and Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="w-full md:w-auto">
                    <Select defaultValue="All Products">
                        <SelectTrigger className="w-full md:w-60 bg-white">
                            <div className="flex items-center">
                                <span className="mr-2">Product Type</span>
                                <SelectValue placeholder="All Products" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All Products">All Products</SelectItem>
                            <SelectItem value="health">Health Insurance</SelectItem>
                            <SelectItem value="life">Life Insurance</SelectItem>
                            <SelectItem value="accident">Accident Insurance</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                        <Input
                            type="text"
                            placeholder="Search by Phone"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pr-10 bg-white"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2">
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                        </button>
                    </div>

                    <Button variant="outline" className="bg-white">
                        <Download className="h-4 w-4 mr-2" />
                        Download MIS
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="bg-covrzy-purple hover:bg-purple-700">
                                Manage Members
                                <ChevronDown className="h-4 w-4 ml-2" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                                <Link to="add-individual">Add Member</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link to="upload">Upload</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link to="review">Review</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link to="invite">Invite</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Members Table */}
            <div className="bg-white rounded-md shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Employee Name</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Employee ID</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Products</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Dependents</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                                <th className="text-right py-3 px-4"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((member) => (
                                <tr key={member.id} className="border-b hover:bg-gray-50">
                                    <td className="py-3 px-4">{member.name}</td>
                                    <td className="py-3 px-4">{member.id}</td>
                                    <td className="py-3 px-4">{member.product}</td>
                                    <td className="py-3 px-4">{member.dependents}</td>
                                    <td className="py-3 px-4">
                                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${member.status === "ACTIVE" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                            }`}>
                                            {member.status}
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
                                                <DropdownMenuItem>Edit Member</DropdownMenuItem>
                                                <DropdownMenuItem>Download E-Card</DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}>
                            <span>&lt;</span>
                        </Button>
                        <span className="text-sm">{currentPage}</span>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => setCurrentPage(currentPage + 1)}>
                            <span>&gt;</span>
                        </Button>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Entries per page</span>
                        <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
                            <SelectTrigger className="w-16 h-8">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="20">20</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                                <SelectItem value="100">100</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Import Excel Dialog */}
            <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Import Members from Excel</DialogTitle>
                        <DialogDescription>
                            Upload an Excel file to bulk import members into the system.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="bg-blue-50 p-4 rounded-md border border-blue-100 flex items-start gap-3">
                            <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                            <div className="text-sm text-blue-800">
                                <p className="font-medium mb-1">Excel Template Format</p>
                                <p className="mb-2">Please ensure your Excel file follows our template format with the following columns:</p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Employee Name (required)</li>
                                    <li>Employee ID (required)</li>
                                    <li>Phone Number (required)</li>
                                    <li>Email Address</li>
                                    <li>Date of Birth (YYYY-MM-DD format)</li>
                                    <li>Gender (Male/Female/Other)</li>
                                    <li>Policy Type</li>
                                    <li>Dependent Details (in separate columns)</li>
                                </ul>
                                <button
                                    onClick={downloadTemplate}
                                    className="text-blue-600 hover:underline flex items-center mt-2 text-xs font-medium"
                                >
                                    <FileSpreadsheet className="h-3 w-3 mr-1" />
                                    Download template
                                </button>
                            </div>
                        </div>

                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <label htmlFor="excel-file" className="text-sm font-medium">
                                Excel File
                            </label>
                            <Input
                                id="excel-file"
                                type="file"
                                accept=".xlsx,.xls"
                                onChange={handleFileChange}
                                className="cursor-pointer"
                            />
                            {selectedFile && (
                                <p className="text-sm text-gray-500">Selected: {selectedFile.name}</p>
                            )}
                        </div>
                    </div>

                    <DialogFooter className="sm:justify-between">
                        <Button
                            variant="outline"
                            onClick={() => setIsImportDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-covrzy-purple hover:bg-purple-700"
                            onClick={handleImport}
                            disabled={!selectedFile}
                        >
                            <Upload className="h-4 w-4 mr-2" />
                            Import Members
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default MembersPage;