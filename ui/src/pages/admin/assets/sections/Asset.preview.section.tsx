import { FC, Fragment } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

type IAssetPreviewSectionProps = {
    imageSource: string,
    imageDescription: string
};

const AssetPreviewSection: FC<IAssetPreviewSectionProps> = ({imageSource, imageDescription}) => {
  return (<Fragment>
    <h3 className="text-lg font-bold text-brand-base">{imageDescription}</h3>
    <AspectRatio ratio={4/3} className="bg-muted">
      <img
        src={imageSource}
        title={imageDescription}
        alt={imageDescription}
        className="object-cover w-full h-full rounded-md"
      />
    </AspectRatio>
    </Fragment>
  );
};

export default AssetPreviewSection;

