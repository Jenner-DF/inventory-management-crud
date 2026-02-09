"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { createProduct } from "@/lib/actions/actions";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { productBaseSchema } from "@/lib/schema/product.schema";
import { redirect } from "next/navigation";
export default function CreateProductForm({ userId }: { userId: string }) {
  const queryClient = useQueryClient();
  async function onSubmit(data: z.input<typeof productBaseSchema>) {
    // Do something with the form values.
    const createdProduct = productBaseSchema.parse(data);
    toast.promise(createProduct({ ...createdProduct, userId }), {
      loading: "Creating product...",
      success: "Product created successfully",
      error: "Failed to create product",
      finally: () => {
        queryClient.invalidateQueries();
        redirect("/home/inventory");
      },
    });
  }
  const form = useForm<z.input<typeof productBaseSchema>>({
    resolver: zodResolver(productBaseSchema),
    defaultValues: {
      name: "",
      sku: "",
      price: "",
      quantity: 0,
      lowStockThreshold: 0,
    },
  });
  return (
    <Card className="w-full sm:max-w-md">
      <CardContent>
        <form id="form-product-create" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
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
          <Button type="submit" form="form-product-create">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
