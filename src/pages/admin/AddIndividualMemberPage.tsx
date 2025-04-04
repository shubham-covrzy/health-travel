// AddIndividualMemberPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

const AddIndividualMemberPage = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("employee");

  // Form state for employee
  const [employeeForm, setEmployeeForm] = useState({
    name: "",
    email: "",
    phone: "",
    employeeId: "",
    dateOfBirth: "",
    gender: "",
    dateOfJoining: "",
    designation: "",
    department: "",
    location: ""
  });

  // Form state for dependent
  const [dependentForm, setDependentForm] = useState({
    name: "",
    relationship: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    email: ""
  });

  const handleEmployeeChange = (field: string, value: string) => {
    setEmployeeForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDependentChange = (field: string, value: string) => {
    setDependentForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCancel = () => {
    navigate("/admin/members");
  };

  const handleSave = () => {
    if (activeTab === "employee") {
      if (!employeeForm.name || !employeeForm.employeeId) {
        toast({
          title: "Required fields missing",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return;
      }
      
      toast({
        title: "Employee added successfully",
        description: `${employeeForm.name} has been added to the system`,
      });
    } else {
      if (!dependentForm.name || !dependentForm.relationship) {
        toast({
          title: "Required fields missing",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return;
      }
      
      toast({
        title: "Dependent added successfully",
        description: `${dependentForm.name} has been added as a dependent`,
      });
    }
    
    navigate("/admin/members");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4">
      <h1 className="text-2xl font-semibold mb-6">Add Individual Member</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="employee">Add Employee</TabsTrigger>
          <TabsTrigger value="dependent">Add Dependent</TabsTrigger>
        </TabsList>

        <TabsContent value="employee">
          <Card>
            <CardHeader>
              <CardTitle>Employee Information</CardTitle>
              <CardDescription>Add a new employee to the system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={employeeForm.name}
                    onChange={(e) => handleEmployeeChange("name", e.target.value)}
                    placeholder="Enter employee's full name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="employeeId">
                    Employee ID <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="employeeId"
                    value={employeeForm.employeeId}
                    onChange={(e) => handleEmployeeChange("employeeId", e.target.value)}
                    placeholder="Enter employee ID"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={employeeForm.email}
                    onChange={(e) => handleEmployeeChange("email", e.target.value)}
                    placeholder="Enter email address"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    value={employeeForm.phone}
                    onChange={(e) => handleEmployeeChange("phone", e.target.value)}
                    placeholder="Enter phone number"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">
                    Date of Birth <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={employeeForm.dateOfBirth}
                    onChange={(e) => handleEmployeeChange("dateOfBirth", e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gender">
                    Gender <span className="text-red-500">*</span>
                  </Label>
                  <Select 
                    value={employeeForm.gender} 
                    onValueChange={(value) => handleEmployeeChange("gender", value)}
                  >
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dateOfJoining">Date of Joining</Label>
                  <Input
                    id="dateOfJoining"
                    type="date"
                    value={employeeForm.dateOfJoining}
                    onChange={(e) => handleEmployeeChange("dateOfJoining", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="designation">Designation</Label>
                  <Input
                    id="designation"
                    value={employeeForm.designation}
                    onChange={(e) => handleEmployeeChange("designation", e.target.value)}
                    placeholder="Enter designation"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={employeeForm.department}
                    onChange={(e) => handleEmployeeChange("department", e.target.value)}
                    placeholder="Enter department"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={employeeForm.location}
                    onChange={(e) => handleEmployeeChange("location", e.target.value)}
                    placeholder="Enter location"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Insurance Details</CardTitle>
              <CardDescription>Specify insurance coverage for this employee</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="healthInsurance">Health Insurance Sum Insured</Label>
                  <Select>
                    <SelectTrigger id="healthInsurance">
                      <SelectValue placeholder="Select sum insured" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="500000">₹5,00,000</SelectItem>
                      <SelectItem value="1000000">₹10,00,000</SelectItem>
                      <SelectItem value="1500000">₹15,00,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="accidentInsurance">Accident Insurance Sum Insured</Label>
                  <Select>
                    <SelectTrigger id="accidentInsurance">
                      <SelectValue placeholder="Select sum insured" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="500000">₹5,00,000</SelectItem>
                      <SelectItem value="1000000">₹10,00,000</SelectItem>
                      <SelectItem value="1500000">₹15,00,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dependent">
          <Card>
            <CardHeader>
              <CardTitle>Dependent Information</CardTitle>
              <CardDescription>Add a dependent for an existing employee</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="employeeSelect">
                  Select Employee <span className="text-red-500">*</span>
                </Label>
                <Select required>
                  <SelectTrigger id="employeeSelect">
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emp1">Ankit Kamra</SelectItem>
                    <SelectItem value="emp2">Thota Veera Venkata Ratna Kumar</SelectItem>
                    <SelectItem value="emp3">Chaithanya Ganesha</SelectItem>
                    <SelectItem value="emp4">Rohit Suresh</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="dependentName">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="dependentName"
                    value={dependentForm.name}
                    onChange={(e) => handleDependentChange("name", e.target.value)}
                    placeholder="Enter dependent's full name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="relationship">
                    Relationship <span className="text-red-500">*</span>
                  </Label>
                  <Select 
                    value={dependentForm.relationship} 
                    onValueChange={(value) => handleDependentChange("relationship", value)}
                    required
                  >
                    <SelectTrigger id="relationship">
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spouse">Spouse</SelectItem>
                      <SelectItem value="child">Child</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dependentDob">
                    Date of Birth <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="dependentDob"
                    type="date"
                    value={dependentForm.dateOfBirth}
                    onChange={(e) => handleDependentChange("dateOfBirth", e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dependentGender">
                    Gender <span className="text-red-500">*</span>
                  </Label>
                  <Select 
                    value={dependentForm.gender} 
                    onValueChange={(value) => handleDependentChange("gender", value)}
                  >
                    <SelectTrigger id="dependentGender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dependentPhone">Phone Number</Label>
                  <Input
                    id="dependentPhone"
                    value={dependentForm.phone}
                    onChange={(e) => handleDependentChange("phone", e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dependentEmail">Email Address</Label>
                  <Input
                    id="dependentEmail"
                    type="email"
                    value={dependentForm.email}
                    onChange={(e) => handleDependentChange("email", e.target.value)}
                    placeholder="Enter email address"
                  />
                </div>
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
          onClick={handleSave}
        >
          Save
        </Button>
      </div>

      {isMobile && (
        <div className="h-16"></div> // Space for mobile navigation
      )}
    </div>
  );
};

export default AddIndividualMemberPage;