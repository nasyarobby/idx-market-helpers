import dayjs from 'dayjs';
import {
  DateLike, isAfterHours, isInSessionOne, isInSessionTwo, isOnBreak, isPreClose, isWorkingDays,
} from './helpers';

interface MarketTimeInterface {
  isWorkingDays(date: DateLike): boolean;
  isNotHolidays(date?: DateLike): boolean;
  isMarketDays(date?: DateLike): boolean;
  isInSessionOne(date?: DateLike): boolean;
  isInSessionTwo(date?: DateLike): boolean;
  isPreClose(date?: DateLike): boolean;
  isAfterHours(date?: DateLike): boolean;
  isOnBreak(date?: DateLike): boolean;
  isLive(date?: DateLike): boolean;
}

export default class MarketTime implements MarketTimeInterface {
  holidays: string[];

  constructor(holidays: string[]) {
    this.holidays = holidays;
  }

  isWorkingDays(date: DateLike) {
    return this.isNotHolidays(date) && isWorkingDays(date);
  }

  isNotHolidays(date?: DateLike) {
    for (let index = 0; index < this.holidays.length; index += 1) {
      const holiday = this.holidays[index];
      if (dayjs(date).isSame(dayjs(holiday), 'day')) return false;
    }
    return true;
  }

  isMarketDays(date?: DateLike) {
    return this.isWorkingDays(date) && this.isNotHolidays(date);
  }

  isInSessionOne(date?: DateLike) {
    return this.isMarketDays(date) && isInSessionOne(date);
  }

  isInSessionTwo(date?: DateLike) {
    return this.isMarketDays(date) && isInSessionTwo(date);
  }

  isPreClose(date?: DateLike) {
    return this.isMarketDays(date) && isPreClose(date);
  }

  isAfterHours(date?: DateLike) {
    const now = dayjs(date);
    return this.isMarketDays(date) && isAfterHours(date);
  }

  isOnBreak(date?: DateLike) {
    const now = dayjs(date);
    return this.isMarketDays(date) && isOnBreak(date);
  }

  isLive(date?: DateLike) {
    return this.isInSessionOne(date) || this.isInSessionTwo(date);
  }
}
