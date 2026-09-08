"use client";

import React, { memo } from "react";
import { SERVICES_DATA } from "./parts/servicesData";
import { ServiceCard } from "./parts/ServiceCard";

const AllFeaturesGrid: React.FC = memo(function AllFeaturesGrid() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-2 transform-gpu" id="features">
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-[24px] sm:text-[34px] font-bold tracking-tight text-[#121316] uppercase leading-tight max-w-4xl mx-auto">
          One Platform. <span className="text-[#2c35af]">All Services.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES_DATA.map((item, idx) => (
          <ServiceCard key={idx} item={item} idx={idx} />
        ))}
      </div>
    </section>
  );
});

AllFeaturesGrid.displayName = "AllFeaturesGrid";
export default AllFeaturesGrid;
