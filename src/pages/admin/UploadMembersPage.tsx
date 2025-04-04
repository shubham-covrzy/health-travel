// UploadMembersPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Upload } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/components/ui/use-toast";

const UploadMembersPage = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      validateAndSetFile(selectedFile);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    // Check file type
    const validTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv'
    ];
    
    if (!validTypes.includes(selectedFile.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload an Excel file (.xlsx, .xls) or CSV file",
        variant: "destructive"
      });
      return;
    }

    // Check file size (5MB limit)
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB",
        variant: "destructive"
      });
      return;
    }

    setFile(selectedFile);
    simulateUpload();
  };

  const simulateUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleCancel = () => {
    navigate("/admin/members");
  };

  const handleNext = () => {
    // In a real app, we would process the file and then navigate
    navigate("/admin/members/review");
  };

  const downloadTemplate = () => {
    toast({
      title: "Template downloaded",
      description: "The member data template has been downloaded",
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4">
      <h1 className="text-2xl font-semibold mb-6">Add Members</h1>

      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-8">
        <span className="text-blue-600 font-medium">Upload Member(s) Data</span>
        <ChevronRight className="h-4 w-4 mx-2 text-gray-500" />
        <span className="text-gray-500">Review Data and Confirm</span>
      </div>

      <div className="bg-white p-6 rounded-md shadow-sm">
        <h2 className="text-lg font-medium mb-4">Upload File</h2>
        
        <p className="text-gray-600 mb-6">
          Upload the member data document below. If this is your first time uploading member data, {" "}
          <button 
            onClick={downloadTemplate} 
            className="text-blue-600 hover:underline"
          >
            download template
          </button> from here.
        </p>

        <div 
          className={`border-2 border-dashed rounded-md p-10 text-center ${isDragging ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input 
            type="file" 
            id="file-upload" 
            className="hidden" 
            accept=".xlsx,.xls,.csv" 
            onChange={handleFileChange}
          />
          
          {file ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <path d="M14 2v6h6"></path>
                  <path d="M16 13H8"></path>
                  <path d="M16 17H8"></path>
                  <path d="M10 9H8"></path>
                </svg>
                <span className="font-medium">{file.name}</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-green-600 h-2.5 rounded-full" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-gray-600 text-sm">{uploadProgress}%</p>
              
              {uploadProgress === 100 && (
                <p className="text-green-600 font-medium">File uploaded successfully!</p>
              )}
              
              <button 
                className="text-blue-600 hover:underline text-sm"
                onClick={() => {
                  setFile(null);
                  setUploadProgress(0);
                }}
              >
                Upload a different file
              </button>
            </div>
          ) : (
            <>
              <label 
                htmlFor="file-upload" 
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-gray-800 font-medium mb-1">Drag & Drop file or Browse</p>
                <p className="text-gray-500 text-sm">Supported formats: .xlsx, .xls, .csv</p>
              </label>
            </>
          )}
        </div>

        {/* File upload progress indicator */}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="mt-4 text-center text-sm text-gray-600">
            Uploading... Please wait.
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 mt-8">
        <Button 
          variant="outline" 
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button 
          className="bg-covrzy-purple hover:bg-purple-700"
          onClick={handleNext}
          disabled={!file || uploadProgress < 100}
        >
          Next
        </Button>
      </div>

      {isMobile && (
        <div className="h-16"></div> // Space for mobile navigation
      )}
    </div>
  );
};

export default UploadMembersPage;