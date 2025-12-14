'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '../app/i18n/client'

export default function CoupleIntro({ lng }: { lng: string }) {
    const { t } = useTranslation(lng)

    return (
        <section className="py-20 px-6 bg-white">
            <div className="max-w-4xl mx-auto space-y-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 gap-8 items-center"
                >
                    {/* Groom */}
                    <div className="text-center md:text-right space-y-4 order-2 md:order-1">
                        <h3 className="text-2xl font-serif text-stone-800">{t('groom')}</h3>
                        <p className="text-stone-600 leading-relaxed whitespace-pre-line">
                            {t('groom_desc')}
                        </p>
                        <p className="font-bold text-stone-900">{t('groom_name')}</p>
                    </div>
                    <div className="aspect-[3/4] bg-stone-200 rounded-lg order-1 md:order-2 overflow-hidden relative">
                        <div className="absolute inset-0 flex items-center justify-center text-stone-400">
                            Image Placeholder
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 gap-8 items-center"
                >
                    {/* Bride */}
                    <div className="aspect-[3/4] bg-stone-200 rounded-lg overflow-hidden relative">
                        <div className="absolute inset-0 flex items-center justify-center text-stone-400">
                            Image Placeholder
                        </div>
                    </div>
                    <div className="text-center md:text-left space-y-4">
                        <h3 className="text-2xl font-serif text-stone-800">{t('bride')}</h3>
                        <p className="text-stone-600 leading-relaxed whitespace-pre-line">
                            {t('bride_desc')}
                        </p>
                        <p className="font-bold text-stone-900">{t('bride_name')}</p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
