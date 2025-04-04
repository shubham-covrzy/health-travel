// ReviewMembersDataPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, FileText, Edit, List, Copy } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const ReviewMembersDataPage = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");

  // This would typically come from the uploaded file data
  const [memberData, setMemberData] = useState({
    total: 0,
    duplicates: 0,
    invalid: 0
  });

  const handleBack = () => {
    navigate("/admin/members/upload");
  };

  const handleDownloadErrorSheet = () => {
    toast({
      title: "Error sheet downloaded",
      description: "The error details have been downloaded as an Excel file",
    });
  };

  const handleAddMembers = () => {
    // In a real app, we would submit the data to the server
    toast({
      title: "Members added successfully",
      description: `${memberData.total} members have been added to the system`,
    });
    navigate("/admin/members");
  };

  const handleViewList = () => {
    toast({
      title: "Viewing member list",
      description: "Opening detailed list view of members to be added",
    });
  };

  const handleCompare = () => {
    toast({
      title: "Comparing duplicates",
      description: "Opening comparison view of duplicate entries",
    });
  };

  const handleEdit = () => {
    toast({
      title: "Editing invalid entries",
      description: "Opening editor for invalid entries",
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 px-4">
      <h1 className="text-2xl font-semibold mb-6">Add Members</h1>

      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-8">
        <span className="text-gray-500">Upload Member(s) Data</span>
        <ChevronRight className="h-4 w-4 mx-2 text-gray-500" />
        <span className="text-blue-600 font-medium">Review Data and Confirm</span>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Members Card */}
        <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-gray-600 text-sm">Members</span>
              <h3 className="text-3xl font-bold mt-1">{memberData.total}</h3>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 px-3 text-blue-600 border-blue-200"
              onClick={handleViewList}
            >
              <List className="h-4 w-4 mr-1" />
              View List
            </Button>
          </div>
        </div>

        {/* Duplicate Entries Card */}
        <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-gray-600 text-sm">Duplicate Entries</span>
              <h3 className="text-3xl font-bold mt-1">{memberData.duplicates}</h3>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 px-3 text-rose-600 border-rose-200"
              onClick={handleCompare}
            >
              <Copy className="h-4 w-4 mr-1" />
              Compare
            </Button>
          </div>
        </div>

        {/* Invalid Entries Card */}
        <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-gray-600 text-sm">Invalid Entries</span>
              <h3 className="text-3xl font-bold mt-1">{memberData.invalid}</h3>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 px-3 text-amber-600 border-amber-200"
              onClick={handleEdit}
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </div>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-md shadow-sm border border-gray-200">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-medium">All Members : {memberData.total} record</h2>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Name/Email/Phone/Employee ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 h-9"
            />
            <Button 
              variant="destructive" 
              size="sm"
              disabled={true}
            >
              Delete Selected
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 text-left font-medium">
                  <input type="checkbox" className="rounded" disabled />
                </th>
                <th className="p-3 text-left font-medium">Member Name*</th>
                <th className="p-3 text-left font-medium">Email ID</th>
                <th className="p-3 text-left font-medium">Phone Number</th>
                <th className="p-3 text-left font-medium">Date of birth*</th>
                <th className="p-3 text-left font-medium">Gender*</th>
                <th className="p-3 text-left font-medium">Date of Joining</th>
                <th className="p-3 text-left font-medium">Employee ID*</th>
                <th className="p-3 text-left font-medium">Relationship*</th>
                <th className="p-3 text-left font-medium">Designation</th>
                <th className="p-3 text-left font-medium">VHI Sum Insured</th>
                <th className="p-3 text-left font-medium">GHI Sum Insured</th>
              </tr>
            </thead>
            <tbody>
              {/* No data state */}
              <tr>
                <td colSpan={12} className="p-8 text-center">
                  <div className="flex flex-col items-center text-gray-500">
                    <FileText className="h-10 w-10 mb-2 text-gray-300" />
                    <p>No Data</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mt-8">
        <Button 
          variant="outline" 
          onClick={handleBack}
        >
          Back
        </Button>

        <div className="flex gap-4">
          <Button 
            variant="outline" 
            onClick={handleDownloadErrorSheet}
            disabled={memberData.invalid === 0}
          >
            Download Error Sheet
          </Button>
          <Button 
            className="bg-covrzy-purple hover:bg-purple-700"
            onClick={handleAddMembers}
            disabled={memberData.total === 0 || memberData.invalid > 0}
          >
            Add Member
          </Button>
        </div>
      </div>

      {isMobile && (
        <div className="h-16"></div> // Space for mobile navigation
      )}
    </div>
  );
};

export default ReviewMembersDataPage;