import { getGoogleSheetsClient } from '@/lib/google-sheets'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, attendance, guests, message, email, phone, countryCode } = body

        const formattedPhone = `'${countryCode} ${phone}`
        const formattedEmail = email

        const sheets = await getGoogleSheetsClient()
        const spreadsheetId = process.env.GOOGLE_SHEET_ID

        if (!spreadsheetId) {
            return NextResponse.json({ error: 'Spreadsheet ID missing' }, { status: 500 })
        }

        const now = new Date()
        const date = new Intl.DateTimeFormat('ko-KR', {
            timeZone: 'Asia/Seoul',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(now)
        const time = new Intl.DateTimeFormat('ko-KR', {
            timeZone: 'Asia/Seoul',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).format(now)

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: 'Sheet1!A:H',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [
                    [date, time, name, formattedPhone, formattedEmail, attendance, guests, message]
                ],
            },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('RSVP Error:', error)
        return NextResponse.json({
            error: error instanceof Error ? error.message : 'Internal Server Error'
        }, { status: 500 })
    }
}
