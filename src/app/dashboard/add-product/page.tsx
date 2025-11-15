"use client";
import {
  FieldSet,
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { createProduct } from "@/services/api/productService";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";

const productSchema = z.object({
  name: z.string().min(3, { message: "Product minimal 3 karakter" }),
  description: z
    .string()
    .min(10, { message: "Description minimal 10 karakter" }),
  basePrice: z.string().min(1, { message: "Harga harus diisi" }),
  image: z.string().min(1, { message: "URL Gambar harus diisi" }),
  brand: z.string().min(2, { message: "brand harus diisi" }),
  categoryId: z.string().min(1, { message: "category harus diisi" }),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function AddProduct() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      basePrice: "",
      image: "",
      brand: "",
      categoryId: "",
    },
  });
  const onSubmit = async (data: ProductFormData) => {
    const payload = {
      ...data,
      basePrice: Number(data.basePrice),
      categoryId: Number(data.categoryId),
    };
    console.log("data terkirim", payload);
    try {
      await createProduct(payload);
      alert("Product berhasil ditambahkan");
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat menambahkan product");
    }
  };
  return (
    <div>
      <div className="text-center">
        <h1 className="text-3xl">Add Product</h1>
      </div>
      <div className="flex flex-col items-center mt-3 ">
        <form
          action=""
          className="w-full max-w-3xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FieldSet>
            <FieldGroup className="grid grid-cols-2 gap-6">
              <Field>
                <FieldLabel>Product Name</FieldLabel>
                <Input type="text" {...register("name")} className="border-black" />
                {errors.name && <FieldError>{errors.name.message}</FieldError>}
              </Field>
              <Field>
                <FieldLabel>Product Description</FieldLabel>
                <Input type="text" {...register("description")} className="border-black" />
                {errors.description && (
                  <FieldError>{errors.description.message}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel>Product Price</FieldLabel>
                <Input type="text" {...register("basePrice")} className="border-black"/>
                {errors.basePrice && (
                  <FieldError>{errors.basePrice.message}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel>Product Image</FieldLabel>
                <Input type="text" {...register("image")} className="border-black" />
                {errors.image && (
                  <FieldError>{errors.image.message}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel>Product Brand</FieldLabel>
                <Input type="text" {...register("brand")} className="border-black" />
                {errors.brand && (
                  <FieldError>{errors.brand.message}</FieldError>
                )}
              </Field>
            </FieldGroup>
          </FieldSet>
          <div className="flex flex-col justify-center items-center mt-7 gap-5">
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      <SelectItem value="1">Smartphone</SelectItem>
                      <SelectItem value="2">Laptop</SelectItem>
                      <SelectItem value="3">Smartwatch</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {/* Tampilkan error untuk Select */}
            {errors.categoryId && (
              <FieldError>{errors.categoryId.message}</FieldError>
            )}

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Menyimpan..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
