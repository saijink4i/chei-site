'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useTranslation } from '../app/i18n/client'
import { Check, X, Mail, Phone } from 'lucide-react'

// Schema
const schema = z.object({
    name: z.string().min(1, { message: 'Required' }),
    attendance: z.enum(['yes', 'no']),
    guests: z.number().min(0).max(10),
    message: z.string().optional(),
    contactType: z.enum(['email', 'phone']),
    email: z.string().optional(),
    phone: z.string().optional(),
    countryCode: z.string(),
}).superRefine((data, ctx) => {
    if (data.contactType === 'email') {
        if (!data.email || !z.string().email().safeParse(data.email).success) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['email'],
                message: 'Invalid email'
            })
        }
    } else {
        if (!data.phone || data.phone.length < 8) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['phone'],
                message: 'Invalid phone'
            })
        }
    }
})

type FormData = z.infer<typeof schema>

export default function RsvpForm({ lng }: { lng: string }) {
    const { t } = useTranslation(lng)
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

    const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            attendance: 'yes',
            guests: 0,
            message: '',
            contactType: 'phone', // Default to phone as per user request context mainly implies mobile
            countryCode: lng === 'ja' ? '+81' : '+82',
            email: '',
            phone: ''
        }
    })

    const attendance = watch('attendance')
    const contactType = watch('contactType')
    const countryCode = watch('countryCode')

    // Reset guests to 0 if not attending
    useEffect(() => {
        if (attendance === 'no') {
            setValue('guests', 0)
        }
    }, [attendance, setValue])

    const onSubmit = async (data: FormData) => {
        setStatus('submitting')

        const submitData = {
            ...data,
            guests: data.attendance === 'no' ? 0 : data.guests
        }

        try {
            const response = await fetch('/api/rsvp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submitData),
            })

            if (!response.ok) throw new Error('Failed to submit')

            setStatus('success')
            reset({
                attendance: 'yes',
                guests: 0,
                message: '',
                contactType: 'phone',
                countryCode: lng === 'ja' ? '+81' : '+82',
                email: '',
                phone: ''
            })
            setTimeout(() => setStatus('idle'), 5000)
        } catch (e) {
            console.error(e)
            setStatus('error')
        }
    }

    return (
        <section className="py-24 px-6 bg-[#fdfbf7] flex justify-center">
            <div className="w-full max-w-lg">
                <div className="text-center mb-12 space-y-4">
                    <span className="text-stone-500 tracking-[0.2em] text-xs uppercase">
                        RSVP
                    </span>
                    <h2 className="text-3xl font-serif text-stone-800">
                        {t('rsvp')}
                    </h2>
                    <p className="text-stone-600 font-serif italic mobile-text-sm whitespace-pre-line">
                        {t('rsvp_guide')}
                    </p>
                </div>

                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-8 bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-stone-100"
                >
                    {/* Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-stone-600 block">
                            {t('rsvp_name')}
                        </label>
                        <input
                            {...register('name')}
                            className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-[#8B7355]/20 focus:border-[#8B7355] outline-none transition-all"
                            placeholder={t('rsvp_name_placeholder')}
                        />
                        {errors.name && <p className="text-red-500 text-xs">{t('rsvp_required')}</p>}
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-stone-600 block">
                            {t('rsvp_contact_label')}
                        </label>

                        {/* Type Toggle */}
                        <div className="flex gap-4 p-1 bg-stone-50 rounded-lg border border-stone-200 mb-2">
                            <label className={`
                                flex-1 flex items-center justify-center gap-2 py-2 rounded-md cursor-pointer transition-all text-sm font-medium
                                ${contactType === 'phone' ? 'bg-white text-stone-800 shadow-sm border border-stone-100' : 'text-stone-400 hover:text-stone-600'}
                            `}>
                                <input
                                    type="radio"
                                    value="phone"
                                    {...register('contactType')}
                                    className="hidden"
                                />
                                <Phone size={14} />
                                {t('rsvp_contact_type_phone')}
                            </label>
                            <label className={`
                                flex-1 flex items-center justify-center gap-2 py-2 rounded-md cursor-pointer transition-all text-sm font-medium
                                ${contactType === 'email' ? 'bg-white text-stone-800 shadow-sm border border-stone-100' : 'text-stone-400 hover:text-stone-600'}
                            `}>
                                <input
                                    type="radio"
                                    value="email"
                                    {...register('contactType')}
                                    className="hidden"
                                />
                                <Mail size={14} />
                                {t('rsvp_contact_type_email')}
                            </label>
                        </div>

                        {/* Input Fields */}
                        <div className="relative">
                            {contactType === 'email' ? (
                                <div>
                                    <input
                                        {...register('email')}
                                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-[#8B7355]/20 focus:border-[#8B7355] outline-none transition-all"
                                        placeholder={t('rsvp_email_placeholder')}
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{t('rsvp_error_email')}</p>}
                                </div>
                            ) : (
                                <div className="space-y-1">
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <select
                                            {...register('countryCode')}
                                            className="px-3 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-[#8B7355]/20 focus:border-[#8B7355] outline-none cursor-pointer text-stone-600 text-sm font-medium"
                                        >
                                            <option value="+82">KR (+82)</option>
                                            <option value="+81">JP (+81)</option>
                                        </select>
                                        <input
                                            {...register('phone')}
                                            type="tel"
                                            className="flex-1 px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-[#8B7355]/20 focus:border-[#8B7355] outline-none transition-all"
                                            placeholder={t('rsvp_phone_placeholder')}
                                        />
                                    </div>
                                    {errors.phone && <p className="text-red-500 text-xs">{t('rsvp_error_phone')}</p>}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Attendance */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-stone-600 block">
                            {t('rsvp_label_attendance')}
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            <label className={`
                                relative flex items-center justify-center gap-2 p-4 rounded-xl border cursor-pointer transition-all
                                ${attendance === 'yes' ? 'border-[#8B7355] bg-[#8B7355]/5 text-[#8B7355]' : 'border-stone-200 hover:border-stone-300 text-stone-500'}
                            `}>
                                <input
                                    type="radio"
                                    value="yes"
                                    {...register('attendance')}
                                    className="absolute opacity-0 w-0 h-0"
                                />
                                <Check size={18} className={attendance === 'yes' ? 'opacity-100' : 'opacity-0'} />
                                <span className="font-medium">{t('attendance_yes')}</span>
                            </label>

                            <label className={`
                                relative flex items-center justify-center gap-2 p-4 rounded-xl border cursor-pointer transition-all
                                ${attendance === 'no' ? 'border-stone-400 bg-stone-50 text-stone-600' : 'border-stone-200 hover:border-stone-300 text-stone-500'}
                            `}>
                                <input
                                    type="radio"
                                    value="no"
                                    {...register('attendance')}
                                    className="absolute opacity-0 w-0 h-0"
                                />
                                <X size={18} className={attendance === 'no' ? 'opacity-100' : 'opacity-0'} />
                                <span className="font-medium">{t('attendance_no')}</span>
                            </label>
                        </div>
                    </div>

                    {/* Guests */}
                    <div className={`space-y-2 transition-opacity duration-300 ${attendance === 'no' ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                        <label className="text-sm font-medium text-stone-600 block">
                            {t('rsvp_guests')}
                        </label>
                        <div className="relative">
                            <select
                                {...register('guests', { valueAsNumber: true })}
                                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-[#8B7355]/20 focus:border-[#8B7355] outline-none appearance-none cursor-pointer"
                            >
                                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                    <option key={num} value={num}>
                                        {num === 0
                                            ? t('rsvp_guests_zero')
                                            : `${t('rsvp_guests_prefix')}${num}${t('rsvp_guests_suffix')}`
                                        }
                                    </option>
                                ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                                ▼
                            </div>
                        </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-stone-600 block">
                            {t('rsvp_message')}
                        </label>
                        <textarea
                            {...register('message')}
                            rows={4}
                            className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-[#8B7355]/20 focus:border-[#8B7355] outline-none transition-all resize-none"
                            placeholder={t('rsvp_message_placeholder')}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full py-4 bg-[#292524] text-[#fdfbf7] font-medium rounded-lg hover:bg-stone-800 active:scale-[0.98] transition-all disabled:opacity-70 disabled:scale-100 shadow-md"
                    >
                        {status === 'submitting' ? t('rsvp_btn_submitting') : t('rsvp_btn_send')}
                    </button>

                    {/* Status Messages */}
                    {status === 'success' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 bg-green-50 text-green-700 rounded-lg text-center text-sm font-medium"
                        >
                            {t('rsvp_success')}
                        </motion.div>
                    )}
                    {status === 'error' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 bg-red-50 text-red-700 rounded-lg text-center text-sm font-medium"
                        >
                            {t('rsvp_error')}
                        </motion.div>
                    )}
                </motion.form>
            </div>
        </section>
    )
}
