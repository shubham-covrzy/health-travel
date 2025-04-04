import { X, Phone, Mail } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";

interface SupportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SupportDialog = ({ open, onOpenChange }: SupportDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto px-6 sm:px-8 rounded-md">
        <DialogHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-medium">We've got you covered!</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-3 py-1">
          <div>
            <div className="text-gray-600 mb-2">Claims Relationship Manager</div>
            <div className="font-medium text-lg">{import.meta.env.VITE_POC_NAME_INSURANCE}</div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-2 rounded-full">
                <Phone className="h-5 w-5 text-gray-500" />
              </div>
              <span className="text-gray-800">{import.meta.env.VITE_POC_NO_INSURANCE}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-2 rounded-full">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <span className="text-gray-800">{import.meta.env.VITE_POC_EMAIL_INSURANCE}</span>
            </div>
          </div>

          <button className="w-full bg-covrzy-purple hover:bg-purple-700 text-white py-3 px-4 rounded-md transition-colors font-medium" onClick={() => window.location.href = `tel:${import.meta.env.VITE_POC_NO_INSURANCE}`}>
            {t('common.contactUs')}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SupportDialog;