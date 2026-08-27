import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { TELEGRAM_USERNAME, WHATSAPP_NUMBER } from "@/config/contact";
import { minimumDeadline, isPastDeadline } from "@/lib/deadline";
import { createOrderMessage, createOrderReference, createTelegramOrderUrl, createWhatsAppOrderUrl, OrderDetails } from "@/lib/order";
import { calculateOrderTotals, DELIVERY_OPTIONS, formatRupees, resolveCartItems } from "@/lib/pricing";
import { useCart } from "@/contexts/CartContext";
import { ArrowLeft, Check, X } from "lucide-react";
import { FormEvent, useState } from "react";

export type FormErrors = Partial<Record<keyof OrderDetails, string>>;
type OrderDetailsDialogProps = Readonly<{ open: boolean; onOpenChange: (open: boolean) => void; whatsappNumber?: string; telegramUsername?: string }>;
const blankDetails: OrderDetails = { name: "", topic: "", deadline: "", delivery: "standard", notes: "" };

export function validateOrderDetails(details: OrderDetails, now = new Date()): FormErrors {
  const next: FormErrors = {};
  if (!details.name.trim()) next.name = "Enter your name.";
  if (!details.topic.trim()) next.topic = "Describe the topic or requirement.";
  if (!details.deadline) next.deadline = "Choose a deadline.";
  else if (isPastDeadline(details.deadline, now)) next.deadline = "Choose a deadline in the future.";
  if (!DELIVERY_OPTIONS.some((option) => option.id === details.delivery)) next.delivery = "Choose a delivery speed.";
  return next;
}

export function OrderDetailsDialog({ open, onOpenChange, whatsappNumber = WHATSAPP_NUMBER, telegramUsername = TELEGRAM_USERNAME }: OrderDetailsDialogProps) {
  const { items } = useCart();
  const [details, setDetails] = useState<OrderDetails>(blankDetails);
  const [errors, setErrors] = useState<FormErrors>({});
  const [orderId, setOrderId] = useState<string | null>(null);
  const [channelError, setChannelError] = useState<string | null>(null);
  const lines = resolveCartItems(items);
  const totals = calculateOrderTotals(items, details.delivery);
  const reviewing = orderId !== null;
  const orderMessage = orderId ? createOrderMessage({ orderId, lines, totals, details }) : "";
  const whatsappOrderUrl = orderId ? createWhatsAppOrderUrl(whatsappNumber, orderMessage) : null;
  const telegramOrderUrl = orderId ? createTelegramOrderUrl(telegramUsername, orderMessage) : null;

  function closeDialog(nextOpen: boolean): void {
    if (!nextOpen) { setDetails(blankDetails); setErrors({}); setOrderId(null); setChannelError(null); }
    onOpenChange(nextOpen);
  }

  function submit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const nextErrors = validateOrderDetails(details);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0 && lines.length > 0) setOrderId(createOrderReference());
  }

  function showChannelUnavailable(channel: "WhatsApp" | "Telegram"): void {
    setChannelError(`${channel} ordering needs configuration before it can open a recipient.`);
  }

  return <Dialog open={open} onOpenChange={closeDialog}><DialogContent showCloseButton={false} className="order-dialog max-h-[92dvh] max-w-[calc(100%-1rem)] overflow-y-auto rounded-none border-[#d8d0c2] bg-[#fbf8f1] p-0 sm:max-w-[690px]">
    <div className="order-dialog__header"><div><p className="eyebrow">{reviewing ? "ORDER REVIEW" : "ONE LAST STEP"}</p><DialogTitle className="order-dialog__title">{reviewing ? "Ready to send" : "Order details"}</DialogTitle><DialogDescription className="order-dialog__description">{reviewing ? "Review the local summary, then choose a contact channel." : "Share only what is needed to confirm the work and deadline."}</DialogDescription></div><button type="button" className="icon-button" onClick={() => closeDialog(false)} aria-label="Close order details"><X size={21} strokeWidth={1.5} aria-hidden="true" /></button></div>
    {reviewing ? <div className="order-review"><div className="reference-row"><span>Reference</span><strong>{orderId}</strong></div><div className="review-lines">{lines.map((line) => <div key={line.key}><span>{line.serviceName} — {line.tierLabel} <small>× {line.quantity}</small></span><strong>{formatRupees(line.lineTotal)}</strong></div>)}</div><div className="review-totals"><div><span>Subtotal</span><strong>{formatRupees(totals.subtotal)}</strong></div><div><span>{totals.deliveryRate === 0 ? "Standard delivery" : `${totals.deliveryRate * 100}% delivery surcharge`}</span><strong>{formatRupees(totals.deliveryFee)}</strong></div><div className="review-total"><span>Total</span><strong>{formatRupees(totals.total)}</strong></div></div><div className="review-details"><p><b>Name</b>{details.name}</p><p><b>Topic / Requirement</b>{details.topic}</p><p><b>Deadline</b>{new Date(details.deadline).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</p></div>{channelError && <p className="channel-error" role="alert">{channelError}</p>}<div className="channel-actions">{whatsappOrderUrl ? <a className="primary-action" href={whatsappOrderUrl} target="_blank" rel="noopener noreferrer">Order on WhatsApp</a> : <button type="button" className="primary-action" onClick={() => showChannelUnavailable("WhatsApp")}>Order on WhatsApp</button>}{telegramOrderUrl ? <a className="secondary-action" href={telegramOrderUrl} target="_blank" rel="noopener noreferrer">Order on Telegram</a> : <button type="button" className="secondary-action" onClick={() => showChannelUnavailable("Telegram")}>Order on Telegram</button>}</div><button type="button" className="back-link" onClick={() => setOrderId(null)}><ArrowLeft size={16} aria-hidden="true" /> Edit details</button></div> : <form className="order-form" onSubmit={submit} noValidate><div className="form-field"><label htmlFor="customer-name">Name <span aria-hidden="true">*</span></label><input id="customer-name" maxLength={80} value={details.name} onChange={(event) => setDetails({ ...details, name: event.target.value })} aria-describedby={errors.name ? "name-error" : undefined} aria-invalid={Boolean(errors.name)} />{errors.name && <p id="name-error" className="field-error">{errors.name}</p>}</div><div className="form-field"><label htmlFor="customer-topic">Topic / Requirement <span aria-hidden="true">*</span></label><input id="customer-topic" maxLength={200} placeholder="e.g. Consumer behaviour presentation" value={details.topic} onChange={(event) => setDetails({ ...details, topic: event.target.value })} aria-describedby={errors.topic ? "topic-error" : undefined} aria-invalid={Boolean(errors.topic)} />{errors.topic && <p id="topic-error" className="field-error">{errors.topic}</p>}</div><div className="form-field"><label htmlFor="customer-deadline">Deadline <span aria-hidden="true">*</span></label><input id="customer-deadline" type="datetime-local" min={minimumDeadline()} value={details.deadline} onChange={(event) => setDetails({ ...details, deadline: event.target.value })} aria-describedby={errors.deadline ? "deadline-error" : undefined} aria-invalid={Boolean(errors.deadline)} />{errors.deadline && <p id="deadline-error" className="field-error">{errors.deadline}</p>}</div><fieldset className="delivery-fieldset" aria-describedby={errors.delivery ? "delivery-error" : undefined}><legend>Delivery <span aria-hidden="true">*</span></legend>{DELIVERY_OPTIONS.map((option) => <label className="delivery-option" key={option.id}><input type="radio" name="delivery" value={option.id} checked={details.delivery === option.id} onChange={() => setDetails({ ...details, delivery: option.id })} /><span><b>{option.label}</b><small>{option.note}</small></span><strong>{option.rate > 0 ? `+${option.rate * 100}%` : "Included"}</strong></label>)}{errors.delivery && <p id="delivery-error" className="field-error">{errors.delivery}</p>}</fieldset><div className="form-field"><label htmlFor="customer-notes">Additional notes <span className="optional">Optional</span></label><textarea id="customer-notes" rows={4} maxLength={500} value={details.notes} onChange={(event) => setDetails({ ...details, notes: event.target.value })} /><p className="character-count">{details.notes.length}/500</p></div><div className="form-total"><span>Estimated total</span><strong>{formatRupees(totals.total)}</strong></div><button type="submit" className="primary-action primary-action--wide" disabled={lines.length === 0}><Check size={17} aria-hidden="true" /> Review order</button></form>}
  </DialogContent></Dialog>;
}
