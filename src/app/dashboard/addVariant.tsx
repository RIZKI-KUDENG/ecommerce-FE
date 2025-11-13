"use client";
import { FieldSet, FieldGroup, Field, FieldLabel } from "@/components/ui/field";
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
import { fetchProducts } from "@/services/api/productService";
import React, { use, useEffect, useState } from "react";

export default function AddVariant() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [debounceValue, setDebounceValue] = useState("");
  const handleSelectedProduct = (product: any) => {
    setSelectedProduct(product);
    setSearch(product.name);
    setShowDropdown(false);
    setProducts([]);
  };

  const getProducts = async (keyword: string) => {
    try {
      const response = await fetchProducts({ search: keyword });
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);
  useEffect(() => {
    if (!debounceValue.trim()) {
      setProducts([]);
      return;
    }
    getProducts(debounceValue);
  }, [debounceValue]);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <div>
      <div className="text-center">
        <h1 className="text-3xl">Add Variant</h1>
      </div>
      <div className="flex flex-col items-center mt-3 ">
        <form action="" className="w-full max-w-3xl">
          <FieldSet>
            <FieldGroup className="grid grid-cols-2 gap-6">
              <Field>
                <FieldLabel>Search Product Name</FieldLabel>
                <input
                  onFocus={() => setShowDropdown(true)}
                  type="text"
                  name="products"
                  id="name"
                  value={search}
                  onChange={handleSearch}
                  className="border  border-black py-3 px-3 rounded-xl"
                />
                {showDropdown && products.length > 0 && (
                  <ul className="border rounded-lg bg-white shadow-lg overflow-auto ">
                    {products.map((product: any) => (
                      <li
                        key={product.id}
                        onClick={() => handleSelectedProduct(product)}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                      >
                        {product.name}
                      </li>
                    ))}
                  </ul>
                )}
              </Field>
              <Field>
                <FieldLabel>Product Description</FieldLabel>
                <input
                  type="text"
                  name="description"
                  id="description"
                  className="h-30 border border-black py-3 px-3 rounded-xl"
                />
              </Field>
              <Field>
                <FieldLabel>Product Price</FieldLabel>
                <input
                  type="number"
                  name="basePrice"
                  id="basePrice"
                  className="border  border-black py-3 px-3 rounded-xl"
                />
              </Field>
              <Field>
                <FieldLabel>Product Image</FieldLabel>
                <input
                  type="text"
                  name="image"
                  id="image"
                  className="border border-black py-3 px-3 rounded-xl"
                />
              </Field>
              <Field>
                <FieldLabel>Product Brand</FieldLabel>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  className="border border-black py-3 px-3 rounded-xl"
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <div className="flex flex-col justify-center items-center mt-7 gap-5">
            <Select>
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
            <Button className="" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
