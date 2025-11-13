"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const array = [
    "https://www.apple.com/v/iphone-17-pro/c/images/overview/welcome/hero_endframe__xdzisdq1ppem_xlarge.jpg",
    "https://www.bca.co.id/-/media/Feature/Promo/Page/2024/03/20240315-launching-samsung-galaxy-a35-a55-bann.jpg",
    "https://www.itworld.com.my/catalog/view/theme/so-supermarket/template/information/custom/mac-m3/img/Register%20your%20interest%20banner_1920x720.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSI8j_MjtdDUL6M3icVhQ1dDGm7sm_8sjMgA&s",
  ];
  const categories = ["/laptop.png", "/smartphone.png", "/smartwatch.png"];
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
    </div>
  );
}
