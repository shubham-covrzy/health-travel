import { Button } from "@/components/ui/button";
import { ChevronLeft, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTranslation } from "react-i18next";
import { ENV } from "@/data";

const ReimbursementClaimDocsPage = () => {
    const isMobile = useIsMobile();
    const { t, i18n } = useTranslation();
    const getLanguageSpecificSupportNumber = () => {
        const currentLanguage = i18n.language;

        switch (currentLanguage) {
            case 'hi':
                return ENV.CLAIM_SUPPORT_HINDI;
            case 'ta':
                return ENV.CLAIM_SUPPORT_TAMIL;
            case 'kn':
                return ENV.CLAIM_SUPPORT_KANNADA;
            case 'en':
            default:
                return ENV.CLAIM_SUPPORT_ENGLISH;
        }
    };

    const supportNumber = getLanguageSpecificSupportNumber();

    const documents = [
        {
            name: t("claims.documents.claimForm.name", "Claim form"),
            description: t(
                "claims.documents.claimForm.description",
                "Click here to download the claim form. Part A is to be filled by the primary insured and Part B is to be filled, signed and stamped by the hospital."
            ),
            required: true,
        },
        {
            name: t("claims.documents.billsReceipts.name", "Bills and payment receipts"),
            description: t(
                "claims.documents.billsReceipts.description",
                "Final hospitalization bill (with break-up): This bill should have the final hospitalization amount and the break up of all charges i.e room rent charges, pharmacy charges, consumables, doctor's fees, and any other services used. Advance / Paid receipt: Payment/Acknowledgement receipt of all the payments made to the hospital i.e. payment made towards final hospitalization bill and advance/deposit paid (if any). Other bills & payment receipts: Bills for any other charge which does not form part of the final bill such as consultation bills, pharmacy bills, and corresponding proof of payment."
            ),
            required: true,
        },
        {
            name: t("claims.documents.dischargeSummary.name", "Discharge Summary"),
            description: t(
                "claims.documents.dischargeSummary.description",
                "Detailed Discharge summary is a document given at the time of discharge which contains summary of the need for hospitalization, information of the treatments availed, follow up care recommendations etc."
            ),
            required: true,
        },
        {
            name: t("claims.documents.investigationReports.name", "Investigation reports"),
            description: t(
                "claims.documents.investigationReports.description",
                "Lab reports: All lab reports such as CT scan, MRI, BIOPSY, USG Scan, Echo, Blood Test,X-ray etc. Bills and payment receipts: Prescription,bill and acknowledgement receipt of the payment made for the particular test/scan."
            ),
            required: false,
        },
        {
            name: t("claims.documents.implantDetails.name", "Implant Details"),
            description: t(
                "claims.documents.implantDetails.description",
                "Invoice: Invoice of the medical device used for implant. Implant Sticker: An Implant sticker is a small label affixed to a medical device which contains details such as model serial number, manufacturing date etc."
            ),
            required: false,
        },
        {
            name: t("claims.documents.packageSurgery.name", "Package Surgery bill-Break up"),
            description: t(
                "claims.documents.packageSurgery.description",
                "In case of a surgery, where you have availed a package from the hospital, break up of all the charges in the package. Your final bill will mention the total amount of the package, individual charges of the total bill are required."
            ),
            required: false,
        },
        {
            name: t("claims.documents.firMlc.name", "FIR/MLC Report"),
            description: t(
                "claims.documents.firMlc.description",
                "This is mandatory for accidental claims. Medico Legal Certificate (MLC) - statement by the treating doctor indicating the nature and extent of injury; FIR - police report copy in case of RTA (road traffic accident)"
            ),
            required: false,
        },
        {
            name: t("claims.documents.kyc.name", "KYC DOCUMENTS"),
            description: "",
            required: true,
            subItems: [
                t("claims.documents.kyc.aadharInsured", "Aadhar card of the insured (if claim is for your spouse or children)"),
                t("claims.documents.kyc.aadharDriver", "Aadhar card of the driver partner"),
                t("claims.documents.kyc.panInsured", "Pan card of the insured"),
                t("claims.documents.kyc.panEmployee", "Pan card of the employee"),
                t("claims.documents.kyc.ecard", "E-card of the employee"),
                t("claims.documents.kyc.idCard", "Employee ID card"),
                t("claims.documents.kyc.cancelledCheque", "Cancelled Cheque with name of primary insured")
            ]
        },
        {
            name: t("claims.documents.other.name", "Other Documents"),
            description: t(
                "claims.documents.other.description",
                "On a case to case basis, insurance co may ask for Indoor Case Papers, Doctors progress notes, Temperature sheet, GRBS sheet, OT notes or any other necessary documents."
            ),
            required: false,
        },
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-16 md:pb-0 px-4 md:px-6">
            <div className="flex items-center gap-2 py-2">
                <Link to="/reimbursement-claim" className="flex items-center text-gray-600 hover:text-gray-800">
                    <ChevronLeft className="h-5 w-5" />
                </Link>
                <h1 className="text-xl md:text-2xl font-medium text-gray-800">
                    {t("claims.documents.title", "Document List - Reimbursement Claims")}
                </h1>
            </div>

            {/* <div className="flex flex-col sm:flex-row sm:justify-end gap-3 sm:gap-4">
                <Button variant="outline" className="flex items-center justify-center gap-2 w-full sm:w-auto">
                    <Download className="h-4 w-4" />
                    {t("claims.downloadECard", "Download E-Card")}
                </Button>
                <Button className="bg-covrzy-purple hover:bg-purple-700 w-full sm:w-auto">
                    {t("claims.documents.downloadForm", "Download Claim Form")}
                </Button>
            </div> */}

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <p className="text-gray-700 font-medium">{t("claims.documents.description", "These are the documents required from you to process the claims. All documents marked with * are mandatory.")}</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="p-4 md:p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-medium border-b pb-2">
                        <div>{t("claims.documents.columnName", "Document Name")}</div>
                        <div className="md:col-span-2">{t("claims.documents.columnDescription", "Description")}</div>
                    </div>

                    <div className="space-y-8">
                        {documents.map((doc, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b pb-4">
                                <div className="font-medium">
                                    {doc.required && <span className="text-red-500">*</span>} {doc.name}
                                </div>
                                <div className="md:col-span-2">
                                    {doc.description && <p className="text-gray-600 text-sm md:text-base">{doc.description}</p>}
                                    {doc.subItems && (
                                        <ul className="list-disc pl-5 mt-2 text-gray-600 text-sm md:text-base space-y-1">
                                            {doc.subItems.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium mb-2">{t("claims.documents.importantTitle", "Important things to remember before sending your claim documents")}</h3>
                <ul className="list-disc pl-5 text-gray-600 text-sm md:text-base space-y-1">
                    <li>{t("claims.documents.important.scan", "Please colour scan the original documents clearly.")}</li>
                    <li>{t("claims.documents.important.share", "Share the colour scanned copies at the Email Address mentioned in the Claims Dashboard")}</li>
                    <li>{t("claims.documents.important.assistance", "For further assistance, please reach out to your claims team.")}</li>
                </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-6">
                <h3 className="font-medium mb-2">{t("common.needHelp", "Need help with your claim?")}</h3>
                <p className="text-gray-600 text-sm">
                    {t("common.contactSupport", "Contact our support team at")} <a href={`mailto:${ENV.SUPPORT_EMAIL}`} className="font-medium">{ENV.SUPPORT_EMAIL}</a> {t("or", "or")} <a href={`tel:${supportNumber}`} className="font-medium">{supportNumber}</a>
                </p>
            </div>

            {isMobile && (
                <div className="h-16"></div> // Space for mobile navigation
            )}
        </div>
    );
};

export default ReimbursementClaimDocsPage;