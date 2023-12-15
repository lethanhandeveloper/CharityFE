import { HistoryContractUI } from '@models/contract';
export interface ChartStructure {
  name: string;
  value: number;
  count: number;
}
const getDaysBetweenDates = (startDate: Date, endDate: Date): number => {
  const startUtc = startDate.getTime();
  const endUtc = endDate.getTime();
  const oneDay = 24 * 60 * 60 * 1000;
  const diffDays = Math.floor((endUtc - startUtc) / oneDay);
  return diffDays;
};

const getDaysListBetweenDates = (startDate: Date, endDate: Date): Date[] => {
  const daysList: Date[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    daysList.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return daysList;
};

const getMonthsListBetweenDates = (startDate: Date, endDate: Date): Date[] => {
  const monthsList: Date[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    monthsList.push(new Date(currentDate));
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return monthsList;
};

const getWeeksListBetweenDates = (startDate: Date, endDate: Date): Date[] => {
  const weeksList: Date[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    weeksList.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 7);
  }

  return weeksList;
};

const getListDataDay = (startDate: Date, endDate: Date, list: HistoryContractUI[]) => {
  const dayList: Date[] = getDaysListBetweenDates(startDate, endDate);
  const listReturn: ChartStructure[] = [];
  dayList.forEach((day) => {
    const total = list.reduce(
      (pre, current) => {
        if (
          current.time.getDate() === day.getDate() &&
          current.time.getMonth() === day.getMonth() &&
          current.time.getFullYear() === day.getFullYear()
        ) {
          return {
            count: pre.count + 1,
            total: pre.total + current.value,
          };
        }

        return pre;
      },
      { count: 0, total: 0 },
    );
    listReturn.push({
      count: total.count,
      name: `${day.getDate()}/${day.getMonth()}`,
      value: total.total,
    });
  });
  return listReturn;
};

const getListDataMonth = (startDate: Date, endDate: Date, list: HistoryContractUI[]) => {
  const monthList: Date[] = getMonthsListBetweenDates(startDate, endDate);
  const listReturn: ChartStructure[] = [];
  monthList.forEach((day) => {
    const total = list.reduce(
      (pre, current) => {
        if (
          current.time.getMonth() === day.getMonth() &&
          current.time.getFullYear() === day.getFullYear()
        ) {
          return {
            count: pre.count + 1,
            total: pre.total + current.value,
          };
        }

        return pre;
      },
      { count: 0, total: 0 },
    );
    listReturn.push({
      count: total.count,
      name: `${day.getMonth()}/${day.getFullYear()}`,
      value: total.total,
    });
  });
  return listReturn;
};

const getListDataWeek = (startDate: Date, endDate: Date, list: HistoryContractUI[]) => {
  const weeksList: Date[] = getWeeksListBetweenDates(startDate, endDate);
  const listReturn: ChartStructure[] = [];
  const time = 24 * 60 * 60 * 1000;
  weeksList.forEach((day) => {
    const total = list.reduce(
      (pre, current) => {
        if (
          day.getTime() <= current.time.getTime() &&
          current.time.getTime() <= day.getTime() + time
        ) {
          return {
            count: pre.count + 1,
            total: pre.total + current.value,
          };
        }

        return pre;
      },
      { count: 0, total: 0 },
    );
    listReturn.push({
      count: total.count,
      name: `test`,
      value: total.total,
    });
  });
  return listReturn;
};

const Search = (startDate: Date, endDate: Date, list: HistoryContractUI[]): ChartStructure[] => {
  const diffDays = getDaysBetweenDates(startDate, endDate);
  if (diffDays > 14) {
    return getListDataWeek(startDate, endDate, list);
  } else if (diffDays > 40) {
    return getListDataMonth(startDate, endDate, list);
  } else {
    return getListDataDay(startDate, endDate, list);
  }
};

export default Search;
