
import Hero from '@/components/Hero'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import Invitation from '@/components/Invitation' // New
import Contact from '@/components/Contact' // New
import Gallery from '@/components/Gallery' // New
import Calendar from '@/components/Calendar' // New
import LocationMap from '@/components/LocationMap'
import RsvpForm from '@/components/RsvpForm'
import Account from '@/components/Account' // New

import { getTranslation } from '../i18n'

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const { t } = await getTranslation(lang)

  const groomContact = {
    role: 'groom',
    name: t('groom_name'),
    label: t('groom'),
    desc: t('groom_desc'),
    tel: t('groom_tel'),
    line: 'https://line.me/ti/p/lomuhoe',
    photo: '/images/groom.png'
  }

  const brideContact = {
    role: 'bride',
    name: t('bride_name'),
    label: t('bride'),
    desc: t('bride_desc'),
    tel: t('bride_tel'),
    line: 'https://line.me/ti/p/reiko0404basslove',
    photo: '/images/bride.png'
  }

  return (
    <main className="relative min-h-screen">
      <LanguageSwitcher lng={lang} />
      <Hero lng={lang} />
      <Invitation lng={lang} />
      <Contact groom={groomContact} bride={brideContact} />
      <Gallery lng={lang} />
      <Calendar lng={lang} />
      <LocationMap lng={lang} />
      <RsvpForm lng={lang} />
      <Account lng={lang} />
    </main>
  )
}
