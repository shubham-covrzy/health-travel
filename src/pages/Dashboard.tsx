import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import InsuranceDetailsDialog from "@/components/InsuranceDetailsDialog";
import relianceInsurer from '../assets/reliance-insurer.svg';
import { useTranslation } from "react-i18next";
import { useAuth } from "@/context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [selectedInsurance, setSelectedInsurance] = useState(null);
  const [isInsuranceDialogOpen, setIsInsuranceDialogOpen] = useState(false);
  const { t } = useTranslation();

  const handleInsuranceCardClick = (card) => {
    setSelectedInsurance(card);
    setIsInsuranceDialogOpen(true);
  };

  const InsuranceCard = ({ card, onClick }) => (
    <Card className="card-shadow hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <CardContent className="p-6">
        <div className="space-y-4">
          <img src={relianceInsurer} className="h-10" alt={card.logo} />
          <div className="flex items-center">
            <div>
              <div className="text-sm text-gray-500">{card?.insurer}</div>
              <div className="text-gray-800 font-medium">{card?.productName}</div>
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-500">{t('dashboard.policyNumber')}</div>
            <div className="text-gray-800">{card?.policyNumber}</div>
          </div>

          <div className="flex justify-between pt-2">
            <div>
              <div className="text-sm text-gray-500">{t('dashboard.sumInsured')}</div>
              <div className="text-gray-800">{card?.sumInsured}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">{t('dashboard.membersCovered')}</div>
              <div className="text-gray-800">Seft {user?.policyDetails?.members?.length - 1 > 0 ? `+${user?.policyDetails?.members?.length - 1}` : null}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8 pb-16 md:pb-0">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">{t('dashboard.title')}</h1>
        <Link to="/claims">
          <Button className="bg-covrzy-purple hover:bg-purple-700 w-full md:w-auto">
            {t('dashboard.raiseClaim')}
          </Button>
        </Link>
      </div>

      <div>
        <h2 className="text-xl font-medium text-gray-800 mb-4">{t('dashboard.benefits')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {user?.policyDetails?.policies?.map(card => (
            <InsuranceCard
              key={card.policyId}
              card={card}
              onClick={() => handleInsuranceCardClick(card)}
            />
          ))}
        </div>
      </div>

      {selectedInsurance && (
        <InsuranceDetailsDialog
          open={isInsuranceDialogOpen}
          onOpenChange={setIsInsuranceDialogOpen}
          insurance={selectedInsurance}
        />
      )}

      {isMobile && (
        <div className="h-16"></div> // Space for mobile navigation
      )}
    </div>
  );
};

export default Dashboard;