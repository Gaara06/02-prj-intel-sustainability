// This script checks if the page language is a right-to-left language
// and sets the direction to RTL if needed. It works with Google Translate
// and manual lang changes.

// List of RTL language codes
const rtlLangs = [
  'ar', // Arabic
  'he', // Hebrew
  'fa', // Persian
  'ur', // Urdu
  'ps', // Pashto
  'dv', // Divehi
  'ku', // Kurdish
  'yi', // Yiddish
];

// Function to check and apply RTL direction
function applyRTLIfNeeded() {
  // Get the current language from the <html> tag or Google Translate
  const html = document.documentElement;
  let lang = html.getAttribute('lang') || '';

  // Google Translate may add a class like 'translated-ltr' or 'translated-rtl'
  const isGoogleRTL = html.classList.contains('translated-rtl');

  // Check if the language is in the RTL list or Google Translate set RTL
  const shouldBeRTL =
    rtlLangs.some(code => lang.startsWith(code)) || isGoogleRTL;

  // Set dir attribute accordingly
  if (shouldBeRTL) {
    html.setAttribute('dir', 'rtl');
    document.body.setAttribute('dir', 'rtl');
  } else {
    html.setAttribute('dir', 'ltr');
    document.body.setAttribute('dir', 'ltr');
  }
}

// Run on page load
applyRTLIfNeeded();

// Also observe for changes to <html lang> or Google Translate classes
const observer = new MutationObserver(applyRTLIfNeeded);
observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['lang', 'class'],
});

