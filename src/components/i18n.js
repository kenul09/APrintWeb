import i18n from "i18next";
import { initReactI18next } from "react-i18next";

/* SAFE STORAGE */
function getSavedLang() {
  try {
    return typeof window !== "undefined"
      ? localStorage.getItem("lang")
      : null;
  } catch {
    return null;
  }
}

/* SAFE NAVIGATOR */
function getBrowserLang() {
  if (typeof navigator === "undefined") return "az";

  const lang = navigator.language?.split("-")[0];
  return ["az", "en", "ru"].includes(lang) ? lang : "az";
}

const savedLang = getSavedLang();

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        nav: {
          products: "Products",
          services: "Services",
          portfolio: "Portfolio",
          blog: "Blog",
          about: "About",
          contact: "Contact",
          order: "Order Now",
        },
        footer: {
          home: "Home",
          pricing: "Pricing",
          services: "Services",
          contact: "Contact",
          address: "Baku, Azerbaijan",
          workingHours: "09:00 — 21:00",
        },
      },
    },

    az: {
      translation: {
        nav: {
          products: "Məhsullar",
          services: "Xidmətlər",
          portfolio: "Portfolio",
          blog: "Bloq",
          about: "Haqqımızda",
          contact: "Əlaqə",
          order: "Sifariş et",
        },
        footer: {
          home: "Ana səhifə",
          pricing: "Qiymətlər",
          services: "Xidmətlər",
          contact: "Əlaqə",
          address: "Bakı, Azərbaycan",
          workingHours: "09:00 — 21:00",
        },
      },
    },

    ru: {
      translation: {
        nav: {
          products: "Продукты",
          services: "Услуги",
          portfolio: "Портфолио",
          blog: "Блог",
          about: "О нас",
          contact: "Контакты",
          order: "Заказать",
        },
        footer: {
          home: "Главная",
          pricing: "Цены",
          services: "Услуги",
          contact: "Контакты",
          address: "Баку, Азербайджан",
          workingHours: "09:00 — 21:00",
        },
      },
    },
  },

  lng: savedLang || getBrowserLang(),

  fallbackLng: "en",

  supportedLngs: ["az", "en", "ru"],

  interpolation: {
    escapeValue: false,
  },

  returnNull: false,
  returnEmptyString: false,
});

export default i18n;
