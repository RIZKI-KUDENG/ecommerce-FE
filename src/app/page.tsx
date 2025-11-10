"use client"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { getProducts } from "@/services/api/productService";
import { useEffect, useState } from "react";
import { Products } from "@/types/products";



export default function Home() {
  const [products, setProducts] = useState<Products[]>([]);
  const array = [
    "https://www.apple.com/v/iphone-17-pro/c/images/overview/welcome/hero_endframe__xdzisdq1ppem_xlarge.jpg",
    "https://mg.co.id/wp-content/uploads/2020/06/banner-page-adidas-1.jpg",
    "https://i.pinimg.com/736x/30/42/6b/30426bf95dc86ec336a6eecfef0e3555.jpg",
  ];
  const categories = ["/laptop.png", "/smartphone.png", "/smartwatch.png"];
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts();
      setProducts(response.data);
    };
    fetchProducts();
  }, []);
  return (
    <div className="w-full p-3">
      <div className="mx-auto">
        <Carousel className="w-full">
          <CarouselContent className="p-0">
            {array.map((item, index) => (
              <CarouselItem key={index} className="p-0">
                <div className="">
                  <Card className="w-full h-140 mx-auto p-0">
                    <CardContent className="p-0">
                      <img src={item} alt="" className="w-full h-full " />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-10" />
          <CarouselNext className="right-10" />
        </Carousel>
      </div>
      <div>
        <div>
          <h5 className="text-red-400">Categories</h5>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Browse by categories</h2>
        </div>
        <div className="flex justify-around items-center gap-5">
          {
            categories.map((item, index)=> {
              return (
                <div key={index}>
                  <Card className="w-30 h-30 mx-auto">
                    <CardContent className="">
                      <img src={item} alt="" className="w-full h-full" />
                    </CardContent>
                  </Card>
                </div>
              )
            })
          }
        </div>
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold">Recommended for you</h2>
         <div className="grid grid-cols-3 place-items-center gap-2">
           {products.map((item, index) => {
            return (
              <div key={index} className="">
                <Card className=" mx-auto p-0">
                  <CardContent className="p-0">
                    <img src={item.image} alt="" className="h-50 w-50" />
                  </CardContent>
                </Card>
              </div>
            );
          })}
         </div>
        </div>
      </div>
    </div>
  );
}
