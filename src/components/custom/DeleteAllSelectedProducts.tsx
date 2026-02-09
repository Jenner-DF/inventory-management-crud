import { deleteAllSelectedProducts } from "@/lib/actions/actions";
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
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ProductFormValues } from "@/lib/schema/product.schema";

export default function DeleteAllSelectedProducts({
  selectedRows,
}: {
  selectedRows: ProductFormValues[];
}) {
  const queryClient = useQueryClient();
  function handleDelete() {
    toast.promise(deleteAllSelectedProducts(selectedRows), {
      loading: "deleting product...",
      success: "Product deleted successfully",
      error: "Failed to delete product",
      finally: () => queryClient.invalidateQueries(),
    });
  }
  if (selectedRows.length <= 0) return;
  return (
    <>
      <Dialog>
        <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
          <Button variant="outline">Delete selected rows</Button>
        </DialogTrigger>

        <DialogContent
          showCloseButton={false}
          onClick={(e) => e.stopPropagation()}
        >
          <DialogHeader>
            <DialogTitle>
              {selectedRows.length > 1 ? "Delete Rows" : "Delete Row"}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <strong>{selectedRows.length}</strong> selected
            {selectedRows.length > 1 ? " rows" : " row"} will be deleted, are
            you sure?
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <Button variant={"destructive"} onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
