export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  LOAD_MORE_DELAY: 400,
  INTERSECTION_ROOT_MARGIN: '200px',
  INTERSECTION_THRESHOLD: 0.1,
} as const;

export const ANIMATION = {
  EXPAND_DURATION: 300,
} as const;

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
} as const;

export const TEXT = {
  DESCRIPTION_TRUNCATE_LENGTH: 220,
} as const;

export const MEDIA = {
  VIDEO_INTERSECTION_THRESHOLD: 0.5,
} as const;

export const ROOM_CARD = {
  INITIAL_VARIANTS_SHOWN: 2,
} as const;
