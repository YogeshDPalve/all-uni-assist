"use client";

import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const defaultTestimonials = [
  {
    text: "All Uni Assist made my study abroad process so much easier. From shortlisting universities to guiding me with my visa—it was seamless!",
    imageSrc: "/avatars/avatar-2.webp",
    name: "Arjun Mehta",
    username: "@arjunmehta",
    role: "Masters Student, Canada",
  },
  {
    text: "I was overwhelmed with options, but All Uni Assist’s personalized suggestions helped me find the perfect university in the UK.",
    imageSrc: "/avatars/avatar-1.webp",
    name: "Sara Lin",
    username: "@saralin",
    role: "Undergraduate Student, UK",
  },
  {
    text: "Thanks to All Uni Assist, I got clarity on scholarships and funding options for my studies in Australia. Highly recommended!",
    imageSrc: "/avatars/avatar-3.webp",
    name: "Devon Carter",
    username: "@devoncarter",
    role: "PhD Student, Australia",
  },
  {
    text: "Their step-by-step guidance helped me with applications, SOPs, and even mock interviews. I’m now in my dream university in Germany!",
    imageSrc: "/avatars/avatar-5.webp",
    name: "Priya Shah",
    username: "@priyashah",
    role: "Masters Student, Germany",
  },
  {
    text: "All Uni Assist’s resources on living abroad and cultural tips made my transition to the US super smooth.",
    imageSrc: "/avatars/avatar-4.webp",
    name: "Leo Martin",
    username: "@leomartin",
    role: "Exchange Student, USA",
  },
  {
    text: "I never thought the application process could be this simple. All Uni Assist is a game-changer for anyone planning to study abroad.",
    imageSrc: "/avatars/avatar-6.webp",
    name: "Chloe Winters",
    username: "@chloewinters",
    role: "MBA Student, Singapore",
  },
];

interface TestimonialProps {
  testimonials?: {
    text: string;
    imageSrc: string;
    name: string;
    username: string;
    role?: string;
  }[];
  title?: string;
  subtitle?: string;
  autoplaySpeed?: number;
  className?: string;
}

export default function TestimonialsCarousel({
  testimonials = defaultTestimonials,
  title = "What our users say",
  subtitle = "From intuitive design to powerful features, our components have become essential tools for developers around the world.",
  autoplaySpeed = 3000,
  className,
}: TestimonialProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: "trimSnaps",
    dragFree: true,
  });

  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, autoplaySpeed);

    return () => {
      clearInterval(autoplay);
    };
  }, [emblaApi, autoplaySpeed]);

  const allTestimonials = [...testimonials, ...testimonials];

  return (
    <section
      className={cn("relative overflow-hidden py-16 md:py-24", className)}
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.2),transparent_60%)]" />
        <div className="bg-primary/5 absolute top-1/4 left-1/4 h-32 w-32 rounded-full blur-3xl" />
        <div className="bg-primary/10 absolute right-1/4 bottom-1/4 h-40 w-40 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative mb-12 text-center md:mb-16"
        >
          <h1 className="from-foreground to-foreground/40 mb-4 bg-gradient-to-b bg-clip-text text-3xl font-bold text-transparent md:text-5xl lg:text-6xl">
            {title}
          </h1>

          <motion.p
            className="text-muted-foreground mx-auto max-w-2xl text-base md:text-lg"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* Testimonials carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {allTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.name}-${index}`}
                className="flex justify-center px-4"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="border-border from-secondary/20 to-card relative h-full w-fit rounded-2xl border bg-gradient-to-b p-6 shadow-md backdrop-blur-sm"
                >
                  {/* Enhanced decorative gradients */}
                  <div className="from-primary/15 to-card absolute -top-5 -left-5 -z-10 h-40 w-40 rounded-full bg-gradient-to-b blur-md" />
                  <div className="from-primary/10 absolute -right-10 -bottom-10 -z-10 h-32 w-32 rounded-full bg-gradient-to-t to-transparent opacity-70 blur-xl" />

                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                    viewport={{ once: true }}
                    className="text-primary mb-4"
                  >
                    <div className="relative">
                      <Quote className="h-10 w-10 -rotate-180" />
                    </div>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                    viewport={{ once: true }}
                    className="text-foreground/90 relative mb-6 text-base leading-relaxed"
                  >
                    <span className="relative">{testimonial.text}</span>
                  </motion.p>

                  {/* Enhanced user info with animation */}
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                    viewport={{ once: true }}
                    className="border-border/40 mt-auto flex items-center gap-3 border-t pt-2"
                  >
                    <Avatar className="border-border ring-primary/10 ring-offset-background h-10 w-10 border ring-2 ring-offset-1">
                      <AvatarImage
                        src={testimonial.imageSrc}
                        alt={testimonial.name}
                      />
                      <AvatarFallback>
                        {testimonial.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <h4 className="text-foreground font-medium whitespace-nowrap">
                        {testimonial.name}
                      </h4>
                      <div className="flex items-center gap-2">
                        <p className="text-primary/80 text-sm whitespace-nowrap">
                          {testimonial.username}
                        </p>
                        {testimonial.role && (
                          <>
                            <span className="text-muted-foreground flex-shrink-0">
                              •
                            </span>
                            <p className="text-muted-foreground text-sm whitespace-nowrap">
                              {testimonial.role}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
