import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";

const LANGUAGES = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिन्दी" },
    { code: "kn", name: "ಕನ್ನಡ" },
    { code: "ta", name: "தமிழ்" },
];

const LANGUAGE_STORAGE_KEY = "app_language_selected";

const LanguageSelectionModal = () => {
    const { i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

    useEffect(() => {
        // Check if the user has already selected a language
        const hasSelectedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);

        if (!hasSelectedLanguage) {
            // Show the modal only on first visit
            setTimeout(() => {
                setOpen(true);
            }, 2000);
        }
    }, []);

    const handleLanguageSelect = (languageCode) => {
        setSelectedLanguage(languageCode);
    };

    const handleConfirm = () => {
        // Save the selected language
        i18n.changeLanguage(selectedLanguage);

        // Mark as selected so we don't show the modal again
        localStorage.setItem(LANGUAGE_STORAGE_KEY, "true");

        // Close the modal
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Choose Your Language</DialogTitle>
                    <DialogDescription>
                        Please select your preferred language for a personalized experience.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-3 py-4">
                    {LANGUAGES.map((language) => (
                        <Button
                            key={language.code}
                            variant={selectedLanguage === language.code ? "secondary" : "outline"}
                            className="flex justify-between items-center px-4 py-6 w-full"
                            onClick={() => handleLanguageSelect(language.code)}
                        >
                            <span className="text-lg">{language.name}</span>
                            {selectedLanguage === language.code && (
                                <Check className="h-5 w-5 text-primary" />
                            )}
                        </Button>
                    ))}
                </div>

                <div className="flex justify-end gap-3 mt-2">
                    <Button onClick={handleConfirm} className="bg-purple-600 hover:bg-purple-700">
                        Confirm
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LanguageSelectionModal;