import { FC, Fragment } from "react";
import { useParams } from "react-router-dom";
import GallerySection from "./sections/Gallery";
import { scrollToOffset } from "@/util/helper";

const CompanyPage: FC = () => {
  window.scrollTo();

  const { offset } = useParams();
  if (offset && Number(offset)) {
    window.scrollTo(0, 0);
    setTimeout(() => {
      scrollToOffset(Number(offset));
    }, 1000);
  }

  return (
    <Fragment>
      <GallerySection />
    </Fragment>
  );
};

export default CompanyPage;
