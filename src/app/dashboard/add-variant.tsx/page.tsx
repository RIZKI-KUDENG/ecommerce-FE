"use client";

import { FieldSet, FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { fetchProducts, createVariant } from "@/services/api/productService";
import React, { useEffect, useState } from "react";

export default function AddVariant() {
  // -----------------------------
  // STATES
  // -----------------------------
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [debounceValue, setDebounceValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const [formData, setFormData] = useState({
    productId: "",
    name: "",
    price: "",
  });

  // -----------------------------
  // DEBOUNCE LOGIC
  // -----------------------------
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  // -----------------------------
  // FETCH PRODUCTS
  // -----------------------------
  useEffect(() => {
    if (!debounceValue.trim()) {
      setProducts([]);
      return;
    }
    getProducts(debounceValue);
  }, [debounceValue]);

  const getProducts = async (keyword: string) => {
    try {
      const response = await fetchProducts({ search: keyword });
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // -----------------------------
  // HANDLERS
  // -----------------------------
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setShowDropdown(true);
  };

  const handleSelectProduct = (product: any) => {
    setSearch(product.name);
    setShowDropdown(false);
    setProducts([]);

    // SIMPAN ID PRODUK DI FORM DATA
    setFormData((prev) => ({
      ...prev,
      productId: product.id,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await createVariant(formData);
      console.log("Variant Created:", res);
    } catch (err) {
      console.error(err);
    }
  };

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div>
      <div className="text-center">
        <h1 className="text-3xl">Add Variant</h1>
      </div>

      <div className="flex flex-col items-center mt-3 ">
        <form className="w-full max-w-3xl" onSubmit={handleSubmit}>
          <FieldSet>
            <FieldGroup className="grid grid-cols-1 gap-6">

              {/* SEARCH PRODUCT */}
              <Field className="">
                <FieldLabel>Search Product Name</FieldLabel>

                <input
                  onFocus={() => setShowDropdown(true)}
                  type="text"
                  value={search}
                  onChange={handleSearch}
                  className="border border-black py-3 px-3 rounded-xl w-full"
                />

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
                <input
                  type="text"
                  name="name"
                  className="border border-black py-3 px-3 rounded-xl"
                  onChange={handleChange}
                  value={formData.name}
                />
              </Field>

              {/* VARIANT PRICE */}
              <Field>
                <FieldLabel>Variant Price</FieldLabel>
                <input
                  type="number"
                  name="price"
                  className="border border-black py-3 px-3 rounded-xl"
                  onChange={handleChange}
                  value={formData.price}
                />
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
