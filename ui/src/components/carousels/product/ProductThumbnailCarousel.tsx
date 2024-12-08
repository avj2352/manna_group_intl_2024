import { FC } from "react";
import { CircleDot } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import ClassNames from "embla-carousel-class-names";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "@/components/carousels/EmblaCarouselArrowButtons";
import {
  DotButton,
  useDotButton,
} from "@/components/carousels/EmblaCarouselDotButtons";
import "../carousel-default.css";
import { IAssetRecord } from "@/common/interfaces";

type IProductThumbnailCarouselProps = {
  items: IAssetRecord[];
};

const ProductThumbnailCarousel: FC<IProductThumbnailCarouselProps> = ({
  items,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [ClassNames()]);

  const { selectedIndex, onDotButtonClick } = useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {items.map((item: IAssetRecord, index: number) => (
            <div className="embla__slide embla__class-names" key={index + 1}>
              <section>
                <img
                  src={item.url}
                  title={item.description}
                  alt={item.description}
                  className="object-cover w-full h-full rounded-md"
                />
                <p className="text-base font-semibold text-md">
                  {item.description}
                </p>
              </section>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {[].map((_: any, index: number) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            >
              <CircleDot />
            </DotButton>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductThumbnailCarousel;
