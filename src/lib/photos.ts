import type { StaticImageData } from "next/image";
import battesimoAzzurro from "@/assets/photos/allestimenti/allestimento-battesimo-azzurro-angelo.jpg";
import battesimoMinnie from "@/assets/photos/allestimenti/allestimento-battesimo-minnie-rosa.jpg";
import battesimoPiccoloPrincipe from "@/assets/photos/allestimenti/allestimento-battesimo-piccolo-principe.jpg";
import cameraSposa from "@/assets/photos/allestimenti/allestimento-camera-sposa-palloncini.jpg";
import sposiArcoCuore from "@/assets/photos/allestimenti/allestimento-sposi-arco-cuore.jpg";
import tortaPiccoloPrincipe from "@/assets/photos/allestimenti/torta-piccolo-principe-bomboniera.jpg";
import tortaComunione from "@/assets/photos/allestimenti/torta-prima-comunione-piccolo-principe.jpg";
import alberoPlexiglass from "@/assets/photos/artigianato/albero-plexiglass-maestra.jpg";
import annaffiatoio from "@/assets/photos/artigianato/annaffiatoio-gesso-fiori-secchi.jpg";
import barattoloGesso from "@/assets/photos/artigianato/barattolo-gesso-fiocco.jpg";
import borsetta from "@/assets/photos/artigianato/borsetta-fiori-cera-busto.jpg";
import candeleSucculente from "@/assets/photos/artigianato/candele-succulente-vaso-gesso.jpg";
import fioccoNascita from "@/assets/photos/artigianato/fiocco-nascita-azzurro-nome.jpg";
import palloncini70 from "@/assets/photos/artigianato/palloncini-70-anni-limoni.jpg";
import labCandelaEtichetta from "@/assets/photos/chi-siamo/laboratorio-candela-etichetta.jpg";
import labConfezioneRegalo from "@/assets/photos/chi-siamo/laboratorio-confezione-regalo-nastro.jpg";
import labScatoleCandele from "@/assets/photos/chi-siamo/laboratorio-scatole-candele.jpg";
import labTavoloFiocco from "@/assets/photos/chi-siamo/laboratorio-tavolo-fiocco-cerchio.jpg";
import team from "@/assets/photos/chi-siamo/team-bomboniere-evento.jpg";
import genderReveal from "@/assets/photos/eventi/palloncini-gender-reveal-bebe.jpg";

// Each id's alt text lives under `photos.<id>` in messages/*.json.
export const photos = {
  sposiArcoCuore,
  battesimoAzzurro,
  battesimoMinnie,
  battesimoPiccoloPrincipe,
  cameraSposa,
  tortaComunione,
  tortaPiccoloPrincipe,
  alberoPlexiglass,
  annaffiatoio,
  barattoloGesso,
  borsetta,
  candeleSucculente,
  fioccoNascita,
  palloncini70,
  genderReveal,
  team,
  labScatoleCandele,
  labConfezioneRegalo,
  labCandelaEtichetta,
  labTavoloFiocco,
} satisfies Record<string, StaticImageData>;

export type PhotoId = keyof typeof photos;
