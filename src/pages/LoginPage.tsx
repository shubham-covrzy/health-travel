import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("user");
  const { login } = useAuth();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await login(email, password);
      toast({
        title: "Success",
        description: "You have successfully logged in",
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);

    // Set default credentials based on selected tab
    if (value === "user") {
      setEmail("demo@example.com");
      setPassword("password");
    } else {
      setEmail("admin@example.com");
      setPassword("admin123");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-[#7E3AF2] bg-opacity-10">
              <div className="absolute inset-0 m-1.5 rounded-full bg-[#7E3AF2]"></div>
              <div className="absolute inset-0 m-4 rounded-full bg-white"></div>
            </div>
          </div>
          <CardTitle className="text-2xl text-center font-bold">{t('login.welcome')}</CardTitle>
          <p className="text-center text-gray-600">{t('login.credentials')}</p>
        </CardHeader>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <div className="px-6">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="user">User Login</TabsTrigger>
              <TabsTrigger value="admin">Admin Login</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="user">
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    {t('login.email')}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="demo@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-medium">
                      {t('login.password')}
                    </label>
                    <Link to="/forgot-password" className="text-xs text-covrzy-purple hover:underline">
                      {t('login.forgotPassword')}
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-covrzy-purple hover:bg-purple-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                      {t('login.signingIn')}
                    </span>
                  ) : (
                    t('login.signin')
                  )}
                </Button>
              </form>
            </CardContent>
          </TabsContent>

          <TabsContent value="admin">
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="adminEmail" className="text-sm font-medium">
                    Admin Email
                  </label>
                  <Input
                    id="adminEmail"
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="adminPassword" className="text-sm font-medium">
                    Admin Password
                  </label>
                  <Input
                    id="adminPassword"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-covrzy-purple hover:bg-purple-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                      Admin Sign In
                    </span>
                  ) : (
                    "Admin Sign In"
                  )}
                </Button>
              </form>
            </CardContent>
          </TabsContent>
        </Tabs>

        <CardFooter className="flex justify-center">
          <p className="text-xs text-gray-500">
            {activeTab === "user"
              ? "User credentials: demo@example.com / password"
              : "Admin credentials: admin@example.com / admin123"}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;