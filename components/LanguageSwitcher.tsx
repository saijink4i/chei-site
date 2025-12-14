'use client'

import { usePathname, useRouter } from 'next/navigation'
import { languages } from '../app/i18n/settings'

export default function LanguageSwitcher({ lng }: { lng: string }) {
    const router = useRouter()
    const pathname = usePathname()

    const changeLanguage = (newLang: string) => {
        // Redirect to the new locale path
        if (!pathname) return
        const segments = pathname.split('/')
        segments[1] = newLang
        const newPath = segments.join('/')
        router.push(newPath)
    }

    return (
        <div className="fixed top-4 right-4 z-50 flex gap-2">
            {languages.map((l) => (
                <button
                    key={l}
                    onClick={() => changeLanguage(l)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${lng === l
                        ? 'bg-black text-white'
                        : 'bg-white/80 text-gray-800 hover:bg-white'
                        } shadow-sm backdrop-blur-sm`}
                >
                    {l === 'ko' ? 'KR' : 'JP'}
                </button>
            ))}
        </div>
    )
}
