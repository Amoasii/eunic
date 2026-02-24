export const languages = {
  ru: 'RU',
  ro: 'RO',
} as const;

export const defaultLang = 'ru' as const;

export type Lang = keyof typeof languages;

export const ui = {
  ru: {
    // Meta
    'meta.title': 'Eunic Invest — Ремонт и отделка в Молдове',
    'meta.description': 'Eunic Invest — ремонт квартир и помещений в Молдове. Качественные материалы, индивидуальный подход, гарантия на все работы.',

    // Nav
    'nav.about': 'О нас',
    'nav.services': 'Услуги',
    'nav.portfolio': 'Портфолио',
    'nav.testimonials': 'Отзывы',
    'nav.contacts': 'Контакты',

    // Hero
    'hero.title': 'Работаем с душой.',
    'hero.title2': 'Ремонтируем качественно.',
    'hero.subtitle': 'Компания по ремонту и отделке в Молдове. Полный цикл работ любой сложности.',
    'hero.cta': 'Связаться с нами',
    'hero.call': 'Позвонить',
    'hero.scroll': 'Прокрутите вниз',

    // About
    'about.section': 'О компании',
    'about.title': 'Надёжный партнёр в ремонте',
    'about.text1': 'Eunic Invest — молодая ремонтная компания на рынке Молдовы. Мы специализируемся на ремонте и отделке жилых и коммерческих объектов.',
    'about.text2': 'Наша команда профессионалов гарантирует высокое качество работ, соблюдение сроков и индивидуальный подход к каждому клиенту. Мы используем только проверенные материалы и современные технологии.',
    'about.stat1.value': '✓',
    'about.stat1.label': 'Индивидуальный подход',
    'about.stat2.value': '✓',
    'about.stat2.label': 'Качественные материалы',
    'about.stat3.value': '✓',
    'about.stat3.label': 'Точные сроки',
    'about.stat4.value': '✓',
    'about.stat4.label': 'Гарантия на работы',

    // Services
    'services.section': 'Услуги',
    'services.title': 'Что мы делаем',
    'services.subtitle': 'Полный спектр ремонтных и отделочных услуг для вашего дома и бизнеса',

    'service.1.title': 'Ремонт квартир',
    'service.1.desc': 'Капитальный и косметический ремонт квартир любой сложности. Дизайн-проект, черновые и чистовые работы.',
    'service.2.title': 'Сантехника',
    'service.2.desc': 'Монтаж и замена систем водоснабжения, канализации, отопления. Установка сантехнического оборудования.',
    'service.3.title': 'Электромонтаж',
    'service.3.desc': 'Проектирование и монтаж электропроводки, установка щитов, розеток, освещения.',
    'service.4.title': 'Кровельные работы',
    'service.4.desc': 'Монтаж, ремонт и утепление кровли. Работа с любыми кровельными материалами.',
    'service.5.title': 'Отделочные работы',
    'service.5.desc': 'Штукатурка, шпаклёвка, покраска, укладка плитки, монтаж гипсокартона и напольных покрытий.',
    'service.6.title': 'Фасадные работы',
    'service.6.desc': 'Утепление и отделка фасадов, декоративная штукатурка, вентилируемые фасады.',
    'service.7.title': 'Демонтаж',
    'service.7.desc': 'Демонтаж стен, перегородок, полов, стяжки. Вывоз строительного мусора.',
    'service.8.title': 'Установка дверей и окон',
    'service.8.desc': 'Монтаж и замена межкомнатных и входных дверей, установка пластиковых и деревянных окон.',

    // Portfolio
    'portfolio.section': 'Портфолио',
    'portfolio.title': 'Наши работы',
    'portfolio.subtitle': 'Примеры завершённых проектов, которыми мы гордимся',
    // Testimonials
    'testimonials.section': 'Отзывы',
    'testimonials.title': 'Что говорят клиенты',
    'testimonial.1.text': 'Отличная команда! Сделали ремонт в нашей квартире за 2 месяца. Качество на высшем уровне, все сроки соблюдены. Рекомендуем всем!',
    'testimonial.1.name': 'Андрей Попеску',
    'testimonial.1.work': 'Ремонт квартиры',
    'testimonial.2.text': 'Заказали ремонт кухни и ванной комнаты. Ребята сделали всё быстро и качественно. Особенно понравилась аккуратная укладка плитки. Обязательно обратимся снова!',
    'testimonial.2.name': 'Мария Кожокару',
    'testimonial.2.work': 'Ремонт кухни и ванной',
    'testimonial.3.text': 'Обратились для ремонта офиса. Работы выполнены аккуратно и в срок. Отдельное спасибо за помощь с выбором материалов.',
    'testimonial.3.name': 'Ион Русу',
    'testimonial.3.work': 'Ремонт офиса',

    // Contacts
    'contacts.section': 'Контакты',
    'contacts.title': 'Свяжитесь с нами',
    'contacts.subtitle': 'Готовы обсудить ваш проект? Свяжитесь с нами удобным способом',
    'contacts.phone': 'Телефон',
    'contacts.email': 'Email',
    'contacts.address': 'Адрес',
    'contacts.address.value': 'г. Бельцы',
    'contacts.hours': 'Режим работы',
    'contacts.hours.value': 'Пн–Пт: 08:00–18:00, Сб: 09:00–15:00',
    'contacts.social': 'Мы в соцсетях',
    'contacts.region': 'Работаем по всему северу Молдовы',

    // Footer
    'footer.slogan': 'Создаём уют вместе',
    'footer.rights': 'Все права защищены.',
  },
  ro: {
    // Meta
    'meta.title': 'Eunic Invest — Renovare și finisare în Moldova',
    'meta.description': 'Eunic Invest — renovarea apartamentelor și spațiilor în Moldova. Materiale de calitate, abordare individuală, garanție pentru toate lucrările.',

    // Nav
    'nav.about': 'Despre noi',
    'nav.services': 'Servicii',
    'nav.portfolio': 'Portofoliu',
    'nav.testimonials': 'Recenzii',
    'nav.contacts': 'Contacte',

    // Hero
    'hero.title': 'Lucrăm cu suflet.',
    'hero.title2': 'Renovăm calitativ.',
    'hero.subtitle': 'Companie de renovări în Moldova. Ciclu complet de lucrări de renovare și finisare.',
    'hero.cta': 'Contactați-ne',
    'hero.call': 'Sunați',
    'hero.scroll': 'Derulați în jos',

    // About
    'about.section': 'Despre companie',
    'about.title': 'Partener de încredere în renovări',
    'about.text1': 'Eunic Invest este o companie tânără de renovări pe piața din Moldova. Ne specializăm în renovarea și finisarea obiectelor rezidențiale și comerciale.',
    'about.text2': 'Echipa noastră de profesioniști garantează calitatea înaltă a lucrărilor, respectarea termenelor și o abordare individuală pentru fiecare client. Folosim doar materiale verificate și tehnologii moderne.',
    'about.stat1.value': '✓',
    'about.stat1.label': 'Abordare individuală',
    'about.stat2.value': '✓',
    'about.stat2.label': 'Materiale de calitate',
    'about.stat3.value': '✓',
    'about.stat3.label': 'Termene exacte',
    'about.stat4.value': '✓',
    'about.stat4.label': 'Garanție pentru lucrări',

    // Services
    'services.section': 'Servicii',
    'services.title': 'Ce facem',
    'services.subtitle': 'Spectru complet de servicii de renovare și finisare pentru casa și afacerea dvs.',

    'service.1.title': 'Renovarea apartamentelor',
    'service.1.desc': 'Renovare capitală și cosmetică a apartamentelor de orice complexitate. Proiect de design, lucrări brute și de finisare.',
    'service.2.title': 'Instalații sanitare',
    'service.2.desc': 'Montarea și înlocuirea sistemelor de alimentare cu apă, canalizare, încălzire. Instalarea echipamentelor sanitare.',
    'service.3.title': 'Electromontaj',
    'service.3.desc': 'Proiectarea și montarea instalațiilor electrice, instalarea tablourilor, prizelor, iluminatului.',
    'service.4.title': 'Lucrări de acoperiș',
    'service.4.desc': 'Montarea, repararea și izolarea acoperișului. Lucrul cu orice materiale de acoperiș.',
    'service.5.title': 'Lucrări de finisare',
    'service.5.desc': 'Tencuială, șpăcluire, vopsire, montarea faianței, montarea plăcilor de gips-carton și a pardoselilor.',
    'service.6.title': 'Lucrări de fațadă',
    'service.6.desc': 'Izolarea și finisarea fațadelor, tencuială decorativă, fațade ventilate.',
    'service.7.title': 'Demontare',
    'service.7.desc': 'Demontarea pereților, partițiilor, pardoselilor, șapei. Evacuarea deșeurilor de construcție.',
    'service.8.title': 'Instalarea ușilor și ferestrelor',
    'service.8.desc': 'Montarea și înlocuirea ușilor interioare și de intrare, instalarea ferestrelor din PVC și lemn.',

    // Portfolio
    'portfolio.section': 'Portofoliu',
    'portfolio.title': 'Lucrările noastre',
    'portfolio.subtitle': 'Exemple de proiecte finalizate de care suntem mândri',
    // Testimonials
    'testimonials.section': 'Recenzii',
    'testimonials.title': 'Ce spun clienții',
    'testimonial.1.text': 'Echipă excelentă! Au făcut renovarea apartamentului nostru în 2 luni. Calitate la cel mai înalt nivel, toate termenele respectate. Recomandăm tuturor!',
    'testimonial.1.name': 'Andrei Popescu',
    'testimonial.1.work': 'Renovarea apartamentului',
    'testimonial.2.text': 'Am comandat renovarea bucătăriei și băii. Băieții au făcut totul rapid și calitativ. Ne-a plăcut în special montarea atentă a faianței. Cu siguranță vom reveni!',
    'testimonial.2.name': 'Maria Cojocaru',
    'testimonial.2.work': 'Renovarea bucătăriei și băii',
    'testimonial.3.text': 'Ne-am adresat pentru renovarea biroului. Lucrările au fost efectuate cu grijă și la timp. Mulțumiri speciale pentru ajutorul la alegerea materialelor.',
    'testimonial.3.name': 'Ion Rusu',
    'testimonial.3.work': 'Renovarea biroului',

    // Contacts
    'contacts.section': 'Contacte',
    'contacts.title': 'Contactați-ne',
    'contacts.subtitle': 'Sunteți gata să discutăm proiectul dvs.? Contactați-ne în modul convenabil',
    'contacts.phone': 'Telefon',
    'contacts.email': 'Email',
    'contacts.address': 'Adresa',
    'contacts.address.value': 'mun. Bălți',
    'contacts.hours': 'Program de lucru',
    'contacts.hours.value': 'Lun–Vin: 08:00–18:00, Sâm: 09:00–15:00',
    'contacts.social': 'Rețele sociale',
    'contacts.region': 'Lucrăm în tot nordul Moldovei',

    // Footer
    'footer.slogan': 'Creăm confort împreună',
    'footer.rights': 'Toate drepturile rezervate.',
  },
} as const;
