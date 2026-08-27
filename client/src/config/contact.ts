export const WHATSAPP_NUMBER = "919025857269";
export const TELEGRAM_USERNAME = "softbazzar";

export function isConfiguredWhatsAppNumber(value: string): boolean {
  return /^[1-9]\d{7,14}$/.test(value) && !/[xX]/.test(value);
}

export function isConfiguredTelegramUsername(value: string): boolean {
  return /^[A-Za-z][A-Za-z0-9_]{4,31}$/.test(value) && value !== "YOUR_USERNAME";
}

export function createWhatsAppContactUrl(number: string): string | null {
  return isConfiguredWhatsAppNumber(number) ? `https://wa.me/${number}` : null;
}

export function createTelegramContactUrl(username: string): string | null {
  return isConfiguredTelegramUsername(username) ? `https://t.me/${username}` : null;
}
