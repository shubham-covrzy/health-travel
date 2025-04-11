import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, Home, Calendar, User, HelpCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/context/AuthContext";
import { ENV } from "@/data";

// Define environment variables interface

interface UserProfileProps {
  className?: string;
}

const UserProfile = ({ className }: UserProfileProps) => {
  const {user} = useAuth();
  const [activeTab, setActiveTab] = useState<"details" | "dependents">("details");
  const { t } = useTranslation();

  return (
    <div className={`space-y-6 pb-16 sm:pb-0 ${className || ""}`}>
      <h1 className="text-2xl font-bold">{t('profile.title', 'User Profile')}</h1>

      <Card className="overflow-hidden">
        <div className="bg-purple-700 h-24 md:h-32"></div>
        <div className="relative px-6 pb-6">
          <Avatar className="h-20 w-20 absolute -top-10 border-4 border-white">
            <AvatarImage src="/images/profile-placeholder.jpg" alt="User avatar" />
            <AvatarFallback className="text-xl">{user?.fullName?.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="pt-12">
            <h2 className="text-xl font-bold">{user?.fullName }</h2>
          </div>
        </div>
      </Card>

      {/* Tabs Navigation */}
      <div className="flex border-b">
        <button
          className={`px-4 py-2 font-medium ${activeTab === "details" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
          onClick={() => setActiveTab("details")}
          type="button"
          aria-selected={activeTab === "details"}
        >
          {t('profile.tabs.details', 'My Details')}
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === "dependents" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
          onClick={() => setActiveTab("dependents")}
          type="button"
          aria-selected={activeTab === "dependents"}
        >
          {t('profile.tabs.dependents', 'Dependents')}
        </button>
      </div>

      {/* My Details Tab Content */}
      {activeTab === "details" && (
        <>
          {
            user.policyDetails.members.filter((member) => member.relation === "Self").map((member, idx) => (
              <Card>
                <CardHeader>
                  <CardTitle>{t('profile.personal.title', 'Personal Information')} </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">{t('profile.personal.name', 'Name')}</p>
                    <p className="font-medium">{member.name?member.name:"-"}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">{t('profile.personal.dob', 'Date of Birth')}</p>
                    <p className="font-medium">{new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(member.dob))}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">{t('profile.personal.relationship', 'Relationship')}</p>
                    <p className="font-medium">{member.relation?member.relation:"-"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('profile.personal.healthId', 'Health Id')}</p>
                    <p className="font-medium">{member.healthId?member.healthId:"-"}</p>
                  </div>
                </CardContent>
              </Card>
            ))
          }
        </>
      )}

      {/* Dependents Tab Content */}
      {activeTab === "dependents" && (
        <>
          {
            user.policyDetails.members.filter((member) => member.relation !== "Self").map((member,idx) => (
              <Card>
                <CardHeader>
                  <CardTitle>{t('profile.dependent.title', 'Dependent')} { idx+1}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">{t('profile.dependent.name', 'Name')}</p>
                    <p className="font-medium">{ member.name}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">{t('profile.dependent.dob', 'Date of Birth')}</p>
                    <p className="font-medium">{new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(member.dob))}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">{t('profile.dependent.relationship', 'Relationship')}</p>
                    <p className="font-medium">{member.relation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('profile.dependent.healthId', 'Health Id')}</p>
                    <p className="font-medium">{member.healthId ? member.healthId : "-"}</p>
                  </div>
                </CardContent>
              </Card>
            ))
          }

        </>
      )}

      {/* Contact Support Card */}
      <Card className="bg-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center">
            {t('profile.support.title', 'Contact Support')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 p-2 rounded-full">
              <Phone className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <a href={`tel:${ENV.SUPPORT_PHONE}`} className="font-medium hover:text-purple-600 transition-colors">
                {ENV.SUPPORT_PHONE}
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 p-2 rounded-full">
              <Mail className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <a href={`mailto:${ENV.SUPPORT_EMAIL}`} className="font-medium hover:text-purple-600 transition-colors">
                {ENV.SUPPORT_EMAIL}
              </a>
            </div>
          </div>

          <a
            href={`tel:${ENV.SUPPORT_PHONE}`}
            className="block w-full text-center bg-purple-600 text-white py-2 rounded-md mt-2 hover:bg-purple-700 transition-colors"
          >
            {t('common.contactUs', 'Contact Us')}
          </a>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;