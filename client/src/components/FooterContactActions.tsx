import { createTelegramContactUrl, createWhatsAppContactUrl, TELEGRAM_USERNAME, WHATSAPP_NUMBER } from "@/config/contact";
import { useState } from "react";

type FooterContactActionsProps = Readonly<{ whatsappNumber?: string; telegramUsername?: string }>;

export function FooterContactActions({ whatsappNumber = WHATSAPP_NUMBER, telegramUsername = TELEGRAM_USERNAME }: FooterContactActionsProps) {
  const [feedback, setFeedback] = useState("");
  const whatsappUrl = createWhatsAppContactUrl(whatsappNumber);
  const telegramUrl = createTelegramContactUrl(telegramUsername);

  function showUnavailable(channel: "WhatsApp" | "Telegram"): void {
    setFeedback(`${channel} contact is not configured yet.`);
  }

  return <>
    {whatsappUrl ? <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a> : <button type="button" onClick={() => showUnavailable("WhatsApp")}>WhatsApp</button>}
    {telegramUrl ? <a href={telegramUrl} target="_blank" rel="noopener noreferrer">Telegram</a> : <button type="button" onClick={() => showUnavailable("Telegram")}>Telegram</button>}
    {feedback && <span role="status" style={{ flexBasis: "100%", color: "var(--wine)", fontSize: 10, textAlign: "right" }}>{feedback}</span>}
  </>;
}
