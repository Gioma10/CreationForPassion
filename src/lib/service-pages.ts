export type ServicePageContent = {
  eyebrow: string;
  title: string;
  intro: string;
  offers: { title: string; text: string }[];
  includes: string[];
  steps: { title: string; text: string }[];
  cta: { title: string; text: string };
};

// TODO: have the owner review this copy; it is a first draft built from the site descriptions.
export const allestimenti: ServicePageContent = {
  eyebrow: "Allestimenti a Catania",
  title: "Allestimenti pensati su misura per il tuo evento",
  intro:
    "Matrimoni, battesimi, comunioni, compleanni e feste: progettiamo e realizziamo ogni allestimento partendo da te, dai tuoi colori e dalla storia che vuoi raccontare.",
  offers: [
    {
      title: "Matrimoni",
      text: "Tavoli, centrotavola e dettagli floreali coordinati, per un giorno che ti somigli in ogni angolo.",
    },
    {
      title: "Battesimi e comunioni",
      text: "Atmosfere delicate, colori tenui e piccoli dettagli fatti a mano per festeggiare in famiglia.",
    },
    {
      title: "Compleanni e feste",
      text: "Allestimenti a tema per ogni età, dal primo compleanno alle feste con gli amici.",
    },
  ],
  includes: [
    "Centrotavola e decorazioni floreali",
    "Tableau e segnaposto",
    "Confettata e sweet table",
    "Backdrop e angoli foto",
    "Bomboniere coordinate",
    "Allestimento e smontaggio in location",
  ],
  steps: [
    {
      title: "Ci racconti l'evento",
      text: "Data, location, numero di ospiti e lo stile che hai in mente.",
    },
    {
      title: "Progettiamo insieme",
      text: "Ti proponiamo colori, materiali e dettagli, e li definiamo con te.",
    },
    {
      title: "Allestiamo per te",
      text: "Il giorno dell'evento pensiamo a tutto noi: tu devi solo goderti la festa.",
    },
  ],
  cta: {
    title: "Raccontaci il tuo evento",
    text: "Scrivici su WhatsApp: ti rispondiamo con qualche idea e un preventivo su misura.",
  },
};
