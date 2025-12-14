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
                        {/* Layer 1: Single continuous large sketchy heart */}
                        <motion.path
                            d="M 50 45 C 50 45 20 -10 -20 30 C -50 70 0 160 52 205 M 50 45 C 50 45 80 -10 120 30 C 150 70 100 160 48 205"
                            fill="none"
                            stroke="white"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="drop-shadow-lg opacity-90"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.9 }}
                            transition={{ duration: 3, ease: "easeInOut" }}
                        />

                        {/* Layer 2: Offset sketch lines */}
                        {/* 기존 경로: "M 52 48 C 52 48 25 -5 -15 35 C -45 75 5 155 55 208 M 48 48 C 48 48 75 -5 115 35 C 145 75 95 155 45 208" */}
                        <motion.path
                            d="M 52 48 C 52 48 25 -5 -15 35 C -45 75 5 155 55 208 M 48 48 C 48 48 75 -5 115 35 C 145 75 95 155 45 208"
                            fill="none"
                            stroke="white"
                            strokeWidth="0.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="drop-shadow-lg opacity-70"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.7 }}
                            transition={{ duration: 3, ease: "easeInOut" }}
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
                    className="absolute bottom-75 inset-x-0 z-20 text-center text-white px-6 space-y-3"
                >
                    <p className="font-serif text-lg md:text-xl text-white/90 drop-shadow-md">
                        We are getting married
                    </p>

                    <div className="flex flex-col items-center gap-1">
                        {lng === 'ja' && (
                            <span className="font-serif text-sm md:text-base text-white/90 drop-shadow-md tracking-wider">
                                {t('groom_name_yomi')} & {t('bride_name_yomi')}
                            </span>
                        )}
                        <p className="font-serif text-2xl md:text-3xl font-medium text-white drop-shadow-md">
                            {t('groom_name')} & {t('bride_name')}
                        </p>
                    </div>

                    <p className="font-serif text-lg md:text-xl text-white/90 drop-shadow-md tracking-widest">
                        2026.11.28
                    </p>
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
