#!/usr/bin/env python3
"""
Batch translate gorros content to Catalan, Valencian, Basque, and Galician using LLM
"""
import json
import sys
import os
import requests

# Use Manus built-in LLM API
API_URL = os.getenv('BUILT_IN_FORGE_API_URL', 'https://api.manus.im')
API_KEY = os.getenv('BUILT_IN_FORGE_API_KEY', '')

def invokeLLM(params):
    """Call Manus LLM API"""
    response = requests.post(
        f"{API_URL}/llm/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        },
        json=params
    )
    response.raise_for_status()
    return response.json()

def translate_to_language(content_json, target_language, language_code):
    """Translate entire JSON structure to target language"""
    
    prompt = f"""You are a professional translator specializing in technical product descriptions for swimming equipment.

Translate the following JSON content from English to {target_language}.

IMPORTANT RULES:
1. Maintain ALL JSON structure exactly - do not change keys, only translate values
2. Keep technical terms accurate (e.g., "50GMS", "FINA", "hypoallergenic")
3. Keep brand names unchanged (e.g., "AquaEvents.club", "EuroSwimCaps")
4. Keep prices in euros (€) unchanged
5. Translate naturally for native {target_language} speakers
6. Keep URLs and email addresses unchanged
7. Maintain capitalization style (e.g., "CUSTOM LATEX SWIMMING CAPS" stays all caps)
8. For SEO meta descriptions, keep under 160 characters
9. Return ONLY valid JSON, no explanations

Context: This is for swimming cap product pages targeting clubs and federations in Spain.

Source JSON:
{json.dumps(content_json, ensure_ascii=False, indent=2)}

Return the complete translated JSON maintaining exact structure:"""

    response = invokeLLM({
        "messages": [
            {"role": "system", "content": f"You are a professional translator for technical swimming product content. Translate to {target_language} maintaining SEO best practices."},
            {"role": "user", "content": prompt}
        ],
        "response_format": {
            "type": "json_schema",
            "json_schema": {
                "name": "translated_content",
                "strict": True,
                "schema": {
                    "type": "object",
                    "properties": {
                        "gorros": {
                            "type": "object",
                            "additionalProperties": True
                        }
                    },
                    "required": ["gorros"],
                    "additionalProperties": False
                }
            }
        }
    })
    
    translated_text = response['choices'][0]['message']['content']
    return json.loads(translated_text)

def main():
    # Load master translation file
    with open('/home/ubuntu/aquaevents-club/translation_master.json', 'r', encoding='utf-8') as f:
        master_content = json.load(f)
    
    languages = [
        ("Catalan", "ca"),
        ("Valencian", "va"),
        ("Basque", "eu"),
        ("Galician", "gl")
    ]
    
    translations = {}
    
    for lang_name, lang_code in languages:
        print(f"Translating to {lang_name} ({lang_code})...")
        try:
            translated = translate_to_language(master_content, lang_name, lang_code)
            translations[lang_code] = translated
            print(f"✓ {lang_name} translation complete")
        except Exception as e:
            print(f"✗ Error translating to {lang_name}: {e}")
            sys.exit(1)
    
    # Save all translations
    with open('/home/ubuntu/aquaevents-club/translations_output.json', 'w', encoding='utf-8') as f:
        json.dump(translations, f, ensure_ascii=False, indent=2)
    
    print("\n✓ All translations saved to translations_output.json")

if __name__ == "__main__":
    main()
