import {useState,useRef, useEffect} from 'react'
export default function Slider(info) {
    const sliderRef = useRef(null);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const handleMouseDown = (e) => {
        const slider = sliderRef.current;
        setStartX(e.pageX - slider.offsetLeft);
        setScrollLeft(slider.scrollLeft);
        slider.style.cursor = 'grabbing';
    }
    const handleMouseMove = (e) => {
        const slider = sliderRef.current;
        if (!startX) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = x - startX;
        slider.scrollLeft = scrollLeft - walk;
      };
      const handleMouseUp = () => {
        const slider = sliderRef.current;
        slider.style.cursor = 'grab';
        setStartX(0);
      };
      const handleTouchStart = (e) => {
        const slider = sliderRef.current;
        const touch = e.touches[0];
        setStartX(touch.pageX - slider.offsetLeft);
        setScrollLeft(slider.scrollLeft);
      };
      const handleTouchEnd = () => {
        setStartX(0);
      };
      const handleTouchMove = (e) => {
        const slider = sliderRef.current;
        if (!startX) return;
        const touch = e.touches[0];
        const x = touch.pageX - slider.offsetLeft;
        const walk = x - startX;
        slider.scrollLeft = scrollLeft - walk;
      };
  return (
    <>
          <div id='section-best'  onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onTouchMove={handleTouchMove} onMouseLeave={handleMouseUp} onMouseUp={handleMouseUp} ref={sliderRef}>
            {info.info.map((item,index)=>(
                            <div className='best-sell' key={index}>
                            <img draggable="false" src={item.img} className='photo-best'/>
                            <p className='title-seller'>{`Numer kat: ${item.numer}`}</p>
                            <p className='price-seller'>{`Cena: ${item.price} zł`}</p>
                         </div>
            ))}
        </div>
        </>
  )
}
