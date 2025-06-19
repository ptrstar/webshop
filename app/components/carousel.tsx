import React, { useState, useEffect, useCallback, useRef } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { Thumbnail } from './tumbnail'
import './carousel.css'

type PropType = {
  slides: React.ReactNode[]
  options?: EmblaOptionsType
}

const AUTOPLAY_INTERVAL = 6000; // ms (was 3500, now slower)

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true
  })
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaMainApi) return
    onSelect()

    emblaMainApi.on('select', onSelect).on('reInit', onSelect)
  }, [emblaMainApi, onSelect])

  // Autoplay effect
  useEffect(() => {
    if (!emblaMainApi) return;

    function autoplay() {
      if (!emblaMainApi) return;
      if (emblaMainApi.canScrollNext()) {
        emblaMainApi.scrollNext();
      } else {
        emblaMainApi.scrollTo(0);
      }
    }

    autoplayRef.current = setInterval(autoplay, AUTOPLAY_INTERVAL);

    // Pause on mouse enter, resume on mouse leave
    // emblaMainRef is a callback ref, so we need to query the DOM
    const emblaNode = document.querySelector('.embla__viewport') as HTMLElement | null;
    if (emblaNode) {
      const pause = () => { if (autoplayRef.current) clearInterval(autoplayRef.current); };
      const resume = () => { autoplayRef.current = setInterval(autoplay, AUTOPLAY_INTERVAL); };
      emblaNode.addEventListener('mouseenter', pause);
      emblaNode.addEventListener('mouseleave', resume);
      return () => {
        emblaNode.removeEventListener('mouseenter', pause);
        emblaNode.removeEventListener('mouseleave', resume);
        if (autoplayRef.current) clearInterval(autoplayRef.current);
      };
    }

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [emblaMainApi, slides.length]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div className="embla__slide" key={index}>
              {slide}
            </div>
          ))}
        </div>
      </div>

      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {slides.map((slide, index) => {
              // Cast slide to React.ReactElement to access props
              const slideElement = slide as React.ReactElement<{ src?: string; alt?: string }>;
              return (
                <Thumbnail
                  key={index}
                  onClick={() => onThumbClick(index)}
                  selected={index === selectedIndex}
                  index={index}
                  src={slideElement.props?.src || ''}
                  alt={slideElement.props?.alt || `Thumbnail ${index + 1}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel
