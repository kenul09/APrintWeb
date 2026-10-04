// Single source for company contact details — used by the contact page,
// the footer, the mobile contact bar and the LocalBusiness JSON-LD.
// Working hours text is translated (contact.hours in i18n); the
// machine-readable version below must be kept in sync with it.
export const CONTACT = {
  phoneDisplay: "+994 55 750 55 33",
  phoneHref: "tel:+994557505533",
  phoneE164: "+994557505533",
  whatsappHref: "https://wa.me/994557505533",
  // TODO(A Print): confirm the official email address (currently mail.ru).
  email: "asadov_78@mail.ru",
  address: "Əlövsət Quliyev küçəsi, 140, Bakı, Nəsimi, Azərbaycan",
  // Shorter form for tight spots (footer).
  addressShort: "Əlövsət Quliyev küçəsi 140, Nəsimi, Bakı",
  streetAddress: "Əlövsət Quliyev küçəsi 140",
  addressLocality: "Bakı",
  addressRegion: "Nəsimi",
  addressCountry: "AZ",
  // TODO(A Print): exact coordinates of the shop. Left empty rather than
  // guessed — JSON-LD omits `geo` until these are filled in.
  geo: null, // e.g. { latitude: 40.0, longitude: 49.0 }
  // TODO(A Print): confirm — "B.e – C.a" in contact.hours reads as
  // Monday–Thursday. schema.org day names.
  openingHours: [{ days: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "09:00", closes: "21:00" }],
};

CONTACT.mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`;
CONTACT.mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(CONTACT.address)}&output=embed`;

export const SOCIAL = {
  instagram: "https://www.instagram.com/a_print_poliqrafiya/",
  // TODO(A Print): real Facebook page URL — this is only the Facebook homepage.
  facebook: "https://www.facebook.com/",
};
