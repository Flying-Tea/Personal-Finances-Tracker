import { Dialog, DialogContent, DialogPortal } from "@/components/ui/dialog";
import SignUp1 from "@/components/ui/Signup";

type SignUpModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function SignUpModal({ open, onOpenChange }: SignUpModalProps) {
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
          <SignUp1 />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
