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
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { useState, useEffect } from "react";
import {
  fetchProducts,
  fetchVariantById,
  createStock,
} from "@/services/api/productService";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// ------------------------
// ZOD SCHEMA
// ------------------------
const stockSchema = z
  .object({
    productId: z.string().min(1, "Produk harus dipilih"),
    category_id: z.string().min(1, "Kategori harus dipilih"),
    variantId: z.string().optional(),
    color: z.string().min(1, "Warna tidak boleh kosong"),
    stock: z.string().min(1, "Stock harus diisi"),
    price: z.string().min(1, "Harga harus diisi"),
    image: z.string(),
  })
  .refine(
    (data) => {
      // selain smartwatch (3), variant wajib
      if (data.category_id !== "3" && !data.variantId) {
        return false;
      }
      return true;
    },
    {
      message: "Variant harus dipilih",
      path: ["variantId"],
    }
  );

type StockForm = z.infer<typeof stockSchema>;

export default function AddStock() {
  // -----------------------------------------------------
  // RHF
  // -----------------------------------------------------
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<StockForm>({
    resolver: zodResolver(stockSchema),
    defaultValues: {
      productId: "",
      variantId: "",
      category_id: "",
      color: "",
      stock: "",
      price: "",
      image: "",
    },
  });

  // -----------------------------------------------------
  // STATES
  // -----------------------------------------------------
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [variants, setVariants] = useState<any[]>([]);
  const [debounce, setDebounce] = useState("");

  // -----------------------------------------------------
  // DEBOUNCE SEARCH
  // -----------------------------------------------------
  useEffect(() => {
    const t = setTimeout(() => setDebounce(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  // -----------------------------------------------------
  // FETCH PRODUCTS
  // -----------------------------------------------------
  useEffect(() => {
    if (!debounce.trim()) {
      setProducts([]);
      return;
    }
    getProducts(debounce);
  }, [debounce]);

  const getProducts = async (keyword: string) => {
    try {
      const res = await fetchProducts({ search: keyword });
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // -----------------------------------------------------
  // SELECT PRODUCT
  // -----------------------------------------------------
  const handleSelectProduct = async (product: any) => {
    setSearch(product.name);
    setProducts([]);

    // set productId ke RHF
    setValue("productId", product.id.toString());
    setValue("category_id", product.category_id.toString());

    // fetch variant
    try {
      if (product.categoryId === "3") {
        setVariants([]);
        setValue("variantId", ""); // kosongkan
      } else {
        const res = await fetchVariantById(product.id);
        setVariants(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // -----------------------------------------------------
  // SUBMIT
  // -----------------------------------------------------
  const onSubmit = async (data: StockForm) => {
    const payload = {
      productId: Number(data.productId),
      variantId: data.category_id === "3" ? null : Number(data.variantId),
      color: data.color,
      stock: Number(data.stock),
      price: Number(data.price),
      image: data.image,
    };

    try {
      console.log("PAYLOAD:", payload);
      await createStock(payload);
      alert("Stock berhasil ditambahkan");
    } catch (error) {
      console.error(error);
    }
  };

  // -----------------------------------------------------
  // UI
  // -----------------------------------------------------
  return (
    <div>
      <h1 className="text-3xl text-center mb-6">Add Stock</h1>

      <form className="max-w-4xl mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <FieldSet>
          <FieldGroup className="grid grid-cols-3 gap-6">
            {/* SEARCH PRODUCT */}
            <Field>
              <FieldLabel>Search Product Name</FieldLabel>
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="py-3"
              />
              {errors.productId && (
                <FieldError>{errors.productId.message}</FieldError>
              )}

              {/* DROPDOWN PRODUCT */}
              {products.length > 0 && (
                <ul className="bg-white border shadow-lg mt-1 rounded-lg">
                  {products.map((p) => (
                    <li
                      key={p.id}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSelectProduct(p)}
                    >
                      {p.name}
                    </li>
                  ))}
                </ul>
              )}
            </Field>

            {/* VARIANT SELECT */}
            {watch("category_id") !== "3" && (
              <Field>
                <FieldLabel>Select Variant</FieldLabel>
                <Select onValueChange={(v) => setValue("variantId", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Variant" />
                  </SelectTrigger>
                  <SelectContent>
                    {variants.map((v) => (
                      <SelectItem key={v.id} value={String(v.id)}>
                        {v.variant_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.variantId && (
                  <FieldError>{errors.variantId.message}</FieldError>
                )}
              </Field>
            )}

            {/* COLOR */}
            <Field>
              <FieldLabel>Color</FieldLabel>
              <Input {...register("color")} className="py-3" />
              {errors.color && <FieldError>{errors.color.message}</FieldError>}
            </Field>

            {/* STOCK */}
            <Field>
              <FieldLabel>Stock</FieldLabel>
              <Input {...register("stock")} className="py-3" />
              {errors.stock && <FieldError>{errors.stock.message}</FieldError>}
            </Field>

            {/* PRICE */}
            <Field>
              <FieldLabel>Price</FieldLabel>
              <Input {...register("price")} className="py-3" />
              {errors.price && <FieldError>{errors.price.message}</FieldError>}
            </Field>

            {/* IMAGE */}
            <Field>
              <FieldLabel>Image URL</FieldLabel>
              <Input {...register("image")} className="py-3" />
              {errors.image && <FieldError>{errors.image.message}</FieldError>}
            </Field>
          </FieldGroup>
        </FieldSet>

        <div className="flex justify-center mt-8">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
}
