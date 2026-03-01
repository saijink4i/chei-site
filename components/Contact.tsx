'use client'

import { Phone, MessageCircle } from 'lucide-react'
import Image from 'next/image'

interface ContactPerson {
    role: string
    name: string
    label: string
    desc: string
    tel: string
    line: string
    photo: string
}

interface ContactProps {
    groom: ContactPerson
    bride: ContactPerson
}

export default function Contact({ groom, bride }: ContactProps) {
    const contactInfo = [groom, bride]

    return (
        <section className="py-12 px-6 bg-white">
            <div className="max-w-4xl mx-auto space-y-24">
                <div className="space-y-24">
                    {contactInfo.map((person, index) => {
                        const isEven = index % 2 === 0
                        return (
                            <div
                                key={person.role}
                                className={`flex flex-col md:flex-row items-center gap-10 md:gap-16 ${!isEven ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Photo */}
                                <div className="shrink-0 w-full max-w-[300px] md:w-5/12">
                                    <div className="aspect-[3/4] relative rounded-lg overflow-hidden bg-stone-100 border border-stone-100 shadow-sm">
                                        <Image
                                            src={person.photo}
                                            alt={person.label}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 300px"
                                        />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className={`flex flex-col items-center ${isEven ? 'md:items-start md:text-left' : 'md:items-end md:text-right'} w-full md:w-7/12 space-y-6`}>
                                    <div className="space-y-3">
                                        <p className="text-stone-500 text-sm tracking-[0.2em] uppercase">
                                            {person.label}
                                        </p>
                                        <h3 className="text-3xl font-serif text-stone-900">
                                            {person.name}
                                        </h3>
                                        <p className="text-stone-600 leading-relaxed max-w-sm whitespace-pre-line">
                                            {person.desc}
                                        </p>
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex gap-6 pt-2">
                                        <a
                                            href={`tel:${person.tel}`}
                                            className="flex flex-col items-center gap-2 group"
                                        >
                                            <div className="w-12 h-12 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center text-stone-600 group-active:bg-stone-100 transition-colors shadow-sm">
                                                <Phone size={20} />
                                            </div>
                                            <span className="text-[10px] text-stone-400 uppercase tracking-wider font-medium">Call</span>
                                        </a>
                                        <a
                                            href={person.line}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex flex-col items-center gap-2 group"
                                        >
                                            <div className="w-12 h-12 rounded-full bg-[#06C755]/5 border border-[#06C755]/10 flex items-center justify-center text-[#06C755] group-active:bg-[#06C755]/10 transition-colors shadow-sm">
                                                <MessageCircle size={20} />
                                            </div>
                                            <span className="text-[10px] text-stone-400 uppercase tracking-wider font-medium">Line</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
