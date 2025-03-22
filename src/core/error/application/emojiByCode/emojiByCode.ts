const emojiByCode: Record<string, string> = {
    "400": "🛑",
    "401": "🔒",
    "403": "⛔",
    "404": "🔍",
    "429": "🐌",
    "500": "💥",
    "Error": "❗",
  };

export const getEmoji = (code: string) => {
    const emoji = emojiByCode[code] || "❗";
    return emoji
}