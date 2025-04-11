interface EnvVariables {
  SUPPORT_PHONE: string;
  SUPPORT_EMAIL: string;
}

// Safe access to environment variables in Vite
export const ENV: EnvVariables = {
  SUPPORT_PHONE: import.meta.env.VITE_POC_NO_INSURANCE || "+919026944460",
  SUPPORT_EMAIL: import.meta.env.VITE_POC_EMAIL_INSURANCE || "support@covrzy.com"
};
