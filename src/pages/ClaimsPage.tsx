import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import img1 from '../assets/planned-cashless.svg';
import img2 from '../assets/emergency-claim.svg';
import img3 from '../assets/reimbursement-claim.svg';
import { useIsMobile } from "@/hooks/use-mobile";
import { Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import claimImg from '../assets/claim.svg'
import { ENV } from "@/data";
const ClaimsPage = () => {
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


  const claimTypes = [
    {
      id: 1,
      title: t('claims.types.planned.title'),
      description: t('claims.types.planned.description'),
      image: img1,
      path: "/planned-cashless-claim"
    },
    {
      id: 2,
      title: t('claims.types.emergency.title'),
      description: t('claims.types.emergency.description'),
      image: img2,
      path: "/emergency-cashless-claim"
    },
    {
      id: 3,
      title: t('claims.types.reimbursement.title'),
      description: t('claims.types.reimbursement.description'),
      image: img3,
      path: "/reimbursement-claim"
    }
  ];

  const ClaimTypeCard = ({ claim }: { claim: typeof claimTypes[0] }) => (
    <Card className="card-shadow h-full">
      <CardContent className="p-6 h-full flex flex-col">
        <div className="text-center mb-4 md:mb-6">
          <img
            src={claim.image}
            alt={claim.title}
            className="mx-auto object-contain"
          />
        </div>

        <div className="space-y-2 flex-grow">
          <h3 className="font-semibold text-lg">{claim.title}</h3>
          <p className="text-gray-600 text-sm">{claim.description}</p>
        </div>

        <div className="mt-4 pt-2 text-right">
          <Link to={claim.path}>
            <Button variant="ghost" className="text-covrzy-purple hover:text-purple-700">
              {t('claims.viewDetails')} →
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8 pb-16 md:pb-0">
      <h1 className="text-2xl font-bold text-gray-800">{t('claims.title')}</h1>

      <Card className="bg-white overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row ">
            <div className="p-6 flex-1">
              <p className="text-gray-600 mb-4">
                {t('claims.manager')}:
                <span className="font-medium text-gray-800 ml-1">{ENV.SUPPORT_NAME}</span>
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-800">{supportNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-800">{ENV.SUPPORT_EMAIL}</span>
                </div>
              </div>
            </div>

            <div className="hidden md:block md:w-1/3 p-4">
              <img
                src={claimImg}
                alt="Customer Support"
                className="w-full h-full md:h-[300px] object-contain"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {claimTypes.map(claim => (
          <ClaimTypeCard key={claim.id} claim={claim} />
        ))}
      </div>

      {isMobile && (
        <div className="h-16"></div> // Space for mobile navigation
      )}
    </div>
  );
};

export default ClaimsPage;