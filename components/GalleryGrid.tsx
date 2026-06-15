'use client'

import { PixelImage } from '@/components/PixelImage'
import { libraryImages } from '@/lib/images'

export function GalleryGrid() {
  return (
    <section className="px-2 pb-24 sm:px-6">
      <div className="mx-auto w-full max-w-[1600px] columns-1 gap-2 sm:columns-2 sm:gap-3 lg:columns-3 lg:gap-4">
        {libraryImages.map((photo) => (
          <div
            key={photo.src}
            className="mb-2 break-inside-avoid overflow-hidden rounded-sm bg-bg-raised sm:mb-3 lg:mb-4"
          >
            <PixelImage
              src={photo.src}
              alt={photo.alt}
              className="aspect-[4/3] w-full"
              grid="4x6"
              pixelFadeInDuration={1200}
              maxAnimationDelay={1600}
              colorRevealDelay={3200}
              colorTransitionDuration={2500}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
