import { readFileSync, writeFileSync } from 'fs';
import { invokeLLM } from './server/_core/llm.js';

// Read Catalan locale (has all FAQs)
const caLocale = JSON.parse(readFileSync('./client/src/lib/locales/ca.json', 'utf-8'));
const esLocale = JSON.parse(readFileSync('./client/src/lib/locales/es.json', 'utf-8'));
const enLocale = JSON.parse(readFileSync('./client/src/lib/locales/en.json', 'utf-8'));

const pages = ['silicona', 'gamuza', 'peloLargo', 'tela', 'main'];

async function translateFAQs() {
  for (const page of pages) {
    console.log(`\n📝 Translating ${page} FAQs...`);
    
    const caFAQs = caLocale.gorros[page].faqs;
    if (!caFAQs || caFAQs.length === 0) {
      console.log(`⚠️  No Catalan FAQs found for ${page}, skipping`);
      continue;
    }

    // Translate to Spanish
    console.log(`  → Spanish...`);
    const esPrompt = `Translate these swimming cap FAQs from Catalan to Spanish. Return ONLY valid JSON array with same structure:

${JSON.stringify(caFAQs, null, 2)}

Return format: [{"question": "...", "answer": "..."}]`;

    const esResponse = await invokeLLM({
      messages: [
        { role: 'system', content: 'You are a professional translator specializing in swimming equipment. Return only valid JSON.' },
        { role: 'user', content: esPrompt }
      ]
    });

    const esText = esResponse.choices[0].message.content.trim();
    const esFAQs = JSON.parse(esText.replace(/```json\n?/g, '').replace(/```\n?/g, ''));
    esLocale.gorros[page].faqs = esFAQs;
    console.log(`  ✓ Spanish: ${esFAQs.length} FAQs`);

    // Translate to English
    console.log(`  → English...`);
    const enPrompt = `Translate these swimming cap FAQs from Catalan to English. Return ONLY valid JSON array with same structure:

${JSON.stringify(caFAQs, null, 2)}

Return format: [{"question": "...", "answer": "..."}]`;

    const enResponse = await invokeLLM({
      messages: [
        { role: 'system', content: 'You are a professional translator specializing in swimming equipment. Return only valid JSON.' },
        { role: 'user', content: enPrompt }
      ]
    });

    const enText = enResponse.choices[0].message.content.trim();
    const enFAQs = JSON.parse(enText.replace(/```json\n?/g, '').replace(/```\n?/g, ''));
    enLocale.gorros[page].faqs = enFAQs;
    console.log(`  ✓ English: ${enFAQs.length} FAQs`);
  }

  // Fix gamuza translation to "Suede"
  console.log(`\n🔧 Fixing gamuza translation to "Suede"...`);
  if (enLocale.gorros.gamuza) {
    enLocale.gorros.gamuza.heroHeading = enLocale.gorros.gamuza.heroHeading.replace(/Lycra/gi, 'Suede');
    enLocale.gorros.gamuza.pageTitle = enLocale.gorros.gamuza.pageTitle.replace(/Lycra/gi, 'Suede');
    enLocale.gorros.gamuza.metaDescription = enLocale.gorros.gamuza.metaDescription.replace(/lycra/gi, 'suede');
    console.log(`  ✓ Changed "Lycra" to "Suede" in gamuza page`);
  }

  // Write updated files
  writeFileSync('./client/src/lib/locales/es.json', JSON.stringify(esLocale, null, 2));
  writeFileSync('./client/src/lib/locales/en.json', JSON.stringify(enLocale, null, 2));

  console.log(`\n✅ All translations complete!`);
  console.log(`   Spanish: ${pages.length} pages updated`);
  console.log(`   English: ${pages.length} pages updated + gamuza fixed`);
}

translateFAQs().catch(console.error);
