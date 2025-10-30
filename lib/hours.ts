import hours from '@/data/hours.json';

type DayEntry =
  | {
      day: string;
      open: string;
      close: string;
      closed?: false;
    }
  | {
      day: string;
      closed: true;
      open?: string;
      close?: string;
    };

export type Hours = DayEntry[];

export function getTodayStatus(now = new Date()) {
  const dayKey = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][now.getDay()];
  const entry = (hours as Hours).find((item) => item.day === dayKey);
  if (!entry || entry.closed) {
    return { status: 'closed' as const, nextOpening: findNextOpening(now) };
  }
  const [openHour, openMinute] = entry.open.split(':').map(Number);
  const [closeHour, closeMinute] = entry.close.split(':').map(Number);
  const openDate = new Date(now);
  openDate.setHours(openHour, openMinute, 0, 0);
  const closeDate = new Date(now);
  closeDate.setHours(closeHour, closeMinute, 0, 0);
  if (now >= openDate && now <= closeDate) {
    return { status: 'open' as const, closesAt: entry.close };
  }
  if (now < openDate) {
    return { status: 'closed' as const, nextOpening: { day: dayKey, time: entry.open } };
  }
  return { status: 'closed' as const, nextOpening: findNextOpening(now) };
}

function findNextOpening(now: Date) {
  for (let i = 1; i <= 7; i++) {
    const next = new Date(now);
    next.setDate(now.getDate() + i);
    const dayKey = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][next.getDay()];
    const entry = (hours as Hours).find((item) => item.day === dayKey);
    if (entry && !entry.closed) {
      return { day: dayKey, time: entry.open };
    }
  }
  return null;
}

export { hours };
