# Changelog

## 2025-12-24 - Multilingual FAQ Implementation

### Added
- ✅ Hero sections translated in 6 languages (Spanish, English, Catalan, Valencian, Basque, Galician)
- ✅ FAQs translated for all 6 gorros pages (Silicona, Látex, Gamuza, Pelo Largo, Tela, Main)
- ✅ 10 FAQs per page × 6 languages = 360 total FAQ entries
- ✅ FAQPage schema markup for Google rich snippets in all 6 languages
- ✅ FAQSchema component for dynamic multilingual schema generation
- ✅ Dynamic FAQ rendering from translation files

### Fixed
- ✅ i18n language detection now prioritizes URL query parameter (?lang=xx) over localStorage
- ✅ English FAQs added for all pages (was missing initially)
- ✅ Catalan, Valencian, Basque, and Galician FAQs batch-translated and injected

### SEO Impact
- Featured snippets potential in 6 markets
- Multilingual FAQ rich results for Google search
- Long-tail keyword targeting across all languages
- Improved SERP visibility for question-based searches

### Technical Details
- Modified `client/src/lib/i18n.ts` to add querystring detection
- Created `client/src/components/FAQSchema.tsx` for schema generation
- Updated all 6 gorros pages to use dynamic FAQ rendering
- Batch translation using LLM for 4 new languages (ca, va, eu, gl)
- Manual English translation for quality assurance
