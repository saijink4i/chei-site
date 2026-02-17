import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
    title: "Allergy Check",
    description: "Select your allergies to generate a Korean phrase.",
};

export default function AllergyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ja">
            <body>{children}</body>
        </html>
    );
}
