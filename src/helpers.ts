import dayjs, { Dayjs } from 'dayjs';

export type DateLike = Dayjs | string | Date | number | undefined;

export function isWorkingDays(date: DateLike) {
  const day = dayjs(date).day();
  if (day === 0 || day === 6) return false;
  return true;
}

export function isNotHolidays(holidays: string[], date?: DateLike) {
  for (let index = 0; index < holidays.length; index += 1) {
    const holiday = holidays[index];
    if (dayjs(date).isSame(dayjs(holiday), 'day')) return false;
  }
  return true;
}

export function isMarketDays(holidays: string[], date?: DateLike) {
  return isWorkingDays(date) && isNotHolidays(holidays, date);
}

export function getSessionOneStartsAt(date: DateLike) {
  return dayjs(date)
    .hour(9)
    .minute(0)
    .second(0)
    .millisecond(0);
}

export function getSessionTwoStartsAt(date: DateLike) {
  return dayjs(date)
    .hour(13)
    .minute(30)
    .second(0)
    .millisecond(0);
}

export function getSessionOneEndsAt(date: DateLike) {
  return dayjs(date)
    .hour(11)
    .minute(30)
    .second(0)
    .millisecond(0);
}

export function getSessionTwoEndsAt(date: DateLike) {
  return dayjs(date)
    .hour(15)
    .minute(0)
    .second(0)
    .millisecond(0);
}

export function isInSessionOne(date?: DateLike) {
  const now = dayjs(date);
  return now.isAfter(getSessionOneStartsAt(date)) && now.isBefore(getSessionOneEndsAt(date));
}

export function isInSessionTwo(date?: DateLike) {
  const now = dayjs(date);
  return now.isAfter(getSessionTwoStartsAt(date)) && now.isBefore(getSessionTwoEndsAt(date));
}

export function isPreClose(date?: DateLike) {
  const now = dayjs(date);
  return now.isBefore(getSessionOneEndsAt(date));
}

export function isAfterHours(date?: DateLike) {
  const now = dayjs(date);
  return now.isAfter(getSessionTwoEndsAt(date));
}

export function isOnBreak(date?: DateLike) {
  const now = dayjs(date);
  return now.isAfter(getSessionOneEndsAt(date)) && now.isBefore(getSessionTwoEndsAt(date));
}
