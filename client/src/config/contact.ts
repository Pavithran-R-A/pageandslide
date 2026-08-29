const viteEnv = (import.meta as ImportMeta & { env?: Readonly<Record<string, string | undefined>> }).env ?? {};
const runtimeEnv = (globalThis as typeof globalThis & { process?: { env?: Readonly<Record<string, string | undefined>> } }).process?.env ?? {};

export const WHATSAPP_NUMBER = (viteEnv.VITE_WHATSAPP_NUMBER || runtimeEnv.VITE_WHATSAPP_NUMBER || "919025857269").trim();
export const TELEGRAM_USERNAME = (viteEnv.VITE_TELEGRAM_USERNAME || runtimeEnv.VITE_TELEGRAM_USERNAME || "").trim();

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
