/** College Press: functional editorial cart drawer; preserve quiet paper, fine rules, and burgundy actions. */
import { useCart } from "@/contexts/CartContext";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { calculateSubtotal, formatRupees, resolveCartItems } from "@/lib/pricing";
import { Minus, Plus, X } from "lucide-react";

type CartDialogProps = Readonly<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReview: () => void;
}>;

export function CartDialog({ open, onOpenChange, onReview }: CartDialogProps) {
  const { items, increaseItem, decreaseItem, removeItem } = useCart();
  const lines = resolveCartItems(items);
  const subtotal = calculateSubtotal(items);

  function restoreTriggerFocus(): void {
    window.requestAnimationFrame(() => document.querySelector<HTMLButtonElement>(".cart-toggle")?.focus());
  }

  function handleOpenChange(nextOpen: boolean): void {
    onOpenChange(nextOpen);
    if (!nextOpen) restoreTriggerFocus();
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent showCloseButton={false} className="cart-dialog left-auto right-0 top-0 h-dvh w-full max-w-none translate-x-0 translate-y-0 rounded-none border-y-0 border-r-0 p-0 sm:max-w-[430px]">
        <div className="cart-dialog__header">
          <div>
            <p className="eyebrow">YOUR SELECTION</p>
            <DialogTitle className="cart-dialog__title">Order</DialogTitle>
            <DialogDescription className="cart-dialog__description">Review quantities before adding your details.</DialogDescription>
          </div>
          <button type="button" className="icon-button" onClick={() => handleOpenChange(false)} aria-label="Close order drawer">
            <X size={21} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="empty-cart">
            <h3>Your order is empty.</h3>
            <p>Select a service to begin.</p>
            <button type="button" className="text-action" onClick={() => { handleOpenChange(false); document.getElementById("services")?.scrollIntoView({ behavior: "smooth" }); }}>
              Browse services <span aria-hidden="true">→</span>
            </button>
          </div>
        ) : (
          <>
            <div className="cart-lines">
              {lines.map((line) => (
                <article className="cart-line" key={line.key}>
                  <div className="cart-line__main">
                    <h3>{line.serviceName}</h3>
                    <p>{line.tierLabel}</p>
                    <span>{formatRupees(line.unitPrice)} each</span>
                  </div>
                  <div className="cart-line__total">
                    <strong>{formatRupees(line.lineTotal)}</strong>
                    <button type="button" className="remove-line" onClick={() => removeItem(line.serviceId, line.tierId)}>Remove</button>
                  </div>
                  <div className="quantity-control" aria-label={`Quantity for ${line.serviceName}, ${line.tierLabel}`}>
                    <button type="button" onClick={() => decreaseItem(line.serviceId, line.tierId)} aria-label={`Decrease quantity of ${line.serviceName}`}><Minus size={15} aria-hidden="true" /></button>
                    <output aria-label={`Quantity ${line.quantity}`}>{line.quantity}</output>
                    <button type="button" onClick={() => increaseItem(line.serviceId, line.tierId)} aria-label={`Increase quantity of ${line.serviceName}`}><Plus size={15} aria-hidden="true" /></button>
                  </div>
                </article>
              ))}
            </div>
            <div className="cart-dialog__footer">
              <div className="cart-subtotal"><span>Subtotal</span><strong>{formatRupees(subtotal)}</strong></div>
              <button type="button" className="primary-action primary-action--wide" onClick={onReview}>Review order <span aria-hidden="true">→</span></button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
