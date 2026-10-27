export const DISCOVERY_IDS = [
  "core",
  "avatar",
  "lakeit",
  "futbuy",
  "orbit",
] as const;
export type DiscoveryId = (typeof DISCOVERY_IDS)[number];
export type ControlTarget = "universe" | "core" | "avatar" | "orbit";

export type CosmicTopic = {
  key: string;
  title: string;
  detail: string;
  tools: string;
  problem: string;
  result: string;
};

export type CosmicLabels = {
  identity: string;
  soundOn: string;
  soundOff: string;
  soundError: string;
  volume: string;
  scroll: string;
  coordinates: string;
  terminal: string;
  command: string;
  sequence: string;
  topics: CosmicTopic[];
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
  interaction: string;
  reset: string;
  explore: string;
  close: string;
  visit: string;
  linkedin: string;
  github: string;
  tiktok: string;
  control: string;
  targets: Record<ControlTarget, string>;
  discoveries: Record<
    DiscoveryId,
    { title: string; text: string; action: string }
  >;
};
