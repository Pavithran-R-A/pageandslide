/** Local cart storage is narrow, validated, and never includes checkout data. */
import { CartItem, isValidCartItem } from "@/lib/pricing";
export const CART_STORAGE_KEY = "softbazzar_cart_v1";
export function readStoredCart(): CartItem[] { if (typeof window === "undefined") return []; try { const raw = window.localStorage.getItem(CART_STORAGE_KEY); if (!raw) return []; const parsed: unknown = JSON.parse(raw); return Array.isArray(parsed) ? parsed.filter(isValidCartItem) : []; } catch { return []; } }
export function writeStoredCart(items: readonly CartItem[]): void { if (typeof window === "undefined") return; try { window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items)); } catch { /* Local storage failure does not interrupt ordering. */ } }
