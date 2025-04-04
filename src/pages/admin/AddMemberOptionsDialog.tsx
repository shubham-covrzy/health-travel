// AddMemberOptionsDialog.tsx
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface AddMemberOptionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddMemberOptionsDialog = ({ open, onOpenChange }: AddMemberOptionsDialogProps) => {
  const navigate = useNavigate();

  const handleIndividualMember = () => {
    onOpenChange(false);
    navigate("/admin/members/add-individual");
  };

  const handleUploadExcel = () => {
    onOpenChange(false);
    navigate("/admin/members/upload");
  };

  const handleInviteEmployees = () => {
    onOpenChange(false);
    navigate("/admin/members/invite");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">How would you like to add new member(s)?</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Add Individual Member */}
          <Button 
            variant="outline" 
            className="w-full justify-start p-4 h-auto"
            onClick={handleIndividualMember}
          >
            <div className="flex items-center">
              <div className="bg-pink-50 p-2 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E91E63" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-medium text-gray-900">Add Individual Member</h3>
                <p className="text-sm text-gray-500">You'll have to enter the required details of the new employee yourself</p>
              </div>
            </div>
          </Button>

          {/* Upload Excel */}
          <Button 
            variant="outline" 
            className="w-full justify-start p-4 h-auto"
            onClick={handleUploadExcel}
          >
            <div className="flex items-center">
              <div className="bg-green-50 p-2 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <path d="M14 2v6h6"></path>
                  <path d="M8 12h8"></path>
                  <path d="M8 16h8"></path>
                  <path d="M8 20h8"></path>
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-medium text-gray-900">Upload Excel</h3>
                <p className="text-sm text-gray-500">Select this if you have all the data of the new employee(s) in an excel sheet</p>
              </div>
            </div>
          </Button>

          {/* Invite Employee(s) */}
          <Button 
            variant="outline" 
            className="w-full justify-start p-4 h-auto"
            onClick={handleInviteEmployees}
          >
            <div className="flex items-center">
              <div className="bg-blue-50 p-2 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-medium text-gray-900">Invite Employee(s)</h3>
                <p className="text-sm text-gray-500">Select this if you want the employee(s) to provide the required details</p>
              </div>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberOptionsDialog;