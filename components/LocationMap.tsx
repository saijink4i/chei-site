'use client'

import { useTranslation } from '../app/i18n/client'
import { MapPin, Bus, Train, Car } from 'lucide-react'

export default function LocationMap({ lng }: { lng: string }) {
    const { t } = useTranslation(lng)
    // Keyless embed URL
    const mapEmbedUrl = `https://maps.google.com/maps?q=DMC+Tower+Wedding&t=&z=15&ie=UTF8&iwloc=&output=embed`

    const handleOpenMap = () => {
        // DMC Tower Wedding Address
        window.open('https://www.google.com/maps/search/?api=1&query=DMC+Tower+Wedding', '_blank')
    }

    return (
        <section className="py-12 px-6 bg-white">
            <div className="max-w-3xl mx-auto space-y-12">
                <div className="text-center space-y-2">
                    <span className="text-stone-500 tracking-[0.2em] text-xs uppercase">
                        Location
                    </span>
                    <h2 className="text-3xl font-serif text-stone-800">
                        {t('venue_name')}
                    </h2>
                    <p className="text-stone-600 font-light">
                        {t('venue_address')}
                    </p>
                </div>

                {/* Map Container */}
                <div className="space-y-4">
                    {/* Added min-h-[400px] to ensure map is visible even if content loads slowly */}
                    <div className="w-full h-[400px] min-h-[400px] bg-stone-100 rounded-lg overflow-hidden shadow-sm border border-stone-200 relative">
                        <iframe
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src={mapEmbedUrl}
                            className="absolute inset-0"
                            title="Venue Location Map"
                        />
                    </div>

                    <button
                        onClick={handleOpenMap}
                        className="w-full py-4 bg-[#8B7355] text-white font-medium rounded-lg hover:bg-[#725C42] transition-colors shadow-sm flex items-center justify-center gap-2"
                    >
                        <MapPin size={18} />
                        Open in Map App
                    </button>
                </div>

                {/* Transport Info */}
                <div className="space-y-12 pt-10 border-t border-stone-100 text-left">
                    {/* Subway */}
                    <div className="flex gap-4 sm:gap-6">
                        <div className="shrink-0 w-10 h-10 bg-[#f5f5f4] rounded-full flex items-center justify-center text-stone-600 mt-1">
                            <Train size={20} />
                        </div>
                        <div className="space-y-4 w-full">
                            <h4 className="font-semibold text-stone-800 text-lg">{t('transport_subway_title')}</h4>
                            <p className="text-stone-700 font-medium pl-1">
                                {t('transport_subway_desc')}
                            </p>
                            <div className="space-y-3 text-sm md:text-base">
                                <div className="flex items-center gap-3">
                                    <span className="shrink-0 inline-flex items-center justify-center h-7 px-3 rounded-full bg-[#CD7C2F] text-white text-sm font-bold leading-none pb-0.5">
                                        {t('transport_subway_line_6_badge')}
                                    </span>
                                    <span className="text-stone-600 leading-snug">{t('transport_subway_line_6_desc')}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="shrink-0 inline-flex items-center justify-center h-7 px-3 rounded-full bg-[#0090D2] text-white text-sm font-bold leading-none pb-0.5">
                                        {t('transport_subway_line_airport_badge')}
                                    </span>
                                    <span className="text-stone-600 leading-snug">{t('transport_subway_line_airport_desc')}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="shrink-0 inline-flex items-center justify-center h-7 px-3 rounded-full bg-[#77C4A3] text-white text-sm font-bold leading-none pb-0.5">
                                        {t('transport_subway_line_gj_badge')}
                                    </span>
                                    <span className="text-stone-600 leading-snug">{t('transport_subway_line_gj_desc')}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bus */}
                    <div className="flex gap-4 sm:gap-6">
                        <div className="shrink-0 w-10 h-10 bg-[#f5f5f4] rounded-full flex items-center justify-center text-stone-600 mt-1">
                            <Bus size={20} />
                        </div>
                        <div className="space-y-6 w-full">
                            <h4 className="font-semibold text-stone-800 text-lg">{t('transport_bus_title')}</h4>

                            {/* Stop 1 */}
                            <div className="space-y-3">
                                <p className="font-medium text-stone-800 pl-1">
                                    ○ {t('transport_bus_stop_1')}
                                </p>
                                <ul className="list-none space-y-3 text-sm text-stone-600">
                                    <li className="flex items-start gap-3">
                                        <span className="shrink-0 inline-flex items-center justify-center h-6 px-2.5 rounded-full bg-[#3EA343] text-white text-xs font-bold leading-none pb-0.5">
                                            {t('transport_bus_type_green')}
                                        </span>
                                        <span className="leading-snug">{t('transport_bus_list_green')}</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="shrink-0 inline-flex items-center justify-center h-6 px-2.5 rounded-full bg-[#3EA343] text-white text-xs font-bold leading-none pb-0.5">
                                            {t('transport_bus_type_normal')}
                                        </span>
                                        <span className="leading-snug">{t('transport_bus_list_normal')}</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="shrink-0 inline-flex items-center justify-center h-6 px-2.5 rounded-full bg-[#3EA343] text-white text-xs font-bold leading-none pb-0.5">
                                            {t('transport_bus_type_town')}
                                        </span>
                                        <span className="leading-snug">{t('transport_bus_list_town')}</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Stop 2 */}
                            <div className="space-y-3">
                                <p className="font-medium text-stone-800 pl-1">
                                    ○ {t('transport_bus_stop_2')}
                                </p>
                                <ul className="list-none space-y-3 text-sm text-stone-600">
                                    <li className="flex items-start gap-3">
                                        <span className="shrink-0 inline-flex items-center justify-center h-6 px-2.5 rounded-full bg-[#3067C6] text-white text-xs font-bold leading-none pb-0.5">
                                            {t('transport_bus_type_blue')}
                                        </span>
                                        <div className="space-y-1 leading-snug">
                                            <p>{t('transport_bus_list_blue_1')}</p>
                                            <p>{t('transport_bus_list_blue_2')}</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="shrink-0 inline-flex items-center justify-center h-6 px-2.5 rounded-full bg-[#3EA343] text-white text-xs font-bold leading-none pb-0.5">
                                            {t('transport_bus_type_green')}
                                        </span>
                                        <span className="leading-snug">{t('transport_bus_list_green_2')}</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="shrink-0 inline-flex items-center justify-center h-6 px-2.5 rounded-full bg-[#E6322E] text-white text-xs font-bold leading-none pb-0.5">
                                            {t('transport_bus_type_red')}
                                        </span>
                                        <span className="leading-snug">{t('transport_bus_list_red')}</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="shrink-0 inline-flex items-center justify-center h-6 px-2.5 rounded-full bg-[#607D8B] text-white text-xs font-bold leading-none pb-0.5">
                                            {t('transport_bus_type_airport')}
                                        </span>
                                        <span className="leading-snug">{t('transport_bus_list_airport')}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Car */}
                    <div className="flex gap-4 sm:gap-6">
                        <div className="shrink-0 w-10 h-10 bg-[#f5f5f4] rounded-full flex items-center justify-center text-stone-600 mt-1">
                            <Car size={20} />
                        </div>
                        <div className="space-y-3 w-full">
                            <h4 className="font-semibold text-stone-800 text-lg">{t('transport_car_title')}</h4>
                            <div className="space-y-2 text-sm text-stone-600 bg-stone-50 p-4 rounded-lg">
                                <p>
                                    <span className="font-semibold text-stone-700 min-w-[80px] inline-block">{t('transport_car_nav_label')} :</span>
                                    {t('transport_car_nav_val')}
                                </p>
                                <p>
                                    <span className="font-semibold text-stone-700 min-w-[80px] inline-block">{t('transport_car_addr_label')} :</span>
                                    {t('transport_car_addr_val')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
