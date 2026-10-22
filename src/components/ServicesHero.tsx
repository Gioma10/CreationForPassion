"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HOME_RESET_EVENT } from "@/lib/home-reset";
import { cn } from "@/lib/utils";
import { photos } from "@/lib/photos";
import { services, type Service } from "@/lib/site";

gsap.registerPlugin(useGSAP, Draggable, Flip);

type View = "deck" | "grid";

const DECK_POSES = [
  { x: 0, y: 0, rotation: 0 },
  { x: 26, y: 16, rotation: 4 },
  { x: 48, y: 36, rotation: 9 },
];

const SWIPE_DISTANCE = 90;
const GRID_BACKDROP_Y = -60;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Arriving from a link (e.g. the logo) starts again from the deck; browser back/forward keeps the view
// the visitor left, since bfcacheId only changes on push/replace navigations.
export function ServicesHero() {
  const { bfcacheId } = useRouter();
  return <ServicesHeroView key={bfcacheId} />;
}

function ServicesHeroView() {
  const [view, setView] = useState<View>("deck");
  const t = useTranslations("home");
  const root = useRef<HTMLElement>(null);
  const cards = useRef<HTMLDivElement[]>([]);
  const order = useRef(services.map((_, i) => i));
  const draggables = useRef<Draggable[]>([]);
  const flipState = useRef<Flip.FlipState>(null);
  const justDragged = useRef(false);

  const deck = useRef<{
    layout: (duration: number) => void;
    sendTopToBack: (dx: number, dy: number) => void;
    syncDraggables: (current: View) => void;
  }>(null);

  useGSAP(
    (_, contextSafe) => {
      const syncDraggables = (current: View) => {
        draggables.current.forEach((draggable, i) =>
          draggable.enabled(current === "deck" && i === order.current[0]),
        );
      };

      const layout = contextSafe!((duration: number) => {
        order.current.forEach((cardIndex, depth) => {
          const card = cards.current[cardIndex];
          gsap.set(card, { zIndex: DECK_POSES.length - depth });
          gsap.to(card, {
            ...DECK_POSES[depth],
            duration,
            ease: "power3.out",
            overwrite: "auto",
          });
        });
        syncDraggables("deck");
      });

      const sendTopToBack = contextSafe!((dx: number, dy: number) => {
        const [top, ...rest] = order.current;
        order.current = [...rest, top];
        const length = Math.hypot(dx, dy) || 1;
        const reduced = prefersReducedMotion();
        gsap
          .timeline()
          .to(cards.current[top], {
            x: (dx / length) * 260,
            y: (dy / length) * 120,
            rotation: dx >= 0 ? 14 : -14,
            duration: reduced ? 0 : 0.25,
            ease: "power2.out",
          })
          .add(() => layout(reduced ? 0 : 0.55));
      });

      draggables.current = cards.current.map((card) => {
        const [draggable] = Draggable.create(card, {
          type: "x,y",
          cursor: "grab",
          activeCursor: "grabbing",
          zIndexBoost: false,
          onDrag() {
            gsap.set(this.target, { rotation: this.x * 0.06 });
          },
          onDragEnd() {
            justDragged.current = true;
            requestAnimationFrame(() => (justDragged.current = false));
            if (Math.hypot(this.x, this.y) > SWIPE_DISTANCE) {
              sendTopToBack(this.x, this.y);
            } else {
              gsap.to(this.target, {
                ...DECK_POSES[0],
                duration: 0.5,
                ease: "back.out(1.7)",
              });
            }
          },
        });
        return draggable;
      });
      // Also runs when Next's <Activity> shows the page again after a back navigation:
      // useGSAP reverted everything on hide, while the React state (and `view`) survived.
      gsap.set(".view-backdrop", {
        yPercent: view === "grid" ? GRID_BACKDROP_Y : 0,
      });
      if (view === "grid") {
        gsap.set(cards.current, { clearProps: "transform,zIndex" });
        syncDraggables("grid");
      } else {
        layout(0);
      }

      deck.current = { layout, sendTopToBack, syncDraggables };
    },
    { scope: root },
  );

  function show(next: View) {
    if (next === view || flipState.current) return;
    flipState.current = Flip.getState(cards.current);
    setView(next);
  }

  useGSAP(
    () => {
      const state = flipState.current;
      if (!state) return;
      flipState.current = null;

      if (view === "grid") {
        gsap.set(cards.current, { clearProps: "transform,zIndex" });
        deck.current?.syncDraggables("grid");
      } else {
        deck.current?.layout(0);
      }

      root.current
        ?.querySelector<HTMLElement>("[data-view-focus]")
        ?.focus({ preventScroll: true });

      const reduced = prefersReducedMotion();
      Flip.from(state, {
        targets: cards.current,
        duration: reduced ? 0 : 0.8,
        ease: "power3.inOut",
        scale: true,
        stagger: reduced ? 0 : 0.06,
        // On mobile the deck is hidden, so cards have no previous position to fly from.
        onEnter: (elements) =>
          gsap.fromTo(
            elements,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: reduced ? 0 : 0.5,
              stagger: 0.08,
              delay: 0.15,
            },
          ),
      });
      // Opacity, not autoAlpha: visibility:hidden would drop the focus moved above.
      gsap.fromTo(
        ".view-copy > *",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: reduced ? 0 : 0.5,
          stagger: 0.06,
          delay: reduced ? 0 : 0.25,
          ease: "power2.out",
          clearProps: "opacity,transform",
        },
      );
      gsap.to(".view-backdrop", {
        yPercent: view === "grid" ? GRID_BACKDROP_Y : 0,
        duration: reduced ? 0 : 0.9,
        ease: "power3.inOut",
      });
    },
    { dependencies: [view], scope: root },
  );

  function onDeckKeyDown(event: React.KeyboardEvent) {
    if (view !== "deck") return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      show("grid");
    } else if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      deck.current?.sendTopToBack(event.key === "ArrowRight" ? 1 : -1, 0.3);
    }
  }

  useEffect(() => {
    if (view !== "grid") return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") show("deck");
    };
    const onHomeReset = () => show("deck");
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(HOME_RESET_EVENT, onHomeReset);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(HOME_RESET_EVENT, onHomeReset);
    };
  });

  const isDeck = view === "deck";

  return (
    <main ref={root} className="relative flex min-h-0 flex-1 flex-col">
      {/* Same width and top curve as the footer arc, parked exactly behind it so it looks like that arc rising.
          <main> must not create a stacking context: this stays under the footer arc, while the z-10 section
          keeps the cards and their shadows above it. */}
      <div
        aria-hidden
        className="view-backdrop absolute inset-x-[-10%] top-full -z-10 h-[130%] rounded-t-[50%_20vw] bg-blush"
      />

      <section
        className={cn(
          "relative z-10 mx-auto min-h-0 w-full max-w-5xl flex-1 px-6",
          isDeck
            ? "grid grid-rows-[auto_minmax(0,1fr)] items-center gap-8 pt-4 pb-6 md:pt-8 md:grid-cols-[1fr_minmax(0,24rem)] md:grid-rows-[minmax(0,1fr)] md:gap-10"
            : "flex flex-col gap-6 pt-6 pb-6",
        )}
      >
        {isDeck ? (
          <div key="deck" className="view-copy flex flex-col items-start">
            <p className="flex items-center gap-3 text-xs font-semibold tracking-widest text-wine uppercase">
              {t("eyebrow")}
              <span className="h-px w-8 bg-wine/60" />
            </p>
            <h1 className="mt-4 max-w-xl text-[clamp(1.625rem,4.5dvh,2rem)] md:text-[clamp(1.75rem,5.5dvh,2.75rem)] leading-tight tracking-tight text-balance text-wine">
              {t("title")}
            </h1>
            <p className="mt-3 max-w-md text-[0.9375rem] text-wine/85 md:text-base">
              {t("intro")}
            </p>
            <Button
              data-view-focus
              onClick={() => show("grid")}
              className="mt-5 h-11 gap-3 rounded-full bg-wine px-6 text-base text-background hover:bg-wine/90"
            >
              {t("discover")}
              <ArrowUpRight data-icon="inline-end" />
            </Button>
          </div>
        ) : (
          <div key="grid" className="view-copy flex flex-col items-start">
            <button
              type="button"
              onClick={() => show("deck")}
              className="mb-5 flex cursor-pointer items-center gap-1.5 rounded-full text-xs font-semibold text-wine/80 transition-colors outline-none hover:text-wine focus-visible:ring-2 focus-visible:ring-rose"
            >
              <ArrowLeft className="size-3.5" />
              {t("back")}
            </button>

            <p className="flex items-center gap-3 text-xs font-semibold tracking-widest text-wine uppercase">
              {t("gridEyebrow")}
              <span className="h-px w-8 bg-wine/60" />
            </p>
            <h2
              data-view-focus
              tabIndex={-1}
              className="text-[clamp(1.75rem,5dvh,2.5rem)] leading-tight font-bold tracking-tight text-wine outline-none"
            >
              {t("gridTitle")}
            </h2>
          </div>
        )}

        <div
          role={isDeck ? "button" : "list"}
          tabIndex={isDeck ? 0 : undefined}
          aria-label={
            isDeck
              ? t("deckLabel", { services: services.map((s) => t(`services.${s.key}.title`)).join(", ") })
              : t("servicesLabel")
          }
          onClick={() => isDeck && !justDragged.current && show("grid")}
          onKeyDown={onDeckKeyDown}
          className={cn(
            "@container min-h-0 w-full md:@container-size",
            isDeck
              ? "relative h-full cursor-pointer max-md:hidden rounded-[2rem] outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-4"
              : "flex-1 md:grid md:grid-cols-3 md:items-center md:pt-12 md:justify-items-center md:gap-6 max-md:-mx-6 max-md:w-auto max-md:flex max-md:snap-x max-md:snap-mandatory max-md:scroll-px-6 max-md:items-center max-md:gap-4 max-md:overflow-x-auto max-md:px-6 max-md:pt-4 max-md:pb-12",
          )}
        >
          {services.map((service, i) => (
            <ServiceCard
              key={service.key}
              ref={(el) => {
                if (el) cards.current[i] = el;
              }}
              service={service}
              view={view}
              initialPose={DECK_POSES[i]}
              initialZ={DECK_POSES.length - i}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

function ServiceCard({
  ref,
  service,
  view,
  initialPose,
  initialZ,
}: {
  ref: React.Ref<HTMLDivElement>;
  service: Service;
  view: View;
  initialPose: (typeof DECK_POSES)[number];
  initialZ: number;
}) {
  const t = useTranslations("home");
  const tPhotos = useTranslations("photos");
  const isDeck = view === "deck";
  const href = isDeck ? undefined : service.href;

  const face = (
    <>
      <div className="relative min-h-0 flex-1 overflow-hidden rounded-[6cqw] bg-blush">
        <Image
          src={photos[service.photo]}
          alt={tPhotos(service.photo)}
          fill
          placeholder="blur"
          sizes="(min-width: 768px) 24rem, 72vw"
          draggable={false}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
      </div>
      <div className="flex shrink-0 flex-col px-[3cqw] pt-[5cqw] pb-[3cqw]">
        <h3 className="text-[7cqw] leading-tight font-bold text-wine">{t(`services.${service.key}.title`)}</h3>
        <p className="mt-[3cqw] line-clamp-3 text-[4.9cqw] leading-relaxed text-foreground/75">
          {t(`services.${service.key}.description`)}
        </p>
        <span className="mt-[5cqw] flex items-center gap-[2cqw] text-[4.9cqw] font-semibold text-wine">
          {t("startHere")}
          <ArrowRight className="size-[5.6cqw] transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </>
  );

  const faceClass =
    "flex size-full flex-col overflow-hidden rounded-[9cqw] bg-card p-[4cqw] text-card-foreground shadow-[0_18px_40px_-20px_rgb(60_10_25/0.45)]";

  return (
    // GSAP (Draggable, Flip) owns this element's transform, so hover motion lives on the inner face.
    <div
      ref={ref}
      role={isDeck ? undefined : "listitem"}
      aria-hidden={isDeck || undefined}
      // Initial deck pose so the server-rendered stack doesn't jump; GSAP owns the transform afterwards.
      style={{
        transform: `translate(${initialPose.x}px, ${initialPose.y}px) rotate(${initialPose.rotation}deg)`,
        zIndex: initialZ,
      }}
      className={cn(
        "@container h-[calc(var(--w)*6/5)] w-(--w) select-none",
        isDeck
          ? "absolute inset-0 right-12 bottom-9 m-auto [--w:min(calc(100cqw-3rem),calc((100cqh-2.25rem)*5/6))]"
          : "shrink-0 snap-center [--w:72cqw] md:[--w:min(calc((100cqw-3rem)/3),calc(100cqh*5/6))]",
      )}
    >
      {href ? (
        <Link
          href={href}
          className={cn(
            faceClass,
            "group outline-none transition-[translate,box-shadow] duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_28px_50px_-20px_rgb(60_10_25/0.55)] focus-visible:-translate-y-2 focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-4",
          )}
        >
          {face}
        </Link>
      ) : (
        <div className={faceClass}>{face}</div>
      )}
    </div>
  );
}
