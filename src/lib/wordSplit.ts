/**
 * Split text into words while preserving whitespace as separate tokens.
 * Used by HeroSection for the word-by-word reveal that wraps each non-space
 * token in a `.word > .word-inner` pair for GSAP staggered translateY.
 */
export function splitIntoWords(text: string): string[] {
  return text.split(/(\s+)/).filter(Boolean);
}

export function isWhitespace(token: string): boolean {
  return /^\s+$/.test(token);
}
