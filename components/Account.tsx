'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from '../app/i18n/client'
import { ChevronDown, Copy, Check } from 'lucide-react'

export default function Account({ lng }: { lng: string }) {
    const { t } = useTranslation(lng)

    // Account Data Structure
    const accounts = [
        {
            side: t('groom'),
            items: [
                { name: t('groom_name'), bank: t('groom_bank_name'), number: t('groom_account_number') }
            ]
        },
        {
            side: t('bride'),
            items: [
                { name: t('bride_name'), bank: t('bride_bank_name'), number: t('bride_account_number') }
            ]
        }
    ]


    return (
        <section className="py-20 px-6 bg-[#fdfbf7]">
            <div className="max-w-2xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-serif text-stone-800">
                        {t('account_title')}
                    </h2>
                    <p className="text-stone-500 text-xs md:text-sm leading-relaxed whitespace-pre-line">
                        {t('account_desc')}
                    </p>
                </div>

                <div className="space-y-4">
                    {accounts.map((group, idx) => (
                        <AccountAccordion key={idx} group={group} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function AccountAccordion({ group }: { group: any }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="bg-white rounded-lg overflow-hidden border border-stone-100 shadow-sm">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 bg-white hover:bg-stone-50 transition-colors"
            >
                <span className="font-medium text-stone-700">{group.side}</span>
                <ChevronDown
                    className={`text-stone-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    size={20}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 pt-0 space-y-3 bg-stone-50/50">
                            {group.items.map((account: any, idx: number) => (
                                <AccountItem key={idx} account={account} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function AccountItem({ account }: { account: any }) {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(`${account.bank} ${account.number}`)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="flex items-center justify-between bg-white p-3 rounded border border-stone-100">
            <div className="space-y-1">
                <div
                    className="text-sm font-medium text-stone-800"
                    suppressHydrationWarning
                >
                    {account.name}
                </div>
                <div
                    className="text-xs text-stone-500"
                    suppressHydrationWarning
                >
                    {account.bank} {account.number}
                </div>
            </div>
            <button
                onClick={handleCopy}
                className="p-2 text-stone-400 hover:text-stone-600 transition-colors"
                aria-label="Copy account number"
            >
                {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
            </button>
        </div>
    )
}
