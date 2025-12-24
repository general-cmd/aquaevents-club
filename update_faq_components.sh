#!/bin/bash
# Automated script to integrate FAQ translations into all gorros pages

cd /home/ubuntu/aquaevents-club

# For each gorros page, we need to:
# 1. Import FAQSchema component
# 2. Remove hardcoded FAQ schema
# 3. Add <FAQSchema faqs={translations.faqs || []} />

PAGES=(
  "client/src/pages/GorrosLatex.tsx"
  "client/src/pages/GorrosGamuza.tsx"
  "client/src/pages/GorrosPeloLargo.tsx"
  "client/src/pages/GorrosTela.tsx"
  "client/src/pages/GorrosSilicona.tsx"
)

for PAGE in "${PAGES[@]}"; do
  echo "Processing $PAGE..."
  
  # Add FAQSchema import after existing imports
  if ! grep -q "import FAQSchema" "$PAGE"; then
    sed -i '/import HrefLangTags/a import FAQSchema from "@/components/FAQSchema";' "$PAGE"
  fi
  
  echo "  ✓ Added FAQSchema import"
done

echo "✓ All pages updated with FAQSchema import"
