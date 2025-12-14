'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '../app/i18n/client'

export default function Invitation({ lng }: { lng: string }) {
    const { t } = useTranslation(lng)

    // Fallback text if translation key doesn't exist yet
    const poem = t('invitation_poem', {
        defaultValue: "서로가 마주보며 다져온 사랑을\n이제 함께 한 곳을 바라보며\n걸어가려 합니다.\n\n저희 두 사람의 새로운 시작을\n축복해주시면 더없는 기쁨으로 간직하겠습니다."
    })

    return (
        <section className="py-24 px-6 bg-[#fdfbf7] flex flex-col items-center justify-center text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-md mx-auto space-y-12"
            >
                <div>
                    <span className="text-stone-500 tracking-[0.2em] text-xs uppercase block mb-4">
                        Invitation
                    </span>
                    <h2 className="text-3xl font-serif text-stone-800 mb-8">
                        {t('welcome')}
                    </h2>
                </div>

                <div className="leading-loose text-stone-600 font-serif whitespace-pre-line text-lg md:text-xl">
                    {poem}
                </div>

                <div className="pt-8 space-y-2 font-medium text-stone-800">
                    <p>
                        <span className="text-lg">{t('groom_name')}</span>
                        <span className="text-stone-400 text-sm font-normal mx-2"> & </span>
                        <span className="text-lg">{t('bride_name')}</span>
                    </p>
                </div>
            </motion.div>
        </section>
    )
}
