/** College Press: one explicit configuration source prevents accidental recipient mismatches. */
export const WHATSAPP_NUMBER = "91XXXXXXXXXX";
export const TELEGRAM_USERNAME = "YOUR_USERNAME";
export function isConfiguredWhatsAppNumber(value: string): boolean { return /^[1-9]\d{7,14}$/.test(value) && !/[xX]/.test(value); }
export function isConfiguredTelegramUsername(value: string): boolean { return /^[A-Za-z0-9_]{5,32}$/.test(value) && value !== "YOUR_USERNAME"; }
