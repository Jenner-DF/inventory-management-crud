"use client";
import CreateProductForm from "@/components/custom/CreateProductForm";
import { Button } from "@/components/ui/button";
import {
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Dialog,
} from "@/components/ui/dialog";

export default function AddProductClient({ userId }: { userId: string }) {
  return (
    <div className="flex items-center justify-center">
      <CreateProductForm userId={userId} />
      {/* <Dialog>
        <DialogTrigger asChild>
          <Button>Create a Product</Button>
        </DialogTrigger>

        <DialogContent className="max-h-[80vh] overflow-y-auto w-full max-w-md sm:max-w-lg rounded-xl p-6 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle>Create Product</DialogTitle>
            <DialogDescription>
              Create your product details here{" "}
            </DialogDescription>
          </DialogHeader>
          <CreateProductForm userId={userId} />
        </DialogContent>
      </Dialog> */}
    </div>
  );
}
