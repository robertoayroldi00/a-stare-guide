import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "exclusive-italia-guide-editor";

// MODIFICA SOLO QUESTO BLOCCO PER CAMBIARE TUTTA LA GUIDA
// Qui puoi aggiornare testi, contatti, pulsanti, menu e navigazione senza toccare il resto del codice.
const guideContent = {
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Molfetta",
  hostPage: {
    id: "host",
    title: "Roberto Ayroldi",
    subtitle: "I nostri contatti",
    description: "+39.351.842.8654\n+39.327.180.5293\nhttps://exclusiveitaliahost.com/",
    phone: "+393000000000",
    whatsapp: "https://wa.me/393000000000",
    email: "host@example.com",
    ctaUrl: "",
    ctaLabel: "",
  },
  heroImages: [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
  ],
  quickInfo: [
    { icon: "🔑", label: "Check-in", value: "15:00" },
    { icon: "🚪", label: "Check-out", value: "10:00" },
    { icon: "📶", label: "WiFi", value: "24Mbps" },
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
    },
    {
      id: "muoversi",
      emoji: "🚀",
      title: "Come muoversi",
      subtitle: "Treno, traghetti, taxi, aeroporto",
      sectionTitle: "Come muoversi",
      sectionText:
        "Muoversi a Molfetta è semplice grazie ai collegamenti con treni, autobus e servizi privati.\n\nA piedi\nIl centro storico, il porto e il lungomare sono facilmente raggiungibili a piedi. Molte attrazioni, ristoranti e negozi si trovano a breve distanza tra loro.\n\nTreno\nLa stazione ferroviaria di Molfetta collega la città con Bari, Barletta, Trani e altre località della costa. I treni regionali sono frequenti e permettono di raggiungere Bari Centrale in circa 20 minuti.\n\nAutobus\nIl servizio di autobus urbani collega le diverse zone della città. Sono presenti fermate in vari punti strategici, utili per spostarsi verso quartieri residenziali e zone periferiche.\n\nTaxi\nI taxi sono disponibili presso la stazione ferroviaria e nel centro cittadino. È possibile prenotarli telefonicamente o tramite app dedicate.\n\nAeroporto\nL’aeroporto di Bari Karol Wojtyła dista circa 20 chilometri da Molfetta. È raggiungibile in auto o taxi in circa 25 minuti, oppure in treno con collegamento fino alla stazione di Bari Centrale e successivo trasferimento verso l’aeroporto.\n\nAuto\nPer chi viaggia in auto, Molfetta è collegata facilmente tramite la SS16 Adriatica e l’autostrada A14, rendendo semplici gli spostamenti verso le principali destinazioni della Puglia.",
      ctaLabel: "",
      ctaUrl: "",
    },
  ],
  bottomNav: [
    { icon: "🏠", label: "Home", pageId: "home" },
    { icon: "🛏️", label: "Soggiorno", pageId: "soggiorno" },
    { icon: "🗺️", label: "Luoghi", pageId: "luoghi" },
    { icon: "🍽️", label: "Mangiare", pageId: "mangiare" },
    { icon: "🚗", label: "Muoversi", pageId: "muoversi" },
  ],
};

const fallbackData = JSON.parse(JSON.stringify(guideContent));

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function normalizeData(input) {
  const source = isObject(input) ? input : {};
  const hostPage = isObject(source.hostPage) ? source.hostPage : {};

  return {
    ...fallbackData,
    ...source,
    hostPage: {
      ...fallbackData.hostPage,
      ...hostPage,
    },
    heroImages: Array.isArray(source.heroImages) ? source.heroImages : fallbackData.heroImages,
    quickInfo: Array.isArray(source.quickInfo) ? source.quickInfo : fallbackData.quickInfo,
    menuItems: Array.isArray(source.menuItems) ? source.menuItems : fallbackData.menuItems,
    bottomNav: Array.isArray(source.bottomNav) ? source.bottomNav : fallbackData.bottomNav,
  };
}

function runDevChecks() {
  const a = normalizeData(undefined);
  console.assert(Array.isArray(a.quickInfo), "quickInfo must always be an array");
  console.assert(Array.isArray(a.menuItems), "menuItems must always be an array");

  const b = normalizeData({ hostPage: { title: "Test" }, quickInfo: null });
  console.assert(b.hostPage.title === "Test", "hostPage override should be preserved");
  console.assert(Array.isArray(b.quickInfo), "quickInfo fallback should be restored");
}

if (typeof window !== "undefined") {
  runDevChecks();
}

function loadInitialData() {
  if (typeof window === "undefined") return normalizeData(guideContent);

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return normalizeData(guideContent);
    return normalizeData(JSON.parse(saved));
  } catch {
    return normalizeData(guideContent);
  }
}

export default function AStareGuideUI() {
  const [data, setData] = useState(() => loadInitialData());
  const [isEditMode, setIsEditMode] = useState(true);
  const [saveMessage, setSaveMessage] = useState("");
  const [activePage, setActivePage] = useState("home");
  const [jsonDraft, setJsonDraft] = useState("");

  const safeData = useMemo(() => normalizeData(data), [data]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(safeData));
    setSaveMessage("Modifiche salvate automaticamente");
    const timeout = window.setTimeout(() => setSaveMessage(""), 1500);
    return () => window.clearTimeout(timeout);
  }, [safeData]);

  useEffect(() => {
    setJsonDraft(JSON.stringify(safeData, null, 2));
  }, [safeData]);

  const activeMenuItem = useMemo(
    () => safeData.menuItems.find((item) => item.id === activePage) || null,
    [activePage, safeData.menuItems]
  );

  const isHostPage = activePage === (safeData.hostPage?.id || "host");
  const activeHeaderItem = isHostPage
    ? {
        emoji: "👤",
        sectionTitle: safeData.hostPage?.title,
        title: safeData.hostPage?.title,
        subtitle: safeData.hostPage?.subtitle,
      }
    : activeMenuItem;

  const openPage = (pageId) => setActivePage(pageId);
  const goHome = () => setActivePage("home");

  const openMaps = () => {
    window.open(
      safeData.mapUrl || "https://www.google.com/maps/search/?api=1&query=Molfetta",
      "_blank",
      "noreferrer"
    );
  };

  const updateQuickInfo = (index, field, value) => {
    setData((prev) => {
      const next = [...normalizeData(prev).quickInfo];
      next[index] = { ...next[index], [field]: value };
      return { ...normalizeData(prev), quickInfo: next };
    });
  };

  const updateMenuItem = (index, field, value) => {
    setData((prev) => {
      const next = [...normalizeData(prev).menuItems];
      next[index] = { ...next[index], [field]: value };
      return { ...normalizeData(prev), menuItems: next };
    });
  };

  const updateBottomNav = (index, field, value) => {
    setData((prev) => {
      const next = [...normalizeData(prev).bottomNav];
      next[index] = { ...next[index], [field]: value };
      return { ...normalizeData(prev), bottomNav: next };
    });
  };

  const updateHostPage = (field, value) => {
    setData((prev) => ({
      ...normalizeData(prev),
      hostPage: { ...normalizeData(prev).hostPage, [field]: value },
    }));
  };

  const importJson = () => {
    const userInput = window.prompt("Incolla qui il JSON da importare", jsonDraft);
    if (!userInput) return;

    try {
      const parsed = JSON.parse(userInput);
      setData(normalizeData(parsed));
    } catch {
      window.alert("JSON non valido. Controlla la sintassi e riprova.");
    }
  };

  const resetData = () => {
    const confirmed = window.confirm("Vuoi ripristinare il contenuto iniziale?");
    if (confirmed) {
      window.localStorage.removeItem(STORAGE_KEY);
      setData(normalizeData(guideContent));
      setActivePage("home");
    }
  };

  const copyJson = async () => {
    try {
      await navigator.clipboard.writeText(jsonDraft);
      window.alert("JSON copiato negli appunti.");
    } catch {
      window.alert("Copia non riuscita.");
    }
  };

  const applyJsonDraft = () => {
    try {
      const parsed = JSON.parse(jsonDraft);
      setData(normalizeData(parsed));
    } catch {
      window.alert("Il JSON contiene errori e non può essere applicato.");
    }
  };

  const renderHomePage = () => (
    <section>
      <h2 className="text-4xl font-semibold tracking-tight text-[#3a2a1d]">
        Esplora la guida
      </h2>
      <p className="mt-1 text-base text-[#9f8f7c]">Tutto quello che ti serve in un tap</p>

      <div className="mt-6 space-y-4">
        {safeData.menuItems.map((item, index) => (
          <button
            key={`${item.title}-${index}`}
            type="button"
            onClick={() => openPage(item.id)}
            className="group flex w-full items-center gap-4 rounded-[20px] border border-stone-200 bg-white px-4 py-4 text-left shadow-[0_8px_24px_rgba(50,40,20,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(50,40,20,0.12)] focus:outline-none focus:ring-2 focus:ring-amber-700/30"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f3e8dc] text-2xl">
              {item.emoji}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-[1.35rem] font-semibold leading-tight text-[#29221d]">
                {item.title}
              </h3>
              <p className="mt-1 truncate text-sm text-[#8d7f72]">{item.subtitle}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f2eee8] text-lg text-[#b48246] transition group-hover:translate-x-0.5">
              ›
            </div>
          </button>
        ))}
      </div>
    </section>
  );

  const renderDetailPage = (item) => {
    if (!item) {
      return (
        <section>
          <button
            type="button"
            onClick={goHome}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 shadow-sm transition hover:bg-stone-50"
          >
            ← Torna alla home
          </button>
          <div className="rounded-[24px] border border-stone-200 bg-white p-5 shadow-[0_8px_24px_rgba(50,40,20,0.08)]">
            <h2 className="text-2xl font-semibold text-[#2e241d]">Pagina non disponibile</h2>
            <p className="mt-3 text-sm leading-7 text-[#5f5449]">
              Il contenuto richiesto non è disponibile. Torna alla home e seleziona una voce valida.
            </p>
          </div>
        </section>
      );
    }

    return (
      <section>
        <button
          type="button"
          onClick={goHome}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 shadow-sm transition hover:bg-stone-50"
        >
          ← Torna alla home
        </button>

        <div className="rounded-[24px] border border-stone-200 bg-white p-5 shadow-[0_8px_24px_rgba(50,40,20,0.08)]">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#f3e8dc] text-3xl">
              {item.emoji}
            </div>
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-[#2e241d]">
                {item.sectionTitle || item.title}
              </h2>
              <p className="mt-2 text-sm text-[#9a8b7c]">{item.subtitle}</p>
            </div>
          </div>

          <div className="mt-6 rounded-[20px] bg-[#f8f3ec] p-4">
            <p className="whitespace-pre-line text-sm leading-7 text-[#5f5449]">{item.sectionText}</p>

            {item.ctaLabel && item.ctaUrl ? (
              <a
                href={item.ctaUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#8f5f18] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
              >
                {item.ctaLabel}
                <span>↗</span>
              </a>
            ) : null}
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

      <div className="rounded-[24px] border border-stone-200 bg-white p-5 shadow-[0_8px_24px_rgba(50,40,20,0.08)]">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#f3e8dc] text-3xl">
            👤
          </div>
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-[#2e241d]">
              {safeData.hostPage?.title}
            </h2>
            <p className="mt-2 text-sm text-[#9a8b7c]">{safeData.hostPage?.subtitle}</p>
          </div>
        </div>

        <div className="mt-6 rounded-[20px] bg-[#f8f3ec] p-4">
          <p className="whitespace-pre-line text-sm leading-7 text-[#5f5449]">
            {safeData.hostPage?.description}
          </p>

          {safeData.hostPage?.ctaLabel && safeData.hostPage?.ctaUrl ? (
            <a
              href={safeData.hostPage.ctaUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#8f5f18] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
            >
              {safeData.hostPage.ctaLabel}
              <span>↗</span>
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-stone-950 p-4 text-stone-900">
      <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[380px_minmax(320px,430px)_1fr]">
        <aside className="rounded-[28px] border border-stone-200 bg-white p-5 shadow-2xl">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-stone-500">Editor</p>
              <h2 className="mt-1 text-2xl font-semibold text-stone-900">Contenuti modificabili</h2>
              <p className="mt-2 text-sm text-stone-500">
                Modifica i campi qui sotto e la guida si aggiorna subito, senza toccare il codice.
              </p>
              {saveMessage ? (
                <p className="mt-2 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                  {saveMessage}
                </p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => setIsEditMode((prev) => !prev)}
              className="rounded-full border border-stone-300 px-4 py-2 text-sm font-medium transition hover:bg-stone-50"
            >
              {isEditMode ? "Nascondi editor" : "Mostra editor"}
            </button>
          </div>

          {isEditMode && (
            <div className="mt-5 max-h-[80vh] space-y-5 overflow-y-auto pr-1">
              <section className="rounded-2xl bg-amber-50 p-4 ring-1 ring-amber-100">
                <h3 className="text-sm font-semibold text-stone-900">Come funziona questo editor</h3>
                <div className="mt-3 space-y-2 text-sm leading-6 text-stone-600">
                  <p>1. Modifica i testi nei campi qui sotto.</p>
                  <p>2. Guarda l’anteprima al centro: si aggiorna subito.</p>
                  <p>3. Le modifiche vengono salvate automaticamente nel browser.</p>
                  <p>4. Quando vuoi tornare alla versione iniziale, usa “Ripristina”.</p>
                </div>
              </section>

              <section className="rounded-2xl bg-stone-50 p-4">
                <h3 className="text-sm font-semibold text-stone-900">Testata host</h3>
                <div className="mt-3 space-y-3">
                  <label className="block text-sm">
                    <span className="mb-1 block text-stone-600">Titolo</span>
                    <input
                      className="w-full rounded-xl border border-stone-300 px-3 py-2 outline-none focus:border-stone-500"
                      value={safeData.hostTitle}
                      onChange={(e) => setData((prev) => ({ ...normalizeData(prev), hostTitle: e.target.value }))}
                    />
                  </label>
                  <label className="block text-sm">
                    <span className="mb-1 block text-stone-600">Descrizione</span>
                    <textarea
                      className="min-h-[110px] w-full rounded-xl border border-stone-300 px-3 py-2 outline-none focus:border-stone-500"
                      value={safeData.hostDescription}
                      onChange={(e) =>
                        setData((prev) => ({ ...normalizeData(prev), hostDescription: e.target.value }))
                      }
                    />
                  </label>
                  <label className="block text-sm">
                    <span className="mb-1 block text-stone-600">Pulsante host</span>
                    <input
                      className="w-full rounded-xl border border-stone-300 px-3 py-2 outline-none focus:border-stone-500"
                      value={safeData.hostButton}
                      onChange={(e) => setData((prev) => ({ ...normalizeData(prev), hostButton: e.target.value }))}
                    />
                  </label>
                </div>
              </section>

              <section className="rounded-2xl bg-stone-50 p-4">
                <h3 className="text-sm font-semibold text-stone-900">Naviga e Google Maps</h3>
                <div className="mt-3 space-y-3">
                  <label className="block text-sm">
                    <span className="mb-1 block text-stone-600">Link Google Maps</span>
                    <input
                      className="w-full rounded-xl border border-stone-300 px-3 py-2 outline-none focus:border-stone-500"
                      value={safeData.mapUrl || ""}
                      onChange={(e) => setData((prev) => ({ ...normalizeData(prev), mapUrl: e.target.value }))}
                      placeholder="https://www.google.com/maps/search/?api=1&query=Molfetta"
                    />
                  </label>
                </div>
              </section>

              <section className="rounded-2xl bg-stone-50 p-4">
                <h3 className="text-sm font-semibold text-stone-900">Pagina contatti host</h3>
                <div className="mt-3 space-y-3">
                  <label className="block text-sm">
                    <span className="mb-1 block text-stone-600">ID pagina host</span>
                    <input
                      className="w-full rounded-xl border border-stone-300 px-3 py-2 outline-none focus:border-stone-500"
                      value={safeData.hostPage?.id || ""}
                      onChange={(e) => updateHostPage("id", e.target.value)}
                    />
                  </label>
                  <label className="block text-sm">
                    <span className="mb-1 block text-stone-600">Titolo pagina host</span>
                    <input
                      className="w-full rounded-xl border border-stone-300 px-3 py-2 outline-none focus:border-stone-500"
                      value={safeData.hostPage?.title || ""}
                      onChange={(e) => updateHostPage("title", e.target.value)}
                    />
                  </label>
                  <label className="block text-sm">
                    <span className="mb-1 block text-stone-600">Sottotitolo pagina host</span>
                    <input
                      className="w-full rounded-xl border border-stone-300 px-3 py-2 outline-none focus:border-stone-500"
                      value={safeData.hostPage?.subtitle || ""}
                      onChange={(e) => updateHostPage("subtitle", e.target.value)}
                    />
                  </label>
                  <label className="block text-sm">
                    <span className="mb-1 block text-stone-600">Descrizione contatti</span>
                    <textarea
                      className="min-h-[110px] w-full rounded-xl border border-stone-300 px-3 py-2 outline-none focus:border-stone-500"
                      value={safeData.hostPage?.description || ""}
                      onChange={(e) => updateHostPage("description", e.target.value)}
                    />
                  </label>
                  <label className="block text-sm">
                    <span className="mb-1 block text-stone-600">Testo pulsante contatti</span>
                    <input
                      className="w-full rounded-xl border border-stone-300 px-3 py-2 outline-none focus:border-stone-500"
                      value={safeData.hostPage?.ctaLabel || ""}
                      onChange={(e) => updateHostPage("ctaLabel", e.target.value)}
                    />
                  </label>
                  <label className="block text-sm">
                    <span className="mb-1 block text-stone-600">URL pulsante contatti</span>
                    <input
                      className="w-full rounded-xl border border-stone-300 px-3 py-2 outline-none focus:border-stone-500"
                      value={safeData.hostPage?.ctaUrl || ""}
                      onChange={(e) => updateHostPage("ctaUrl", e.target.value)}
                    />
                  </label>
                </div>
              </section>

              <section className="rounded-2xl bg-stone-50 p-4">
                <h3 className="text-sm font-semibold text-stone-900">Info rapide</h3>
                <div className="mt-3 space-y-3">
                  {safeData.quickInfo.map((item, index) => (
                    <div
                      key={`${item.label}-${index}`}
                      className="rounded-2xl border border-stone-200 bg-white p-3"
                    >
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          className="rounded-xl border border-stone-300 px-3 py-2 text-sm outline-none focus:border-stone-500"
                          value={item.icon}
                          onChange={(e) => updateQuickInfo(index, "icon", e.target.value)}
                          placeholder="Icona"
                        />
                        <input
                          className="rounded-xl border border-stone-300 px-3 py-2 text-sm outline-none focus:border-stone-500"
                          value={item.label}
                          onChange={(e) => updateQuickInfo(index, "label", e.target.value)}
                          placeholder="Etichetta"
                        />
                        <input
                          className="rounded-xl border border-stone-300 px-3 py-2 text-sm outline-none focus:border-stone-500"
                          value={item.value}
                          onChange={(e) => updateQuickInfo(index, "value", e.target.value)}
                          placeholder="Valore"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl bg-stone-50 p-4">
                <h3 className="text-sm font-semibold text-stone-900">Card e pagine dedicate</h3>
                <div className="mt-3 space-y-4">
                  {safeData.menuItems.map((item, index) => (
                    <div
                      key={`${item.title}-${index}`}
                      className="rounded-2xl border border-stone-200 bg-white p-3"
                    >
                      <div className="grid gap-2">
                        <input
                          className="rounded-xl border border-stone-300 px-3 py-2 text-sm outline-none focus:border-stone-500"
                          value={item.id}
                          onChange={(e) => updateMenuItem(index, "id", e.target.value)}
                          placeholder="ID pagina"
                        />
                        <input
                          className="rounded-xl border border-stone-300 px-3 py-2 text-sm outline-none focus:border-stone-500"
                          value={item.emoji}
                          onChange={(e) => updateMenuItem(index, "emoji", e.target.value)}
                          placeholder="Emoji"
                        />
                        <input
                          className="rounded-xl border border-stone-300 px-3 py-2 text-sm outline-none focus:border-stone-500"
                          value={item.title}
                          onChange={(e) => updateMenuItem(index, "title", e.target.value)}
                          placeholder="Titolo card"
                        />
                        <input
                          className="rounded-xl border border-stone-300 px-3 py-2 text-sm outline-none focus:border-stone-500"
                          value={item.subtitle}
                          onChange={(e) => updateMenuItem(index, "subtitle", e.target.value)}
                          placeholder="Sottotitolo"
                        />
                        <input
                          className="rounded-xl border border-stone-300 px-3 py-2 text-sm outline-none focus:border-stone-500"
                          value={item.sectionTitle}
                          onChange={(e) => updateMenuItem(index, "sectionTitle", e.target.value)}
                          placeholder="Titolo pagina"
                        />
                        <textarea
                          className="min-h-[100px] rounded-xl border border-stone-300 px-3 py-2 text-sm outline-none focus:border-stone-500"
                          value={item.sectionText}
                          onChange={(e) => updateMenuItem(index, "sectionText", e.target.value)}
                          placeholder="Testo pagina"
                        />
                        <input
                          className="rounded-xl border border-stone-300 px-3 py-2 text-sm outline-none focus:border-stone-500"
                          value={item.ctaLabel || ""}
                          onChange={(e) => updateMenuItem(index, "ctaLabel", e.target.value)}
                          placeholder="Testo pulsante link, es. Cliccare qui"
                        />
                        <input
                          className="rounded-xl border border-stone-300 px-3 py-2 text-sm outline-none focus:border-stone-500"
                          value={item.ctaUrl || ""}
                          onChange={(e) => updateMenuItem(index, "ctaUrl", e.target.value)}
                          placeholder="URL pulsante"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl bg-stone-50 p-4">
                <h3 className="text-sm font-semibold text-stone-900">Bottom navigation</h3>
                <div className="mt-3 space-y-3">
                  {safeData.bottomNav.map((item, index) => (
                    <div
                      key={`${item.label}-${index}`}
                      className="rounded-2xl border border-stone-200 bg-white p-3"
                    >
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          className="rounded-xl border border-stone-300 px-3 py-2 text-sm outline-none focus:border-stone-500"
                          value={item.icon}
                          onChange={(e) => updateBottomNav(index, "icon", e.target.value)}
                          placeholder="Icona"
                        />
                        <input
                          className="rounded-xl border border-stone-300 px-3 py-2 text-sm outline-none focus:border-stone-500"
                          value={item.label}
                          onChange={(e) => updateBottomNav(index, "label", e.target.value)}
                          placeholder="Etichetta"
                        />
                        <input
                          className="rounded-xl border border-stone-300 px-3 py-2 text-sm outline-none focus:border-stone-500"
                          value={item.pageId}
                          onChange={(e) => updateBottomNav(index, "pageId", e.target.value)}
                          placeholder="ID pagina"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl bg-stone-50 p-4">
                <h3 className="text-sm font-semibold text-stone-900">Azioni rapide</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={importJson}
                    className="rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
                  >
                    Importa JSON
                  </button>
                  <button
                    type="button"
                    onClick={resetData}
                    className="rounded-xl border border-stone-300 px-4 py-2 text-sm font-medium transition hover:bg-white"
                  >
                    Ripristina
                  </button>
                </div>
              </section>
            </div>
          )}
        </aside>

        <div className="mx-auto w-full max-w-sm overflow-hidden rounded-[28px] border border-stone-300 bg-[#f4f0ea] shadow-2xl">
          <header className="bg-gradient-to-br from-[#1e0d05] via-[#2a1408] to-[#4b270f] text-white">
            <div className="grid grid-cols-4 border-b border-white/10">
              {safeData.quickInfo.map((item, index) => {
                const isMapsTile = item.label?.toLowerCase() === "naviga";

                return isMapsTile ? (
                  <button
                    key={`${item.label}-${index}`}
                    type="button"
                    onClick={openMaps}
                    className="flex min-h-[92px] flex-col items-center justify-center gap-1 border-r border-white/10 px-2 text-center transition hover:bg-white/5 last:border-r-0"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-[10px] uppercase tracking-wide text-stone-300">
                      {item.label}
                    </span>
                    <span className="text-sm font-semibold text-white">{item.value}</span>
                  </button>
                ) : (
                  <div
                    key={`${item.label}-${index}`}
                    className="flex min-h-[92px] flex-col items-center justify-center gap-1 border-r border-white/10 px-2 text-center last:border-r-0"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-[10px] uppercase tracking-wide text-stone-300">
                      {item.label}
                    </span>
                    <span className="text-sm font-semibold text-white">{item.value}</span>
                  </div>
                );
              })}
            </div>

            <div className="p-4">
              <div className="rounded-[22px] bg-white/6 p-4 shadow-lg ring-1 ring-white/10 backdrop-blur-sm">
                {activePage === "home" ? (
                  <>
                    <h1 className="text-3xl font-semibold tracking-tight text-[#f7ead7]">
                      {safeData.hostTitle}
                    </h1>
                    <p className="mt-3 text-sm leading-6 text-stone-200">{safeData.hostDescription}</p>
                    <button
                      type="button"
                      className="mt-4 rounded-full border border-amber-400/25 bg-gradient-to-r from-[#b9852f] to-[#8f5f18] px-4 py-2 text-sm font-medium text-[#fff2cf] shadow-md transition hover:scale-[1.02] hover:shadow-lg"
                      onClick={() => openPage(safeData.hostPage?.id || "host")}
                    >
                      {safeData.hostButton}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={goHome}
                      className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-medium text-white transition hover:bg-white/15"
                    >
                      ← Torna indietro
                    </button>
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl">
                        {activeHeaderItem?.emoji}
                      </div>
                      <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-[#f7ead7]">
                          {activeHeaderItem?.sectionTitle || activeHeaderItem?.title}
                        </h1>
                        <p className="mt-1 text-sm text-stone-200">{activeHeaderItem?.subtitle}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </header>

          <main className="px-4 pb-24 pt-8">
            {activePage === "home"
              ? renderHomePage()
              : isHostPage
                ? renderHostPage()
                : renderDetailPage(activeMenuItem)}
          </main>
        </div>

        <div className="rounded-[28px] border border-stone-200 bg-white p-5 shadow-2xl">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-stone-500">JSON</p>
              <h2 className="mt-1 text-2xl font-semibold text-stone-900">Struttura dati</h2>
              <p className="mt-2 text-sm text-stone-500">
                Qui puoi incollare o copiare tutta la configurazione della guida in un solo colpo.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={copyJson}
                className="rounded-full border border-stone-300 px-4 py-2 text-sm font-medium transition hover:bg-stone-50"
              >
                Copia JSON
              </button>
              <button
                type="button"
                onClick={applyJsonDraft}
                className="rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
              >
                Applica JSON
              </button>
            </div>
          </div>

          <textarea
            className="mt-5 min-h-[78vh] w-full rounded-2xl border border-stone-300 bg-stone-50 p-4 font-mono text-xs leading-6 outline-none focus:border-stone-500"
            value={jsonDraft}
            onChange={(e) => setJsonDraft(e.target.value)}
          />
        </div>
      </div>

      <nav className="fixed bottom-4 left-1/2 z-20 w-[calc(100%-1rem)] max-w-sm -translate-x-1/2 px-2">
        <div className="grid grid-cols-5 rounded-[20px] border border-stone-200 bg-white/95 px-2 py-2 shadow-2xl backdrop-blur">
          {safeData.bottomNav.map((item, index) => {
            const isActive = activePage === item.pageId;

            return (
              <button
                key={`${item.label}-${index}`}
                type="button"
                onClick={() => (item.pageId === "home" ? goHome() : openPage(item.pageId))}
                className={`flex flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-center transition ${
                  isActive ? "bg-[#f8f3ec] text-[#7d5420]" : "text-[#9b7a4f] hover:bg-[#f8f3ec]"
                }`}
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
