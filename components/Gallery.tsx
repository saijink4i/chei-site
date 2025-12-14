'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from '../app/i18n/client'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Gallery({ lng }: { lng: string }) {
    const { t } = useTranslation(lng)
    const [index, setIndex] = useState(0)

    // Local images
    const images = [
        '/images/gallery-1.jpg',
        '/images/gallery-2.jpg',
        '/images/gallery-3.jpg',
        '/images/gallery-4.jpg',
    ]

    const nextImage = () => {
        setIndex((prev) => (prev + 1) % images.length)
    }

    const prevImage = () => {
        setIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    return (
        <section className="py-20 bg-[#fdfbf7] select-none">
            <div className="text-center mb-10 space-y-4">
                <span className="text-stone-500 tracking-[0.2em] text-xs uppercase">
                    Gallery
                </span>
                <h2 className="text-3xl font-serif text-stone-800">
                    Sweet Moments
                </h2>
            </div>

            <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-8">
                {/* Main Image Viewer */}
                <div className="relative w-full max-w-md aspect-[3/4] md:aspect-[4/5] bg-stone-100 rounded-2xl overflow-hidden shadow-lg group">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="relative w-full h-full"
                        >
                            <Image
                                src={images[index]}
                                alt={`Gallery image ${index + 1}`}
                                fill
                                className="object-contain"
                                priority
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Overlays */}
                    {/* Left Click Area */}
                    <div
                        className="absolute inset-y-0 left-0 w-1/2 cursor-pointer z-10 flex items-center justify-start pl-2 md:pl-4 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={prevImage}
                    >
                        <div className="bg-white/30 backdrop-blur-sm p-2 rounded-full hover:bg-white/50 transition-colors">
                            <ChevronLeft className="text-white drop-shadow-md" size={32} />
                        </div>
                    </div>

                    {/* Right Click Area */}
                    <div
                        className="absolute inset-y-0 right-0 w-1/2 cursor-pointer z-10 flex items-center justify-end pr-2 md:pr-4 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={nextImage}
                    >
                        <div className="bg-white/30 backdrop-blur-sm p-2 rounded-full hover:bg-white/50 transition-colors">
                            <ChevronRight className="text-white drop-shadow-md" size={32} />
                        </div>
                    </div>
                </div>

                {/* Thumbnails */}
                <div className="w-full max-w-2xl px-4">
                    <div className="flex justify-center gap-3 md:gap-4 overflow-x-auto py-2 no-scrollbar">
                        {images.map((src, idx) => (
                            <button
                                key={idx}
                                onClick={() => setIndex(idx)}
                                className={`
                                    relative shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden transition-all duration-300
                                    ${index === idx ? 'ring-2 ring-[#8B7355] ring-offset-2 opacity-100 scale-105' : 'opacity-50 hover:opacity-100'}
                                `}
                            >
                                <Image
                                    src={src}
                                    alt={`Thumbnail ${idx + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
