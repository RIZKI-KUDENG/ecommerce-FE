"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { fetchProducts } from "@/services/api/productService";
import { useEffect, useState } from "react";
import Link from "next/link";
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const array = [
    "https://www.apple.com/v/iphone-17-pro/c/images/overview/welcome/hero_endframe__xdzisdq1ppem_xlarge.jpg",
    "https://www.bca.co.id/-/media/Feature/Promo/Page/2024/03/20240315-launching-samsung-galaxy-a35-a55-bann.jpg",
    "https://www.itworld.com.my/catalog/view/theme/so-supermarket/template/information/custom/mac-m3/img/Register%20your%20interest%20banner_1920x720.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSI8j_MjtdDUL6M3icVhQ1dDGm7sm_8sjMgA&s",
  ];
const categories = [
  { id: 2, icon: "/laptop.png", name: "Laptop" },
  { id: 1, icon: "/smartphone.png", name: "Smartphone" },
  { id: 3, icon: "/smartwatch.png", name: "Smartwatch" },
];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchProducts();
        setProducts(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
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

      <div className="grid grid-cols-3 gap-3 mt-5">
  {categories.map((cat) => (
    <Link 
      key={cat.id}
      href={`/category/${cat.id}/${cat.name.toLowerCase().replace(/\s+/g, "-")}`}
      className="flex flex-col items-center cursor-pointer"
    >
      <img src={cat.icon} alt="" className="w-20 h-20" />
      <p className="text-center">{cat.name}</p>
    </Link>
  ))}
</div>
      <div>
        <h3 className="text-center text-3xl mt-4">Recomend Product</h3>
        <div className="grid grid-cols-3 gap-3">
          {products.map((item, index) => (
            <Link
              href={`/product/${item.id}/${item.name
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              key={index}
              className="flex flex-col items-center"
            >
              <img src={item.image} alt="" className="w-20 h-20" />
              <p className="text-center">{item.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
