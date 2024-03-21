/* istanbul ignore file */
import { DateTime, DurationObjectUnits } from 'luxon';

type IAddPeriod = {
  date?: string | null;
  period: keyof DurationObjectUnits;
  value: number;
};
interface IAddOrMinusPeriod extends IAddPeriod {
  df: DateTime;
  isAdd?: boolean;
}

export const DateFormat = {
  FORMAT_ONE: 'MMMM dd, yyyy', //  March 21, 2017
  FORMAT_TWO: 'yyyy-MM-dd HH:mm:ss', // 2017-03-21 11:10:52
  FORMAT_THREE: 'ff', // Apr 5th 2017, 6:52 pm,
  FORMAT_FOUR: "yyyy-MM-dd'T'TTZZ", // 2022-03-11T22:16:07+05:30
  FORMAT_FIVE: 'yyyy-MM-dd', // 2022-02-14
  FORMAT_SIX: 'MM-dd-yyyy', // 03-15-2022
  FORMAT_SEVEN: 'yyyy', // 2022,
  FORMAT_FIVE_GLOBAL: 'YYYY-MM-DD', //2021-02-01
  FORMAT_EIGHT: 'DD-MM-YYYY', // 12-01-2021
  FORMAT_NINE: 'YYYY-MM-DDTHH:mm:ss.SSSZ', // 2022-12-15T18:27:00.000Z
  FORMAT_TEN: 'yyyy-LL-dd'
};

export const TimeFormatLabels = {
  milliseconds: 'milliseconds',
  seconds: 'seconds'
};

export const getCurrentMillis = (): number => {
  return DateTime.now().toMillis();
};
export const getCurrentDate = ({ format }: { format: string | null }): string | null => {
  if (format) return DateTime.now().toFormat(format);
  return DateTime.now().toISO();
};
export const parseDateFromMillis = ({
  inputMillis,
  format
}: {
  inputMillis: number;
  format?: string | null;
}): string | null => {
  if (format) return DateTime.fromMillis(inputMillis).toFormat(format);
  return DateTime.fromMillis(inputMillis).toISO();
};
export const parseDateToMillis = ({ inputDt }: { inputDt: Date | string }): number => {
  return DateTime.fromJSDate(inputDt as Date).toMillis() || DateTime.fromISO(inputDt as string).toMillis();
};
export const parseDateToString = ({ inputDt, format }: { inputDt: Date; format: string }): string => {
  return DateTime.fromJSDate(inputDt).toFormat(format);
};

export const parseStringToDateToString = ({ inputDt, format }: { inputDt: string; format: string }): string => {
  return DateTime.fromJSDate(new Date(inputDt)).toFormat(format);
};

// eslint-disable-next-line @typescript-eslint/naming-convention
const _addOrMinusPeriod = ({ df, period, value, isAdd }: IAddOrMinusPeriod) => {
  let dt = df.toISO();
  switch (period) {
    case 'milliseconds': {
      dt = isAdd ? df.plus({ milliseconds: value }).toISO() : df.minus({ milliseconds: value }).toISO();
      break;
    }
    case 'seconds': {
      dt = isAdd ? df.plus({ seconds: value }).toISO() : df.minus({ seconds: value }).toISO();
      break;
    }
    case 'minutes': {
      dt = isAdd ? df.plus({ minutes: value }).toISO() : df.minus({ minutes: value }).toISO();
      break;
    }
    case 'hours': {
      dt = isAdd ? df.plus({ hours: value }).toISO() : df.minus({ hours: value }).toISO();
      break;
    }
    case 'days': {
      dt = isAdd ? df.plus({ days: value }).toISO() : df.minus({ days: value }).toISO();
      break;
    }
    case 'weeks': {
      dt = isAdd ? df.plus({ week: value }).toISO() : df.minus({ week: value }).toISO();
      break;
    }
    case 'months': {
      dt = isAdd ? df.plus({ months: value }).toISO() : df.minus({ months: value }).toISO();
      break;
    }
    case 'quarters': {
      dt = isAdd ? df.plus({ quarters: value }).toISO() : df.minus({ quarters: value }).toISO();
      break;
    }
    case 'years': {
      dt = isAdd ? df.plus({ years: value }).toISO() : df.minus({ years: value }).toISO();
      break;
    }
    default: {
      break;
    }
  }
  return dt;
};
export const addPeriodToDate = ({ date, period, value }: IAddPeriod): string | null => {
  const df = date ? DateTime.fromISO(date) : DateTime.now();

  return _addOrMinusPeriod({ df, period, value, isAdd: true });
};
export const subtractPeriodToDate = ({ date, period, value }: IAddPeriod): string | null => {
  const df = date ? DateTime.fromISO(date) : DateTime.now();

  return _addOrMinusPeriod({ df, period, value, isAdd: false });
};

export const diffDateFrom = ({ inputDt, period }: { inputDt: Date; period: keyof DurationObjectUnits | null }) => {
  const df = DateTime.fromJSDate(inputDt);
  let dt = df.diff(DateTime.now(), 'seconds').toObject().seconds;

  switch (period) {
    case 'milliseconds': {
      dt = df.diff(DateTime.now(), 'milliseconds').toObject().milliseconds;
      break;
    }
    case 'seconds': {
      dt = df.diff(DateTime.now(), 'seconds').toObject().seconds;
      break;
    }
    case 'minutes': {
      dt = df.diff(DateTime.now(), 'minutes').toObject().minutes;
      break;
    }
    case 'hours': {
      dt = df.diff(DateTime.now(), 'hours').toObject().hours;
      break;
    }
    case 'days': {
      dt = df.diff(DateTime.now(), 'days').toObject().days;
      break;
    }
    case 'weeks': {
      dt = df.diff(DateTime.now(), 'weeks').toObject().weeks;
      break;
    }
    case 'months': {
      dt = df.diff(DateTime.now(), 'months').toObject().months;
      break;
    }
    case 'quarters': {
      dt = df.diff(DateTime.now(), 'quarters').toObject().quarters;
      break;
    }
    case 'years': {
      dt = df.diff(DateTime.now(), 'years').toObject().years;
      break;
    }
    default: {
      break;
    }
  }

  return dt;
};

export const diffDateBetween = ({
  fromDt,
  toDt,
  period
}: {
  fromDt: Date;
  toDt: Date;
  period: keyof DurationObjectUnits | null;
}) => {
  const df = DateTime.fromJSDate(fromDt);
  const tof = DateTime.fromJSDate(toDt);
  let dt = df.diff(tof, 'seconds').toObject().seconds;

  switch (period) {
    case 'milliseconds': {
      dt = tof.diff(df, 'milliseconds').toObject().milliseconds;

      break;
    }
    case 'seconds': {
      dt = tof.diff(df, 'seconds').toObject().seconds;
      break;
    }
    case 'minutes': {
      dt = tof.diff(df, 'minutes').toObject().minutes;

      break;
    }
    case 'hours': {
      dt = tof.diff(df, 'hours').toObject().hours;
      break;
    }
    case 'days': {
      dt = tof.diff(df, 'days').toObject().days;
      break;
    }
    case 'weeks': {
      dt = tof.diff(df, 'weeks').toObject().weeks;
      break;
    }
    case 'months': {
      dt = tof.diff(df, 'months').toObject().months;
      break;
    }
    case 'quarters': {
      dt = tof.diff(df, 'quarters').toObject().quarters;
      break;
    }
    case 'years': {
      dt = tof.diff(df, 'years').toObject().years;
      break;
    }
    default: {
      break;
    }
  }

  return dt;
};

export const getDateofBefore30Day = (): string | null => {
  return subtractPeriodToDate({
    period: 'days',
    value: 30,
    date: parseDateFromMillis({
      inputMillis: getCurrentMillis()
    })
  });
};
