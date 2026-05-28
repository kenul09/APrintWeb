import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  az: {
    translation: {
      // Navbar
      "nav.products": "Məhsullar",
      "nav.portfolio": "Portfolio",
      "nav.services": "Xidmətlərimiz",
      "nav.about": "Haqqımızda",
      "nav.contact": "Əlaqə",
      "nav.order": "Sifariş ver",

      // Footer
      "footer.pages": "Səhifələr",
      "footer.home": "Ana səhifə",
      "footer.services": "Xidmətlər",
      "footer.blog": "Blog",
      "footer.contact": "Əlaqə",
      "footer.rights": "Bütün hüquqlar qorunur.",

      // Home
      "home.hero.line1": "Brendinizi",
      "home.hero.line2": "Canlandırın",
      "home.stats.clients": "Müştəri",
      "home.stats.products": "Məhsul",
      "home.stats.delivery": "Çatdırılma",
      "home.stats.rating": "Reytinq",
      "home.partners.title": "Partnyorlarımız",
      "home.partners.sub": "Bizimlə işləyən brendlər",

      // About
      "about.label": "Haqqımızda",
      "about.hero.line1": "2015-dən bəri",
      "about.hero.line2": "Bakıda çap",
      "about.hero.desc":
        "A_Print olaraq 2015-ci ildən bəri Azərbaycanda yüzlərlə şirkətə peşəkar çap xidməti göstəririk.",
      "about.stats.founded": "Quruluş ili",
      "about.stats.clients": "Müştəri",
      "about.stats.team": "Komanda üzvü",
      "about.stats.products": "Məhsul növü",
      "about.story.title": "Bizim Hekayəmiz",
      "about.story.p1":
        "2015-ci ildə kiçik bir studiya kimi başladıq. Bu gün Bakının ən böyük rəqəmsal çap mərkəzlərindən birinə çevrildik.",
      "about.story.p2": "Hər sifarişə fərdi yanaşırıq, keyfiyyətsiz iş buraxmırıq.",
      "about.team.label": "Komandamız",

      // Contact
      "contact.label": "Əlaqə",
      "contact.title": "Bizimlə əlaqə",
      "contact.desc": "Sifariş vermək və ya sual vermək üçün formu doldurun.",
      "contact.name": "Ad Soyad",
      "contact.email": "Email",
      "contact.phone": "Telefon",
      "contact.service": "Xidmət",
      "contact.service.placeholder": "Xidmət seçin",
      "contact.message": "Mesaj",
      "contact.message.placeholder": "Sifariş detallarını yazın...",
      "contact.send": "GÖNDƏR →",
      "contact.success.title": "Mesaj göndərildi!",
      "contact.success.desc":
        "Müraciətiniz qeydə alındı. Tezliklə sizinlə əlaqə saxlayacağıq.",
      "contact.error.required": "Zəhmət olmasa bütün vacib sahələri doldurun.",
      "contact.error.email": "Email formatı düzgün deyil.",
      "contact.info.title": "Əlaqə məlumatları",
      "contact.info.address": "Ünvan",
      "contact.info.address.value": "Bakı, Sahil m/s yaxınlığı",
      "contact.info.phone": "Telefon",
      "contact.info.email": "Email",
      "contact.info.hours": "İş saatları",
      "contact.info.hours.value": "B.e – C.a: 09:00 – 21:00",
      "contact.whatsapp.title": "Sürətli cavab",
      "contact.whatsapp.desc":
        "Suallarınız üçün WhatsApp-da da əlaqə saxlaya bilərsiniz. Adətən 15 dəqiqə ərzində cavab veririk.",

      // Portfolio
      "portfolio.label": "İşlərimiz",
      "portfolio.title": "Portfolio",
      "portfolio.desc": "Müştərilərimiz üçün hazırladığımız işlərin seçmələri.",
      "portfolio.filter.all": "Hamısı",

      // Services
      "services.label": "Xidmətlər",
      "services.title": "Dizayn Xidmətləri",
      "services.desc":
        "Logo, brend paketi və çap materialları üzrə peşəkar dizayn xidmətləri.",
      "services.order": "Sifariş ver →",
      "services.popular": "ƏN POPULYAR",
    },
  },

  en: {
    translation: {
      "nav.products": "Products",
      "nav.portfolio": "Portfolio",
      "nav.services": "Services",
      "nav.about": "About",
      "nav.contact": "Contact",
      "nav.order": "Order Now",

      "footer.pages": "Pages",
      "footer.home": "Home",
      "footer.services": "Services",
      "footer.blog": "Blog",
      "footer.contact": "Contact",
      "footer.rights": "All rights reserved.",

      "home.hero.line1": "Bring Your",
      "home.hero.line2": "Brand to Life",
      "home.stats.clients": "Clients",
      "home.stats.products": "Products",
      "home.stats.delivery": "Delivery",
      "home.stats.rating": "Rating",
      "home.partners.title": "Our Partners",
      "home.partners.sub": "Brands that work with us",

      "about.label": "About Us",
      "about.hero.line1": "Printing in",
      "about.hero.line2": "Baku since 2015",
      "about.hero.desc":
        "Since 2015, A_Print has provided professional printing services to hundreds of companies in Azerbaijan.",
      "about.stats.founded": "Founded",
      "about.stats.clients": "Clients",
      "about.stats.team": "Team members",
      "about.stats.products": "Product types",
      "about.story.title": "Our Story",
      "about.story.p1":
        "We started as a small studio in 2015. Today we are one of the largest digital print centers in Baku.",
      "about.story.p2": "We approach each order individually and never compromise on quality.",
      "about.team.label": "Our Team",

      "contact.label": "Contact",
      "contact.title": "Get in touch",
      "contact.desc": "Fill out the form to place an order or ask a question.",
      "contact.name": "Full Name",
      "contact.email": "Email",
      "contact.phone": "Phone",
      "contact.service": "Service",
      "contact.service.placeholder": "Select a service",
      "contact.message": "Message",
      "contact.message.placeholder": "Enter order details...",
      "contact.send": "SEND →",
      "contact.success.title": "Message sent!",
      "contact.success.desc":
        "Your request has been recorded. We will contact you shortly.",
      "contact.error.required": "Please fill in all required fields.",
      "contact.error.email": "Invalid email format.",
      "contact.info.title": "Contact Info",
      "contact.info.address": "Address",
      "contact.info.address.value": "Baku, near Sahil metro",
      "contact.info.phone": "Phone",
      "contact.info.email": "Email",
      "contact.info.hours": "Working hours",
      "contact.info.hours.value": "Mon – Sat: 09:00 – 21:00",
      "contact.whatsapp.title": "Quick reply",
      "contact.whatsapp.desc":
        "You can also reach us via WhatsApp. We usually reply within 15 minutes.",

      "portfolio.label": "Our Work",
      "portfolio.title": "Portfolio",
      "portfolio.desc": "Selected works created for our clients.",
      "portfolio.filter.all": "All",

      "services.label": "Services",
      "services.title": "Design Services",
      "services.desc": "Professional design services for logos, brand packages and print materials.",
      "services.order": "Order →",
      "services.popular": "MOST POPULAR",
    },
  },

  ru: {
    translation: {
      "nav.products": "Продукты",
      "nav.portfolio": "Портфолио",
      "nav.services": "Услуги",
      "nav.about": "О нас",
      "nav.contact": "Контакт",
      "nav.order": "Заказать",

      "footer.pages": "Страницы",
      "footer.home": "Главная",
      "footer.services": "Услуги",
      "footer.blog": "Блог",
      "footer.contact": "Контакт",
      "footer.rights": "Все права защищены.",

      "home.hero.line1": "Оживите",
      "home.hero.line2": "Ваш Бренд",
      "home.stats.clients": "Клиентов",
      "home.stats.products": "Продуктов",
      "home.stats.delivery": "Доставка",
      "home.stats.rating": "Рейтинг",
      "home.partners.title": "Наши Партнёры",
      "home.partners.sub": "Бренды, которые работают с нами",

      "about.label": "О нас",
      "about.hero.line1": "Печать в Баку",
      "about.hero.line2": "с 2015 года",
      "about.hero.desc":
        "С 2015 года A_Print оказывает профессиональные услуги печати сотням компаний в Азербайджане.",
      "about.stats.founded": "Год основания",
      "about.stats.clients": "Клиентов",
      "about.stats.team": "Членов команды",
      "about.stats.products": "Видов продуктов",
      "about.story.title": "Наша История",
      "about.story.p1":
        "В 2015 году мы начинали как небольшая студия. Сегодня мы один из крупнейших центров цифровой печати в Баку.",
      "about.story.p2":
        "К каждому заказу мы подходим индивидуально и никогда не идём на компромисс с качеством.",
      "about.team.label": "Наша Команда",

      "contact.label": "Контакт",
      "contact.title": "Свяжитесь с нами",
      "contact.desc": "Заполните форму, чтобы сделать заказ или задать вопрос.",
      "contact.name": "Имя и Фамилия",
      "contact.email": "Email",
      "contact.phone": "Телефон",
      "contact.service": "Услуга",
      "contact.service.placeholder": "Выберите услугу",
      "contact.message": "Сообщение",
      "contact.message.placeholder": "Введите детали заказа...",
      "contact.send": "ОТПРАВИТЬ →",
      "contact.success.title": "Сообщение отправлено!",
      "contact.success.desc":
        "Ваш запрос зарегистрирован. Мы свяжемся с вами в ближайшее время.",
      "contact.error.required": "Пожалуйста, заполните все обязательные поля.",
      "contact.error.email": "Неверный формат email.",
      "contact.info.title": "Контактная информация",
      "contact.info.address": "Адрес",
      "contact.info.address.value": "Баку, рядом с м. Сахиль",
      "contact.info.phone": "Телефон",
      "contact.info.email": "Email",
      "contact.info.hours": "Часы работы",
      "contact.info.hours.value": "Пн – Сб: 09:00 – 21:00",
      "contact.whatsapp.title": "Быстрый ответ",
      "contact.whatsapp.desc":
        "Вы также можете связаться с нами через WhatsApp. Обычно отвечаем в течение 15 минут.",

      "portfolio.label": "Наши работы",
      "portfolio.title": "Портфолио",
      "portfolio.desc": "Избранные работы, созданные для наших клиентов.",
      "portfolio.filter.all": "Все",

      "services.label": "Услуги",
      "services.title": "Дизайн-услуги",
      "services.desc": "Профессиональные услуги дизайна логотипов, брендинга и печатных материалов.",
      "services.order": "Заказать →",
      "services.popular": "САМЫЙ ПОПУЛЯРНЫЙ",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: (() => {
    try {
      return localStorage.getItem("lang") || "az";
    } catch {
      return "az";
    }
  })(),
  fallbackLng: "az",
  interpolation: { escapeValue: false },
});

export default i18n;