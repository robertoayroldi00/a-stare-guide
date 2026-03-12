import { useMemo, useState } from "react";

// MODIFICA SOLO QUESTO BLOCCO PER CAMBIARE TUTTA LA GUIDA
const guideContent = {
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Molfetta",
  hostPage: {
    id: "host",
    title: "Roberto Ayroldi",
    subtitle: "I nostri contatti",
    description: "+39.351.482.8654\n+39.327.180.5293\nhttps://exclusiveitaliahost.com/",
    phone: "+393514828654",
    whatsapp: "https://wa.me/393514828654",
    email: "info@exclusiveitaliahost.com",
    ctaUrl: "https://exclusiveitaliahost.com/",
    ctaLabel: "Visita il sito",
  },
  quickInfo: [
    { icon: "🔑", label: "Check-in", value: "15:00" },
    { icon: "🚪", label: "Check-out", value: "10:00" },
    { icon: "📶", label: "WiFi", value: "24 Mbps" },
    { icon: "🧭", label: "Naviga", value: "Maps" },
  ],
  hostTitle: "Benvenuto! 👋",
  hostDescription:
    "Sono Roberto Ayroldi, e ti do il benvenuto nella mia struttura nel cuore del centro storico di Molfetta. Siamo sempre disponibili per qualsiasi esigenza!",
  hostButton: "★ Roberto",
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
      accent: "from-amber-100 to-orange-50",
    },
    {
      id: "luoghi",
      emoji: "🗺️",
      title: "Attrazioni di Molfetta",
      subtitle: "I luoghi imperdibili a pochi passi",
      sectionTitle: "Attrazioni di Molfetta",
      sectionText: "Abbiamo creato una guida con tutti i luoghi d'interesse della nostra Molfetta.",
      ctaLabel: "Cliccare qui",
      ctaUrl: "https://exclusiveitaliahost.com/scopri-molfetta-centro-storico/",
      accent: "from-sky-100 to-cyan-50",
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
      accent: "from-rose-100 to-pink-50",
    },
    {
      id: "muoversi",
      emoji: "🚗",
      title: "Come muoversi",
      subtitle: "Treno, taxi, aeroporto",
      sectionTitle: "Come muoversi",
      sectionText:
        "Muoversi a Molfetta è semplice grazie ai collegamenti con treni, autobus e servizi privati.\n\nA piedi\nIl centro storico, il porto e il lungomare sono facilmente raggiungibili a piedi. Molte attrazioni, ristoranti e negozi si trovano a breve distanza tra loro.\n\nTreno\nLa stazione ferroviaria di Molfetta collega la città con Bari, Barletta, Trani e altre località della costa. I treni regionali sono frequenti e permettono di raggiungere Bari Centrale in circa 20 minuti.\n\nAutobus\nIl servizio di autobus urbani collega le diverse zone della città. Sono presenti fermate in vari punti strategici, utili per spostarsi verso quartieri residenziali e zone periferiche.\n\nTaxi\nI taxi sono disponibili presso la stazione ferroviaria e nel centro cittadino. È possibile prenotarli telefonicamente o tramite app dedicate.\n\nAeroporto\nL’aeroporto di Bari Karol Wojtyła dista circa 20 chilometri da Molfetta. È raggiungibile in auto o taxi in circa 25 minuti, oppure in treno con collegamento fino alla stazione di Bari Centrale e successivo trasferimento verso l’aeroporto.\n\nAuto\nPer chi viaggia in auto, Molfetta è collegata facilmente tramite la SS16 Adriatica e l’autostrada A14, rendendo semplici gli spostamenti verso le principali destinazioni della Puglia.",
      ctaLabel: "",
      ctaUrl: "",
      accent: "from-emerald-100 to-teal-50",
    },
  ],
  bottomNav: [
    { icon: "🏠", label: "Home", pageId: "home" },
    { icon: "🛏️", label: "Soggiorno", pageId: "soggiorno" },
    { icon: "🗺️", label: "Luoghi", pageId: "luoghi" },
    { icon: "🍽️", label: "Food", pageId: "mangiare" },
    { icon: "🚗", label: "Move", pageId: "muoversi" },
  ],
};

function AStareGuideUI() {
  const [activePage, setActivePage] = useState("home");

  const activeMenuItem = useMemo(
    () => guideContent.menuItems.find((item) => item.id === activePage) || null,
    [activePage]
  );

  const isHostPage = activePage === (guideContent.hostPage?.id || "host");
  const activeHeaderItem = isHostPage
    ? {
        emoji: "👤",
        sectionTitle: guideContent.hostPage?.title,
        title: guideContent.hostPage?.title,
        subtitle: guideContent.hostPage?.subtitle,
      }
    : activeMenuItem;

  const openPage = (pageId) => setActivePage(pageId);
  const goHome = () => setActivePage("home");
  const openMaps = () => {
    window.open(guideContent.mapUrl, "_blank", "noreferrer");
  };

  const ActionPills = () => (
    <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
      <button
        type="button"
        onClick={() => openPage(guideContent.hostPage?.id || "host")}
        className="whitespace-nowrap rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/15 transition hover:bg-white/20"
      >
        Contatti host
      </button>
      <button
        type="button"
        onClick={openMaps}
        className="whitespace-nowrap rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/10 transition hover:bg-white/15"
      >
        Apri Maps
      </button>
    </div>
  );

  const renderHomePage = () => (
    <section>
      <div className="mb-5 rounded-[24px] bg-gradient-to-br from-[#fff7eb] to-[#f6eee4] p-5 ring-1 ring-stone-200">
        <p className="text-xs uppercase tracking-[0.28em] text-[#a07c52]">Guest guide</p>
        <h2 className="mt-2 text-4xl font-semibold tracking-tight text-[#3a2a1d]">Esplora la guida</h2>
        <p className="mt-2 text-sm leading-6 text-[#7e7063]">
          Tutto quello che ti serve durante il soggiorno, ottimizzato per essere consultato velocemente da mobile.
        </p>
      </div>

      <div className="space-y-4">
        {guideContent.menuItems.map((item, index) => (
          <button
            key={`${item.title}-${index}`}
            type="button"
            onClick={() => openPage(item.id)}
            className={`group relative flex w-full items-center gap-4 overflow-hidden rounded-[24px] border border-white/70 bg-gradient-to-br ${item.accent || "from-stone-100 to-stone-50"} px-4 py-4 text-left shadow-[0_12px_30px_rgba(50,40,20,0.09)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(50,40,20,0.14)] focus:outline-none focus:ring-2 focus:ring-amber-700/30`}
          >
            <div className="absolute inset-y-0 right-0 w-24 bg-white/20 blur-2xl" />
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/70 text-2xl shadow-sm ring-1 ring-white/70">
              {item.emoji}
            </div>
            <div className="relative min-w-0 flex-1">
              <h3 className="truncate text-[1.2rem] font-semibold leading-tight text-[#29221d]">
                {item.title}
              </h3>
              <p className="mt-1 truncate text-sm text-[#6f6257]">{item.subtitle}</p>
            </div>
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/75 text-lg text-[#8d642e] shadow-sm transition group-hover:translate-x-0.5">
              ›
            </div>
          </button>
        ))}
      </div>
    </section>
  );

  const renderDetailPage = (item) => {
    if (!item) return null;

    return (
      <section>
        <button
          type="button"
          onClick={goHome}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 shadow-sm transition hover:bg-stone-50"
        >
          ← Torna alla home
        </button>

        <div className="overflow-hidden rounded-[28px] border border-stone-200 bg-white shadow-[0_12px_32px_rgba(50,40,20,0.1)]">
          <div className={`bg-gradient-to-br ${item.accent || "from-stone-100 to-stone-50"} px-5 py-6`}>
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/75 text-3xl shadow-sm ring-1 ring-white/70">
                {item.emoji}
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
            <div className="rounded-[20px] bg-[#fbf7f1] p-4 ring-1 ring-stone-200">
              <p className="whitespace-pre-line text-sm leading-7 text-[#5f5449]">{item.sectionText}</p>
              {item.ctaLabel && item.ctaUrl ? (
                <a
                  href={item.ctaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#8f5f18] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
                >
                  {item.ctaLabel}
                  <span>↗</span>
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    );
  };

  const renderHostPage = () => (
    <section>
      <button
        type="button"
        onClick={goHome}
        className="mb-5 inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 shadow-sm transition hover:bg-stone-50"
      >
        ← Torna alla home
      </button>

      <div className="overflow-hidden rounded-[28px] border border-stone-200 bg-white shadow-[0_12px_32px_rgba(50,40,20,0.1)]">
        <div className="bg-gradient-to-br from-[#f4eadf] to-[#fff7eb] px-5 py-6">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/80 text-3xl shadow-sm ring-1 ring-white/70">
              👤
            </div>
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-[#2e241d]">
                {guideContent.hostPage?.title}
              </h2>
              <p className="mt-2 text-sm text-[#8a7b6f]">{guideContent.hostPage?.subtitle}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 p-5">
          <div className="rounded-[20px] bg-[#fbf7f1] p-4 ring-1 ring-stone-200">
            <p className="whitespace-pre-line text-sm leading-7 text-[#5f5449]">
              {guideContent.hostPage?.description}
            </p>
          </div>

          <div className="grid gap-3">
            <a
              href={`tel:${guideContent.hostPage?.phone || ""}`}
              className="rounded-2xl bg-[#1f1a17] px-4 py-3 text-center text-sm font-medium text-white shadow-sm"
            >
              Chiama host
            </a>
            <a
              href={guideContent.hostPage?.whatsapp || "#"}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl bg-[#24a159] px-4 py-3 text-center text-sm font-medium text-white shadow-sm"
            >
              WhatsApp
            </a>
            <a
              href={`mailto:${guideContent.hostPage?.email || ""}`}
              className="rounded-2xl bg-[#3f6be0] px-4 py-3 text-center text-sm font-medium text-white shadow-sm"
            >
              Invia email
            </a>
          </div>

          {guideContent.hostPage?.ctaLabel && guideContent.hostPage?.ctaUrl ? (
            <a
              href={guideContent.hostPage.ctaUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#8f5f18] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
            >
              {guideContent.hostPage.ctaLabel}
              <span>↗</span>
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#3b2414_0%,#171411_38%,#121212_100%)] p-3 text-stone-900 sm:p-4">
      <div className="mx-auto w-full max-w-sm overflow-hidden rounded-[32px] border border-white/10 bg-[#f4f0ea] shadow-[0_24px_80px_rgba(0,0,0,0.35)] ring-1 ring-white/10">
        <header className="relative overflow-hidden bg-gradient-to-br from-[#1f1008] via-[#2e1609] to-[#5e3112] text-white">
          <div className="absolute -right-10 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute left-0 top-16 h-28 w-28 rounded-full bg-amber-400/10 blur-3xl" />

          <div className="grid grid-cols-4 border-b border-white/10">
            {guideContent.quickInfo.map((item, index) => {
              const isMapsTile = item.label?.toLowerCase() === "naviga";
              const shared = "flex min-h-[88px] flex-col items-center justify-center gap-1 px-2 text-center text-white";

              return isMapsTile ? (
                <button
                  key={`${item.label}-${index}`}
                  type="button"
                  onClick={openMaps}
                  className={`${shared} border-r border-white/10 transition hover:bg-white/5 last:border-r-0`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-[10px] uppercase tracking-wide text-stone-300">{item.label}</span>
                  <span className="text-sm font-semibold">{item.value}</span>
                </button>
              ) : (
                <div key={`${item.label}-${index}`} className={`${shared} border-r border-white/10 last:border-r-0`}>
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-[10px] uppercase tracking-wide text-stone-300">{item.label}</span>
                  <span className="text-sm font-semibold">{item.value}</span>
                </div>
              );
            })}
          </div>

          <div className="p-4">
            <div className="rounded-[24px] bg-white/8 p-4 shadow-lg ring-1 ring-white/10 backdrop-blur-sm">
              {activePage === "home" ? (
                <>
                  <p className="text-xs uppercase tracking-[0.28em] text-amber-100/80">A Stare</p>
                  <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#f7ead7]">
                    {guideContent.hostTitle}
                  </h1>
                  <p className="mt-3 text-sm leading-6 text-stone-200">{guideContent.hostDescription}</p>
                  <ActionPills />
                </>
              ) : (
                <>
                  <button type="button" onClick={goHome} className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-medium text-white transition hover:bg-white/15">← Torna indietro</button>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl">
                      {activeHeaderItem?.emoji}
                    </div>
                    <div>
                      <h1 className="text-2xl font-semibold tracking-tight text-[#f7ead7]">{activeHeaderItem?.sectionTitle || activeHeaderItem?.title}</h1>
                      <p className="mt-1 text-sm text-stone-200">{activeHeaderItem?.subtitle}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="px-4 pb-24 pt-6">
          {activePage === "home" ? renderHomePage() : isHostPage ? renderHostPage() : renderDetailPage(activeMenuItem)}
        </main>
      </div>

      <nav className="fixed bottom-4 left-1/2 z-20 w-[calc(100%-1rem)] max-w-sm -translate-x-1/2 px-2">
        <div className="grid grid-cols-5 rounded-[22px] border border-white/60 bg-white/90 px-2 py-2 shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl">
          {guideContent.bottomNav.map((item, index) => {
            const isActive = activePage === item.pageId;
            return (
              <button
                key={`${item.label}-${index}`}
                type="button"
                onClick={() => (item.pageId === "home" ? goHome() : openPage(item.pageId))}
                className={`flex flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2 text-center transition ${isActive ? "bg-[#f8f3ec] text-[#7d5420] shadow-sm" : "text-[#9b7a4f] hover:bg-[#f8f3ec]"}`}
              >
                <span className="text-lg leading-none">{item.icon}</span>
                <span className="text-[11px] leading-none">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export default AStareGuideUI;
