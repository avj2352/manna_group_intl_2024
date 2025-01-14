import { FC } from "react";
import { Button, Card } from "react-daisyui";
import { useAppSelector } from "@/common/state/store";
import { addDecimalIfNotPresent } from "@/util/helper";
import { ShoppingCart, ArrowRightIcon } from "lucide-react";
import ProductThumbnailCarousel from "@/components/carousels/product/ProductThumbnailCarousel";
import { IAssetRecord, IProductRecord } from "@/common/interfaces";
import { useNavigate } from "react-router-dom";

type IProductPreviewSectionProps = {
  onAddCart?: (item: IProductRecord) => void;
  isAdmin?: boolean;
  selectedProduct: IProductRecord;
};

const ProductPreviewSection: FC<IProductPreviewSectionProps> = ({
  onAddCart,
  selectedProduct,
  isAdmin = false,
}) => {  
  const assetState = useAppSelector((state) => state.asset);
  const navigate = useNavigate();

  //..evt handlers
  const handleCartNavigation = () => navigate('/my-cart');

  function getFilteredRecords() {
    let filteredRecords: IAssetRecord[] = [];
    for (const record of selectedProduct?.assets) {
      const temp = assetState?.asset_list?.filter(
        (item: IAssetRecord) => item.asset_id === record
      );
      filteredRecords = [...filteredRecords, ...temp];
    }
    return filteredRecords;
  }

  // console.log('Get filtered records: ', getFilteredRecords());

  return (
    <Card className="p-4 my-4 border border-base-content/10 rounded-xl">
      <div className="grid items-center gap-12 lg:grid-cols-2 xl:gap-36">
        <div className="flex justify-center order-1 lg:justify-start">
          <ProductThumbnailCarousel items={getFilteredRecords()} />
        </div>
        <div className="order-2">
          <h1 className="font-bold leading-10 tracking-tight text-center text-3xl/tight sm:text-start lg:text-4xl/tight">
            <span className="text-brand-gradient">
              {selectedProduct?.name}
            </span>
          </h1>
          <p className="mt-4 text-base font-semibold text-center sm:text-start">
            {selectedProduct?.description}
          </p>
          <p className="mt-4 text-base text-center sm:text-start">
            {selectedProduct?.content}
          </p>
          <p className="mt-8 text-lg font-semibold">
            Price:{" "}
            <span className="text-2xl text-brand-gradient">
              $
              {Boolean(selectedProduct?.price)
                ? addDecimalIfNotPresent(selectedProduct.price)
                : "0.00"}
            </span>
          </p>
          <section className="flex justify-center lg:justify-end">
            <Button
              onClick={() => onAddCart(selectedProduct)}
              disabled={isAdmin}
              color={"primary"}
              size={"sm"}
              className="mx-2 mt-8"
            >
              <ShoppingCart size={16} />
              Add to Cart
            </Button>
            <Button
              disabled={isAdmin}
              color={"ghost"}
              size={"sm"}
              className="mt-8"
              onClick={handleCartNavigation}
            >
              View Cart
              <ArrowRightIcon size={16} />
            </Button>
          </section>
        </div>
      </div>
    </Card>
  );
};

export default ProductPreviewSection;
