"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowDown, Volume2, VolumeX } from "lucide-react";
import { GalaxyScene } from "./GalaxyScene";
import { TOPIC_WINDOWS, journeyChapter } from "./cosmicJourney";

function subscribeCompact(listener: () => void) {
  const query = window.matchMedia(
    "(prefers-reduced-motion: reduce), (max-height: 540px)",
  );
  query.addEventListener("change", listener);
  return () => query.removeEventListener("change", listener);
}
const getCompact = () =>
  window.matchMedia("(prefers-reduced-motion: reduce), (max-height: 540px)")
    .matches;
const getServerCompact = () => false;

type Topic = {
  title: string;
  detail: string;
  tools: string;
  problem: string;
  result: string;
};
type Labels = {
  soundOn: string;
  soundOff: string;
  scroll: string;
  coordinates: string;
  terminal: string;
  command: string;
  sequence: string;
  topics: Topic[];
  chapters: string[];
  problem: string;
  result: string;
  tools: string;
  coreTitle: string;
  coreDescription: string;
  terminalLines: string[];
  finalTitle: string;
  finalDescription: string;
  continue: string;
  identity: string;
  interaction: string;
  reset: string;
};

function OrbitTopic({
  topic,
  index,
  progress,
  reduced,
  active,
  labels,
}: {
  topic: Topic;
  index: number;
  progress: MotionValue<number>;
  reduced: boolean;
  active: boolean;
  labels: Labels;
}) {
  const [start, end] = TOPIC_WINDOWS[index];
  const opacity = useTransform(
    progress,
    [start, start + 0.007, end - 0.008, end],
    [0, 1, 1, 0],
  );
  return (
    <motion.article
      className="cosmic-story-card"
      data-space-card={index}
      aria-hidden={!reduced && !active}
      style={{ opacity: reduced ? 1 : opacity }}
    >
      <div className="cosmic-card-top">
        <span>0{index + 1} / 05</span>
        <span>{topic.detail}</span>
      </div>
      <h2>{topic.title}</h2>
      <p className="cosmic-tools">
        <span>{labels.tools}</span>
        {topic.tools}
      </p>
      <div className="cosmic-problem">
        <h3>{labels.problem}</h3>
        <p>{topic.problem}</p>
      </div>
      <div className="cosmic-result">
        <h3>{labels.result}</h3>
        <p>{topic.result}</p>
      </div>
      <div className="cosmic-card-signal" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </motion.article>
  );
}

function TerminalLine({
  text,
  index,
  progress,
  reduced,
}: {
  text: string;
  index: number;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const opacity = useTransform(
    progress,
    [0.69 + index * 0.025, 0.71 + index * 0.025],
    [0.18, 1],
  );
  const x = useTransform(
    progress,
    [0.69 + index * 0.025, 0.71 + index * 0.025],
    [12, 0],
  );
  return (
    <motion.li style={{ opacity: reduced ? 1 : opacity, x: reduced ? 0 : x }}>
      <span aria-hidden="true">0{index + 1}</span>
      {text}
    </motion.li>
  );
}

export function CosmicHero({
  children,
  labels,
}: {
  children: ReactNode;
  labels: Labels;
}) {
  const section = useRef<HTMLElement>(null);
  const reduced = useSyncExternalStore(
    subscribeCompact,
    getCompact,
    getServerCompact,
  );
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });
  const [chapter, setChapter] = useState(0);
  const [activeTopic, setActiveTopic] = useState(-1);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setChapter(journeyChapter(p));
    setActiveTopic(
      TOPIC_WINDOWS.findIndex(([start, end]) => p >= start && p < end),
    );
  });
  const introOpacity = useTransform(
    scrollYProgress,
    [0, 0.045, 0.095],
    [1, 1, 0],
  );
  const coreOpacity = useTransform(
    scrollYProgress,
    [0.665, 0.7, 0.83, 0.86],
    [0, 1, 1, 0],
  );
  const finalOpacity = useTransform(
    scrollYProgress,
    [0.855, 0.9, 1],
    [0, 1, 1],
  );
  const [sound, setSound] = useState(false);
  const audio = useRef<AudioContext | null>(null);

  useEffect(() => {
    const muteWhenHidden = () => {
      if (document.hidden) setSound(false);
    };
    document.addEventListener("visibilitychange", muteWhenHidden);
    return () => {
      document.removeEventListener("visibilitychange", muteWhenHidden);
      void audio.current?.close();
      audio.current = null;
    };
  }, []);
  useEffect(() => {
    const context = audio.current;
    if (!context || !sound) return;
    const gain = context.createGain();
    gain.gain.setValueAtTime(0, context.currentTime);
    gain.gain.linearRampToValueAtTime(0.035, context.currentTime + 1.5);
    gain.connect(context.destination);
    const tones = [55, 82.41, 110.2].map((frequency) => {
      const oscillator = context.createOscillator();
      oscillator.frequency.value = frequency;
      oscillator.connect(gain);
      oscillator.start();
      return oscillator;
    });
    return () => {
      gain.gain.cancelScheduledValues(context.currentTime);
      gain.gain.setTargetAtTime(0, context.currentTime, 0.08);
      tones.forEach((tone) => tone.stop(context.currentTime + 0.4));
      window.setTimeout(() => {
        tones.forEach((tone) => tone.disconnect());
        gain.disconnect();
      }, 500);
    };
  }, [sound]);
  async function toggleSound() {
    if (sound) {
      setSound(false);
      return;
    }
    try {
      audio.current ??= new AudioContext();
      await audio.current.resume();
      setSound(true);
    } catch {
      setSound(false);
    }
  }

  return (
    <section
      id="top"
      ref={section}
      className="cosmic-hero"
      aria-label={labels.coordinates}
    >
      <div className="cosmic-stage" data-chapter={chapter}>
        <div className="cosmic-fallback" aria-hidden="true">
          <div className="cosmic-core" />
          <div className="cosmic-pulse" />
        </div>
        <GalaxyScene progress={scrollYProgress} reduced={reduced} />
        <div className="cosmic-shade" aria-hidden="true" />
        <header className="cosmic-coordinate">
          <span>{labels.coordinates}</span>
          <span className="cosmic-chapter">
            0{(reduced ? 5 : chapter) + 1} / 06{" "}
            <b>{labels.chapters[reduced ? 5 : chapter]}</b>
          </span>
        </header>
        <motion.div
          className="cosmic-copy"
          inert={!reduced && chapter !== 0}
          aria-hidden={!reduced && chapter !== 0}
          style={{ opacity: reduced ? 1 : introOpacity }}
        >
          {children}
        </motion.div>

        <div className="cosmic-story" aria-label={labels.tools}>
          {labels.topics.map((topic, index) => (
            <OrbitTopic
              key={topic.title}
              topic={topic}
              index={index}
              progress={scrollYProgress}
              reduced={reduced}
              active={activeTopic === index}
              labels={labels}
            />
          ))}
        </div>

        <motion.div
          className="cosmic-inner"
          aria-hidden={!reduced && chapter !== 4}
          style={{ opacity: reduced ? 1 : coreOpacity }}
        >
          <p className="cosmic-eyebrow">{labels.terminal}</p>
          <h2>{labels.coreTitle}</h2>
          <p className="cosmic-inner-description">{labels.coreDescription}</p>
          <div className="cosmic-terminal">
            <div className="cosmic-terminal-bar">
              <span>{labels.identity}</span>
              <span aria-hidden="true">● ● ●</span>
            </div>
            <p className="cosmic-command">{labels.command}</p>
            <ol>
              {labels.terminalLines.map((text, index) => (
                <TerminalLine
                  key={text}
                  text={text}
                  index={index}
                  progress={scrollYProgress}
                  reduced={reduced}
                />
              ))}
            </ol>
            <p className="cosmic-terminal-output">
              {labels.sequence}
              <span className="cosmic-cursor" aria-hidden="true">
                {" "}
                ▌
              </span>
            </p>
          </div>
        </motion.div>

        <motion.div
          className="cosmic-finale"
          inert={!reduced && chapter !== 5}
          aria-hidden={!reduced && chapter !== 5}
          style={{ opacity: reduced ? 1 : finalOpacity }}
        >
          <div className="cosmic-final-copy">
            <p className="cosmic-eyebrow">{labels.identity}</p>
            <h2>{labels.finalTitle}</h2>
            <p>{labels.finalDescription}</p>
          </div>
          <ul className="cosmic-overview">
            {labels.topics.map((topic, index) => (
              <li key={topic.title} className={`cosmic-overview-${index}`}>
                <span>0{index + 1}</span>
                <h3>{topic.title}</h3>
                <p>{topic.tools}</p>
              </li>
            ))}
          </ul>
          <a href="#perfil" className="cosmic-continue">
            {labels.continue}
            <ArrowDown size={16} aria-hidden="true" />
          </a>
        </motion.div>

        <div className="cosmic-interaction">
          <p>{labels.interaction}</p>
          <button
            type="button"
            onClick={() =>
              section.current
                ?.querySelector(".cosmic-stage")
                ?.dispatchEvent(new Event("cosmic-reset"))
            }
          >
            {labels.reset}
          </button>
        </div>
        <div className="cosmic-bottom">
          <a href="#perfil" className="cosmic-skip">
            <ArrowDown size={14} aria-hidden="true" />
            {labels.scroll}
          </a>
          <div className="cosmic-chapter-track" aria-hidden="true">
            {labels.chapters.map((name, index) => (
              <span key={name} data-active={index <= chapter} />
            ))}
          </div>
          <button
            type="button"
            onClick={() => void toggleSound()}
            aria-pressed={sound}
          >
            {sound ? (
              <Volume2 size={14} aria-hidden="true" />
            ) : (
              <VolumeX size={14} aria-hidden="true" />
            )}
            {sound ? labels.soundOff : labels.soundOn}
          </button>
        </div>
        <motion.div
          className="cosmic-progress"
          style={{ scaleX: reduced ? 1 : scrollYProgress }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
