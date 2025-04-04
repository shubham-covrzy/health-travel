import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, Home, Calendar, User, HelpCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("details");
  const { t } = useTranslation();

  return (
    <div className="space-y-6 pb-16 sm:pb-0">
      <h1 className="text-2xl font-bold">{t('profile.title', 'User Profile')}</h1>

      <Card className="overflow-hidden">
        <div className="bg-covrzy-purple h-24 md:h-32"></div>
        <div className="relative px-6 pb-6">
          <Avatar className="h-20 w-20 absolute -top-10 border-4 border-white">
            <AvatarImage src="" />
            <AvatarFallback className="text-xl">S</AvatarFallback>
          </Avatar>

          <div className="pt-12">
            <h2 className="text-xl font-bold">Sachin Tendulkar</h2>
            <p className="text-gray-500">Premium Member</p>
          </div>
        </div>
      </Card>

      {/* Tabs Navigation */}
      <div className="flex border-b">
        <button
          className={`px-4 py-2 font-medium ${activeTab === "details" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
          onClick={() => setActiveTab("details")}
        >
          {t('profile.tabs.details', 'My Details')}
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === "dependents" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
          onClick={() => setActiveTab("dependents")}
        >
          {t('profile.tabs.dependents', 'Dependents')}
        </button>
      </div>

      {/* My Details Tab Content */}
      {activeTab === "details" && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>{t('profile.personal.title', 'Personal Information')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-gray-100 p-2 rounded-full">
                  <Phone className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t('profile.personal.phone', 'Phone')}</p>
                  <p className="font-medium">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-gray-100 p-2 rounded-full">
                  <Home className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t('profile.personal.address', 'Address')}</p>
                  <p className="font-medium">123 Cricket Avenue, Mumbai, India</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-gray-100 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t('profile.personal.dob', 'Date of Birth')}</p>
                  <p className="font-medium">24 April 1973</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-gray-100 p-2 rounded-full">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t('profile.personal.driverId', 'Driver ID')}</p>
                  <p className="font-medium">DL78901234567</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-gray-100 p-2 rounded-full">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t('profile.personal.gender', 'Gender')}</p>
                  <p className="font-medium">Male</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Dependents Tab Content */}
      {activeTab === "dependents" && (
        <Card>
          <CardHeader>
            <CardTitle>{t('profile.dependent.title', 'Dependent')} #1</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">{t('profile.dependent.name', 'Name')}</p>
              <p className="font-medium">Arjun Tendulkar</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">{t('profile.dependent.dob', 'Date of Birth')}</p>
              <p className="font-medium">24 September 1999</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">{t('profile.dependent.relationship', 'Relationship')}</p>
              <p className="font-medium">Son</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">{t('profile.dependent.gender', 'Gender')}</p>
              <p className="font-medium">Male</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Contact Support Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <HelpCircle className="h-5 w-5 mr-2" />
            {t('profile.support.title', 'Contact Support')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gray-100 p-2 rounded-full">
              <Phone className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('profile.support.hotline', 'Support Hotline')}</p>
              <p className="font-medium">{import.meta.env.VITE_POC_NO_INSURANCE}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-gray-100 p-2 rounded-full">
              <Mail className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('profile.support.email', 'Email Support')}</p>
              <p className="font-medium">{ import.meta.env.VITE_POC_EMAIL_INSURANCE}</p>
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white py-2 rounded-md mt-2 hover:bg-blue-700 transition-colors md:pb-4" onClick={() => window.location.href = `tel:${import.meta.env.VITE_POC_NO_INSURANCE}`}>
            {t('common.contactUs', 'Contact Us')}
          </button>
        </CardContent>
      </Card>

    </div>
  );
};

export default UserProfile;