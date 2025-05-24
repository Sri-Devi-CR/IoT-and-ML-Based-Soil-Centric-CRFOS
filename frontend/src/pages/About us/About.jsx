import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const containerRef = useRef(null);
  const imageRefs = useRef([]);
  const firstImageRef = useRef(null);

  useEffect(() => {
    const sections = gsap.utils.toArray(".fade-in");

    gsap.from(sections, {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.3,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    imageRefs.current.forEach((img, index) => {
      gsap.from(img, {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        delay: index * 0.2,
        scrollTrigger: {
          trigger: img,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    });

    // Fullscreen zoom effect for first image
    gsap.to(firstImageRef.current, {
      scale: 1.2,
      height: "100vh",
      width: "100vw",
      objectFit: "cover",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 10,
      scrollTrigger: {
        trigger: firstImageRef.current,
        start: "top top",
        end: "+=300",
        scrub: true,
        pin: true,
      },
    });

  }, []);

  return (
    <div ref={containerRef} className="bg-gray-100 min-h-screen py-10 px-5 md:px-20">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 fade-in">About Us</h1>
      
      {/* First image with zoom effect */}
      <div className="relative w-full h-screen overflow-hidden">
        <img ref={firstImageRef} src="https://t4.ftcdn.net/jpg/08/48/62/63/360_F_848626305_zZDrVQ17hqLyn2TwLzGKoi5QAQWxGymJ.jpg" alt="Mission" className="absolute w-full h-full object-cover" />
      </div>

      <section className="mt-10 flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2 fade-in">
          <h2 className="text-3xl font-semibold text-gray-700">Our Mission</h2>
          <p className="text-gray-600 mt-4">
            We are dedicated to revolutionizing agriculture through smart data-driven solutions, ensuring sustainability and efficiency for farmers worldwide.
          </p>
        </div>
        <img ref={(el) => (imageRefs.current[0] = el)} src="https://t4.ftcdn.net/jpg/08/48/62/63/360_F_848626305_zZDrVQ17hqLyn2TwLzGKoi5QAQWxGymJ.jpg" alt="Mission" className="rounded-lg shadow-lg" />
      </section>

      <section className="mt-10 flex flex-col md:flex-row-reverse items-center gap-10">
        <div className="md:w-1/2 fade-in">
          <h2 className="text-3xl font-semibold text-gray-700">Our Vision</h2>
          <p className="text-gray-600 mt-4">
            We envision a world where technology empowers farmers to make informed decisions, increasing productivity while preserving nature.
          </p>
        </div>
        <img ref={(el) => (imageRefs.current[1] = el)} src="https://t4.ftcdn.net/jpg/08/48/62/63/360_F_848626305_zZDrVQ17hqLyn2TwLzGKoi5QAQWxGymJ.jpg" alt="Vision" className="rounded-lg shadow-lg" />
      </section>

      <section className="mt-10 flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2 fade-in">
          <h2 className="text-3xl font-semibold text-gray-700">Our Team</h2>
          <p className="text-gray-600 mt-4">
            A passionate team of engineers, data scientists, and agronomists working together to bring cutting-edge solutions to the agriculture industry.
          </p>
        </div>
        <img ref={(el) => (imageRefs.current[2] = el)} src="https://blogimage.vantagecircle.com/content/images/2020/08/teamwork-and-team-building.png" alt="Team" className="rounded-lg shadow-lg" />
      </section>
    </div>
  );
};

export default AboutUs;
