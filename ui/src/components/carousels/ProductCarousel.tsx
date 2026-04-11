import { FC, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useProductStore } from "@/common/state/features/products/product.slice";
import { useAssetStore } from "@/common/state/features/assets/asset.slice";
import { IAssetRecord, IProductRecord } from "@/common/interfaces";
import { addDecimalIfNotPresent } from "@/util/helper";

const SLIDE_INTERVAL_MS = 4000;

const ProductCarousel: FC = () => {
  const { product_list } = useProductStore();
  const { asset_list } = useAssetStore();
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Auto-advance slides
  useEffect(() => {
    if (product_list.length === 0) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % product_list.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [product_list.length]);

  // Scroll active slide into view
  useEffect(() => {
    if (!carouselRef.current || product_list.length === 0) return;
    const items = carouselRef.current.querySelectorAll<HTMLDivElement>(".carousel-item");
    items[activeIndex]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  }, [activeIndex]);

  function getFirstImageUrl(product: IProductRecord): string {
    if (!product.assets?.length) return "";
    const asset = asset_list.find((a: IAssetRecord) => a.asset_id === product.assets[0]);
    return asset?.url ?? "";
  }

  if (product_list.length === 0) return null;

  return (
    <section className="py-12 lg:py-20 bg-base-200/40" id="product-preview-carousel">
      <div className="container">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
            Our <span className="text-brand-gradient">Products</span>
          </h2>
          <p className="mt-2 text-base text-base-content/60">
            Explore our range of health &amp; wellness products
          </p>
        </div>

        {/* Carousel */}
        <div ref={carouselRef} className="carousel w-full overflow-hidden rounded-2xl">
          {product_list.map((product: IProductRecord, idx: number) => {
            const imageUrl = getFirstImageUrl(product);
            return (
              <div
                key={product.product_id}
                className="carousel-item w-full flex-shrink-0"
              >
                <div className="grid w-full items-center gap-0 lg:grid-cols-2">
                  {/* Image */}
                  <div className="flex h-64 items-center justify-center overflow-hidden bg-base-300 lg:h-96">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-base-content/30">
                        <ShoppingBag size={48} />
                        <span className="text-sm">No image</span>
                      </div>
                    )}
                  </div>

                  {/* Product info */}
                  <div className="flex flex-col justify-center gap-4 bg-base-100 p-8 lg:p-12">
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                      Product {idx + 1} of {product_list.length}
                    </p>
                    <h3 className="text-2xl font-bold leading-tight lg:text-3xl">
                      <span className="text-brand-gradient">{product.name}</span>
                    </h3>
                    <p className="text-base text-base-content/70 line-clamp-3">
                      {product.description}
                    </p>
                    <p className="text-2xl font-bold">
                      ${addDecimalIfNotPresent(product.price)}{" "}
                      <span className="text-sm font-normal text-base-content/50 uppercase">
                        {String(product.currency)}
                      </span>
                    </p>
                    <button
                      onClick={() => navigate("/products/shop-products")}
                      className="btn btn-primary w-fit"
                    >
                      Shop Now <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dot indicators */}
        <div className="mt-4 flex justify-center gap-2">
          {product_list.map((_: IProductRecord, idx: number) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? "w-6 bg-primary"
                  : "w-2 bg-base-content/20"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
