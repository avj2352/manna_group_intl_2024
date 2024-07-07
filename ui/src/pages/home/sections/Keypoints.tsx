import { FC } from "react";
import { Eye, Pill, SparkleIcon, Rocket } from "lucide-react";

const Keypoints: FC = () => {
  return (
    <div className="mt-16 grid grid-cols-2 gap-20 text-center md:grid-cols-4">
      <div>
        <div className="inline-block rounded bg-primary/10 p-3 transition-all hover:bg-primary/25">
          <Eye className="size-8 text-primary" size={32} />
        </div>
        <p className="mt-3 text-4xl font-semibold">Vision</p>
        <p className="mt-1 text-base-content/80">
          To be a well familiar healthcare products provider and a part of
          day-to-day good health & wellness to our customers by 2025.
        </p>
      </div>
      <div>
        <div className="inline-block rounded bg-primary/10 p-3 transition-all hover:bg-primary/25">
          <Pill className="size-8 text-primary" size={32} />
        </div>
        <p className="mt-3 text-4xl font-semibold">Value</p>
        <p className="mt-1 text-base-content/80">
          We trust and practice in maintaining honesty, integrity and
          transparency with our customers and stakeholders and try to enjoy a
          Win-Win Relationship.
        </p>
      </div>
      <div>
        <div className="inline-block rounded bg-primary/10 p-3 transition-all hover:bg-primary/25">
          <Rocket className="size-8 text-primary" size={32} />
        </div>

        <p className="mt-3 text-4xl font-semibold">Mission</p>
        <p className="mt-1 text-base-content/80">
          Is to provide a meaningful & focused products to our customers,
          helping them to have day-to-day good health & wellness.
        </p>
      </div>
      <div>
        <div className="inline-block rounded bg-primary/10 p-3 transition-all hover:bg-primary/25">
          <SparkleIcon className="size-8 text-primary" size={32} />
        </div>
        <p className="mt-3 text-4xl font-semibold">Quality</p>
        <p className="mt-1 text-base-content/80">
          Quality is the core essence of our business. Here Quality comes @
          Affordability.
        </p>
      </div>
    </div>
  );
};

export default Keypoints;
