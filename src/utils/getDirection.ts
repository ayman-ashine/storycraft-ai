export function getDirection(text: string | null | undefined): "ltr" | "rtl" {
    if (!text) return "ltr";
    const rtlRegex = /^[\u0600-\u06FF\u0750-\u077F\u0590-\u05FF]/;
    return rtlRegex.test(text.trim().charAt(0)) ? "rtl" : "ltr";
};