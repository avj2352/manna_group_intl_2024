import { FC, Fragment } from "react";
import WhoWeAre from "./sections/WhoWeAre";
import ValueAndMission from "./sections/ValueAndMission";
import OurValue from "./sections/OurValue";
import Quality from "./sections/Quality";
import CollaborationRD from "./sections/Collaboration";
import Management from "./sections/Management";

const AboutPage: FC = () => {
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
