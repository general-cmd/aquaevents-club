#!/usr/bin/env node
/**
 * Batch translate gorros content to Catalan, Valencian, Basque, and Galician using LLM
 */
import fs from 'fs';
import { invokeLLM } from './server/_core/llm.ts';

async function translateToLanguage(contentJson, targetLanguage, languageCode) {
  console.log(`Translating to ${targetLanguage} (${languageCode})...`);
  
  const prompt = `You are a professional translator specializing in technical product descriptions for swimming equipment.

Translate the following JSON content from English to ${targetLanguage}.

IMPORTANT RULES:
1. Maintain ALL JSON structure exactly - do not change keys, only translate values
2. Keep technical terms accurate (e.g., "50GMS", "FINA", "hypoallergenic")
3. Keep brand names unchanged (e.g., "AquaEvents.club", "EuroSwimCaps")
4. Keep prices in euros (€) unchanged
5. Translate naturally for native ${targetLanguage} speakers
6. Keep URLs and email addresses unchanged
7. Maintain capitalization style (e.g., "CUSTOM LATEX SWIMMING CAPS" stays all caps)
8. For SEO meta descriptions, keep under 160 characters
9. Return ONLY valid JSON, no explanations

Context: This is for swimming cap product pages targeting clubs and federations in Spain.

Source JSON:
${JSON.stringify(contentJson, null, 2)}

Return the complete translated JSON maintaining exact structure:`;

  const response = await invokeLLM({
    messages: [
      { role: "system", content: `You are a professional translator for technical swimming product content. Translate to ${targetLanguage} maintaining SEO best practices.` },
      { role: "user", content: prompt }
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "translated_content",
        strict: true,
        schema: {
          type: "object",
          properties: {
            gorros: {
              type: "object",
              additionalProperties: true
            }
          },
          required: ["gorros"],
          additionalProperties: false
        }
      }
    }
  });
  
  const translatedText = response.choices[0].message.content;
  return JSON.parse(translatedText);
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
  
  const translations = {};
  
  for (const [langName, langCode] of languages) {
    try {
      const translated = await translateToLanguage(masterContent, langName, langCode);
      translations[langCode] = translated;
      console.log(`✓ ${langName} translation complete`);
    } catch (error) {
      console.error(`✗ Error translating to ${langName}:`, error.message);
      process.exit(1);
    }
  }
  
  // Save all translations
  fs.writeFileSync(
    '/home/ubuntu/aquaevents-club/translations_output.json',
    JSON.stringify(translations, null, 2),
    'utf-8'
  );
  
  console.log('\n✓ All translations saved to translations_output.json');
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
