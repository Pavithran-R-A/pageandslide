export function toDateTimeLocalValue(value: Date): string {
  const local = new Date(value.getTime() - value.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 16);
}

export function minimumDeadline(now = new Date()): string {
  const nextMinute = new Date(now);
  nextMinute.setSeconds(0, 0);
  nextMinute.setMinutes(nextMinute.getMinutes() + 1);
  return toDateTimeLocalValue(nextMinute);
}

export function isPastDeadline(value: string, now = new Date()): boolean {
  const timestamp = new Date(value).getTime();
  return Number.isNaN(timestamp) || timestamp < now.getTime();
}
