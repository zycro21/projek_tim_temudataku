import dotenv from "dotenv";
dotenv.config();

const mode = process.env.DUITKU_MODE || "sandbox";

const duitkuConfig = {
  mode,
  merchantCode:
    mode === "production"
      ? process.env.DUITKU_MERCHANT_CODE_PRODUCTION
      : process.env.DUITKU_MERCHANT_CODE_SANDBOX,
  apiKey:
    mode === "production"
      ? process.env.DUITKU_API_KEY_PRODUCTION
      : process.env.DUITKU_API_KEY_SANDBOX,
  baseUrl:
    mode === "production"
      ? "https://api.duitku.com"
      : "https://sandbox.duitku.com",
};

export default duitkuConfig;
