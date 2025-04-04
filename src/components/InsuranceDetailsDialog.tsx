import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";

interface InsuranceDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  insurance: {
    logo: string;
    provider: string;
    type: string;
    policyNumber: string;
    sumInsured: string;
    membersType: string;
    img: string;
  };
}

const InsuranceDetailsDialog = ({ open, onOpenChange, insurance }: InsuranceDetailsDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 gap-0">
        <DialogHeader className="p-6 pb-0">
          <div className="">
            <div className="flex items-center gap-3">
              <img src={insurance.img} className="h-12" alt={insurance.provider} />
              <div className="text-sm">{insurance.provider}</div>
            </div>
            <div>
              <DialogTitle className="text-base">{insurance.type}</DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-y-4 mb-6">
            <div>
              <div className="text-sm text-gray-500">{t('dashboard.policyNumber')}</div>
              <div>{insurance.policyNumber}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">{t('dashboard.sumInsured')}</div>
              <div>{insurance.sumInsured}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">{t('dashboard.membersCovered')}</div>
              <div>{insurance.membersType}</div>
            </div>
          </div>

          <div className="flex space-x-2 mb-6">
            <Button variant="outline" className="flex-1 bg-[#7743DC] text-white">
              {t('insurance.details.downloadCard')}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </Button>
            <Button variant="outline" className="flex-1">
              {t('insurance.details.hospitalNetwork')}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </Button>
            <Button variant="outline" className="flex-1">
              {t('insurance.details.dayCareTreatment')}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </Button>
          </div>

          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">{t('insurance.details.overview')}</TabsTrigger>
              <TabsTrigger value="inclusions">{t('insurance.details.inclusions')}</TabsTrigger>
              <TabsTrigger value="exclusions">{t('insurance.details.exclusions')}</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-6">
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500">{t('dashboard.policyNumber')}</div>
                  <div>Details Awaited</div>
                </div>

                <div className="flex justify-between gap-2">
                  <div>
                    <div className="text-sm text-gray-500">{t('dashboard.sumInsured')}</div>
                    <div>{insurance.sumInsured}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">{t('dashboard.membersCovered')}</div>
                    <div>{insurance.membersType}</div>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-gray-500">
                        <th className="font-normal">{t('profile.dependent.name')}</th>
                        <th className="font-normal">{t('profile.dependent.relationship')}</th>
                        <th className="font-normal">{t('profile.dependent.dob')}</th>
                        <th className="font-normal">Health ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Sachin</td>
                        <td>Self</td>
                        <td>01/02/1990</td>
                        <td>-</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="inclusions">
              <div className="text-sm">
                <p>Policy inclusions will be displayed here.</p>
              </div>
            </TabsContent>

            <TabsContent value="exclusions">
              <div className="text-sm">
                <p>Policy exclusions will be displayed here.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InsuranceDetailsDialog;