#!/usr/bin/env node
/**
 * Inject translated content into locale files with validation
 */
import fs from 'fs';

function injectTranslations() {
  // Load translations
  const translations = JSON.parse(
    fs.readFileSync('/home/ubuntu/aquaevents-club/translations_output.json', 'utf-8')
  );
  
  const languages = ['ca', 'va', 'eu', 'gl'];
  
  for (const lang of languages) {
    console.log(`\nProcessing ${lang}.json...`);
    
    // Load existing locale file
    const localePath = `/home/ubuntu/aquaevents-club/client/src/lib/locales/${lang}.json`;
    const existingLocale = JSON.parse(fs.readFileSync(localePath, 'utf-8'));
    
    // Get translated content
    const translatedGorros = translations[lang].gorros;
    
    // Transform FAQ arrays into translation keys
    const transformedGorros = {};
    
    for (const [pageKey, pageContent] of Object.entries(translatedGorros)) {
      transformedGorros[pageKey] = { ...pageContent.hero };
      
      // Add FAQ translations if they exist
      if (pageContent.faqs && Array.isArray(pageContent.faqs)) {
        transformedGorros[pageKey].faqs = pageContent.faqs.map((faq, index) => ({
          question: faq.question,
          answer: faq.answer
        }));
      }
    }
    
    // Merge with existing locale
    existingLocale.gorros = transformedGorros;
    
    // Validate structure
    const requiredPages = ['silicona', 'latex', 'gamuza', 'peloLargo', 'tela', 'main'];
    for (const page of requiredPages) {
      if (!existingLocale.gorros[page]) {
        console.error(`✗ Missing page: ${page}`);
        process.exit(1);
      }
      if (!existingLocale.gorros[page].heroHeading) {
        console.error(`✗ Missing heroHeading for ${page}`);
        process.exit(1);
      }
    }
    
    // Save updated locale file
    fs.writeFileSync(
      localePath,
      JSON.stringify(existingLocale, null, 2) + '\n',
      'utf-8'
    );
    
    console.log(`✓ ${lang}.json updated successfully`);
    console.log(`  - ${requiredPages.length} pages translated`);
    
    // Count FAQs
    let faqCount = 0;
    for (const page of requiredPages) {
      if (existingLocale.gorros[page].faqs) {
        faqCount += existingLocale.gorros[page].faqs.length;
      }
    }
    console.log(`  - ${faqCount} FAQs translated`);
  }
  
  console.log('\n✓ All locale files updated successfully!');
}

try {
  injectTranslations();
} catch (error) {
  console.error('Fatal error:', error);
  process.exit(1);
}
