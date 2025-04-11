interface EnvVariables {
  SUPPORT_PHONE: string;
  SUPPORT_EMAIL: string;
  SUPPORT_NAME: string;
  CLAIM_SUPPORT_ENGLISH?: string;
  CLAIM_SUPPORT_HINDI?: string;
  CLAIM_SUPPORT_TAMIL?: string;
  CLAIM_SUPPORT_KANNADA?: string;
}

// Safe access to environment variables in Vite
export const ENV: EnvVariables = {
  SUPPORT_PHONE: import.meta.env.VITE_POC_NO_INSURANCE || "+91 8660514573",
  SUPPORT_EMAIL: import.meta.env.VITE_POC_EMAIL_INSURANCE || "support@covrzy.com",
  SUPPORT_NAME: import.meta.env.VITE_POC_NAME_INSURANCE || " Bhuvan Kumar ",
  CLAIM_SUPPORT_ENGLISH:
    import.meta.env.VITE_CLAIM_SUPPORT_ENGLISH || "+91 8660514573",
  CLAIM_SUPPORT_HINDI: import.meta.env.VITE_CLAIM_SUPPORT_HINDI || "+91 7019035697",
  CLAIM_SUPPORT_TAMIL: import.meta.env.VITE_CLAIM_SUPPORT_TAMIL || "+91 9113537473",
  CLAIM_SUPPORT_KANNADA: import.meta.env.VITE_CLAIM_SUPPORT_KANNADA || "+91 8660514573",
};
