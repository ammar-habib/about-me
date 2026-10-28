"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import type { Testimonial } from "@/data/testimonials";

const ROTATION_MS = 6000;

export function TestimonialSlider({ entries }: { entries: Testimonial[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const scrollTimerRef = useRef<number | null>(null);
  const directionRef = useRef(1);
  const railId = useId();
  const reducedMotion = useReducedMotion();
  const inView = useInView(carouselRef, { amount: 0.3 });
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [perPage, setPerPage] = useState(1);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const pageCount = Math.max(1, entries.length - perPage + 1);
  const reducedMotionEnabled = ready && Boolean(reducedMotion);
  const playing =
    ready &&
    !paused &&
    !hovered &&
    !focused &&
    pageVisible &&
    inView &&
    !reducedMotion &&
    pageCount > 1;

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const observer = new ResizeObserver(() => {
      if (scrollTimerRef.current !== null)
        window.clearTimeout(scrollTimerRef.current);
      setReady(true);
      const visible =
        Number(
          getComputedStyle(rail).getPropertyValue("--visible-testimonials"),
        ) || 1;
      const nextIndex = Math.min(
        activeRef.current,
        Math.max(0, entries.length - visible),
      );
      setPerPage(visible);
      setIndex(nextIndex);
      activeRef.current = nextIndex;
      rail.scrollTo({
        left:
          (rail.children.item(nextIndex) as HTMLElement | null)?.offsetLeft ??
          0,
        behavior: "instant",
      });
    });
    observer.observe(rail);
    return () => {
      observer.disconnect();
      if (scrollTimerRef.current !== null)
        window.clearTimeout(scrollTimerRef.current);
    };
  }, [entries.length]);

  useEffect(() => {
    const update = () => setPageVisible(document.visibilityState === "visible");
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  const goTo = useCallback(
    (target: number) => {
      const rail = railRef.current;
      if (!rail) return;
      const wrapped = target < 0 || target >= pageCount;
      const nextIndex = ((target % pageCount) + pageCount) % pageCount;
      const card = rail.children.item(nextIndex) as HTMLElement | null;
      if (!card) return;
      activeRef.current = nextIndex;
      setIndex(nextIndex);
      rail.scrollTo({
        left: card.offsetLeft,
        behavior: reducedMotion || wrapped ? "instant" : "smooth",
      });
    },
    [pageCount, reducedMotion],
  );

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      let next = index + directionRef.current;
      if (next < 0 || next >= pageCount) {
        directionRef.current *= -1;
        next = index + directionRef.current;
      }
      goTo(next);
    }, ROTATION_MS);
    return () => window.clearTimeout(timer);
  }, [playing, index, pageCount, goTo]);

  function navigate(target: number) {
    setPaused(true);
    goTo(target);
  }

  function syncScroll() {
    if (scrollTimerRef.current !== null)
      window.clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = window.setTimeout(() => {
      const rail = railRef.current;
      if (!rail || rail.children.length < 2) return;
      const first = rail.children.item(0) as HTMLElement;
      const second = rail.children.item(1) as HTMLElement;
      const step = second.offsetLeft - first.offsetLeft;
      if (!step) return;
      const nextIndex = Math.min(
        pageCount - 1,
        Math.max(0, Math.round(rail.scrollLeft / step)),
      );
      activeRef.current = nextIndex;
      setIndex(nextIndex);
    }, 100);
  }

  const start = String(index + 1).padStart(2, "0");
  const end = String(Math.min(index + perPage, entries.length)).padStart(
    2,
    "0",
  );

  return (
    <div
      className="testimonial-carousel"
      ref={carouselRef}
      role="group"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setHovered(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setHovered(false);
      }}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false);
      }}
    >
      <div className="testimonial-toolbar">
        <div
          className="testimonial-range"
          aria-live={playing ? "off" : "polite"}
          aria-atomic="true"
        >
          <span>{perPage > 1 ? `${start}—${end}` : start}</span>
          <span className="testimonial-range-total">
            {" "}
            / {String(entries.length).padStart(2, "0")}
          </span>
        </div>
        <div className="testimonial-controls">
          <button
            type="button"
            className="testimonial-control testimonial-rotation"
            disabled={reducedMotionEnabled}
            aria-label={
              reducedMotionEnabled
                ? "Automatic testimonials disabled for reduced motion"
                : paused
                  ? "Play automatic testimonials"
                  : "Pause automatic testimonials"
            }
            aria-controls={railId}
            onClick={() => {
              setPaused((value) => !value);
              setFocused(false);
            }}
          >
            {paused || reducedMotionEnabled ? (
              <Play size={16} aria-hidden="true" />
            ) : (
              <Pause size={16} aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            className="testimonial-control"
            aria-label="Previous testimonials"
            aria-controls={railId}
            onClick={() => navigate(index - 1)}
          >
            <ArrowLeft size={19} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="testimonial-control"
            aria-label="Next testimonials"
            aria-controls={railId}
            onClick={() => navigate(index + 1)}
          >
            <ArrowRight size={19} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div
        id={railId}
        className="testimonial-rail"
        ref={railRef}
        tabIndex={0}
        role="group"
        aria-label="Testimonial slides. Swipe or use left and right arrow keys."
        onScroll={syncScroll}
        onPointerDown={() => setPaused(true)}
        onKeyDown={(event) => {
          const target =
            event.key === "ArrowRight"
              ? index + 1
              : event.key === "ArrowLeft"
                ? index - 1
                : event.key === "Home"
                  ? 0
                  : event.key === "End"
                    ? pageCount - 1
                    : null;
          if (target !== null) {
            event.preventDefault();
            navigate(target);
          }
        }}
      >
        {entries.map((entry, position) => (
          <figure
            className={`testimonial${position === index ? " is-current" : ""}`}
            key={entry.id}
            aria-roledescription="slide"
            aria-label={`${position + 1} of ${entries.length}: ${entry.author}`}
          >
            <span className="testimonial-quote-mark" aria-hidden="true">
              “
            </span>
            <blockquote className="testimonial-quote">
              <p>{entry.quote}</p>
            </blockquote>
            <figcaption className="testimonial-credit">
              <img
                className="testimonial-photo"
                src={entry.photo}
                width={56}
                height={56}
                loading="lazy"
                alt=""
              />
              <div>
                <span className="testimonial-author">{entry.author}</span>
                <span className="testimonial-affiliation">
                  {entry.affiliation}
                </span>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="testimonial-progress" aria-hidden="true">
        {playing ? (
          <motion.span
            key={`playing-${index}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: ROTATION_MS / 1000, ease: "linear" }}
          />
        ) : (
          <span
            style={{
              transform: `scaleX(${(index + perPage) / entries.length})`,
            }}
          />
        )}
      </div>
      <div className="testimonial-footer">
        <span className="testimonial-hint">
          Use the arrows or swipe to explore.
        </span>
        <div
          className="testimonial-pagination"
          role="group"
          aria-label="Choose testimonial position"
        >
          {Array.from({ length: pageCount }, (_, position) => (
            <button
              key={position}
              type="button"
              className="testimonial-dot"
              aria-label={`Show testimonials starting with ${entries[position].author}`}
              aria-current={position === index ? "true" : undefined}
              aria-controls={railId}
              onClick={() => navigate(position)}
            >
              <span />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
