import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGSAPAnimations = () => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(element, 
        { 
          opacity: 0, 
          y: 50,
          scale: 0.95
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return elementRef;
};

export const useStaggerAnimation = (items: HTMLElement[], stagger = 0.1) => {
  useEffect(() => {
    if (!items.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(items,
        { 
          opacity: 0, 
          y: 30,
          scale: 0.9
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger,
          ease: "power2.out",
          scrollTrigger: {
            trigger: items[0],
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => ctx.revert();
  }, [items, stagger]);
};

export const useParallaxEffect = (speed = 0.5) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.to(element, {
        yPercent: -50 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    return () => ctx.revert();
  }, [speed]);

  return elementRef;
};

export const useHoverAnimation = (scale = 1.05) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      element.addEventListener('mouseenter', () => {
        gsap.to(element, {
          scale,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });

    return () => ctx.revert();
  }, [scale]);

  return elementRef;
};

export const useTextReveal = () => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const text = element.textContent || '';
    element.innerHTML = '';

    const ctx = gsap.context(() => {
      const chars = text.split('').map(char => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        element.appendChild(span);
        return span;
      });

      gsap.fromTo(chars,
        { 
          opacity: 0, 
          y: 50,
          rotationX: -90
        },
        { 
          opacity: 1, 
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return elementRef;
};
