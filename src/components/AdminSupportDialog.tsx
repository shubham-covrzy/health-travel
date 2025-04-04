// AdminSupportDialog.tsx - Support dialog for admin interface
import { X, Phone, Mail } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface AdminSupportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AdminSupportDialog = ({ open, onOpenChange }: AdminSupportDialogProps) => {
  const { t } = useTranslation();
  
  // Admin-specific support contact info
  const adminSupportEmail = "admin-support@covrzy.com";
  const adminSupportPhone = "+91 98765 12345";
  const adminSupportName = "Admin Technical Support";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto px-6 sm:px-8 rounded-md">
        <DialogHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-medium">Admin Support Portal</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-3 py-1">
          <div>
            <div className="text-gray-600 mb-2">Admin Support Team</div>
            <div className="font-medium text-lg">{adminSupportName}</div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-2 rounded-full">
                <Phone className="h-5 w-5 text-gray-500" />
              </div>
              <span className="text-gray-800">{adminSupportPhone}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-2 rounded-full">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <span className="text-gray-800">{adminSupportEmail}</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <p className="text-sm text-gray-600">For urgent admin-related issues, please contact us directly.</p>
            <button 
              className="w-full bg-covrzy-purple hover:bg-purple-700 text-white py-3 px-4 rounded-md transition-colors font-medium" 
              onClick={() => window.location.href = `tel:${adminSupportPhone}`}
            >
              {t('common.contactUs')}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminSupportDialog;