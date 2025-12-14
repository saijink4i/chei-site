'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '../app/i18n/client'
import Image from 'next/image'

export default function Hero({ lng }: { lng: string }) {
    const { t } = useTranslation(lng)

    return (
        <section className="relative h-screen min-h-[600px] flex flex-col items-center justify-center text-center p-6 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0 select-none">
                <Image
                    src="/images/hero-bg.png"
                    alt="Wedding Couple"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative z-10 space-y-8 text-white max-w-3xl mx-auto"
            >
                <div className="space-y-4">
                    <p className="tracking-[0.4em] text-xs md:text-sm uppercase font-light text-stone-200">
                        We Are Getting Married
                    </p>
                    <h1 className="text-4xl md:text-6xl font-serif leading-tight whitespace-pre-line">
                        {t('title')}
                    </h1>
                </div>

                <div className="w-[1px] h-20 bg-white/50 mx-auto my-8"></div>

                <div className="space-y-2">
                    <p className="text-xl md:text-2xl font-light tracking-wide font-serif">
                        {t('date')}
                    </p>
                    <p className="text-sm md:text-base font-light text-stone-200 tracking-wider">
                        13:40 PM @ DMC타워웨딩
                    </p>
                    <p className="text-sm md:text-base font-light text-stone-200 tracking-wider">
                        {t('venue_address')}
                    </p>
                </div>
            </motion.div>
        </section>
    )
}
