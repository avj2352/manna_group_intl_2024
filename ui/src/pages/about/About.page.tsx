import { FC, Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import WhoWeAre from "./sections/WhoWeAre";
import ValueAndMission from "./sections/ValueAndMission";
import OurValue from "./sections/OurValue";
import Quality from "./sections/Quality";
import CollaborationRD from "./sections/Collaboration";
import Management from "./sections/Management";

const AboutPage: FC = () => {  

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
    <Fragment>
      <WhoWeAre />
      <ValueAndMission />
      <OurValue />
      <Quality />
      <CollaborationRD />
      <Management />
    </Fragment>
  );
};

export default AboutPage;
