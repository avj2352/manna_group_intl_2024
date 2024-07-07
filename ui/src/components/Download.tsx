import appstoreImg from "@/assets/images/logo/appstore.png";
import playstoreImg from "@/assets/images/logo/playstore.png";

export const Download = () => {
  return (
    <section
      className="rounded-t-2xl bg-base-200 bg-base-content/5 py-12 lg:py-24"
      id="download"
    >
      <div className="container text-center">
        <p className="text-xl font-semibold xl:text-3xl">
          Download the app today!
        </p>
        <p className="mt-8 inline-block max-w-[600px] text-base">
          Begin utilizing WrapAi, a comprehensive solution that caters to all
          your needs for creating awareness, boosting traffic, and fostering
          connections.
        </p>
        <div className="mt-8 flex justify-center gap-6">
          <a href="#">
            <img src={appstoreImg} alt="App Store" />
          </a>
          <a href="#">
            <img src={playstoreImg} alt="Play Store" />
          </a>
        </div>
      </div>
    </section>
  );
};
