"use client";

import {
  GitHubIcon,
  LinkedInIcon,
  TikTokIcon,
} from "@/components/brand/SocialIcons";
import { siteConfig } from "@/config/site";
import { CosmicAudio } from "@/features/home/components/CosmicAudio";
import { CosmicConnections } from "@/features/home/components/CosmicConnections";
import { CosmicIdentity } from "@/features/home/components/CosmicIdentity";
import { CosmicPopover } from "@/features/home/components/CosmicPopover";
import { GalaxyScene } from "@/features/home/components/GalaxyScene";
import {
  TOPIC_WINDOWS,
  journeyChapter,
} from "@/features/home/components/cosmicJourney";
import {
  DISCOVERY_IDS,
  type ControlTarget,
  type CosmicLabels,
  type CosmicTopic,
  type DiscoveryId,
} from "@/features/home/components/cosmicTypes";
import {
  ArrowDown,
  ArrowUpRight,
  Brain,
  Check,
  Cloud,
  Code2,
  Compass,
  Database,
  Orbit,
  Rocket,
  Search,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

const STATIC_QUERY = "(prefers-reduced-motion: reduce), (max-height: 540px)";

function subscribeStatic(listener: () => void) {
  const query = window.matchMedia(STATIC_QUERY);
  query.addEventListener("change", listener);
  return () => query.removeEventListener("change", listener);
}

const getStatic = () => window.matchMedia(STATIC_QUERY).matches;
const getServerStatic = () => false;
const TOPIC_ICONS = [Code2, Cloud, Database, Search, Rocket];
const DISCOVERY_ICONS = {
  core: Code2,
  avatar: Brain,
  lakeit: Cloud,
  futbuy: Rocket,
  orbit: Orbit,
};
const TARGETS: ControlTarget[] = ["universe", "core", "avatar", "orbit"];

function SignalSegment({
  progress,
  start,
  end,
  index,
  reduced,
}: {
  progress: MotionValue<number>;
  start: number;
  end: number;
  index: number;
  reduced: boolean;
}) {
  const step = (end - start - 0.014) / 5;
  const fill = useTransform(
    progress,
    [start + 0.007 + index * step, start + 0.007 + (index + 1) * step],
    [0, 1],
  );

  return (
    <span>
      <motion.i style={{ scaleX: reduced ? 1 : fill }} />
    </span>
  );
}

function OrbitTopic({
  topic,
  index,
  progress,
  reduced,
  active,
  labels,
}: {
  topic: CosmicTopic;
  index: number;
  progress: MotionValue<number>;
  reduced: boolean;
  active: boolean;
  labels: CosmicLabels;
}) {
  const [start, end] = TOPIC_WINDOWS[index];
  const opacity = useTransform(
    progress,
    [start, start + 0.007, end - 0.008, end],
    [0, 1, 1, 0],
  );
  const Icon = TOPIC_ICONS[index];

  return (
    <motion.article
      className="cosmic-story-card"
      data-space-card={index}
      data-topic={topic.key}
      aria-hidden={!reduced && !active}
      style={{ opacity: reduced ? 1 : opacity }}
    >
      <div className="cosmic-card-top">
        <span className="cosmic-card-badge">
          <Icon size={22} aria-hidden="true" />0{index + 1} / 05
        </span>
        <span>{topic.detail}</span>
      </div>
      <h2>{topic.title}</h2>
      <div className="cosmic-tools-pills" aria-label={labels.tools}>
        {topic.tools.split(" · ").map((tool) => (
          <span key={tool}>{tool}</span>
        ))}
      </div>
      <div className="cosmic-problem">
        <h3>{labels.problem}</h3>
        <p>{topic.problem}</p>
      </div>
      <div className="cosmic-result">
        <h3>
          <Check size={14} aria-hidden="true" />
          {labels.result}
        </h3>
        <p>{topic.result}</p>
      </div>
      <div className="cosmic-card-signal" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <SignalSegment
            key={i}
            index={i}
            progress={progress}
            start={start}
            end={end}
            reduced={reduced}
          />
        ))}
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
    [0.685 + index * 0.025, 0.705 + index * 0.025],
    [0.4, 1],
  );
  return (
    <motion.li style={{ opacity: reduced ? 1 : opacity }}>
      <span>0{index + 1}</span>
      <p>{text}</p>
      <Check size={16} aria-hidden="true" />
    </motion.li>
  );
}

export function CosmicHero({
  children,
  labels,
}: {
  children: ReactNode;
  labels: CosmicLabels;
}) {
  const section = useRef<HTMLElement>(null);
  const discoveryAnchor = useRef<HTMLElement | null>(null);
  const reduced = useSyncExternalStore(
    subscribeStatic,
    getStatic,
    getServerStatic,
  );
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });
  const [chapter, setChapter] = useState(0);
  const [activeTopic, setActiveTopic] = useState(-1);
  const [discovery, setDiscovery] = useState<DiscoveryId | null>(null);
  const [exploring, setExploring] = useState(false);
  const [target, setTarget] = useState<ControlTarget>("universe");
  const [sound, setSound] = useState(false);
  const [soundPending, setSoundPending] = useState(false);
  const [soundError, setSoundError] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const soundSystem = useRef<CosmicAudio | null>(null);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setChapter(journeyChapter(p));
    setDiscovery(null);
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
  const finalOpacity = useTransform(scrollYProgress, [0.855, 0.9], [0, 1]);
  const identityOpacity = useTransform(
    scrollYProgress,
    [0.665, 0.7, 1],
    [0, 1, 1],
  );
  const identityY = useTransform(
    scrollYProgress,
    [0.7, 0.84, 0.94],
    ["6svh", "6svh", "0svh"],
  );

  useEffect(() => {
    const system = new CosmicAudio();
    soundSystem.current = system;
    const mute = () => {
      if (document.hidden) {
        system.stop();
        setSound(false);
      }
    };

    const stage = section.current?.querySelector(".cosmic-stage");
    const discover = (event: Event) => {
      const id = (event as CustomEvent<{ id: DiscoveryId }>).detail?.id;
      if (!DISCOVERY_IDS.includes(id)) return;
      discoveryAnchor.current =
        stage?.querySelector<HTMLElement>(`[data-space-hotspot="${id}"]`) ??
        null;
      setDiscovery(id);
      system.discover(id);
      stage?.dispatchEvent(new CustomEvent("cosmic-activate", { detail: id }));
    };

    document.addEventListener("visibilitychange", mute);
    stage?.addEventListener("cosmic-discover", discover);

    return () => {
      document.removeEventListener("visibilitychange", mute);
      stage?.removeEventListener("cosmic-discover", discover);
      system.close();
      soundSystem.current = null;
    };
  }, []);

  function dispatch(name: string, detail?: unknown) {
    section.current
      ?.querySelector(".cosmic-stage")
      ?.dispatchEvent(new CustomEvent(name, { detail }));
  }

  function jump(index: number) {
    setExploring(false);
    setDiscovery(null);
    const hero = section.current;
    if (!hero) return;
    if (reduced) {
      hero
        .querySelectorAll(".cosmic-story-card")
        [index]?.scrollIntoView({ block: "center" });
      return;
    }

    dispatch("cosmic-reset");
    const position = TOPIC_WINDOWS[index][0] + 0.04;
    window.scrollTo({
      top:
        hero.getBoundingClientRect().top +
        window.scrollY +
        (hero.offsetHeight - window.innerHeight) * position,
      behavior: "instant",
    });
  }

  function openDiscovery(id: DiscoveryId, anchor: HTMLElement) {
    discoveryAnchor.current = anchor;
    setExploring(false);
    setDiscovery(id);
    soundSystem.current?.discover(id);
    dispatch("cosmic-activate", id);
  }

  async function toggleSound() {
    if (!soundSystem.current || soundPending) return;
    if (sound) {
      soundSystem.current.stop();
      setSound(false);
      return;
    }

    setSoundPending(true);
    setSoundError(false);
    try {
      await soundSystem.current.start();
      setSound(true);
    } catch {
      setSoundError(true);
    } finally {
      setSoundPending(false);
    }
  }

  const selection = discovery ? labels.discoveries[discovery] : null;
  const hotspotVisible = !reduced && (chapter === 0 || chapter === 5);

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
        </div>
        <GalaxyScene progress={scrollYProgress} reduced={reduced} />
        <div className="cosmic-shade" aria-hidden="true" />

        <div className="cosmic-coordinate">
          <span>{labels.coordinates}</span>
          <span>
            0{(reduced ? 5 : chapter) + 1} / 06{" "}
            <b>{labels.chapters[reduced ? 5 : chapter]}</b>
          </span>
        </div>

        <nav className="cosmic-navigation" aria-label={labels.tools}>
          {(chapter !== 5 || reduced) &&
            labels.topics.map((topic, index) => {
              const Icon = TOPIC_ICONS[index];
              return (
                <button
                  key={topic.key}
                  type="button"
                  onClick={() => jump(index)}
                  aria-current={activeTopic === index ? "step" : undefined}
                  title={topic.title}
                >
                  <Icon size={17} aria-hidden="true" />
                  <span>{topic.title}</span>
                </button>
              );
            })}
          <button
            type="button"
            onClick={() => setExploring(!exploring)}
            aria-expanded={exploring}
            aria-controls="cosmic-explorer"
          >
            <Compass size={17} aria-hidden="true" />
            <span>{labels.explore}</span>
          </button>
        </nav>

        {exploring && (
          <div id="cosmic-explorer" className="cosmic-explorer">
            <p>{labels.explore}</p>
            {DISCOVERY_IDS.map((id) => {
              const Icon = DISCOVERY_ICONS[id];
              return (
                <button
                  key={id}
                  type="button"
                  onClick={(event) => openDiscovery(id, event.currentTarget)}
                >
                  <Icon size={20} aria-hidden="true" />
                  <span>{labels.discoveries[id].title}</span>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </button>
              );
            })}
            <button type="button" onClick={() => setExploring(false)}>
              {labels.close}
            </button>
          </div>
        )}

        <div
          className="cosmic-hotspots"
          aria-hidden={!hotspotVisible}
          inert={!hotspotVisible}
        >
          {DISCOVERY_IDS.map((id) => {
            const Icon = DISCOVERY_ICONS[id];
            return (
              <button
                key={id}
                className={`cosmic-hotspot cosmic-hotspot-${id}`}
                data-space-hotspot={id}
                type="button"
                onClick={(event) => {
                  if (event.detail === 0)
                    openDiscovery(id, event.currentTarget);
                  else
                    dispatch("cosmic-pick", {
                      id,
                      x: event.clientX,
                      y: event.clientY,
                    });
                }}
                aria-expanded={discovery === id}
                aria-controls={
                  discovery === id ? "cosmic-discovery" : undefined
                }
                title={labels.discoveries[id].title}
                aria-label={labels.discoveries[id].title}
              >
                <Icon size={18} aria-hidden="true" />
                <span>{labels.discoveries[id].title}</span>
              </button>
            );
          })}
        </div>

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
              key={topic.key}
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
          className="cosmic-source-identity"
          aria-hidden={!reduced && chapter < 4}
          style={{
            opacity: reduced ? 1 : identityOpacity,
            y: reduced ? 0 : identityY,
          }}
        >
          <CosmicIdentity name={labels.identity} />
        </motion.div>

        <motion.div
          className="cosmic-inner"
          aria-hidden={!reduced && chapter !== 4}
          style={{ opacity: reduced ? 1 : coreOpacity }}
        >
          <div className="cosmic-core-message">
            <p className="cosmic-eyebrow">{labels.terminal}</p>
            <h2>{labels.coreTitle}</h2>
            <p>{labels.coreDescription}</p>
          </div>
          <div className="cosmic-terminal">
            <div className="cosmic-terminal-bar">
              <span aria-hidden="true">● ● ●</span>
              <span>{labels.terminal}</span>
            </div>
            <p className="cosmic-command">
              <Code2 size={20} aria-hidden="true" />
              {labels.command}
            </p>
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
              <Check size={18} aria-hidden="true" />
              {labels.sequence}
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
            <h2>{labels.finalTitle}</h2>
            <p>{labels.finalDescription}</p>
          </div>
          <CosmicConnections />
          <div className="cosmic-source-symbol" aria-hidden="true">
            <Code2 />
          </div>
          <ul className="cosmic-overview">
            {labels.topics.map((topic, index) => {
              const Icon = TOPIC_ICONS[index];
              return (
                <li
                  key={topic.key}
                  className={`cosmic-overview-${index}`}
                  data-topic={topic.key}
                >
                  <button type="button" onClick={() => jump(index)}>
                    <Icon size={24} aria-hidden="true" />
                    <h3>{topic.title}</h3>
                    <p>{topic.detail}</p>
                    <span>
                      {labels.visit}
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <a href="#experiencia" className="cosmic-continue">
            {labels.continue}
            <ArrowDown size={16} aria-hidden="true" />
          </a>
        </motion.div>

        <div className="cosmic-interaction">
          <p>{labels.interaction}</p>
          <fieldset>
            <legend>{labels.control}</legend>
            {TARGETS.map((item) => (
              <button
                type="button"
                key={item}
                aria-pressed={target === item}
                onClick={() => {
                  setTarget(item);
                  dispatch("cosmic-target", item);
                }}
              >
                {labels.targets[item]}
              </button>
            ))}
            <button type="button" onClick={() => dispatch("cosmic-reset")}>
              {labels.reset}
            </button>
          </fieldset>
        </div>

        <div className="cosmic-bottom">
          <a href="#experiencia" className="cosmic-skip">
            <ArrowDown size={15} aria-hidden="true" />
            {labels.scroll}
          </a>
          <div className="cosmic-socials">
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={labels.linkedin}
            >
              <LinkedInIcon aria-hidden="true" />
            </a>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              aria-label={labels.github}
            >
              <GitHubIcon aria-hidden="true" />
            </a>
            <a
              href={siteConfig.tiktok}
              target="_blank"
              rel="noreferrer"
              aria-label={labels.tiktok}
            >
              <TikTokIcon aria-hidden="true" />
            </a>
          </div>
          <div className="cosmic-audio">
            <button
              type="button"
              onClick={() => void toggleSound()}
              disabled={soundPending}
              aria-pressed={sound}
            >
              {sound ? (
                <Volume2 size={17} aria-hidden="true" />
              ) : (
                <VolumeX size={17} aria-hidden="true" />
              )}
              {sound ? labels.soundOff : labels.soundOn}
            </button>
            {sound && (
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                aria-label={labels.volume}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setVolume(value);
                  soundSystem.current?.setVolume(value);
                }}
              />
            )}
          </div>
        </div>
        {soundError && (
          <p className="cosmic-sound-error" role="status">
            {labels.soundError}
          </p>
        )}
        <motion.div
          className="cosmic-progress"
          style={{ scaleX: reduced ? 1 : scrollYProgress }}
          aria-hidden="true"
        />

        {selection && (
          <CosmicPopover
            anchor={discoveryAnchor}
            title={selection.title}
            text={selection.text}
            closeLabel={labels.close}
            onClose={() => setDiscovery(null)}
          >
            {discovery === "avatar" ? (
              <a href="#perfil" onClick={() => setDiscovery(null)}>
                {selection.action}
                <ArrowUpRight size={18} />
              </a>
            ) : (
              <button
                type="button"
                onClick={() => {
                  if (discovery === "lakeit") jump(1);
                  else if (discovery === "futbuy") jump(4);
                  else {
                    setDiscovery(null);
                    dispatch(
                      "cosmic-target",
                      discovery === "orbit" ? "orbit" : "core",
                    );
                    setTarget(discovery === "orbit" ? "orbit" : "core");
                  }
                }}
              >
                {selection.action}
                <ArrowUpRight size={18} />
              </button>
            )}
          </CosmicPopover>
        )}
      </div>
    </section>
  );
}
