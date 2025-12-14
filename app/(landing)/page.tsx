"use client"

import Link from 'next/link'
import { cookieName } from '../i18n/settings'

export default function LandingPage() {
    const handleLanguageSelect = (lng: string) => {
        document.cookie = `${cookieName}=${lng}; path=/; max-age=31536000` // 1 year
    }

    return (
        <main className="h-screen flex flex-col items-center justify-center bg-stone-50 p-6">
            <div className="text-center space-y-12 animate-in fade-in duration-1000">
                <div className="space-y-4">
                    <p className="text-stone-500 tracking-[0.3em] text-xs uppercase">Welcome</p>
                    <h1 className="text-3xl md:text-4xl font-serif text-stone-800 leading-relaxed">
                        CHOI INHOE & KATSUO REIKO<br />Wedding invitation
                    </h1>
                </div>

                <div className="w-px h-16 bg-stone-300 mx-auto"></div>

                <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-sm mx-auto">
                    <Link
                        href="/ko"
                        onClick={() => handleLanguageSelect('ko')}
                        className="group relative px-8 py-3 bg-white border border-stone-200 rounded-full hover:border-stone-800 transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                        <span className="block text-sm font-medium text-stone-600 group-hover:text-stone-900 transition-colors">
                            한국어
                        </span>
                    </Link>

                    <Link
                        href="/ja"
                        onClick={() => handleLanguageSelect('ja')}
                        className="group relative px-8 py-3 bg-white border border-stone-200 rounded-full hover:border-stone-800 transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                        <span className="block text-sm font-medium text-stone-600 group-hover:text-stone-900 transition-colors">
                            日本語
                        </span>
                    </Link>
                </div>
            </div>
        </main>
    )
}
