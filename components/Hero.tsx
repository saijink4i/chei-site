'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from '../app/i18n/client'
import Image from 'next/image'

export default function Hero({ lng }: { lng: string }) {
    const { t } = useTranslation(lng)

    return (
        <section className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-4 md:p-8">
            {/* Card Container */}
            <div className="relative w-full max-w-md h-[85vh] md:h-[90vh] bg-stone-900 rounded-[2rem] overflow-hidden shadow-2xl ring-8 ring-white/50">

                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/hero-bg.png"
                        alt="Wedding Couple"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/20" />
                </div>

                {/* Heart Overlay (SVG) */}
                <div className="absolute inset-0 z-10 pointer-events-none opacity-90">
                    <svg viewBox="0 0 100 200" preserveAspectRatio="none" className="w-full h-full">
                        {/* Cursive Heart Path - Asymmetrical and 'spilled' style */}
                        {/* Layer 1: Left Curve */}
                        <motion.path
                            d="M -10 100 C 10 140 40 180 52 205"
                            fill="none"
                            stroke="white"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            className="drop-shadow-lg opacity-90"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.9 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                        {/* Layer 2: Right Curve */}
                        <motion.path
                            d="M 110 100 C 90 140 60 180 48 205"
                            fill="none"
                            stroke="white"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            className="drop-shadow-lg opacity-90"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.9 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                        {/* Layer 3: Top Left Curve (Dip) */}
                        <motion.path
                            d="M 20 -10 C 20 20 40 40 50 60"
                            fill="none"
                            stroke="white"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            className="drop-shadow-lg opacity-90"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.9 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                        {/* Layer 4: Top Right Curve (Dip) */}
                        <motion.path
                            d="M 80 -10 C 80 20 60 40 50 60"
                            fill="none"
                            stroke="white"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            className="drop-shadow-lg opacity-90"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.9 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        />

                        {/* Extra sketch lines for the "multiple layers" feel */}
                        <motion.path
                            d="M -5 105 C 15 145 45 185 55 208"
                            fill="none"
                            stroke="white"
                            strokeWidth="0.6"
                            className="opacity-70"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.7 }}
                            transition={{ duration: 1.6, delay: 0.1 }}
                        />
                        <motion.path
                            d="M 105 105 C 85 145 55 185 45 208"
                            fill="none"
                            stroke="white"
                            strokeWidth="0.6"
                            className="opacity-70"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.7 }}
                            transition={{ duration: 1.6, delay: 0.1 }}
                        />
                    </svg>
                </div>

                {/* Petals Effect */}
                <PetalEffect />

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="absolute bottom-16 inset-x-0 z-20 text-center text-white px-6 space-y-4"
                >
                    <p className="font-serif italic text-3xl md:text-4xl text-white/90 drop-shadow-md">
                        We are getting married
                    </p>

                    <div className="flex items-center justify-center gap-2 text-xs md:text-sm tracking-widest font-light uppercase opacity-90">
                        {/* Names and Date in horizontal line as per image reference */}
                        <span>{t('groom_name')}</span>
                        <span className="opacity-50">|</span>
                        <span>2026. 11. 28 SAT</span>
                        <span className="opacity-50">|</span>
                        <span>{t('bride_name')}</span>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

function PetalEffect() {
    // Generate static petals to avoid hydration mismatch
    const PETAL_COUNT = 20
    const petals = Array.from({ length: PETAL_COUNT }).map((_, i) => ({
        id: i,
        left: `${(i * 100) / PETAL_COUNT}%`, // Spread evenly
        delay: i * 0.5, // Staggered start
        duration: 5 + Math.random() * 4 // Variable speed
    }))

    return (
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            {petals.map((petal) => (
                <motion.div
                    key={petal.id}
                    className="absolute top-[-20px] bg-white/70 w-2 h-3 rounded-full blur-[1px]"
                    style={{ left: petal.left }}
                    initial={{ y: -20, opacity: 0, rotate: 0 }}
                    animate={{
                        y: 800, // Fall down screen
                        opacity: [0, 1, 1, 0], // Fade in/out
                        rotate: 360,
                        x: [0, 20, -20, 0] // Sway
                    }}
                    transition={{
                        duration: petal.duration,
                        repeat: Infinity,
                        delay: petal.delay,
                        ease: "linear"
                    }}
                />
            ))}
        </div>
    )
}
