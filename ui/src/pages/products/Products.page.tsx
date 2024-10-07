import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Card } from "react-daisyui";
import { ShoppingCart, ArrowRightIcon } from "lucide-react";
// ..images
import { productList, IProduct } from "./data/product_list";

const ProductsPage: FC = () => {

  const { id } = useParams();
  
  useEffect(()=>{
    if (Boolean(id) && id !== "") {      
      document.getElementById(id)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });    
    }
  },[id]);

  return (
    <section className="relative py-8 lg:py-24" id="shop-products">
      <div className="container relative z-10">
        {/* Products section*/}
        {productList.map((item: IProduct, idx: number) => (
          <Card
            key={idx + 1}
            className="p-4 my-4 border border-base-content/10 rounded-xl"
          >
            <div className="grid items-center gap-12 lg:grid-cols-2 xl:gap-36">
              <div className="flex justify-center order-1 lg:justify-start">
                <img
                  alt={item.title.toLowerCase()}
                  className="h-[500px] rounded-xl"
                  src={item.imageLink}
                />
              </div>
              <div className="order-2">
                <h1 className="font-bold leading-10 tracking-tight text-center text-3xl/tight sm:text-start lg:text-4xl/tight">
                  <span className="text-brand-gradient">{item.name}</span>
                </h1>
                <p className="mt-4 text-base font-semibold text-center sm:text-start">
                  {item.title}
                </p>
                <p className="mt-4 text-base text-center sm:text-start">
                  {item.description}
                </p>
                <p className="mt-8 text-lg font-semibold">
                  Price:{" "}
                  <span className="text-2xl text-brand-gradient">
                    ${item.price}
                  </span>
                </p>
                <section className="flex justify-center lg:justify-end">
                  <Button color={"primary"} size={"sm"} className="mx-2 mt-8">
                    <ShoppingCart size={16} />
                    Add to Cart
                  </Button>
                  <Button color={"ghost"} size={"sm"} className="mt-8">
                    Read More
                    <ArrowRightIcon size={16} />
                  </Button>
                </section>
              </div>
            </div>
          </Card>
        ))}

        {/* Promo Video section*/}
        <div className="grid items-center gap-12 mt-16 lg:grid-cols-2 xl:gap-36">
          <div className="order-2 lg:order-1">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/S_ryB8MyyzI?si=1MEyv4qJJ2AvXCES&rel=0"
              title="MANNA promotional video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              className="rounded-xl"
              allowFullScreen
            ></iframe>
          </div>
          <div className="order-1 lg:order-2">
            <h1 className="font-bold leading-10 tracking-tight text-center text-3xl/tight sm:text-start lg:text-4xl/tight">
              <span className="text-brand-gradient">MANNA</span> Our Products
            </h1>
            <p className="mt-8 text-base text-center sm:text-start">
              Watch our promotional video for the overview of all products
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
