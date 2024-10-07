import { FC, Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
// ..custom
import GallerySection from "./sections/Gallery";
import { BusinessUSASection } from "./sections/BusinessUSA";
import { InternationalSection } from "./sections/International";
import { ContractManufacturingSection } from "./sections/ContractManufacturing";
import { PromoVideoSection } from "./sections/Video";

const CompanyPage: FC = () => {
  const { id } = useParams();
  
  useEffect(()=>{
    if (Boolean(id) && id !== "") {
      console.log('Found id element: ', document.getElementById(id));
      document.getElementById(id)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });    
    }
  },[id]);

  return (
    <Fragment>
      <GallerySection />
      <PromoVideoSection />
      <BusinessUSASection />
      <InternationalSection />
      <ContractManufacturingSection />
    </Fragment>
  );
};

export default CompanyPage;
