"use client";
import { formSchema } from "@/lib/schema/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { updateProduct } from "@/lib/actions/actions";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { ProductFormValues } from "@/lib/schema/product.schema";
export default function EditProductForm({
  product,
}: {
  product: ProductFormValues;
}) {
  const queryClient = useQueryClient();

  function onSubmit(data: z.input<typeof formSchema>) {
    // Do something with the form values.
    const updatedProduct = formSchema.parse(data);
    toast.promise(
      updateProduct(updatedProduct),

      {
        loading: "Updating product...",
        success: "Product updated successfully",
        error: "Failed to update product",
        finally: () => queryClient.invalidateQueries(),
      },
    );
  }
  const form = useForm<z.input<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: product.id,
      name: product.name,
      sku: product.sku ?? undefined,
      price: product.price?.toString() ?? "",
      quantity: product.quantity ?? 0,
      lowStockThreshold: product.lowStockThreshold ?? 0, // default 0
    },
  });
  return (
    <Card className="w-full sm:max-w-md">
      <CardContent>
        <form id="form-product-edit" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="form-product-edit-id">Product ID</FieldLabel>
              <Input
                id="form-product-edit-id"
                value={form.getValues("id")}
                disabled
              />
            </Field>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-product-edit-title">
                    Product name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-product-edit-title"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="sku"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-product-edit-sku">SKU</FieldLabel>
                  <Input
                    {...field}
                    placeholder={product.sku ?? "n/a"}
                    disabled={true}
                    id="form-product-edit-sku"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="price"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-product-edit-price">
                    Price
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-product-edit-price"
                    type="text"
                    inputMode="decimal"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="quantity"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-product-edit-quantity">
                    Quantity
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-product-edit-quantity"
                    type="number"
                    value={(field.value as number) ?? 0}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.error && (
                    <FieldError
                      errors={[{ message: fieldState.error.message }]}
                    />
                  )}
                </Field>
              )}
            />

            <Controller
              name="lowStockThreshold"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-product-edit-low-stock-threshold">
                    Low Stock Threshold
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-product-edit-low-stock-threshold"
                    type="number"
                    value={(field.value as number) ?? ""}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-product-edit">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
