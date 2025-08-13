"use client";
import WorldMap from "./ui/world-map";
import { motion } from "motion/react";

export function WorldMapDemo() {
  return (
    <div className=" py-40 dark:bg-black bg-white w-full">
      <div className="max-w-7xl mx-auto text-center">
        <p className="font-bold text-xl md:text-4xl dark:text-white text-black">
          Connecting Students to Universities{" "}
          <span className="text-neutral-400">
            {"Worldwide".split("").map((word, idx) => (
              <motion.span
                key={idx}
                className="inline-block"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </p>
        <p className="text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
          Explore a global network of universities and opportunities—bridging
          your ambitions with destinations across the world.
        </p>
      </div>
      <WorldMap
        dots={[
          {
            start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
            end: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
          },
          {
            start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
            end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
          },
          {
            start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
            end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
          },
          {
            start: { lat: 51.5074, lng: -0.1278 }, // London
            end: { lat: 28.6139, lng: 77.209 }, // New Delhi
          },
          {
            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
            end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
          },
          {
            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
            end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
          },

          {
            start: { lat: 48.8566, lng: 2.3522 }, // Paris
            end: { lat: 35.6895, lng: 139.6917 }, // Tokyo
          },
          {
            start: { lat: 35.6895, lng: 139.6917 }, // Tokyo
            end: { lat: -33.8688, lng: 151.2093 }, // Sydney
          },
          {
            start: { lat: -33.8688, lng: 151.2093 }, // Sydney
            end: { lat: -36.8485, lng: 174.7633 }, // Auckland
          },
          {
            start: { lat: 40.7128, lng: -74.006 }, // New York
            end: { lat: 48.8566, lng: 2.3522 }, // Paris
          },
          {
            start: { lat: 48.8566, lng: 2.3522 }, // Paris
            end: { lat: 55.7558, lng: 37.6173 }, // Moscow
          },
          {
            start: { lat: 48.8566, lng: 2.3522 }, // Paris
            end: { lat: 55.7558, lng: 37.6173 }, // Moscow
          },
          {
            start: { lat: -36.8485, lng: 174.7633 }, // Auckland
            end: { lat: 30.0444, lng: 31.2357 }, // Cairo
          },
          {
            start: { lat: 30.0444, lng: 31.2357 }, // Cairo
            end: { lat: 19.4326, lng: -99.1332 }, // Mexico City
          },
        ]}
      />
    </div>
  );
}
