import { FC, Fragment } from "react";
import { Button, Card } from "react-daisyui";
import productLogo from "@/assets/images/products/CalcuNix-bottle.png";
import { useAppSelector } from "@/common/state/store";
import { addDecimalIfNotPresent } from "@/util/helper";
import { ShoppingCart, ArrowRightIcon } from "lucide-react";


const ProductPreviewSection: FC = () => {
    const productState = useAppSelector(state => state.products);
    const { selected_product } = productState;

    return (
        <Card            
            className="p-4 my-4 border border-base-content/10 rounded-xl"
          >
            <div className="grid items-center gap-12 lg:grid-cols-2 xl:gap-36">
              <div className="flex justify-center order-1 lg:justify-start">
                <img
                  alt="product-alt"
                  className="h-[500px] rounded-xl"
                  src={productLogo}
                />
              </div>
              <div className="order-2">
                <h1 className="font-bold leading-10 tracking-tight text-center text-3xl/tight sm:text-start lg:text-4xl/tight">
                  <span className="text-brand-gradient">{selected_product?.name}</span>
                </h1>
                <p className="mt-4 text-base font-semibold text-center sm:text-start">
                  {selected_product?.description}
                </p>
                <p className="mt-4 text-base text-center sm:text-start">
                  {selected_product?.content}
                </p>
                <p className="mt-8 text-lg font-semibold">
                  Price:{" "}
                  <span className="text-2xl text-brand-gradient">
                    ${Boolean(selected_product?.price) ? addDecimalIfNotPresent(selected_product.price) : '0.00'}
                  </span>
                </p>
                <section className="flex justify-center lg:justify-end">
                  <Button
                    disabled
                    color={"primary"} 
                    size={"sm"} 
                    className="mx-2 mt-8">
                        <ShoppingCart size={16} />
                        Add to Cart
                  </Button>
                  <Button                    
                    color={"ghost"} 
                    size={"sm"} 
                    className="mt-8">
                        Read More
                    <ArrowRightIcon size={16} />
                  </Button>
                </section>
              </div>
            </div>
          </Card>
    );
};


export default ProductPreviewSection;