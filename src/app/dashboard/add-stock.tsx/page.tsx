"use client";
import { FieldSet, FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { fetchProducts, fetchVariantById } from "@/services/api/productService";

export default function AddStock() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const [variant, setVariant] = useState<any>([]);
  const [selectedVariant, setSelectedVariant] = useState<any>("");

  const [debounce, setDebounce] = useState("");

  // -----------------------------
  // DEBOUNCE LOGIC
  // -----------------------------
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounce(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  // -----------------------------
  // FETCH PRODUCTS
  // -----------------------------
  useEffect(() => {
    if (!debounce.trim()) {
      setProducts([]);
      return;
    }
    getProducts(debounce);
  }, [debounce]);

  const getProducts = async (keyword: string) => {
    try {
      const response = await fetchProducts({ search: keyword });
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  // -----------------------------
  // HANDLE PRODUCT + VARIANT
  // -----------------------------
  const handleSelectedProduct = async (product: any) => {
    setSelectedProduct(product);
    setSearch(product.name);
    setProducts([]);
    try {
      const res = await fetchVariantById(product.id);
      console.log(res.data);
      setVariant(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div>
        <h1>Add Stock</h1>
      </div>
      <div>
        <form action="">
          <FieldSet>
            <FieldGroup className="grid grid-cols-3 gap-6">
              <Field>
                <FieldLabel>Product Name</FieldLabel>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={() => search.length > 0 && setProducts(products)}
                  className="border  border-black py-3 px-3 rounded-xl"
                />
                {products.length > 0 && (
                  <ul className=" bg-white border shadow-lg rounded-lg w-full">
                    {products.map((product: any) => (
                      <li
                        key={product.id}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSelectedProduct(product)}
                      >
                        {product.name}
                      </li>
                    ))}
                  </ul>
                )}
              </Field>
              <Field>
                <FieldLabel>Variant Name</FieldLabel>
                <Select onValueChange={(val) => setSelectedVariant(val)}>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        selectedProduct
                          ? "Select Variant"
                          : "Select Product First"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>
                        {variant.length
                          ? "Select Variant"
                          : "Select Product First"}
                      </SelectLabel>
                      {variant.length > 0 &&
                        variant.map((item: any) => (
                          <SelectItem key={item.id} value={String(item.id)}>
                            {item.variant_name}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel>Add Color</FieldLabel>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="border  border-black py-3 px-3 rounded-xl"
                />
              </Field>
              <Field>
                <FieldLabel>Add Stock</FieldLabel>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="border  border-black py-3 px-3 rounded-xl"
                />
              </Field>
              <Field>
                <FieldLabel>Add Price</FieldLabel>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="border  border-black py-3 px-3 rounded-xl"
                />
              </Field>
              <Field>
                <FieldLabel>Add Image</FieldLabel>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="border  border-black py-3 px-3 rounded-xl"
                />
              </Field>
            </FieldGroup>
          </FieldSet>
        </form>
      </div>
    </div>
  );
}
