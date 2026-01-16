import { Dialog, DialogContent, DialogPortal, } from "@/components/ui/dialog";

type ConfirmModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    message: string;
    onConfirm: () => void;
};

export default function ConfirmModal({
    open,
    onOpenChange,
    title,
    message,
    onConfirm,
}: ConfirmModalProps) {
    return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        {/* 🚨 FORCE portal to BODY */}
        <DialogPortal container={document.body}>
        {open && (
            <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-10000"
            onClick={() => onOpenChange(false)}
            />
        )}

            <DialogContent className="fixed z-10001 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md bg-gray-900 text-white border border-gray-700 rounded-xl p-6">
                <h2 className="text-xl font-bold mb-2">{title}</h2>
                <p className="text-gray-400 mb-6">{message}</p>

                <div className="flex justify-end gap-3">
                <button
                    onClick={() => onOpenChange(false)}
                    className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
                >
                    Cancel
                </button>

                <button
                    onClick={() => {
                    onConfirm();
                    onOpenChange(false);
                    }}
                    className="px-4 py-2 rounded bg-red-600 hover:bg-red-700"
                >
                    Sign out
                </button>
                </div>
            </DialogContent>
        </DialogPortal>
    </Dialog>
    );
}
