import { FC, Fragment } from "react";
import { useParams } from "react-router-dom";
import WhoWeAre from "./sections/WhoWeAre";
import ValueAndMission from "./sections/ValueAndMission";
import OurValue from "./sections/OurValue";
import Quality from "./sections/Quality";
import CollaborationRD from "./sections/Collaboration";
import Management from "./sections/Management";
import { scrollToOffset } from "@/util/helper";

const AboutPage: FC = () => {
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
