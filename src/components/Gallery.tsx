import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";

const Gallery = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Placeholder gallery images - in a real scenario these would be from the business
  const images = [
    { src: "/images/gallery-placeholder-1.jpg", alt: "Railway safety equipment" },
    { src: "/images/gallery-placeholder-2.jpg", alt: "Safety installation" },
    { src: "/images/gallery-placeholder-3.jpg", alt: "Team at work" },
    { src: "/images/gallery-placeholder-4.jpg", alt: "Site preparation" },
    { src: "/images/gallery-placeholder-5.jpg", alt: "Safety measures" },
    { src: "/images/gallery-placeholder-6.jpg", alt: "Project completion" },
  ];

  // Create placeholder images with gradients since we don't have actual images
  const placeholderImages = [
    { color: "from-blue-600 to-purple-600", title: "Installation" },
    { color: "from-purple-600 to-pink-600", title: "Surveillance" },
    { color: "from-pink-600 to-red-600", title: "Coordination" },
    { color: "from-red-600 to-orange-600", title: "Protection" },
    { color: "from-orange-600 to-yellow-600", title: "Maintenance" },
    { color: "from-yellow-600 to-green-600", title: "Infrastructure" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="gallery" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-sm uppercase tracking-widest text-accent">{t.gallery.label}</span>
          <h2 className="font-serif text-3xl md:text-5xl mt-2">{t.gallery.title}</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
            {t.gallery.description}
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {placeholderImages.map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-card border border-border hover:border-accent/50 cursor-pointer"
            >
              {/* Gradient placeholder */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-80 group-hover:opacity-90 transition-opacity`}
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Content */}
              <div className="absolute inset-0 flex items-end justify-start p-6">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white font-serif text-xl">{item.title}</p>
                </div>
              </div>

              {/* Hover scale effect */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors" />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 text-center text-foreground/60 text-sm"
        >
          <p>Cliquez sur les images pour voir plus de détails</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
