import type { StaticImageData } from "next/image";
import battesimoAzzurro from "@/assets/photos/allestimenti/allestimento-battesimo-azzurro-angelo.jpg";
import battesimoMinnie from "@/assets/photos/allestimenti/allestimento-battesimo-minnie-rosa.jpg";
import battesimoPiccoloPrincipe from "@/assets/photos/allestimenti/allestimento-battesimo-piccolo-principe.jpg";
import cameraSposa from "@/assets/photos/allestimenti/allestimento-camera-sposa-palloncini.jpg";
import sposiArcoCuore from "@/assets/photos/allestimenti/allestimento-sposi-arco-cuore.jpg";
import compleannoAristogatti from "@/assets/photos/allestimenti/compleanno-1-anno-aristogatti-rosa.jpg";
import compleannoMarino from "@/assets/photos/allestimenti/compleanno-40-tema-marino-piscina.jpg";
import battesimoAviatore from "@/assets/photos/allestimenti/battesimo-orsetto-aviatore-oro-verde.jpg";
import alberoPlexiglass from "@/assets/photos/artigianato/albero-plexiglass-maestra.jpg";
import annaffiatoio from "@/assets/photos/artigianato/annaffiatoio-gesso-fiori-secchi.jpg";
import barattoloGesso from "@/assets/photos/artigianato/barattolo-gesso-fiocco.jpg";
import bomboniereSposi from "@/assets/photos/artigianato/bomboniere-sposi-scatola-nastro.jpg";
import borsetta from "@/assets/photos/artigianato/borsetta-fiori-cera-busto.jpg";
import candeleSucculente from "@/assets/photos/artigianato/candele-succulente-vaso-gesso.jpg";
import palloncini18 from "@/assets/photos/artigianato/palloncini-arco-18-rosa-argento.jpg";
import labCandelaEtichetta from "@/assets/photos/chi-siamo/laboratorio-candela-etichetta.jpg";
import labConfezioneRegalo from "@/assets/photos/chi-siamo/laboratorio-confezione-regalo-nastro.jpg";
import labScatoleCandele from "@/assets/photos/chi-siamo/laboratorio-scatole-candele.jpg";
import labTavoloFiocco from "@/assets/photos/chi-siamo/laboratorio-tavolo-fiocco-cerchio.jpg";
import team from "@/assets/photos/chi-siamo/team-bomboniere-evento.jpg";
import arcoAzzurroPampas from "@/assets/photos/eventi/arco-azzurro-pampas-giardino.jpg";
import babyShowerOrsetto from "@/assets/photos/eventi/baby-shower-orsetto-azzurro-matteo.jpg";
import compleanno10Corona from "@/assets/photos/eventi/palloncini-compleanno-10-corona.jpg";
import genderRevealBimbi from "@/assets/photos/eventi/gender-reveal-palloncini-bimbi-rosa-azzurro.jpg";

// Each id's alt text lives under `photos.<id>` in messages/*.json.
export const photos = {
  sposiArcoCuore,
  battesimoAzzurro,
  battesimoMinnie,
  battesimoPiccoloPrincipe,
  cameraSposa,
  compleannoAristogatti,
  battesimoAviatore,
  compleannoMarino,
  alberoPlexiglass,
  annaffiatoio,
  barattoloGesso,
  bomboniereSposi,
  borsetta,
  candeleSucculente,
  palloncini18,
  compleanno10Corona,
  babyShowerOrsetto,
  genderRevealBimbi,
  arcoAzzurroPampas,
  team,
  labScatoleCandele,
  labConfezioneRegalo,
  labCandelaEtichetta,
  labTavoloFiocco,
} satisfies Record<string, StaticImageData>;

export type PhotoId = keyof typeof photos;
