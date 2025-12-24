#!/usr/bin/env node
/**
 * Batch translate gorros content page by page to avoid token limits
 */
import fs from 'fs';
import { invokeLLM } from './server/_core/llm.ts';

async function translatePage(pageContent, pageName, targetLanguage, languageCode) {
  console.log(`  Translating ${pageName} to ${targetLanguage}...`);
  
  const prompt = `Translate this swimming cap product page content from English to ${targetLanguage}.

RULES:
1. Keep JSON structure exactly the same
2. Keep technical terms: "50GMS", "FINA", "hypoallergenic", "€"
3. Keep brand names: "AquaEvents.club"
4. Translate naturally for ${targetLanguage} speakers
5. Keep ALL CAPS style for headings
6. Meta descriptions under 160 characters
7. Return ONLY valid JSON

Content to translate:
${JSON.stringify(pageContent, null, 2)}`;

  const response = await invokeLLM({
    messages: [
      { role: "system", content: `Professional translator for swimming product pages. Target language: ${targetLanguage}.` },
      { role: "user", content: prompt }
    ]
  });
  
  const translatedText = response.choices[0].message.content;
  // Extract JSON from response (might have markdown code blocks)
  const jsonMatch = translatedText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error(`No JSON found in response for ${pageName}`);
  }
  return JSON.parse(jsonMatch[0]);
}

async function main() {
  // Load master translation file
  const masterContent = JSON.parse(
    fs.readFileSync('/home/ubuntu/aquaevents-club/translation_master.json', 'utf-8')
  );
  
  const languages = [
    ["Catalan", "ca"],
    ["Valencian", "va"],
    ["Basque", "eu"],
    ["Galician", "gl"]
  ];
  
  const allTranslations = {};
  
  for (const [langName, langCode] of languages) {
    console.log(`\nTranslating to ${langName} (${langCode})...`);
    allTranslations[langCode] = { gorros: {} };
    
    // Translate each page separately
    for (const [pageName, pageContent] of Object.entries(masterContent.gorros)) {
      try {
        const translated = await translatePage(pageContent, pageName, langName, langCode);
        allTranslations[langCode].gorros[pageName] = translated;
        console.log(`    ✓ ${pageName} complete`);
      } catch (error) {
        console.error(`    ✗ Error translating ${pageName}:`, error.message);
        process.exit(1);
      }
    }
    
    console.log(`✓ ${langName} translation complete (${Object.keys(allTranslations[langCode].gorros).length} pages)`);
  }
  
  // Save all translations
  fs.writeFileSync(
    '/home/ubuntu/aquaevents-club/translations_output.json',
    JSON.stringify(allTranslations, null, 2),
    'utf-8'
  );
  
  console.log('\n✓ All translations saved to translations_output.json');
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
