import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NoInsurance = () => {
  const poc = import.meta.env.VITE_POC_NO_INSURANCE;
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] p-4">
      <Card className="max-w-md w-full p-6 text-center space-y-6">
        <div className="flex justify-center">
          <div className="bg-red-100 p-3 rounded-full">
            <AlertCircle className="h-10 w-10 text-red-500" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold">{t("errors.title", "Error!")}</h1>
          <p className="text-gray-600">
            {t("errors.noPolicy", "No policy exists for your registered mobile number. Please contact us to know more.")}
          </p>
        </div>

        <div className="pt-4">
          <Button
            className="bg-covrzy-purple hover:bg-purple-700 w-full"
            onClick={() => window.location.href = `tel:${poc}`}
          >
            {t("common.contactUs", "Contact us")}
          </Button>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            {t("login.haveAccount", "Already have an account?")} <Link to="/login" className="text-covrzy-purple hover:underline">{t("login.signin", "Sign in")}</Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default NoInsurance;