// AdminSettings.tsx - Admin settings page
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Bell, Globe, Lock, Shield, Moon, Sun } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useIsMobile } from "@/hooks/use-mobile";

const AdminSettings = () => {
  const isMobile = useIsMobile();
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [language, setLanguage] = useState("en");
  const [sessionTimeout, setSessionTimeout] = useState("30");

  return (
    <div className="space-y-6 pb-16 md:pb-0">
      <h1 className="text-2xl font-bold text-gray-800">Admin Settings</h1>

      {/* Appearance Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="h-5 w-5" />
            <span>Appearance</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode" className="flex items-center gap-2">
              <Moon className="h-4 w-4" />
              <span>Dark Mode</span>
            </Label>
            <Switch 
              id="dark-mode" 
              checked={darkMode} 
              onCheckedChange={setDarkMode} 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="language" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>Language</span>
            </Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="language" className="w-full md:w-[200px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notifications Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <span>Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications" className="flex-grow">
              <div>Email Notifications</div>
              <div className="text-sm text-gray-500">Receive email alerts for important updates</div>
            </Label>
            <Switch 
              id="email-notifications" 
              checked={emailNotifications} 
              onCheckedChange={setEmailNotifications} 
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="push-notifications" className="flex-grow">
              <div>Push Notifications</div>
              <div className="text-sm text-gray-500">Receive notifications in the admin dashboard</div>
            </Label>
            <Switch 
              id="push-notifications" 
              checked={pushNotifications} 
              onCheckedChange={setPushNotifications} 
            />
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            <span>Security</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="session-timeout" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Session Timeout (minutes)</span>
            </Label>
            <Select value={sessionTimeout} onValueChange={setSessionTimeout}>
              <SelectTrigger id="session-timeout" className="w-full md:w-[200px]">
                <SelectValue placeholder="Select timeout" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">60 minutes</SelectItem>
                <SelectItem value="120">120 minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4">
            <Button className="bg-covrzy-purple hover:bg-purple-700">
              Update Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {isMobile && (
        <div className="h-16"></div> // Space for mobile navigation
      )}
    </div>
  );
};

export default AdminSettings;