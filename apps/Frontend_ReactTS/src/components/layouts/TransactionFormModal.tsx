import { Dialog, DialogContent, DialogPortal } from "@/components/ui/dialog";
import TransactionForm from "@/components/ui/TransactionForm";

type TransactionModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function TransactionModal({
  open,
  onOpenChange,
}: TransactionModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
      <DialogPortal>
        {open && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
            onClick={() => onOpenChange(false)}
          />
        )}

        <DialogContent className="max-w-[550px] p-0 bg-transparent shadow-none border-none z-[10000]">
          <TransactionForm onClose={() => onOpenChange(false)} />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
