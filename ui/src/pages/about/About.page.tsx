import { FC, Fragment } from "react";
import WhoWeAre from "./sections/WhoWeAre";
import ValueAndMission from "./sections/ValueAndMission";
import OurValue from "./sections/OurValue";
import Quality from "./sections/Quality";

const AboutPage: FC = () => {
  return (
    <Fragment>
      <WhoWeAre />
      <ValueAndMission />
      <OurValue />
      <Quality />
    </Fragment>
  );
};

export default AboutPage;
