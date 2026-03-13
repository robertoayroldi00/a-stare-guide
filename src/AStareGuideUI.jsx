import { useMemo, useState } from "react";
import {
  Globe,
  House,
  BedDouble,
  UtensilsCrossed,
  UserRound,
  KeyRound,
  LogOut,
  Wifi,
  MapPinned,
  Phone,
  Plane,
  ChevronRight,
} from "lucide-react";

const guideContent = {
  propertyName: "A Stare",
  propertyTagline: "Guest Guide • Molfetta",
  mapUrl:
    "https://www.google.com/maps/place/70056+Molfetta+BA/@41.1983845,16.5776247,14z/data=!3m1!4b1!4m6!3m5!1s0x1347f9c63f71d435:0xa58f40a1675bae1b!8m2!3d41.2027186!4d16.5987155!16zL20vMGNiNzg?authuser=0&entry=ttu&g_ep=EgoyMDI2MDMxMC4wIKXMDSoASAFQAw%3D%3D",
  languages: {
    it: {
      welcome: "Benvenuto ad A Stare",
      chooseLanguage: "Scegli la tua lingua",
      enterGuide: "Entra nella guida",
      contactsHost: "Contatta host",
      guestGuide: "Guest guide",
      exploreGuide: "Esplora la guida",
      exploreSubtitle:
        "Tutto quello che ti serve durante il soggiorno, ottimizzato per una consultazione rapida da mobile.",
      backHome: "← Torna alla home",
      back: "← Torna indietro",
      callHost: "Chiama host",
      sendEmail: "Invia email",
      hostTitle: "Benvenuto! 👋",
      hostDescription:
        "Sono Roberto Ayroldi e ti do il benvenuto nella mia struttura nel cuore del centro storico di Molfetta. Qui trovi tutte le informazioni utili per vivere al meglio il soggiorno.",
      utilityCards: [
        {
          title: "Numeri utili",
          text: "118 Emergenze\n112 Carabinieri\n113 Polizia\n115 Vigili del fuoco",
          icon: "phone",
        },
        {
          title: "Aeroporto",
          text: "Bari Karol Wojtyła dista circa 25 minuti in auto da Molfetta.",
          icon: "plane",
        },
      ],
      menuItems: [
        {
          id: "soggiorno",
          emoji: "🛏️",
          title: "Il tuo soggiorno",
          subtitle: "Check-in, regole, istruzioni",
          sectionTitle: "Il tuo soggiorno",
          sectionText:
            "Il check-in è permesso dalle ore 15:00, mentre il check-out deve avvenire entro le ore 10:00. Per poter accedere alla struttura, dovete inserire i codici che vi verranno inviati il giorno della prenotazione nella cassetta esterna, dove all'interno troverete le chiavi. Al momento del check-out, vi chiediamo di spegnere tutto e riporre le chiavi nella stessa cassetta.",
          ctaLabel: "",
          ctaUrl: "",
          accent: "from-amber-200 via-orange-100 to-white",
        },
        {
          id: "luoghi",
          emoji: "🗺️",
          title: "Attrazioni di Molfetta",
          subtitle: "I luoghi imperdibili a pochi passi",
          sectionTitle: "Attrazioni di Molfetta",
          sectionText:
            "Abbiamo creato una guida con tutti i luoghi d'interesse della nostra Molfetta, perfetta per scoprire il centro storico, il porto e il lungomare in pochi minuti.",
          ctaLabel: "Apri la guida",
          ctaUrl:
            "https://exclusiveitaliahost.com/scopri-molfetta-centro-storico/",
          accent: "from-sky-200 via-cyan-100 to-white",
        },
        {
          id: "mangiare",
          emoji: "🍽️",
          title: "Dove mangiare",
          subtitle: "Ristoranti, pizzerie, bar selezionati",
          sectionTitle: "Dove mangiare",
          sectionText:
            "Se cercate un ottimo posto dove mangiare, vi consiglio Malie, un ristorante nelle vicinanze con una selezione di vini pregiati.\n\nPer chi ama il buon vino e un'atmosfera raffinata, potete prendere in considerazione anche Guyot, perfetto per una cena raffinata con abbinamenti interessanti, o Cantine Pop, ideale per una serata più informale ma con cibo e vino eccellenti. Anche la Vineria San Domenico è una buona scelta se volete degustare vini selezionati abbinati a piatti raffinati.\n\nSe amate il sushi, sul lungomare di Molfetta troverete Chotto Chotto, un'ottima scelta per la cucina giapponese.\n\nSe potete guidare, vi consiglio tre ristoranti di pesce a Molfetta: Ristorante Adriatico, Playa Del Sol e Ricomincio da 3, perfetti per gustare piatti freschi e di qualità.",
          ctaLabel: "",
          ctaUrl: "",
          accent: "from-rose-200 via-pink-100 to-white",
        },
        {
          id: "muoversi",
          emoji: "🚗",
          title: "Come muoversi",
          subtitle: "Treno, taxi, aeroporto",
          sectionTitle: "Come muoversi",
          sectionText:
            "Muoversi a Molfetta è semplice grazie ai collegamenti con treni, autobus e servizi privati.\n\nA piedi\nIl centro storico, il porto e il lungomare sono facilmente raggiungibili a piedi. Molte attrazioni, ristoranti e negozi si trovano a breve distanza tra loro.\n\nTreno\nLa stazione ferroviaria di Molfetta collega la città con Bari, Barletta, Trani e altre località della costa. I treni regionali sono frequenti e permettono di raggiungere Bari Centrale in circa 20 minuti.\n\nAutobus\nIl servizio di autobus urbani collega le diverse zone della città. Sono presenti fermate in vari punti strategici, utili per spostarsi verso quartieri residenziali e zone periferiche.\n\nTaxi\nI taxi sono disponibili presso la stazione ferroviaria e nel centro cittadino. È possibile prenotarli telefonicamente o tramite app dedicate.\n\nAeroporto\nL’aeroporto di Bari Karol Wojtyła dista circa 20 chilometri da Molfetta. È raggiungibile in auto o taxi in circa 25 minuti, oppure in treno con collegamento fino alla stazione di Bari Centrale e successivo trasferimento verso l’aeroporto.\n\nAuto\nPer chi viaggia in auto, Molfetta è collegata facilmente tramite la SS16 Adriatica e l’autostrada A14, rendendo semplici gli spostamenti verso le principali destinazioni della Puglia.",
          ctaLabel: "Apri Maps",
          ctaUrl:
            "https://www.google.com/maps/search/?api=1&query=Stazione+Molfetta",
          accent: "from-emerald-200 via-teal-100 to-white",
        },
      ],
      bottomNav: [
        { icon: "globe", label: "Lingua", pageId: "language" },
        { icon: "home", label: "Home", pageId: "home" },
        { icon: "bed", label: "Stay", pageId: "soggiorno" },
        { icon: "food", label: "Food", pageId: "mangiare" },
        { icon: "user", label: "Host", pageId: "host" },
      ],
    },
    en: {
      welcome: "Welcome to A Stare",
      chooseLanguage: "Choose your language",
      enterGuide: "Enter guide",
      contactsHost: "Contact host",
      guestGuide: "Guest guide",
      exploreGuide: "Explore the guide",
      exploreSubtitle:
        "Everything you need during your stay, optimized for a fast mobile experience.",
      backHome: "← Back to home",
      back: "← Go back",
      callHost: "Call host",
      sendEmail: "Send email",
      hostTitle: "Welcome! 👋",
      hostDescription:
        "I’m Roberto Ayroldi and I’m happy to welcome you to my property in the heart of Molfetta’s historic centre. Here you’ll find all the useful information to enjoy your stay.",
      utilityCards: [
        {
          title: "Useful numbers",
          text: "118 Medical emergency\n112 Carabinieri\n113 Police\n115 Fire brigade",
          icon: "phone",
        },
        {
          title: "Airport",
          text: "Bari Karol Wojtyła Airport is about 25 minutes by car from Molfetta.",
          icon: "plane",
        },
      ],
      menuItems: [
        {
          id: "soggiorno",
          emoji: "🛏️",
          title: "Your stay",
          subtitle: "Check-in, house rules, instructions",
          sectionTitle: "Your stay",
          sectionText:
            "Check-in is available from 3:00 PM, while check-out must be completed by 10:00 AM. To access the property, please use the codes that will be sent to you on the day of your booking to open the external lockbox, where you will find the keys. At check-out, please turn everything off and place the keys back in the same lockbox.",
          ctaLabel: "",
          ctaUrl: "",
          accent: "from-amber-200 via-orange-100 to-white",
        },
        {
          id: "luoghi",
          emoji: "🗺️",
          title: "Molfetta attractions",
          subtitle: "The must-see places within walking distance",
          sectionTitle: "Molfetta attractions",
          sectionText:
            "We created a guide with the main places of interest in Molfetta, perfect for discovering the historic centre, the harbour and the seafront in just a few minutes.",
          ctaLabel: "Open guide",
          ctaUrl:
            "https://exclusiveitaliahost.com/scopri-molfetta-centro-storico/",
          accent: "from-sky-200 via-cyan-100 to-white",
        },
        {
          id: "mangiare",
          emoji: "🍽️",
          title: "Where to eat",
          subtitle: "Selected restaurants, pizzerias and bars",
          sectionTitle: "Where to eat",
          sectionText:
            "If you're looking for a great place to eat, I recommend Malie, a nearby restaurant with a selection of fine wines.\n\nFor those who love good wine and a refined atmosphere, you can also consider Guyot, perfect for a refined dinner with interesting pairings, or Cantine Pop, ideal for a more casual evening but with excellent food and wine. Vineria San Domenico is also a good choice if you want to taste select wines paired with refined dishes.\n\nIf you love sushi, on the Molfetta seafront you'll find Chotto Chotto, an excellent choice for Japanese cuisine.\n\nIf you can drive, I recommend three seafood restaurants in Molfetta: Ristorante Adriatico, Playa Del Sol, and Ricomincio da 3, perfect for enjoying fresh, quality dishes.",
          ctaLabel: "",
          ctaUrl: "",
          accent: "from-rose-200 via-pink-100 to-white",
        },
        {
          id: "muoversi",
          emoji: "🚗",
          title: "Getting around",
          subtitle: "Train, taxi, airport",
          sectionTitle: "Getting around",
          sectionText:
            "Getting around Molfetta is easy thanks to the excellent train, bus, and private transportation connections.\n\nOn foot\nThe historic center, port, and waterfront are easily accessible on foot. Many attractions, restaurants, and shops are within walking distance.\n\nTrain\nMolfetta train station connects the city with Bari, Barletta, Trani, and other coastal towns. Regional trains are frequent and reach Bari Centrale in about 20 minutes.\n\nBus\nThe city bus service connects various areas of the city. There are stops at various strategic points, useful for traveling to residential neighborhoods and outlying areas.\n\nTaxi\nTaxis are available at the train station and in the city center. You can book them by phone or through dedicated apps.\n\nAirport\nBari Karol Wojtyła Airport is approximately 20 kilometers from Molfetta. It can be reached by car or taxi in about 25 minutes, or by train with a connection to Bari Centrale station and subsequent transfer to the airport.\n\nBy car\nFor those traveling by car, Molfetta is easily connected via the SS16 Adriatica and the A14 motorway, making it easy to travel to the main destinations in Puglia.",
          ctaLabel: "Open Maps",
          ctaUrl:
            "https://www.google.com/maps/search/?api=1&query=Stazione+Molfetta",
          accent: "from-emerald-200 via-teal-100 to-white",
        },
      ],
      bottomNav: [
        { icon: "globe", label: "Language", pageId: "language" },
        { icon: "home", label: "Home", pageId: "home" },
        { icon: "bed", label: "Stay", pageId: "soggiorno" },
        { icon: "food", label: "Food", pageId: "mangiare" },
        { icon: "user", label: "Host", pageId: "host" },
      ],
    },
  },
  hostPage: {
    id: "host",
    title: "Roberto Ayroldi",
    subtitle: "I nostri contatti",
    description:
      "+39 351 842 8654\n+39 327 180 5293\nexclusiveitaliahost.com",
    phone: "+393518428654",
    whatsapp: "https://wa.me/393518428654",
    email: "info@exclusiveitaliahost.com",
    ctaUrl: "https://exclusiveitaliahost.com/",
    ctaLabel: "Visita il sito",
  },
  quickInfo: [
    { icon: "key", label: "Check-in", value: "15:00" },
    { icon: "logout", label: "Check-out", value: "10:00" },
    { icon: "wifi", label: "WiFi", value: "24 Mbps" },
    { icon: "map", label: "Maps", value: "Open" },
  ],
};

function AStareGuideUI() {
  const [activePage, setActivePage] = useState("language");
  const [language, setLanguage] = useState("it");
  const content = guideContent.languages[language];

  const iconMap = {
    key: KeyRound,
    logout: LogOut,
    wifi: Wifi,
    map: MapPinned,
    globe: Globe,
    home: House,
    bed: BedDouble,
    food: UtensilsCrossed,
    user: UserRound,
    phone: Phone,
    plane: Plane,
  };

  const IconRenderer = ({ name, className = "" }) => {
    const Icon = iconMap[name];
    return Icon ? <Icon className={className} strokeWidth={2.1} /> : null;
  };

  const activeMenuItem = useMemo(
    () => content.menuItems.find((item) => item.id === activePage) || null,
    [activePage, content.menuItems]
  );

  const isHostPage = activePage === guideContent.hostPage.id;
  const activeHeaderItem = isHostPage
    ? {
        emoji: "👤",
        sectionTitle: guideContent.hostPage.title,
        title: guideContent.hostPage.title,
        subtitle: guideContent.hostPage.subtitle,
      }
    : activeMenuItem;

  const openPage = (pageId) => setActivePage(pageId);
  const goHome = () => setActivePage("home");
  const openLanguage = () => setActivePage("language");
  const openMaps = () => window.open(guideContent.mapUrl, "_blank", "noopener,noreferrer");

  const enterClass = "animate-[fadeIn_.45s_ease-out]";

  const renderLanguagePage = () => (
    <section className={`space-y-5 ${enterClass}`}>
      <div className="overflow-hidden rounded-[28px] border border-stone-200 bg-gradient-to-br from-[#f4eadf] to-[#fff7eb] p-8 text-center shadow-[0_14px_34px_rgba(50,40,20,0.12)]">
        <p className="text-xs uppercase tracking-[0.32em] text-[#8a7b6f]">{guideContent.propertyTagline}</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#2e241d]">{content.welcome}</h1>
        <p className="mt-3 text-sm leading-6 text-[#6f6257]">{content.chooseLanguage}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => {
            setLanguage("it");
            setActivePage("home");
          }}
          className="rounded-[24px] bg-white px-4 py-5 text-left shadow-[0_12px_30px_rgba(50,40,20,0.09)] ring-1 ring-stone-200 transition duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
        >
          <div className="text-2xl">🇮🇹</div>
          <div className="mt-3 text-lg font-semibold text-[#2e241d]">Italiano</div>
          <div className="mt-1 text-sm text-[#6f6257]">{guideContent.languages.it.enterGuide}</div>
        </button>
        <button
          type="button"
          onClick={() => {
            setLanguage("en");
            setActivePage("home");
          }}
          className="rounded-[24px] bg-white px-4 py-5 text-left shadow-[0_12px_30px_rgba(50,40,20,0.09)] ring-1 ring-stone-200 transition duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
        >
          <div className="text-2xl">🇬🇧</div>
          <div className="mt-3 text-lg font-semibold text-[#2e241d]">English</div>
          <div className="mt-1 text-sm text-[#6f6257]">{guideContent.languages.en.enterGuide}</div>
        </button>
      </div>
    </section>
  );

  const renderHomePage = () => (
    <section className={`space-y-5 ${enterClass}`}>
      <div className="grid grid-cols-2 gap-3">
        {content.utilityCards.map((card) => (
          <div
            key={card.title}
            className="rounded-[22px] bg-white p-4 shadow-[0_10px_24px_rgba(50,40,20,0.08)] ring-1 ring-stone-200"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-stone-100 text-stone-700">
              <IconRenderer name={card.icon} className="h-5 w-5" />
            </div>
            <h3 className="mt-3 text-sm font-semibold text-[#2e241d]">{card.title}</h3>
            <p className="mt-2 whitespace-pre-line text-xs leading-5 text-[#6c6055]">
              {card.text}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-[26px] bg-gradient-to-br from-[#fff7eb] to-[#f6eee4] p-5 ring-1 ring-stone-200">
        <p className="text-xs uppercase tracking-[0.28em] text-[#a07c52]">{content.guestGuide}</p>
        <h3 className="mt-2 text-3xl font-semibold tracking-tight text-[#3a2a1d]">
          {content.exploreGuide}
        </h3>
        <p className="mt-2 text-sm leading-6 text-[#7e7063]">{content.exploreSubtitle}</p>
      </div>

      <div className="space-y-4">
        {content.menuItems.map((item, index) => (
          <button
            key={`${item.title}-${index}`}
            type="button"
            onClick={() => openPage(item.id)}
            className={`group relative flex w-full items-center gap-4 overflow-hidden rounded-[26px] border border-white/70 bg-gradient-to-br ${item.accent} px-4 py-4 text-left shadow-[0_14px_34px_rgba(50,40,20,0.1)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(50,40,20,0.16)] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-amber-700/30`}
          >
            <div className="absolute inset-y-0 right-0 w-28 bg-white/20 blur-2xl" />
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/75 text-3xl shadow-sm ring-1 ring-white/70">
              <span className="transition duration-300 group-hover:scale-110">{item.emoji}</span>
            </div>
            <div className="relative min-w-0 flex-1">
              <h3 className="truncate text-[1.2rem] font-semibold leading-tight text-[#29221d]">
                {item.title}
              </h3>
              <p className="mt-1 truncate text-sm text-[#6f6257]">{item.subtitle}</p>
            </div>
            <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-[#8d642e] shadow-sm transition group-hover:translate-x-0.5">
              <ChevronRight className="h-5 w-5" strokeWidth={2.4} />
            </div>
          </button>
        ))}
      </div>
    </section>
  );

  const renderDetailPage = (item) => {
    if (!item) return null;

    return (
      <section className={enterClass}>
        <button
          type="button"
          onClick={goHome}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 shadow-sm transition hover:bg-stone-50"
        >
          {content.backHome}
        </button>

        <div className="overflow-hidden rounded-[30px] border border-stone-200 bg-white shadow-[0_14px_36px_rgba(50,40,20,0.12)]">
          <div className={`bg-gradient-to-br ${item.accent} px-5 py-6`}>
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/75 text-3xl shadow-sm ring-1 ring-white/70">
                <span>{item.emoji}</span>
              </div>
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-[#2e241d]">
                  {item.sectionTitle || item.title}
                </h2>
                <p className="mt-2 text-sm text-[#78695d]">{item.subtitle}</p>
              </div>
            </div>
          </div>

          <div className="p-5">
            <div className="rounded-[22px] bg-[#fbf7f1] p-4 ring-1 ring-stone-200">
              <p className="whitespace-pre-line text-sm leading-7 text-[#5f5449]">
                {item.sectionText}
              </p>
              {item.ctaLabel && item.ctaUrl ? (
                <a
                  href={item.ctaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#8f5f18] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
                >
                  {item.ctaLabel}
                  <ChevronRight className="h-4 w-4" strokeWidth={2.4} />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    );
  };

  const renderHostPage = () => (
    <section className={enterClass}>
      <button
        type="button"
        onClick={goHome}
        className="mb-5 inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 shadow-sm transition hover:bg-stone-50"
      >
        {content.backHome}
      </button>

      <div className="overflow-hidden rounded-[30px] border border-stone-200 bg-white shadow-[0_14px_36px_rgba(50,40,20,0.12)]">
        <div className="bg-gradient-to-br from-[#f4eadf] to-[#fff7eb] px-5 py-6">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/80 text-stone-700 shadow-sm ring-1 ring-white/70">
              <IconRenderer name="user" className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-[#2e241d]">
                {guideContent.hostPage.title}
              </h2>
              <p className="mt-2 text-sm text-[#8a7b6f]">{guideContent.hostPage.subtitle}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 p-5">
          <div className="rounded-[22px] bg-[#fbf7f1] p-4 ring-1 ring-stone-200">
            <p className="whitespace-pre-line text-sm leading-7 text-[#5f5449]">
              {guideContent.hostPage.description}
            </p>
          </div>

          <div className="grid gap-3">
            <a
              href={`tel:${guideContent.hostPage.phone}`}
              className="rounded-2xl bg-[#1f1a17] px-4 py-3 text-center text-sm font-medium text-white shadow-sm"
            >
              {content.callHost}
            </a>
            <a
              href={guideContent.hostPage.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl bg-[#24a159] px-4 py-3 text-center text-sm font-medium text-white shadow-sm"
            >
              WhatsApp
            </a>
            <a
              href={`mailto:${guideContent.hostPage.email}`}
              className="rounded-2xl bg-[#3f6be0] px-4 py-3 text-center text-sm font-medium text-white shadow-sm"
            >
              {content.sendEmail}
            </a>
          </div>

          {guideContent.hostPage.ctaLabel && guideContent.hostPage.ctaUrl ? (
            <a
              href={guideContent.hostPage.ctaUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#8f5f18] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
            >
              {guideContent.hostPage.ctaLabel}
              <ChevronRight className="h-4 w-4" strokeWidth={2.4} />
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#3b2414_0%,#171411_38%,#121212_100%)] p-3 text-stone-900 sm:p-4">
      <div className="mx-auto w-full max-w-sm overflow-hidden rounded-[34px] border border-white/10 bg-[#f4f0ea] shadow-[0_24px_80px_rgba(0,0,0,0.35)] ring-1 ring-white/10 animate-[fadeIn_.45s_ease-out]">
        <header className="relative overflow-hidden bg-gradient-to-br from-[#1f1008] via-[#2e1609] to-[#5e3112] text-white">
          <div className="absolute -right-10 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute left-0 top-16 h-28 w-28 rounded-full bg-amber-400/10 blur-3xl" />

          <div className="grid grid-cols-4 border-b border-white/10">
            {guideContent.quickInfo.map((item, index) => {
              const isMapsTile = item.icon === "map";
              const shared = "flex min-h-[88px] flex-col items-center justify-center gap-1 px-2 text-center text-white";

              return isMapsTile ? (
                <button
                  key={`${item.label}-${index}`}
                  type="button"
                  onClick={openMaps}
                  className={`${shared} cursor-pointer border-r border-white/10 transition hover:bg-white/5 last:border-r-0`}
                  aria-label="Open Google Maps for Molfetta"
                >
                  <span className="flex h-6 w-6 items-center justify-center"><IconRenderer name={item.icon} className="h-5 w-5" /></span>
                  <span className="text-[10px] uppercase tracking-wide text-stone-300">{item.label}</span>
                  <span className="text-sm font-semibold underline underline-offset-2">{item.value}</span>
                </button>
              ) : (
                <div
                  key={`${item.label}-${index}`}
                  className={`${shared} border-r border-white/10 last:border-r-0`}
                >
                  <span className="flex h-6 w-6 items-center justify-center"><IconRenderer name={item.icon} className="h-5 w-5" /></span>
                  <span className="text-[10px] uppercase tracking-wide text-stone-300">{item.label}</span>
                  <span className="text-sm font-semibold">{item.value}</span>
                </div>
              );
            })}
          </div>

          <div className="p-4">
            <div className="rounded-[26px] bg-white/8 p-4 shadow-lg ring-1 ring-white/10 backdrop-blur-sm">
              {activePage === "language" ? (
                <>
                  <p className="text-xs uppercase tracking-[0.32em] text-amber-100/80">
                    {guideContent.propertyTagline}
                  </p>
                  <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#f7ead7]">
                    {content.welcome}
                  </h1>
                  <p className="mt-3 text-sm leading-6 text-stone-200">
                    {content.chooseLanguage}
                  </p>
                </>
              ) : activePage === "home" ? (
                <>
                  <p className="text-xs uppercase tracking-[0.32em] text-amber-100/80">
                    {guideContent.propertyTagline}
                  </p>
                  <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#f7ead7]">
                    {content.hostTitle}
                  </h1>
                  <p className="mt-3 text-sm leading-6 text-stone-200">
                    {content.hostDescription}
                  </p>
                  <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                    <button
                      type="button"
                      onClick={() => openPage(guideContent.hostPage.id)}
                      className="whitespace-nowrap rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/15 transition hover:bg-white/20"
                    >
                      {content.contactsHost}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={goHome}
                    className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-medium text-white transition hover:bg-white/15"
                  >
                    {content.back}
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl">
                      {isHostPage ? <IconRenderer name="user" className="h-6 w-6" /> : activeHeaderItem?.emoji}
                    </div>
                    <div>
                      <h1 className="text-2xl font-semibold tracking-tight text-[#f7ead7]">
                        {isHostPage ? guideContent.hostPage.title : activeHeaderItem?.sectionTitle || activeHeaderItem?.title}
                      </h1>
                      <p className="mt-1 text-sm text-stone-200">
                        {isHostPage ? guideContent.hostPage.subtitle : activeHeaderItem?.subtitle}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="px-4 pb-24 pt-6">
          {activePage === "language"
            ? renderLanguagePage()
            : activePage === "home"
              ? renderHomePage()
              : isHostPage
                ? renderHostPage()
                : renderDetailPage(activeMenuItem)}
        </main>
      </div>

      {activePage !== "language" ? (
        <nav className="fixed bottom-4 left-1/2 z-20 w-[calc(100%-1rem)] max-w-sm -translate-x-1/2 px-2">
          <div className="grid grid-cols-5 rounded-[24px] border border-white/60 bg-white/90 px-2 py-2 shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl">
            {content.bottomNav.map((item, index) => {
              const isActive = activePage === item.pageId;
              return (
                <button
                  key={`${item.label}-${index}`}
                  type="button"
                  onClick={() =>
                    item.pageId === "home"
                      ? goHome()
                      : item.pageId === "language"
                        ? openLanguage()
                        : openPage(item.pageId)
                  }
                  className={`flex flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2 text-center transition duration-300 active:scale-[0.96] ${
                    isActive ? "bg-[#f8f3ec] text-[#7d5420] shadow-sm" : "text-[#9b7a4f] hover:bg-[#f8f3ec]"
                  }`}
                >
                  <span className="flex h-5 w-5 items-center justify-center"><IconRenderer name={item.icon} className="h-4.5 w-4.5" /></span>
                  <span className="text-[11px] leading-none">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      ) : null}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default AStareGuideUI;
