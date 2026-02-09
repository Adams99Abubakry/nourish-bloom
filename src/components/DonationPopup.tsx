import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DonationCard } from "@/components/DonationCard";

export function DonationPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("nur-donation-popup-dismissed");
    if (!dismissed) {
      const timer = setTimeout(() => setOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = (value: boolean) => {
    if (!value) {
      sessionStorage.setItem("nur-donation-popup-dismissed", "true");
    }
    setOpen(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-none bg-transparent shadow-none">
        <DialogHeader className="sr-only">
          <DialogTitle>Support Nur ul Islam</DialogTitle>
          <DialogDescription>Make a donation to support the app</DialogDescription>
        </DialogHeader>
        <DonationCard />
      </DialogContent>
    </Dialog>
  );
}
