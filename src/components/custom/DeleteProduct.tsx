"use client";
import { deleteSelectedProduct } from "@/lib/actions/actions";
import { Button } from "../ui/button";
import {
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Dialog,
} from "../ui/dialog";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { ProductFormValues } from "@/lib/schema/product.schema";

export default function DeleteProduct({ row }: { row: ProductFormValues }) {
  const queryClient = useQueryClient();
  function handleDelete() {
    toast.promise(deleteSelectedProduct(row.id), {
      loading: "deleting product...",
      success: "Product deleted successfully",
      error: "Failed to delete product",
      finally: () => queryClient.invalidateQueries(),
    });
  }
  return (
    <>
      <Dialog>
        <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
          <Button variant="destructive">Delete</Button>
        </DialogTrigger>

        <DialogContent
          showCloseButton={false}
          onClick={(e) => e.stopPropagation()}
        >
          <DialogHeader>
            <DialogTitle>Confirm deletion</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <strong>{row.name}</strong> will be deleted, are you sure?
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant={"destructive"} onClick={handleDelete}>
                Delete
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
