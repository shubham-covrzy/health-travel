import { Button } from "@/components/ui/button";
import { ChevronLeft, Download, Hospital } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTranslation } from "react-i18next";

const EmergencyCashlessClaimPage = () => {
    const isMobile = useIsMobile();
    const { t } = useTranslation();

    const steps = [
        {
            step: 1,
            description: t("claims.emergency.steps.1", "Please notify us of your emergency cashless hospitalization by contacting our claims team via phone or email.")
        },
        {
            step: 2,
            description: t("claims.emergency.steps.2", "Please find a hospital within your insurer's network.")
        },
        {
            step: 3,
            description: t("claims.emergency.steps.3", "Upon admission, kindly provide the hospital with both the patient's Aadhar Card and Health Card/E-Card. This will facilitate the hospital in initiating a pre-authorization request with the insurance company/TPA.")
        },
        {
            step: 4,
            description: t("claims.emergency.steps.4", "The insurance company/TPA will grant an initial approval to the hospital, covering a certain percentage of your estimated bill amount as provided by the hospital.")
        },
        {
            step: 5,
            description: t("claims.emergency.steps.5", "Upon completion of your treatment, the hospital will submit all necessary documents to the insurance company/TPA for the issuance of the final approval for your claim.")
        },
        {
            step: 6,
            description: t("claims.emergency.steps.6", "After settling any out-of-pocket expenses not covered by your insurance company/TPA, you can proceed with the discharge process.")
        },
        {
            step: 7,
            description: t("claims.emergency.steps.7", "You can claim Pre and Post Hospitalization expenses through reimbursement process.")
        }
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-16 md:pb-0 px-4 md:px-6">
            <div className="flex items-center gap-2 py-2">
                <Link to="/claims" className="flex items-center text-gray-600 hover:text-gray-800">
                    <ChevronLeft className="h-5 w-5" />
                </Link>
                <h1 className="text-xl md:text-2xl font-medium text-gray-800">{t("claims.types.emergency.title", "Emergency Cashless Claim")}</h1>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-end gap-3 sm:gap-4">
                <Button variant="outline" className="flex items-center justify-center gap-2 w-full sm:w-auto">
                    <Download className="h-4 w-4" />
                    {t("claims.downloadECard", "Download E-Card")}
                </Button>
                <Button className="bg-covrzy-purple hover:bg-purple-700 w-full sm:w-auto flex items-center justify-center gap-2">
                    <Hospital className="h-4 w-4" />
                    {t("claims.viewHospitals", "View Network Hospitals")}
                </Button>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <p className="text-gray-700">
                    {t("claims.types.emergency.description", "Choose this option if you are currently at the hospital and receiving medical care.")}
                </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="p-4 md:p-6 space-y-6">
                    <h2 className="text-lg md:text-xl font-medium">{t("claims.process.title", "Emergency Cashless Claim Process")}</h2>

                    <div className="space-y-5">
                        {steps.map((step) => (
                            <div key={step.step} className="flex gap-4">
                                <div className="space-y-1 pt-1">
                                    <h3 className="font-medium">{t("claims.process.step", "Step")} {step.step}</h3>
                                    <p className="text-gray-600 text-sm md:text-base">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-6">
                <h3 className="font-medium mb-2">{t("common.needHelp", "Need help with your claim?")}</h3>
                <p className="text-gray-600 text-sm">
                    {t("common.contactSupport", "Contact our support team at")} <span className="font-medium">{import.meta.env.VITE_POC_EMAIL_INSURANCE}</span> {t("or")} <span className="font-medium">{import.meta.env.VITE_POC_NO_INSURANCE}</span>
                </p>
            </div>

            {isMobile && (
                <div className="h-16"></div> // Space for mobile navigation
            )}
        </div>
    );
};

export default EmergencyCashlessClaimPage;