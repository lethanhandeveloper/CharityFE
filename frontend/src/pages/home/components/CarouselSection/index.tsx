import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { BannerUI } from '@models/banner';
import AliceCarousel from 'react-alice-carousel';
import { CardMedia } from '@mui/material';
interface CarouselSectionProps {
  list: BannerUI[];
}
const handleDragStart = (e: { preventDefault: () => any }) => e.preventDefault();
const CarouselSection = (props: CarouselSectionProps) => {
  return (
    <>
      <AliceCarousel
        responsive={{
          0: { items: 1 },
          568: { items: 2 },
          1024: { items: 3 },
        }}
        mouseTracking
        items={props.list.slice(0, 5).map((item, key) => (
          <CardMedia
            key={key}
            image={item.imgUrl}
            onDragStart={handleDragStart}
          />
        ))}
        disableButtonsControls={true}
        autoPlay={true}
        disableDotsControls={true}
        animationDuration={6000}
      />
    </>
  );
};
export default CarouselSection;
