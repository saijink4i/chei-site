'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from '../app/i18n/client'

export default function Calendar({ lng }: { lng: string }) {
    const { t } = useTranslation(lng)

    // Wedding Date: 2026-11-28
    const WEDDING_DATE = new Date('2026-11-28T13:40:00')

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    })

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date()
            const diff = WEDDING_DATE.getTime() - now.getTime()

            if (diff > 0) {
                setTimeLeft({
                    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((diff / 1000 / 60) % 60),
                    seconds: Math.floor((diff / 1000) % 60)
                })
            }
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    return (
        <section className="py-24 px-6 bg-white flex flex-col items-center">
            <div className="space-y-4 text-center mb-12">
                <h2 className="text-3xl font-serif text-stone-800">
                    2026.11.28
                </h2>
                <p className="text-stone-500 uppercase tracking-widest text-sm">
                    Saturday
                </p>
            </div>

            {/* Calendar UI */}
            <div className="w-full max-w-[300px] mb-16">
                <div className="text-center font-serif text-xl mb-6">November</div>
                <div className="grid grid-cols-7 gap-y-4 text-center text-sm font-light text-stone-600">
                    <div className="text-red-400">Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div className="text-blue-400">Sat</div>

                    {/* Empty days for Nov 2026 (Starts Sunday) */}
                    <div className="text-stone-300">1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
                    <div className="text-blue-400">7</div>

                    <div className="text-red-400">8</div>
                    <div>9</div>
                    <div>10</div>
                    <div>11</div>
                    <div>12</div>
                    <div>13</div>
                    <div className="text-blue-400">14</div>

                    <div className="text-red-400">15</div>
                    <div>16</div>
                    <div>17</div>
                    <div>18</div>
                    <div>19</div>
                    <div>20</div>
                    <div className="text-blue-400">21</div>

                    <div className="text-red-400">22</div>
                    <div>23</div>
                    <div>24</div>
                    <div>25</div>
                    <div>26</div>
                    <div>27</div>
                    <div className="relative z-10 font-bold text-white flex items-center justify-center">
                        <span className="relative z-10">28</span>
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            className="absolute inset-0 bg-[#A67B5B] rounded-full -z-0"
                        />
                    </div>

                    <div className="text-red-400">29</div>
                    <div>30</div>
                </div>
            </div>

            {/* Countdown */}
            <div className="grid grid-cols-4 gap-4 md:gap-8 text-center w-full max-w-md">
                <CountdownItem label="DD" value={timeLeft.days} />
                <CountdownItem label="HH" value={timeLeft.hours} />
                <CountdownItem label="MM" value={timeLeft.minutes} />
                <CountdownItem label="SS" value={timeLeft.seconds} />
            </div>
        </section>
    )
}

function CountdownItem({ label, value }: { label: string, value: number }) {
    return (
        <div className="space-y-2">
            <div className="text-3xl md:text-4xl font-serif text-stone-800 tabular-nums">
                {String(value).padStart(2, '0')}
            </div>
            <div className="text-[10px] uppercase tracking-widest text-stone-400">
                {label}
            </div>
        </div>
    )
}
