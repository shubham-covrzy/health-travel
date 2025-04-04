// InviteMembersPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { PlusCircle, X, Mail, Upload, FileSpreadsheet } from "lucide-react";

const InviteMembersPage = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("email");
  
  // Individual email invite state
  const [emailInvites, setEmailInvites] = useState<string[]>(['']);
  const [emailMessage, setEmailMessage] = useState("I'd like to invite you to join our company insurance plan. Please complete your profile to access your benefits.");
  
  // Bulk email invite state
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const addEmailField = () => {
    setEmailInvites([...emailInvites, '']);
  };

  const removeEmailField = (index: number) => {
    if (emailInvites.length === 1) {
      return; // Keep at least one email field
    }
    
    const newEmails = [...emailInvites];
    newEmails.splice(index, 1);
    setEmailInvites(newEmails);
  };

  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...emailInvites];
    newEmails[index] = value;
    setEmailInvites(newEmails);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check if it's an Excel or CSV file
      if (selectedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || 
          selectedFile.type === "application/vnd.ms-excel" ||
          selectedFile.type === "text/csv") {
        setFile(selectedFile);
        simulateUpload();
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload an Excel file (.xlsx, .xls) or CSV file",
          variant: "destructive"
        });
      }
    }
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

  const handleCancel = () => {
    navigate("/admin/members");
  };

  const handleSendInvites = () => {
    if (activeTab === "email") {
      // Validate emails
      const validEmails = emailInvites.filter(email => email.trim() !== '');
      
      if (validEmails.length === 0) {
        toast({
          title: "No valid emails",
          description: "Please enter at least one valid email address",
          variant: "destructive"
        });
        return;
      }
      
      toast({
        title: "Invitations sent successfully",
        description: `Sent ${validEmails.length} invitation${validEmails.length > 1 ? 's' : ''}`,
      });
    } else {
      if (!file) {
        toast({
          title: "No file selected",
          description: "Please upload a file containing email addresses",
          variant: "destructive"
        });
        return;
      }
      
      toast({
        title: "Processing bulk invitations",
        description: "Your bulk invitation file is being processed",
      });
      
      // Simulate success after a delay
      setTimeout(() => {
        toast({
          title: "Bulk invitations sent",
          description: "All invitations from your file have been sent successfully",
        });
      }, 2000);
    }
    
    navigate("/admin/members");
  };

  const downloadTemplate = () => {
    toast({
      title: "Template downloaded",
      description: "The invitation template has been downloaded to your device",
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4">
      <h1 className="text-2xl font-semibold mb-6">Invite Members</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="email">Email Invitation</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Invitation</TabsTrigger>
        </TabsList>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Invitation</CardTitle>
              <CardDescription>Invite members by sending them an email invitation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Email Addresses <span className="text-red-500">*</span></Label>
                {emailInvites.map((email, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="bg-gray-100 p-2 rounded-md">
                      <Mail className="h-5 w-5 text-gray-500" />
                    </div>
                    <Input
                      value={email}
                      onChange={(e) => handleEmailChange(index, e.target.value)}
                      placeholder="Enter email address"
                      className="flex-1"
                    />
                    {emailInvites.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeEmailField(index)}
                        className="h-9 w-9 rounded-full"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  onClick={addEmailField}
                  className="mt-2"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Another Email
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emailMessage">Invitation Message</Label>
                <Textarea
                  id="emailMessage"
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)}
                  placeholder="Enter a custom message for the invitation email"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bulk">
          <Card>
            <CardHeader>
              <CardTitle>Bulk Invitation</CardTitle>
              <CardDescription>
                Upload a spreadsheet with multiple email addresses to send invitations in bulk
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-md border border-blue-100 mb-4">
                <div className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Excel Template Format</p>
                    <p>Your spreadsheet should contain at least these columns:</p>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>Email Address (required)</li>
                      <li>First Name (optional)</li>
                      <li>Last Name (optional)</li>
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
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6">
                <div className="flex flex-col items-center justify-center text-center">
                  {file ? (
                    <div className="w-full space-y-4">
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <FileSpreadsheet className="h-6 w-6" />
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
                      <Upload className="h-10 w-10 text-gray-400 mb-2" />
                      <h3 className="text-lg font-medium text-gray-900">Upload your file</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Drag and drop or click to browse
                      </p>
                      <input 
                        type="file" 
                        id="bulk-file" 
                        className="hidden" 
                        accept=".xlsx,.xls,.csv" 
                        onChange={handleFileChange}
                      />
                      <label htmlFor="bulk-file">
                        <Button className="bg-covrzy-purple hover:bg-purple-700">
                          Select File
                        </Button>
                      </label>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bulkMessage">Invitation Message</Label>
                <Textarea
                  id="bulkMessage"
                  defaultValue="I'd like to invite you to join our company insurance plan. Please complete your profile to access your benefits."
                  placeholder="Enter a custom message for the invitation email"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

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
          onClick={handleSendInvites}
        >
          Send Invites
        </Button>
      </div>

      {isMobile && (
        <div className="h-16"></div> // Space for mobile navigation
      )}
    </div>
  );
};

export default InviteMembersPage;