import { memo, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Viewer from "react-viewer";
import defaultImage from "@/assets/image-slot.png";

interface IImageComponent {
  src: string;
}
const ImageComponent = memo(({ src }: IImageComponent) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <LazyLoadImage
        src={src || defaultImage}
        className="max-h-45 w-full object-cover rounded-xl cursor-pointer"
        onClick={() => setVisible(true)}
      />
      <Viewer
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        images={[{ src: src || defaultImage }]}
      />
    </>
  );
});

export default ImageComponent;
