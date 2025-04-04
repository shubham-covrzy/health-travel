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
      <DialogContent className="rounded-md max-w-[95vw] sm:max-w-2xl w-full p-0 gap-0  max-h-[85vh] sm:max-h-[85vh] overflow-x-hidden overflow-y-auto">
        <DialogHeader className="sticky top-0 z-50 bg-background border-b p-1 sm:p-6">
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={insurance.img}
                  className="h-10 sm:h-12 object-contain"
                  alt={insurance.provider}
                />
                <div className="min-w-0">
                  <div className="text-sm sm:text-base font-medium truncate">
                    {insurance.provider}
                  </div>
                  <DialogTitle className="text-xs sm:text-sm text-muted-foreground truncate">
                    {insurance.type}
                  </DialogTitle>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0"
                onClick={() => onOpenChange(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="p-2 sm:p-6 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="bg-muted/50 p-3 rounded-lg">
              <div className="text-xs text-muted-foreground">{t('dashboard.policyNumber')}</div>
              <div className="text-sm font-medium mt-1">{insurance.policyNumber}</div>
            </div>
            <div className="bg-muted/50 p-3 rounded-lg">
              <div className="text-xs text-muted-foreground">{t('dashboard.sumInsured')}</div>
              <div className="text-sm font-medium mt-1">{insurance.sumInsured}</div>
            </div>
            <div className="bg-muted/50 p-3 rounded-lg">
              <div className="text-xs text-muted-foreground">{t('dashboard.membersCovered')}</div>
              <div className="text-sm font-medium mt-1">{insurance.membersType}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
            <Button
              variant="default"
              className="w-full bg-[#7743DC] hover:bg-[#6935c7] text-white text-xs h-9"
            >
              {t('insurance.details.downloadCard')}
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </Button>
            <Button
              variant="outline"
              className="w-full text-xs h-9"
            >
              {t('insurance.details.hospitalNetwork')}
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </Button>
            <Button
              variant="outline"
              className="w-full text-xs h-9"
            >
              {t('insurance.details.dayCareTreatment')}
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </Button>
          </div>

          <div className="w-full overflow-hidden">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full grid grid-cols-3 h-9">
                <TabsTrigger value="overview" className="text-xs">
                  {t('insurance.details.overview')}
                </TabsTrigger>
                <TabsTrigger value="inclusions" className="text-xs">
                  {t('insurance.details.inclusions')}
                </TabsTrigger>
                <TabsTrigger value="exclusions" className="text-xs">
                  {t('insurance.details.exclusions')}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-4 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">{t('dashboard.policyNumber')}</div>
                    <div className="text-sm font-medium">Details Awaited</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">{t('dashboard.sumInsured')}</div>
                    <div className="text-sm font-medium">{insurance.sumInsured}</div>
                  </div>
                </div>

                <div className="rounded-lg border bg-card ">
                  <div className="w-full overflow-x-auto overflow-y-auto">
                    <table className="w-full min-w-[400px]">
                      <thead>
                        <tr className="border-b">
                          <th className="text-xs font-medium text-muted-foreground text-left p-3">
                            {t('profile.dependent.name')}
                          </th>
                          <th className="text-xs font-medium text-muted-foreground text-left p-3">
                            {t('profile.dependent.relationship')}
                          </th>
                          <th className="text-xs font-medium text-muted-foreground text-left p-3">
                            {t('profile.dependent.dob')}
                          </th>
                          <th className="text-xs font-medium text-muted-foreground text-left p-3">
                            Health ID
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-3 text-xs">Sachin</td>
                          <td className="p-3 text-xs">Self</td>
                          <td className="p-3 text-xs">01/02/1990</td>
                          <td className="p-3 text-xs">AAAAAAAAAAAAAAAA</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-xs">Sachin</td>
                          <td className="p-3 text-xs">Self</td>
                          <td className="p-3 text-xs">01/02/1990</td>
                          <td className="p-3 text-xs">AAAAAAAAAAAAAAAA</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-xs">Sachin</td>
                          <td className="p-3 text-xs">Self</td>
                          <td className="p-3 text-xs">01/02/1990</td>
                          <td className="p-3 text-xs">AAAAAAAAAAAAAAAA</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-xs">Sachin</td>
                          <td className="p-3 text-xs">Self</td>
                          <td className="p-3 text-xs">01/02/1990</td>
                          <td className="p-3 text-xs">AAAAAAAAAAAAAAAA</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-xs">Sachin</td>
                          <td className="p-3 text-xs">Self</td>
                          <td className="p-3 text-xs">01/02/1990</td>
                          <td className="p-3 text-xs">AAAAAAAAAAAAAAAA</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-xs">Sachin</td>
                          <td className="p-3 text-xs">Self</td>
                          <td className="p-3 text-xs">01/02/1990</td>
                          <td className="p-3 text-xs">AAAAAAAAAAAAAAAA</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="inclusions" className="mt-4">
                <div className="text-sm text-muted-foreground">
                  Policy inclusions will be displayed here.
                </div>
              </TabsContent>

              <TabsContent value="exclusions" className="mt-4">
                <div className="text-sm text-muted-foreground">
                  Policy exclusions will be displayed here.
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InsuranceDetailsDialog;