'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from '../app/i18n/client'
import Image from 'next/image'

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
        <section className="py-24 px-6 bg-[#fbfaf9] flex flex-col items-center">
            {/* Header */}
            <div className="space-y-6 text-center mb-12">
                <h2 className="text-4xl font-serif text-stone-800 tracking-wide">
                    {t('calendar_title')}
                </h2>
                <div className="space-y-2">
                    <p className="text-stone-600 font-medium">
                        {t('calendar_date_full')}
                    </p>
                    <p className="text-stone-400 font-light text-sm">
                        {t('calendar_date_en')}
                    </p>
                </div>
            </div>

            {/* Divider */}
            <div className="w-full max-w-md h-[1px] bg-stone-200 mb-12"></div>

            {/* Calendar UI */}
            <div className="w-full max-w-[320px] mb-16">
                <div className="grid grid-cols-7 gap-y-6 text-center text-sm text-stone-600">
                    <div className="text-[#FF8D8D] font-medium">Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div className="text-[#6B9AC4] font-medium">Sat</div>

                    {/* Nov 2026 - Starts Sunday */}
                    <div className="text-[#FF8D8D]">1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
                    <div className="text-[#6B9AC4]">7</div>

                    <div className="text-[#FF8D8D]">8</div>
                    <div>9</div>
                    <div>10</div>
                    <div>11</div>
                    <div>12</div>
                    <div>13</div>
                    <div className="text-[#6B9AC4]">14</div>

                    <div className="text-[#FF8D8D]">15</div>
                    <div>16</div>
                    <div>17</div>
                    <div>18</div>
                    <div>19</div>
                    <div>20</div>
                    <div className="text-[#6B9AC4]">21</div>

                    <div className="text-[#FF8D8D]">22</div>
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
                            className="absolute bg-[#759CC9] w-8 h-8 rounded-full -z-0"
                        />
                    </div>

                    <div className="text-[#FF8D8D]">29</div>
                    <div>30</div>
                </div>
            </div>

            {/* Divider */}
            <div className="w-full max-w-md h-[1px] bg-stone-200 mb-12"></div>

            {/* Countdown */}
            <div className="w-full max-w-lg space-y-12">
                <div className="grid grid-cols-4 gap-3 md:gap-6">
                    <CountdownItem label={t('days')} value={timeLeft.days} />
                    <CountdownItem label={t('hours')} value={timeLeft.hours} />
                    <CountdownItem label={t('minutes')} value={timeLeft.minutes} />
                    <CountdownItem label={t('seconds')} value={timeLeft.seconds} />
                </div>

                <p className="text-center text-stone-600 font-medium">
                    {t('countdown_footer', {
                        groom: t('groom_name'),
                        bride: t('bride_name'),
                        days: timeLeft.days
                    })}
                </p>
            </div>
        </section>
    )
}


function CountdownItem({ label, value }: { label: string, value: number }) {
    return (
        <div className="bg-white rounded-lg shadow-sm p-3 md:p-4 flex flex-col items-center justify-center aspect-square border border-stone-50">
            <div
                className="text-2xl md:text-3xl font-serif text-stone-800 tabular-nums mb-1"
                suppressHydrationWarning
            >
                {String(value)}
            </div>
            <div className="text-[10px] md:text-xs uppercase tracking-wider text-stone-400">
                {label}
            </div>
        </div>
    )
}
