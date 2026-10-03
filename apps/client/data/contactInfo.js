// Single source for company contact details — used by the contact page and
// the site footer. Working hours are translated (contact.hours in i18n).
export const CONTACT = {
  phoneDisplay: "+994 55 750 55 33",
  phoneHref: "tel:+994557505533",
  whatsappHref: "https://wa.me/994557505533",
  email: "asadov_78@mail.ru",
  address: "Əlövsət Quliyev küçəsi, 140, Bakı, Nəsimi, Azərbaycan",
  // Shorter form for tight spots (footer).
  addressShort: "Əlövsət Quliyev küçəsi 140, Nəsimi, Bakı",
};

CONTACT.mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`;

export const SOCIAL = {
  instagram: "https://www.instagram.com/a_print_poliqrafiya/",
  // TODO: real Facebook page URL — this is only the Facebook homepage.
  facebook: "https://www.facebook.com/",
};
