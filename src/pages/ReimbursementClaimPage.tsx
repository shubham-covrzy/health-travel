import { Button } from "@/components/ui/button";
import { ChevronLeft, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTranslation } from "react-i18next";

const ReimbursementClaimPage = () => {
    const isMobile = useIsMobile();
    const { t } = useTranslation();

    const steps = [
        {
            step: 1,
            description: t("claims.reimbursement.steps.1", "Please contact our claims team via phone or email to initiate your reimbursement request within 48 hours of your discharge.")
        },
        {
            step: 2,
            description: t("claims.reimbursement.steps.2", "You can access the Claim Form specific to your insurance provider by clicking on the link provided here. When filling out the form, please complete Part A yourself or seek assistance from our claims team. Additionally, ensure Part B is properly filled out, signed, and stamped by the hospital.")
        },
        {
            step: 3,
            description: t("claims.reimbursement.steps.3", "Make sure to collect all the documents related to your hospitalization, and you can view the document checklist by clicking the \"View Document List\" button above.")
        },
        {
            step: 4,
            description: t("claims.reimbursement.steps.4", "Prior to submitting your documents, it's essential to review the important points outlined here.")
        },
        {
            step: 5,
            description: t("claims.reimbursement.steps.5", "Following the approval or rejection of your claim, you will receive a confirmation email from us.")
        }
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-16 md:pb-0 px-4 md:px-6">
            <div className="flex items-center gap-2 py-2">
                <Link to="/claims" className="flex items-center text-gray-600 hover:text-gray-800">
                    <ChevronLeft className="h-5 w-5" />
                </Link>
                <h1 className="text-xl md:text-2xl font-medium text-gray-800">{t("claims.types.reimbursement.title", "Reimbursement Claim")}</h1>
            </div>

            <div className="flex justify-end">
                <Button className="bg-covrzy-purple hover:bg-purple-700 px-6">{t("claims.viewDocList", "View Document List")}</Button>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <p className="text-gray-700">
                    {t("claims.types.reimbursement.description", "Select this if you have recently been released from the hospital and settled any outstanding medical expenses.")}
                </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="p-4 md:p-6 space-y-6">
                    <h2 className="text-lg md:text-xl font-medium">{t("claims.reimbursement.processTitle", "Reimbursement Claim Process")}</h2>

                    <div className="space-y-5">
                        {steps.map((step) => (
                            <div key={step.step} className="flex gap-4">
                                <div className="space-y-1 pt-1">
                                    <h3 className="font-medium">{t("claims.process.step", "Step")} {step.step}</h3>
                                    <p className="text-gray-600 text-sm md:text-base">
                                        {step.step === 2 ? (
                                            <>
                                                {t("claims.reimbursement.steps.2.linkText", "You can access the Claim Form specific to your insurance provider by clicking on the link provided")} <Link to="https://linktr.ee/claimsdocument" className="text-covrzy-purple hover:underline">{t("here", "here")}</Link>. {t("claims.reimbursement.steps.2.remainingText", "When filling out the form, please complete Part A yourself or seek assistance from our claims team. Additionally, ensure Part B is properly filled out, signed, and stamped by the hospital.")}
                                            </>
                                        ) : step.step === 4 ? (
                                            <>
                                                {t("claims.reimbursement.steps.4.linkText", "Prior to submitting your documents, it's essential to review the important points outlined")} <Link to="https://linktr.ee/healthclaims" className="text-covrzy-purple hover:underline">{t("here", "here")}</Link>.
                                            </>
                                        ) : (
                                            step.description
                                        )}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium mb-2">{t("common.needHelp", "Need help with your claim?")}</h3>
                <p className="text-gray-600 text-sm">
                    {t("common.contactSupport", "Contact our support team at")} <span className="font-medium">{import.meta.env.VITE_POC_EMAIL_INSURANCE}</span> {t("or", "or")} <span className="font-medium">{import.meta.env.VITE_POC_NO_INSURANCE}</span>
                </p>
            </div>

            {isMobile && (
                <div className="h-16"></div>
            )}
        </div>
    );
};

export default ReimbursementClaimPage;