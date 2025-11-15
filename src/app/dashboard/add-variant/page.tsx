"use client";

import {
  FieldSet,
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { createVariant } from "@/services/api/productService";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useProductSearch } from "@/hooks/useProductSearch";

const variantSchema = z.object({
  productId: z.string().min(1, { message: "Produk harus dipilih" }),
  name: z.string().min(3, { message: "Variant minimal 3 karakter" }),
  price: z.string().min(1, { message: "Harga harus diisi" }),
});

type FormData = z.infer<typeof variantSchema>;

export default function AddVariant() {
  const { search, setSearch, products, setProducts } = useProductSearch();
  const [showDropdown, setShowDropdown] = useState(false);
  // -----------------------------
  // FORM HANDLER
  // -----------------------------
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(variantSchema),
    defaultValues: {
      productId: "",
      name: "",
      price: "",
    },
  });
  // -----------------------------
  // HANDLERS
  // -----------------------------

  const handleSelectProduct = (product: any) => {
    setSearch(product.name);
    setShowDropdown(false);
    setProducts([]);
    setValue("productId", product.id.toString());
  };
  const onSubmit = async (data: FormData) => {
    const payload = {
      ...data,
      price: Number(data.price),
      productId: Number(data.productId),
    };

    console.log("Payload terkirim:", payload);
    await createVariant(payload);
  };
  return (
    <div>
      <div className="text-center">
        <h1 className="text-3xl">Add Variant</h1>
      </div>

      <div className="flex flex-col items-center mt-3 ">
        <form className="w-full max-w-3xl" onSubmit={handleSubmit(onSubmit)}>
          <FieldSet>
            <FieldGroup className="grid grid-cols-1 gap-6">
              {/* SEARCH PRODUCT */}
              <Field className="">
                <FieldLabel>Search Product Name</FieldLabel>

                <Input
                  onFocus={() => setShowDropdown(true)}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border border-black py-3 px-3 rounded-xl w-full"
                />
                {errors.productId && (
                  <FieldError>{errors.productId.message}</FieldError>
                )}
                {showDropdown && products.length > 0 && (
                  <ul className=" bg-white border rounded-lg shadow-lg w-full">
                    {products.map((product: any) => (
                      <li
                        key={product.id}
                        onClick={() => handleSelectProduct(product)}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                      >
                        {product.name}
                      </li>
                    ))}
                  </ul>
                )}
              </Field>

              {/* VARIANT NAME */}
              <Field>
                <FieldLabel>Variant Name</FieldLabel>
                <Input
                  type="text"
                  className="border border-black py-3 px-3 rounded-xl"
                  {...register("name")}
                />
                {errors.name && <FieldError>{errors.name.message}</FieldError>}
              </Field>

              {/* VARIANT PRICE */}
              <Field>
                <FieldLabel>Variant Price</FieldLabel>
                <Input
                  type="text"
                  className="border border-black py-3 px-3 rounded-xl"
                  {...register("price")}
                />
                {errors.price && (
                  <FieldError>{errors.price.message}</FieldError>
                )}
              </Field>
            </FieldGroup>
          </FieldSet>

          <div className="flex justify-center mt-7">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
