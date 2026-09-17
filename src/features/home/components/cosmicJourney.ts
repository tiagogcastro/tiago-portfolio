// Shared scroll landmarks keep HTML storytelling and the WebGL camera in sync.
export const JOURNEY = {
  introduction: 0.12,
  terminal: 0.68,
  opening: 0.86,
} as const;

export const TOPIC_WINDOWS = [
  [0.12, 0.23],
  [0.23, 0.34],
  [0.34, 0.45],
  [0.45, 0.56],
  [0.56, 0.68],
] as const;

export function journeyChapter(progress: number) {
  if (progress < JOURNEY.introduction) return 0;
  if (progress < 0.23) return 1;
  if (progress < 0.56) return 2;
  if (progress < JOURNEY.terminal) return 3;
  if (progress < JOURNEY.opening) return 4;
  return 5;
}
