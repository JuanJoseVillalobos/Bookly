import React from 'react';
import { Card } from '../common';

/**
 * ExperienceSkeleton
 * Visual placeholder for ExperienceCard while content is loading.
 */
export default function ExperienceSkeleton({ imageAspect = 'aspect-[16/10]' }) {
  return (
    <Card className="flex flex-col justify-between overflow-hidden bg-white border border-stone animate-pulse">
      {/* Image placeholder */}
      <div className={`w-full ${imageAspect} bg-stone-light`} />

      {/* Content placeholder */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Metadata pill placeholders */}
          <div className="flex items-center justify-between">
            <div className="h-4 bg-stone rounded-md w-24" />
            <div className="h-4 bg-stone rounded-md w-16" />
          </div>

          {/* Title placeholder */}
          <div className="h-6 bg-stone rounded-md w-3/4" />

          {/* Description lines */}
          <div className="space-y-2 pt-1">
            <div className="h-3.5 bg-stone-light rounded-md w-full" />
            <div className="h-3.5 bg-stone-light rounded-md w-5/6" />
          </div>
        </div>

        {/* Pricing & actions placeholder */}
        <div className="pt-4 border-t border-stone flex items-center justify-between">
          <div className="space-y-1.5">
            <div className="h-3 bg-stone-light rounded-md w-12" />
            <div className="h-6 bg-stone rounded-md w-20" />
          </div>
          <div className="flex gap-2">
            <div className="h-9 bg-stone rounded-lg w-20" />
            <div className="h-9 bg-stone rounded-lg w-20" />
          </div>
        </div>
      </div>
    </Card>
  );
}

