import { useRef, useState } from "react";
import Img3 from "../../assets/images/pexels-alpography-16256556.jpg";
import Img4 from "../../assets/images/pexels-marcos-kohler-17182257.jpg";
import Img5 from "../../assets/images/pexels-nika-zhorzholiani-7495922.jpg";
import Img6 from "../../assets/images/pexels-ozan-çulha-17104745.jpg";
import Img7 from "../../assets/images/pexels-raphael-brasileiro-2440805.jpg";
import Img1 from "../../assets/images/pexels-safari-consoler-14411029.jpg";
import Img2 from "../../assets/images/pexels-şeyhmus-çakırtaş-5812094.jpg";
import { Tilt } from "./Tilt";

const RandomImages = () => {
  const images = [Img2, Img1, Img3, Img4, Img5, Img6, Img7];
  const [currentImageIndex, setCurrentImageIndex] = useState(
    Math.floor(Math.random() * images.length)
  );
  const imgElement = useRef<any>(null);

  return (
    <Tilt>
      <div className="w-full">
        <img
          src={images[currentImageIndex]}
          className={`w-[1000px] ${
            imgElement.current?.naturalHeight > 4000
              ? "h-[500px]"
              : "object-contain h-[500px]"
          } `}
          ref={imgElement}
        />
      </div>
    </Tilt>
  );
};

export default RandomImages;