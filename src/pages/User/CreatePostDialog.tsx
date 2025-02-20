import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@components/ui/dialog";
import {
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { Post } from "@utils/definitions";
import { useRef } from "react";
import { X } from "react-feather";
console.log("aldkald;lk")
interface createPostProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newPost: Post & { imageFile: null | File };
  createNewPost: () => {};
  handleDialogChange: (f: string, val: string | File | null) => void;
  postErr: {
    content: string;
    imageUrl: string;
  };
}

export default function CreatePostDialog({
  open,
  onOpenChange,
  newPost,
  createNewPost,
  handleDialogChange,
  postErr,
}: createPostProps) {

  const postImgRef = useRef<HTMLInputElement>(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <DialogContent className="fixed left-1/2 top-1/2 w-full max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl border">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-800">
              Create Post
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              What’s on your mind today?
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-3">
            <textarea
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              value={newPost.content}
              onChange={(e) => {
                handleDialogChange("content", e.target.value);
              }}
              placeholder="Write something..."
            />
            <span style={{ color: "red" }}>{postErr.content}</span>
          </div>

          <div className="space-y-4 mt-3 flex flex-col gap-2">
            <div
              className={`p-2 flex cursor-pointer justify-between bg-zinc-50 rounded-md flex-1 ${
                postErr.imageUrl ? "border-red-600" : ""
              }`}
              onClick={() => postImgRef.current && postImgRef.current.click()}
            >
              {newPost.imageFile?.name || "Choose a jpg image"}
              <X
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDialogChange("imageFile", null);
                }}
              />
            </div>
            <input
              type="file"
              id="imageUrl"
              ref={postImgRef}
              style={{ display: "none", width: "0px" }}
              placeholder="Enter Image Url"
              onChange={(e) => {
                const file = e.target.files;
                if (file && file.length) {
                  handleDialogChange("imageFile", file[0]);
                }
              }}
            />

            <span style={{ color: "red" }}>{postErr.imageUrl}</span>
          </div>
          <DialogFooter className="flex justify-end mt-4">
            <Button
              variant="outline"
              // onClick={() => {
                
              //   setCreateDialog(false);
              //   setNewPost(postObject);
              // }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => createNewPost()}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
