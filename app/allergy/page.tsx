"use strict";
"use client";

import { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";

const CATEGORIZED_ALLERGENS = [
    {
        category: "畜産品",
        items: [
            { ja: "卵", ko: "계란" },
            { ja: "乳", ko: "우유" },
            { ja: "牛肉", ko: "소고기" },
            { ja: "鶏肉", ko: "닭고기" },
            { ja: "豚肉", ko: "돼지고기" },
        ],
    },
    {
        category: "穀物",
        items: [
            { ja: "小麦", ko: "밀" },
            { ja: "そば", ko: "메밀" },
            { ja: "ごま", ko: "참깨" },
            { ja: "大豆", ko: "대두" },
        ],
    }, {
        category: "魚介類",
        items: [
            { ja: "えび", ko: "새우" },
            { ja: "かに", ko: "게" },
            { ja: "あわび", ko: "전복" },
            { ja: "いか", ko: "오징어" },
            { ja: "いくら", ko: "이쿠라" },
            { ja: "さけ", ko: "연어" },
            { ja: "さば", ko: "고등어" },
            { ja: "その他貝類", ko: "조개류" },
        ],
    },
    {
        category: "ナッツ類",
        items: [
            { ja: "落花生", ko: "땅콩" },
            { ja: "くるみ", ko: "호두" },
            { ja: "アーモンド", ko: "아몬드" },
            { ja: "カシューナッツ", ko: "캐슈넛" },
            { ja: "ピスタチオ", ko: "피스타치오" },
            { ja: "マカダミアナッツ", ko: "마카다미아" },
            { ja: "ヘーゼルナッツ", ko: "헤이즐넛" },
        ],
    },

    {
        category: "果物",
        items: [
            { ja: "オレンジ", ko: "오렌지" },
            { ja: "キウイフルーツ", ko: "키위" },
            { ja: "バナナ", ko: "바나나" },
            { ja: "パイナップル", ko: "파인애플" },
            { ja: "もも", ko: "복숭아" },
            { ja: "りんご", ko: "사과" },
            { ja: "なし", ko: "배" },
        ],
    },
    {
        category: "その他",
        items: [
            { ja: "まつたけ", ko: "송이버섯" },
            { ja: "やまいも", ko: "마" },
            { ja: "ゼラチン", ko: "젤라틴" },
        ],
    },
];

const ChevronDown = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="m6 9 6 6 6-6" />
    </svg>
);

export default function AllergyPage() {
    const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
    const [openCategories, setOpenCategories] = useState<string[]>([]);
    const [isCopied, setIsCopied] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("selectedAllergies");
        if (stored) {
            setSelectedAllergies(JSON.parse(stored));
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("selectedAllergies", JSON.stringify(selectedAllergies));
        }
    }, [selectedAllergies, isLoaded]);

    const toggleAllergy = (allergen: string) => {
        setSelectedAllergies((prev) =>
            prev.includes(allergen)
                ? prev.filter((a) => a !== allergen)
                : [...prev, allergen]
        );
    };

    const toggleCategory = (category: string) => {
        setOpenCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    const generateSentence = () => {
        if (selectedAllergies.length === 0) return "";
        const allItems = CATEGORIZED_ALLERGENS.flatMap((c) => c.items);
        const allergyList = selectedAllergies
            .map((ja) => allItems.find((a) => a.ja === ja)?.ko || ja)
            .join(", ");
        return `저는 ${allergyList}에 알레르기가 있습니다. 해당 음식에 위 재료가 들어가 있나요?`;
    };

    const generateJapaneseSentence = () => {
        if (selectedAllergies.length === 0) return "";
        const allergyList = selectedAllergies.join("、");
        return `私は ${allergyList} アレルギーがあります。この料理にこれらが含まれていますか？`;
    };

    const copyToClipboard = () => {
        const text = generateSentence();
        if (!text) return;
        navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">
                アレルギーチェックシート
            </h1>

            <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md mb-6">
                <p className="mb-4 text-gray-600">
                    ご自身がアレルギーをお持ちの食材を選択してください。<br />
                    選択した食材が入っているか確認する文章が韓国語で表示されますので店員に尋ねてください。
                </p>
                <div className="space-y-4">
                    {CATEGORIZED_ALLERGENS.map((category) => {
                        const isOpen = openCategories.includes(category.category);
                        const selectedCount = category.items.filter(item => selectedAllergies.includes(item.ja)).length;

                        return (
                            <div key={category.category} className="border rounded-lg overflow-hidden">
                                <button
                                    onClick={() => toggleCategory(category.category)}
                                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-gray-700">{category.category}</span>
                                        {selectedCount > 0 && (
                                            <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full font-medium">
                                                {selectedCount}
                                            </span>
                                        )}
                                    </div>
                                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                                </button>

                                {isOpen && (
                                    <div className="p-4 border-t bg-white">
                                        <div className="grid grid-cols-2 gap-3">
                                            {category.items.map((allergen) => (
                                                <button
                                                    key={allergen.ja}
                                                    onClick={() => toggleAllergy(allergen.ja)}
                                                    className={`p-3 rounded-lg border text-left transition-colors ${selectedAllergies.includes(allergen.ja)
                                                        ? "bg-blue-100 border-blue-500 text-blue-700 font-medium"
                                                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                                                        }`}
                                                >
                                                    {allergen.ja}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md sticky bottom-6">
                <h2 className="text-lg font-semibold mb-2 text-gray-800">
                    韓国語フレーズ
                </h2>
                <div className="bg-gray-100 p-4 rounded-lg min-h-[80px] flex flex-col items-center justify-center text-center text-gray-800 font-medium mb-4 gap-2">
                    {selectedAllergies.length > 0 ? (
                        <>
                            <p className="text-lg">{generateSentence()}</p>
                            <p className="text-sm text-gray-500 border-t border-gray-300 pt-2 mt-1 w-full">
                                {generateJapaneseSentence()}
                            </p>
                        </>
                    ) : (
                        "食材を選択するとここに表示されます"
                    )}
                </div>
                <button
                    onClick={copyToClipboard}
                    disabled={selectedAllergies.length === 0}
                    className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 font-bold transition-colors ${selectedAllergies.length > 0
                        ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                >
                    {isCopied ? <Check size={20} /> : <Copy size={20} />}
                    {isCopied ? "コピーしました！" : "コピーする"}
                </button>
            </div>
        </div>
    );
}
