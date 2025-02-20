import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogOverlay, DialogPortal } from "@radix-ui/react-dialog";

type deleteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function DeleteDialog({
  open,
  onOpenChange,
}: deleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-sm">
          <DialogContent className="fixed left-1/2 top-1/2 w-full max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl border">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-gray-800">
                Delete Post
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-3">
              Are you sure you want to delete this post ?
            </div>
          </DialogContent>
          <DialogFooter className="flex justify-end mt-4">
            <Button variant="outline">Cancel</Button>
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              Confirm
            </Button>
          </DialogFooter>
        </DialogOverlay>
      </DialogPortal>
    </Dialog>
  );
}
