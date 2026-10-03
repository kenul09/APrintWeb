export const translations = {
  az: {
    nav: { home: 'Ana Səhifə', about: 'Haqqımızda', products: 'Məhsullar', portfolio: 'Portfolio', contact: 'Əlaqə' },
    langNames: { az: 'Azərbaycan', en: 'İngilis dili', ru: 'Rus dili' },
    hero: {
      line1: 'Brendinizi',
      line2: 'canlandırın',
      words: ['Vizit kart', 'Flayer', 'Banner', 'Stiker', 'Roll-up', 'Qablaşdırma'],
      description: 'Vizit kartdan bannerə qədər bütün çap işlərinizi yüksək keyfiyyətlə və 24 saat ərzində hazırlayırıq.',
      button: 'Məhsullar →',
      statLabel: 'məmnun müştəri'
    },
    works: {
      title: 'Son işlərimiz',
      viewAll: 'Hamısına bax →'
    },
    stats: { customers: 'Müştəri', products: 'Məhsul növü', delivery: 'Çatdırılma', rating: 'Reytinq', experience: 'Təcrübə', yearsUnit: { one: 'il', other: 'il' }, team: 'Komanda üzvü' },
    partners: { title: 'Partnyorlarımız', subtitle: 'Bizimlə işləyən brendlər' },
    products: { title: 'Məhsullar', cardCta: 'Sifariş ver →', intro: 'Gündəlik çap işlərindən brendli promo məhsullara qədər geniş seçim.', priceListTitle: 'Qiymətlər', itemsUnit: { one: 'istiqamət', other: 'istiqamət' } },
    portfolio: { badge: 'İşlərimiz', title: 'Portfolio', intro: 'Müştərilərimiz üçün hazırladığımız işlərin seçmələri.', all: 'Hamısı' },
    about: {
      badge: 'Haqqımızda',
      // "-dən" here and "-cü" in p1 are the suffixes for {year} = 2003;
      // check them if FOUNDED_YEAR in data/siteStats.js changes.
      heroLine1: '{year}-dən Bakıda',
      // heroLine2 is a template: {word} rotates through heroWords.
      heroLine2: '{word} çap',
      heroWords: ['sürətli', 'keyfiyyətli', 'etibarlı'],
      heroSr: '{year}-dən Bakıda sürətli, keyfiyyətli və etibarlı çap',
      deck: {
        businessCard: { name: 'Vizit kart', spec: '50 ədəddən' },
        rollup: { name: 'Roll-up', spec: '85×200 sm' },
        menu: { name: 'Menyu', spec: 'Laminasiyalı' },
        sticker: { name: 'Stiker', spec: 'İstənilən forma' }
      },
      p1: 'A Print olaraq {year}-cü ildən bəri Azərbaycanda yüzlərlə şirkətə peşəkar çap xidməti göstəririk.',
      // TODO: replace `story` (all languages) with the real company story.
      story: '{year}-cü ildə Bakıda kiçik bir emalatxana kimi başladıq. Bu gün vizit kartdan böyük formatlı bannerlərə qədər hər növ çap işini bir yerdə görürük və yüzlərlə brendə xidmət edirik.',
      p2: 'Hər sifarişə fərdi yanaşırıq, keyfiyyətsiz iş buraxmırıq.',
      storyTitle: 'Bizim hekayəmiz',
      features: [
        { title: 'Çap', text: 'Ofset və rəqəmsal çap, istənilən tirajda.' },
        { title: 'Dizayn', text: 'Brendinizə uyğun dizaynı biz hazırlayırıq.' },
        { title: 'Çatdırılma', text: 'Bakı daxili 24 saat ərzində çatdırılma.' },
        { title: 'Keyfiyyət', text: 'Hər sifariş çapdan əvvəl yoxlanılır.' }
      ],
      teamTitle: 'Komandamız',
      roles: { ceo: 'CEO', designer: 'Dizayner', technician: 'Texnik', sales: 'Satış' }
    },
    footer: {
      desc: 'A Print — brendinizi çap və dizayn xidmətləri ilə gücləndirir. Yüksək keyfiyyət, sürətli çatdırılma və peşəkar yanaşma.',
      backToTop: 'Səhifənin yuxarısına',
      copyright: '© {year} A Print. Bütün hüquqlar qorunur.',
      madeBy: 'SKWEB tərəfindən hazırlandı',
      ctaLine1: 'Layihəniz var?',
      ctaLine2: 'Gəlin danışaq.',
      ctaOrder: 'Sifariş ver →',
      pagesTitle: 'Səhifələr',
      contactTitle: 'Əlaqə',
      labels: { phone: 'Telefon', email: 'E-poçt', address: 'Ünvan', hours: 'İş saatları' }
    },
    contact: {
      badge: 'Əlaqə',
      // "B.e – C.a" = Monday – Thursday (bazar ertəsi – cümə axşamı).
      hours: 'B.e – C.a: 09:00 – 21:00',
      heroLine1: 'Gəlin',
      heroLine2: 'danışaq.',
      heroText: 'Sifarişiniz və ya sualınız var? Formu doldurun, ən qısa zamanda sizinlə əlaqə saxlayaq.',
      labels: { name: 'Ad Soyad', email: 'E-poçt', phone: 'Telefon', service: 'Xidmət', message: 'Mesaj' },
      placeholders: { name: 'Əli Həsənov', email: 'ali@example.com', phone: '+994 50 123 45 67', message: 'Sifariş detallarını yazın...' },
      servicePlaceholder: 'Xidmət seçin',
      serviceOther: 'Digər',
      submit: 'Göndər →',
      submitting: 'Göndərilir…',
      successText: 'Mesajınız göndərildi. Tezliklə sizinlə əlaqə saxlayacağıq.',
      newMessage: 'Yeni mesaj',
      errors: {
        nameRequired: 'Adınızı yazın.',
        emailRequired: 'E-poçt ünvanınızı yazın.',
        emailInvalid: 'E-poçt ünvanı düzgün deyil.',
        phoneRequired: 'Telefon nömrənizi yazın.',
        phoneInvalid: 'Nömrəni düzgün yazın, məsələn: +994 50 123 45 67.',
        messageRequired: 'Mesajınızı yazın.',
        submitFailed: 'Mesaj göndərilə bilmədi. Zəhmət olmasa bir az sonra yenidən cəhd edin və ya bizə WhatsApp-da yazın.'
      },
      contactInfoTitle: 'Əlaqə məlumatları',
      whatsappCta: 'WhatsApp-da yazın',
      quickReplyTitle: 'Sürətli cavab',
      quickReplyText: 'Suallarınız üçün WhatsApp-da da əlaqə saxlaya bilərsiniz. Adətən 15 dəqiqə ərzində cavab veririk.'
    },
  },
  en: {
    nav: { home: 'Home', about: 'About', products: 'Products', portfolio: 'Portfolio', contact: 'Contact' },
    langNames: { az: 'Azerbaijani', en: 'English', ru: 'Russian' },
    hero: {
      line1: 'Bring your',
      line2: 'brand to life',
      words: ['Business card', 'Flyer', 'Banner', 'Sticker', 'Roll-up', 'Packaging'],
      description: 'From business cards to banners, we produce all your print jobs in high quality within 24 hours.',
      button: 'Products →',
      statLabel: 'happy customers'
    },
    works: {
      title: 'Recent work',
      viewAll: 'View all →'
    },
    stats: { customers: 'Customers', products: 'Product types', delivery: 'Delivery', rating: 'Rating', experience: 'Experience', yearsUnit: { one: 'year', other: 'years' }, team: 'Team members' },
    partners: { title: 'Our Partners', subtitle: 'Brands we work with' },
    products: { title: 'Products', cardCta: 'Place an order →', intro: 'A wide selection, from everyday print jobs to branded promo products.', priceListTitle: 'Pricing', itemsUnit: { one: 'item', other: 'items' } },
    portfolio: { badge: 'Our Works', title: 'Portfolio', intro: 'Selected samples of works we prepared for clients.', all: 'All' },
    about: { badge: 'About', heroLine1: 'In Baku since {year}', heroLine2: '{word} printing', heroWords: ['Fast', 'Quality', 'Reliable'], heroSr: 'In Baku since {year}: fast, quality and reliable printing', deck: { businessCard: { name: 'Business cards', spec: 'From 50 pcs' }, rollup: { name: 'Roll-up', spec: '85×200 cm' }, menu: { name: 'Menus', spec: 'Laminated' }, sticker: { name: 'Stickers', spec: 'Any shape' } }, p1: 'Since {year}, A Print has provided professional printing services to hundreds of companies in Azerbaijan.', story: 'We started in {year} as a small print workshop in Baku. Today we handle every kind of print job in one place — from business cards to large-format banners — for hundreds of brands.', p2: 'We take a personal approach to every order and never compromise on quality.', storyTitle: 'Our story', features: [{ title: 'Printing', text: 'Offset and digital printing, any run size.' }, { title: 'Design', text: 'We create designs that fit your brand.' }, { title: 'Delivery', text: '24-hour delivery within Baku.' }, { title: 'Quality', text: 'Every order is checked before printing.' }], teamTitle: 'Our Team', roles: { ceo: 'CEO', designer: 'Designer', technician: 'Technician', sales: 'Sales' } },
    footer: {
      desc: 'A Print — strengthens your brand with professional printing and design services. High quality, fast delivery and a professional approach.',
      backToTop: 'Back to top',
      copyright: '© {year} A Print. All rights reserved.',
      madeBy: 'Made by SKWEB',
      ctaLine1: 'Have a project?',
      ctaLine2: 'Let’s talk.',
      ctaOrder: 'Place an order →',
      pagesTitle: 'Pages',
      contactTitle: 'Contact',
      labels: { phone: 'Phone', email: 'Email', address: 'Address', hours: 'Working hours' }
    },
    contact: {
      badge: 'Contact',
      hours: 'Mon – Thu: 09:00 – 21:00',
      heroLine1: 'Let’s',
      heroLine2: 'talk.',
      heroText: 'Have an order or a question? Fill in the form and we’ll get back to you as soon as possible.',
      labels: { name: 'Full name', email: 'Email', phone: 'Phone', service: 'Service', message: 'Message' },
      placeholders: { name: 'Ali Hasanov', email: 'ali@example.com', phone: '+994 50 123 45 67', message: 'Write your order details...' },
      servicePlaceholder: 'Choose a service',
      serviceOther: 'Other',
      submit: 'Send →',
      submitting: 'Sending…',
      successText: 'Your message has been sent. We’ll be in touch soon.',
      newMessage: 'New message',
      errors: {
        nameRequired: 'Please enter your name.',
        emailRequired: 'Please enter your email.',
        emailInvalid: 'This email address doesn’t look right.',
        phoneRequired: 'Please enter your phone number.',
        phoneInvalid: 'Please enter a valid number, e.g. +994 50 123 45 67.',
        messageRequired: 'Please write your message.',
        submitFailed: 'Your message couldn’t be sent. Please try again in a moment, or message us on WhatsApp.'
      },
      contactInfoTitle: 'Contact information',
      whatsappCta: 'Message us on WhatsApp',
      quickReplyTitle: 'Quick reply',
      quickReplyText: 'You can also reach us on WhatsApp. We usually respond within 15 minutes.'
    },
  },
  ru: {
    nav: { home: 'Главная', about: 'О нас', products: 'Продукция', portfolio: 'Портфолио', contact: 'Контакты' },
    langNames: { az: 'Азербайджанский', en: 'Английский', ru: 'Русский' },
    hero: {
      line1: 'Оживите',
      line2: 'ваш бренд',
      words: ['Визитка', 'Флаер', 'Баннер', 'Стикер', 'Ролл-ап', 'Упаковка'],
      description: 'От визиток до баннеров — выполняем все ваши печатные заказы в высоком качестве за 24 часа.',
      button: 'Продукция →',
      statLabel: 'довольных клиентов'
    },
    works: {
      title: 'Последние работы',
      viewAll: 'Смотреть все →'
    },
    stats: { customers: 'Клиенты', products: 'Видов продукции', delivery: 'Доставка', rating: 'Рейтинг', experience: 'Опыт', yearsUnit: { one: 'год', few: 'года', many: 'лет', other: 'года' }, team: 'Сотрудников' },
    partners: { title: 'Наши партнёры', subtitle: 'Бренды, с которыми мы работаем' },
    products: { title: 'Продукция', cardCta: 'Заказать →', intro: 'Широкий выбор — от повседневной печати до брендированной промо-продукции.', priceListTitle: 'Цены', itemsUnit: { one: 'позиция', few: 'позиции', many: 'позиций', other: 'позиции' } },
    portfolio: { badge: 'Работы', title: 'Портфолио', intro: 'Выбранные образцы работ, подготовленных для наших клиентов.', all: 'Все' },
    about: { badge: 'О нас', heroLine1: 'С {year} года в Баку', heroLine2: '{word} печать', heroWords: ['Быстрая', 'Качественная', 'Надёжная'], heroSr: 'С {year} года в Баку — быстрая, качественная и надёжная печать', deck: { businessCard: { name: 'Визитки', spec: 'От 50 шт.' }, rollup: { name: 'Ролл-ап', spec: '85×200 см' }, menu: { name: 'Меню', spec: 'Ламинированное' }, sticker: { name: 'Стикеры', spec: 'Любая форма' } }, p1: 'С {year} года A Print предоставляет профессиональные услуги печати сотням компаний в Азербайджане.', story: 'Мы начинали в {year} году как небольшая мастерская в Баку. Сегодня мы выполняем любые печатные работы в одном месте — от визиток до широкоформатных баннеров — для сотен брендов.', p2: 'Мы подходим к каждому заказу индивидуально и никогда не идём на компромисс с качеством.', storyTitle: 'Наша история', features: [{ title: 'Печать', text: 'Офсетная и цифровая печать любым тиражом.' }, { title: 'Дизайн', text: 'Создаём дизайн под ваш бренд.' }, { title: 'Доставка', text: 'Доставка по Баку в течение 24 часов.' }, { title: 'Качество', text: 'Каждый заказ проверяется перед печатью.' }], teamTitle: 'Наша команда', roles: { ceo: 'Директор', designer: 'Дизайнер', technician: 'Техник', sales: 'Продажи' } },
    footer: {
      desc: 'A Print — усиливает ваш бренд с помощью профессиональных услуг печати и дизайна. Высокое качество, быстрая доставка и профессиональный подход.',
      backToTop: 'Наверх',
      copyright: '© {year} A Print. Все права защищены.',
      madeBy: 'Сделано SKWEB',
      ctaLine1: 'Есть проект?',
      ctaLine2: 'Давайте обсудим.',
      ctaOrder: 'Заказать →',
      pagesTitle: 'Страницы',
      contactTitle: 'Контакты',
      labels: { phone: 'Телефон', email: 'Эл. почта', address: 'Адрес', hours: 'Часы работы' }
    },
    contact: {
      badge: 'Контакты',
      hours: 'Пн – Чт: 09:00 – 21:00',
      heroLine1: 'Давайте',
      heroLine2: 'обсудим.',
      heroText: 'Есть заказ или вопрос? Заполните форму, и мы свяжемся с вами в ближайшее время.',
      labels: { name: 'Имя Фамилия', email: 'Эл. почта', phone: 'Телефон', service: 'Услуга', message: 'Сообщение' },
      placeholders: { name: 'Али Хасанов', email: 'ali@example.com', phone: '+994 50 123 45 67', message: 'Опишите детали заказа...' },
      servicePlaceholder: 'Выберите услугу',
      serviceOther: 'Другое',
      submit: 'Отправить →',
      submitting: 'Отправка…',
      successText: 'Сообщение отправлено. Мы скоро свяжемся с вами.',
      newMessage: 'Новое сообщение',
      errors: {
        nameRequired: 'Укажите ваше имя.',
        emailRequired: 'Укажите адрес эл. почты.',
        emailInvalid: 'Адрес эл. почты указан неверно.',
        phoneRequired: 'Укажите номер телефона.',
        phoneInvalid: 'Укажите корректный номер, например +994 50 123 45 67.',
        messageRequired: 'Напишите сообщение.',
        submitFailed: 'Не удалось отправить сообщение. Попробуйте ещё раз чуть позже или напишите нам в WhatsApp.'
      },
      contactInfoTitle: 'Контактная информация',
      whatsappCta: 'Написать в WhatsApp',
      quickReplyTitle: 'Быстрый ответ',
      quickReplyText: 'Вы также можете связаться с нами в WhatsApp. Обычно мы отвечаем в течение 15 минут.'
    },
  },
};
