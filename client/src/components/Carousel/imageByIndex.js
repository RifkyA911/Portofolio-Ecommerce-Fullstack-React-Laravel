import image1 from "/Hero.jpg";
import image2 from "/Hero.jpg";
import image3 from "/Hero.jpg";
import image4 from "/Hero.jpg";

export const images = [image1, image2, image3, image4];

const imageByIndex = (index) => images[index % images.length];

export default imageByIndex;
