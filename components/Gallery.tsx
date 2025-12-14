'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from '../app/i18n/client'
import Image from 'next/image'

export default function Gallery({ lng }: { lng: string }) {
    const { t } = useTranslation(lng)

    // Local images
    const images = [
        '/images/gallery-1.png',
        '/images/gallery-2.png',
        '/images/gallery-1.png',
        '/images/gallery-2.png',
    ]

    return (
        <section className="py-20 bg-[#fdfbf7] overflow-hidden">
            <div className="text-center mb-12 space-y-4">
                <span className="text-stone-500 tracking-[0.2em] text-xs uppercase">
                    Gallery
                </span>
                <h2 className="text-3xl font-serif text-stone-800">
                    Sweet Moments
                </h2>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="overflow-x-auto flex gap-6 px-6 pb-8 snap-x snap-mandatory no-scrollbar">
                {images.map((src, index) => (
                    <div
                        key={index}
                        className="snap-center shrink-0 w-[80vw] md:w-[400px] aspect-[4/5] relative rounded-2xl overflow-hidden shadow-md"
                    >
                        <Image
                            src={src}
                            alt={`Gallery image ${index + 1}`}
                            fill
                            className="object-cover"
                        />
                    </div>
                ))}
            </div>

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    )
}
