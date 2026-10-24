import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

// Stand-in for a photo of the digital products: a wedding landing page, an invitation on a phone and a QR table card.
// Drawn with theme tokens so it follows light and dark mode.

const QR_SIZE = 19;
const QR_MODULE = 4;

// The three corner squares, with their one-module margin.
function isFinder(x: number, y: number) {
  const far = QR_SIZE - 8;
  return (y < 8 && (x < 8 || x >= far)) || (x < 8 && y >= far);
}

// A fixed, QR-looking pattern; it does not encode anything.
const qrModules = Array.from({ length: QR_SIZE * QR_SIZE }, (_, i) => [i % QR_SIZE, Math.floor(i / QR_SIZE)] as const).filter(
  ([x, y]) => !isFinder(x, y) && (x * 7 + y * 13 + x * y) % 3 === 0,
);

function Finder({ x, y }: { x: number; y: number }) {
  return (
    <>
      <rect x={x} y={y} width={28} height={28} rx={5} className="fill-wine" />
      <rect x={x + 4} y={y + 4} width={20} height={20} rx={3} className="fill-card" />
      <rect x={x + 8} y={y + 8} width={12} height={12} rx={2} className="fill-wine" />
    </>
  );
}

export function DigitalIllustration({ className }: { className?: string }) {
  const t = useTranslations("digitalIllustration");
  const qrX = 296;
  const qrY = 160;
  const qrSpan = QR_SIZE * QR_MODULE;
  return (
    <svg viewBox="0 0 400 300" aria-hidden className={cn("overflow-visible", className)}>
      <g transform="rotate(-6 140 145)" className="drop-shadow-[0_12px_18px_rgb(60_10_25/0.18)]">
        <rect x={30} y={60} width={220} height={165} rx={14} className="fill-card" />
        <path d="M44 60h192a14 14 0 0 1 14 14v10H30V74a14 14 0 0 1 14-14z" className="fill-blush" />
        <circle cx={46} cy={72} r={3.5} className="fill-rose" />
        <circle cx={58} cy={72} r={3.5} className="fill-rose" />
        <circle cx={70} cy={72} r={3.5} className="fill-rose" />
        <rect x={44} y={96} width={192} height={60} rx={8} className="fill-rose/35" />
        <text x={104} y={132} textAnchor="middle" className="fill-wine font-script text-[16px]">
          {t("names")}
        </text>
        <rect x={44} y={170} width={120} height={7} rx={3.5} className="fill-wine/20" />
        <rect x={44} y={184} width={160} height={7} rx={3.5} className="fill-wine/20" />
        <rect x={44} y={200} width={64} height={16} rx={8} className="fill-wine" />
      </g>

      <g className="drop-shadow-[0_16px_22px_rgb(60_10_25/0.25)]">
        <rect x={180} y={26} width={124} height={248} rx={24} className="fill-wine" />
        <rect x={187} y={34} width={110} height={232} rx={18} className="fill-card" />
        <rect x={222} y={41} width={40} height={6} rx={3} className="fill-wine/80" />
        <rect x={195} y={58} width={94} height={112} rx={12} className="fill-blush" />
        <path
          d="M242 104c-9-7-15-12-15-18a7 7 0 0 1 15-3 7 7 0 0 1 15 3c0 6-6 11-15 18z"
          className="fill-rose-foreground"
        />
        <text x={242} y={138} textAnchor="middle" className="fill-wine font-script text-[17px]">
          {t("saveTheDate")}
        </text>
        <text x={242} y={156} textAnchor="middle" className="fill-wine/70 text-[9px] font-semibold tracking-[0.2em]">
          12 · 06 · 2027
        </text>
        <rect x={205} y={186} width={74} height={6} rx={3} className="fill-wine/20" />
        <rect x={213} y={198} width={58} height={6} rx={3} className="fill-wine/20" />
        <rect x={212} y={218} width={60} height={20} rx={10} className="fill-wine" />
        <text x={242} y={231} textAnchor="middle" className="fill-card text-[8px] font-bold tracking-[0.15em]">
          {t("rsvp")}
        </text>
      </g>

      <g transform="rotate(8 334 215)" className="drop-shadow-[0_12px_18px_rgb(60_10_25/0.2)]">
        <rect x={284} y={148} width={100} height={128} rx={14} className="fill-card" />
        <Finder x={qrX} y={qrY} />
        <Finder x={qrX + qrSpan - 28} y={qrY} />
        <Finder x={qrX} y={qrY + qrSpan - 28} />
        {qrModules.map(([x, y]) => (
          <rect
            key={`${x}-${y}`}
            x={qrX + x * QR_MODULE}
            y={qrY + y * QR_MODULE}
            width={QR_MODULE}
            height={QR_MODULE}
            className="fill-wine"
          />
        ))}
        <text x={334} y={262} textAnchor="middle" className="fill-wine text-[11px] font-bold tracking-[0.15em]">
          {t("menu")}
        </text>
      </g>
    </svg>
  );
}
