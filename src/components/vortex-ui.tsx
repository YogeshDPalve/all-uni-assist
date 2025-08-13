import React from "react";
import { Vortex } from "./ui/vortex";

export function VortexUi() {
  return (
    <div className="w-[calc(100%-4rem)] mx-auto rounded-md  h-[90vh] overflow-hidden">
      <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
          Comming soon...
        </h2>
      </Vortex>
    </div>
  );
}
