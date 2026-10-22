"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { photos, type PhotoId } from "@/lib/photos";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

type Rect = { top: number; left: number; width: number; height: number };

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function rectOf(el: HTMLElement): Rect {
  const { top, left, width, height } = el.getBoundingClientRect();
  return { top, left, width, height };
}

// The whole photo, as large as the viewport allows without upscaling past its real size.
function fittedRect(src: StaticImageData): Rect {
  const vw = document.documentElement.clientWidth;
  const vh = window.innerHeight;
  const gutter = vw < 768 ? 16 : 56;
  const scale = Math.min((vw - gutter * 2) / src.width, (vh - gutter * 2) / src.height, 1);
  const width = src.width * scale;
  const height = src.height * scale;
  return { top: (vh - height) / 2, left: (vw - width) / 2, width, height };
}

// `cover` is for the above-the-fold photo: loaded eagerly with high priority since it is the page's largest element.
// `sizes` must account for object-cover: a landscape photo in a narrower frame renders wider than the frame.
// Every photo opens full size on click; pass `zoomable={false}` when it sits inside a link or another control.
export function Photo({
  id,
  sizes,
  className,
  position,
  cover = false,
  zoomable = true,
}: {
  id: PhotoId;
  sizes: string;
  className?: string;
  position?: string;
  cover?: boolean;
  zoomable?: boolean;
}) {
  const [origin, setOrigin] = useState<HTMLButtonElement | null>(null);
  const t = useTranslations("photos");
  const src = photos[id];
  const alt = t(id);

  const image = (
    <Image
      src={src}
      alt={alt}
      fill
      placeholder="blur"
      loading={cover ? "eager" : "lazy"}
      fetchPriority={cover ? "high" : undefined}
      sizes={sizes}
      className={cn(
        "object-cover",
        zoomable && "transition-transform duration-500 ease-out group-hover:scale-105",
      )}
      style={{ objectPosition: position }}
    />
  );

  if (!zoomable) {
    return <div className={cn("relative overflow-hidden bg-blush", className)}>{image}</div>;
  }

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={(event) => setOrigin(event.currentTarget)}
        className={cn(
          "group relative block w-full cursor-zoom-in overflow-hidden bg-blush outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-4",
          className,
        )}
      >
        {image}
      </button>
      {origin &&
        createPortal(
          <Lightbox
            src={src}
            alt={alt}
            position={position}
            origin={origin}
            onClosed={() => {
              setOrigin(null);
              origin.focus({ preventScroll: true });
            }}
          />,
          document.body,
        )}
    </>
  );
}

// The frame flies from the thumbnail to the fitted rect. Both use object-cover with the same position,
// so the crop at the start matches the thumbnail and widens into the full photo as the frame reaches its real aspect.
function Lightbox({
  src,
  alt,
  position,
  origin,
  onClosed,
}: {
  src: StaticImageData;
  alt: string;
  position?: string;
  origin: HTMLElement;
  onClosed: () => void;
}) {
  const t = useTranslations("common");
  const root = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const closing = useRef(false);
  // Shown under the full-size image while it loads, so the frame is never empty.
  const thumbnailSrc = origin.querySelector("img")?.currentSrc;
  const originRadius = getComputedStyle(origin).borderRadius;

  useGSAP(
    () => {
      const duration = prefersReducedMotion() ? 0 : 0.6;
      gsap.set(frame.current, { ...rectOf(origin), borderRadius: originRadius });
      gsap.to(frame.current, {
        ...fittedRect(src),
        borderRadius: 16,
        duration,
        ease: "power3.inOut",
      });
      gsap.fromTo("[data-fade]", { opacity: 0 }, { opacity: 1, duration: duration * 0.8 });
      closeButton.current?.focus({ preventScroll: true });
    },
    { scope: root },
  );

  // Outside the GSAP context on purpose: onClosed unmounts the dialog, so there is nothing left to revert.
  function close() {
    if (closing.current) return;
    closing.current = true;
    const duration = prefersReducedMotion() ? 0 : 0.5;
    gsap.to(root.current!.querySelectorAll("[data-fade]"), { opacity: 0, duration: duration * 0.8 });
    gsap.to(frame.current, {
      ...rectOf(origin),
      borderRadius: originRadius,
      duration,
      ease: "power3.inOut",
      onComplete: onClosed,
    });
  }

  useEffect(() => {
    const html = document.documentElement;
    const scrollbar = window.innerWidth - html.clientWidth;
    const previous = { overflow: html.style.overflow, paddingRight: html.style.paddingRight };
    html.style.overflow = "hidden";
    html.style.paddingRight = `${scrollbar}px`;

    const onResize = () => !closing.current && gsap.set(frame.current, fittedRect(src));
    window.addEventListener("resize", onResize);
    return () => {
      Object.assign(html.style, previous);
      window.removeEventListener("resize", onResize);
    };
  }, [src]);

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
    } else if (event.key === "Tab") {
      // The close button is the dialog's only control: keep focus on it.
      event.preventDefault();
    }
  }

  return (
    <div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={close}
      onKeyDown={onKeyDown}
      className="fixed inset-0 z-[100] cursor-zoom-out"
    >
      <div data-fade aria-hidden className="absolute inset-0 bg-wine/85 backdrop-blur-sm" />
      <div
        ref={frame}
        className="fixed overflow-hidden bg-blush bg-cover shadow-[0_30px_60px_-20px_rgb(0_0_0/0.5)]"
        style={{
          backgroundImage: thumbnailSrc ? `url("${thumbnailSrc}")` : undefined,
          backgroundPosition: position ?? "center",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: position }}
        />
      </div>
      <button
        ref={closeButton}
        data-fade
        type="button"
        aria-label={t("close")}
        onClick={(event) => {
          event.stopPropagation();
          close();
        }}
        className="absolute top-[max(1rem,env(safe-area-inset-top))] right-4 grid size-11 cursor-pointer place-items-center rounded-full bg-background text-wine shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 md:top-6 md:right-6"
      >
        <X className="size-5" />
      </button>
    </div>
  );
}
