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
import { IManagementPeople, people } from "./data";

const ManagementCarousel: FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [ClassNames()]);

  const { selectedIndex, onDotButtonClick } = useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="embla max-w-sm overflow-x-clip lg:max-w-lg">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {people.map((item: IManagementPeople, index: number) => (
            <div className="embla__slide embla__class-names" key={index}>
              <p className="mt-2 font-bold text-lg">{item.name}</p>
              <p className="mt-2 text-base">{item.title}</p>
              <p className="mt-4 text-base h-40 overflow-y-scroll">
                {" "}
                {item.description}{" "}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots invisible md:visible">
          {people.map((_: IManagementPeople, index: number) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : "",
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

export default ManagementCarousel;
