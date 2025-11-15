"use client";
import AddProduct from "./addProduct";
import AddVariant from "./addVariant";
import AddStock from "./addStock";
export default function DashboardPage() {

  return (
    <div className="">
      {/* <div className="text-center">
        <h1 className="text-3xl">Add Product</h1>
      </div> */}
      {/* <div className="flex flex-col items-center mt-3 ">
        <form action="" className="w-full max-w-3xl" onSubmit={handleSubmit}>
          <FieldSet>
            <FieldGroup className="grid grid-cols-2 gap-6">
              <Field>
                <FieldLabel>Product Name</FieldLabel>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="border  border-black py-3 px-3 rounded-xl"
                  onChange={handleChange}
                  value={product.name}
                />
              </Field>
              <Field>
                <FieldLabel>Product Description</FieldLabel>
                <input
                  type="text"
                  name="description"
                  id="description"
                  className="h-30 border border-black py-3 px-3 rounded-xl"
                  onChange={handleChange}
                  value={product.description}
                />
              </Field>
              <Field>
                <FieldLabel>Product Price</FieldLabel>
                <input
                  type="number"
                  name="basePrice"
                  id="basePrice"
                  className="border  border-black py-3 px-3 rounded-xl"
                  onChange={handleChange}
                  value={product.basePrice}
                />
              </Field>
              <Field>
                <FieldLabel>Product Image</FieldLabel>
                <input
                  type="text"
                  name="image"
                  id="image"
                  className="border border-black py-3 px-3 rounded-xl"
                  onChange={handleChange}
                  value={product.image}
                />
              </Field>
              <Field>
                <FieldLabel>Product Brand</FieldLabel>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  className="border border-black py-3 px-3 rounded-xl"
                  onChange={handleChange}
                  value={product.brand}
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <div className="flex flex-col justify-center items-center mt-7 gap-5">
            <Select
              value={product.categoryId}
              onValueChange={(value) => {
                setProduct({
                  ...product,
                  categoryId: value,
                });
              }}
            >
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
      </div> */}
      <AddProduct />
      <AddVariant />
      <AddStock />
    </div>
  );
}
