'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useTranslation } from '../app/i18n/client'
import { Check, X, Mail, Phone } from 'lucide-react'

// Schema
const baseSchema = z.object({
    name: z.string().min(1, { message: 'Required' }),
    attendance: z.enum(['yes', 'no']),
    guests: z.number().min(0).max(10),
    message: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    countryCode: z.string(),
})

type FormData = z.infer<typeof baseSchema>

export default function RsvpForm({ lng }: { lng: string }) {
    const { t } = useTranslation(lng)
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

    const schema = baseSchema.superRefine((data, ctx) => {
        if (lng === 'ja') {
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

    const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            attendance: 'yes',
            guests: 0,
            message: '',
            countryCode: lng === 'ja' ? '+81' : '+82',
            email: '',
            phone: ''
        }
    })

    const attendance = watch('attendance')

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
                countryCode: lng === 'ja' ? '+81' : '+82',
                email: '',
                phone: ''
            })
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
                            <span className="flex items-center gap-2">
                                {t('rsvp_name')}
                                <span className="text-red-500">*</span>
                            </span>
                        </label>
                        <input
                            {...register('name')}
                            className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-[#8B7355]/20 focus:border-[#8B7355] outline-none transition-all"
                            placeholder={t('rsvp_name_placeholder')}
                        />
                        {errors.name && <p className="text-red-500 text-xs">{t('rsvp_required')}</p>}
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        {/* Phone */}
                        <div>
                            <label className="text-sm font-medium text-stone-600 block mb-2">
                                <span className="flex items-center gap-2">
                                    <Phone size={14} /> {t('rsvp_contact_type_phone')}
                                    {lng === 'ko' && <span className="text-red-500">*</span>}
                                </span>
                            </label>
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
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-sm font-medium text-stone-600 block mb-1">
                                <span className="flex items-center gap-2">
                                    <Mail size={14} /> {t('rsvp_contact_type_email')}
                                    {lng === 'ja' && <span className="text-red-500">*</span>}
                                </span>
                            </label>
                            <div>
                                <input
                                    {...register('email')}
                                    className={`w-full px-4 py-3 bg-stone-50 border rounded-lg focus:ring-2 focus:ring-[#8B7355]/20 focus:border-[#8B7355] outline-none transition-all ${lng === 'ja' && errors.email ? 'border-red-300' : 'border-stone-200'}`}
                                    placeholder={t('rsvp_email_placeholder')}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{t('rsvp_error_email')}</p>}
                            </div>
                            <div className="mt-2">
                                <p className={`text-xs ${lng === 'ja' && errors.email ? 'text-red-500 font-medium' : 'text-stone-500'} transition-colors`}>
                                    {t('rsvp_email_desc')}
                                </p>
                                {lng === 'ja' && errors.email && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {t('rsvp_email_error_detail')}
                                    </p>
                                )}
                            </div>
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

                    {/* Error Message */}
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

            {/* Success Modal Popup */}
            <AnimatePresence>
                {status === 'success' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 10 }}
                            className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-xl border border-stone-100/50"
                        >
                            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                                <Check size={32} strokeWidth={2.5} />
                            </div>
                            <h3 className="text-xl font-serif font-medium text-stone-800 mb-2">
                                Thank you
                            </h3>
                            <p className="text-stone-600 mb-8 whitespace-pre-line text-sm leading-relaxed">
                                {t('rsvp_success')}
                            </p>
                            <button
                                onClick={() => setStatus('idle')}
                                className="w-full py-3.5 bg-[#292524] text-white font-medium rounded-xl hover:bg-stone-800 active:scale-[0.98] transition-all shadow-md"
                            >
                                {t('rsvp_success_btn')}
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
