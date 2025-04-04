import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import InsuranceDetailsDialog from "@/components/InsuranceDetailsDialog";
import relianceInsurer from '../assets/reliance-insurer.svg';
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const isMobile = useIsMobile();
  const [selectedInsurance, setSelectedInsurance] = useState(null);
  const [isInsuranceDialogOpen, setIsInsuranceDialogOpen] = useState(false);
  const { t } = useTranslation();

  const insuranceCards = [
    {
      id: 1,
      img: relianceInsurer,
      logo: "ICICI Lombard",
      provider: "ICICI Lombard",
      type: "Group Health Insurance",
      policyNumber: "Details Awaited",
      sumInsured: "₹10,00,000",
      membersType: "Employee"
    },
    {
      id: 2,
      img: relianceInsurer,
      logo: "Niva Bupa",
      provider: "Niva Bupa",
      type: "Group Accident Insurance",
      policyNumber: "Details Awaited",
      sumInsured: "₹10,00,000",
      membersType: "Employee"
    },
    {
      id: 3,
      img: relianceInsurer,
      logo: "Go Digit",
      provider: "Go Digit",
      type: "Group Term Life Insurance",
      policyNumber: "Details Awaited",
      sumInsured: "₹1,00,000",
      membersType: "Employee"
    }
  ];

  const handleInsuranceCardClick = (card) => {
    setSelectedInsurance(card);
    setIsInsuranceDialogOpen(true);
  };

  const InsuranceCard = ({ card, onClick }) => (
    <Card className="card-shadow hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <CardContent className="p-6">
        <div className="space-y-4">
          <img src={card.img} className="h-10" alt={card.logo} />
          <div className="flex items-center">
            <div>
              <div className="text-sm text-gray-500">{card.provider}</div>
              <div className="text-gray-800 font-medium">{card.type}</div>
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-500">{t('dashboard.policyNumber')}</div>
            <div className="text-gray-800">{card.policyNumber}</div>
          </div>

          <div className="flex justify-between pt-2">
            <div>
              <div className="text-sm text-gray-500">{t('dashboard.sumInsured')}</div>
              <div className="text-gray-800">{card.sumInsured}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">{t('dashboard.membersCovered')}</div>
              <div className="text-gray-800">{card.membersType}</div>
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
          {insuranceCards.map(card => (
            <InsuranceCard
              key={card.id}
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