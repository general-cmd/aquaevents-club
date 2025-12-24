#!/bin/bash
cd /home/ubuntu/aquaevents-club

# Function to update a page
update_page() {
  local file=$1
  local basepath=$2
  
  echo "Updating $file..."
  
  # Add FAQSchema after HrefLangTags
  sed -i "s|<HrefLangTags basePath=\"$basepath\" />|<HrefLangTags basePath=\"$basepath\" />\n      <FAQSchema faqs={translations.faqs || []} />|" "$file"
  
  # Remove hardcoded FAQ schema (between /* FAQPage Schema */ and /* BreadcrumbList Schema */)
  perl -i -0pe 's/\s*\/\* FAQPage Schema \*\/.*?<script type="application\/ld\+json">.*?<\/script>\n//s' "$file"
  
  echo "  ✓ $file updated"
}

# Update each page
update_page "client/src/pages/GorrosGamuza.tsx" "/gorros-natacion/gamuza"
update_page "client/src/pages/GorrosPeloLargo.tsx" "/gorros-natacion/pelo-largo"
update_page "client/src/pages/GorrosTela.tsx" "/gorros-natacion/tela"
update_page "client/src/pages/GorrosSilicona.tsx" "/gorros-natacion/silicona"

echo "✓ All pages updated!"
