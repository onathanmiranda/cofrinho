export default class Timeline {
  constructor(timestamp = new Date().getTime()) {
    function generateMonthData(date) {
      const _timestamp = date.getTime();

      const day = date.getDate();
      const year = date.getFullYear();

      const month = {};
      month.id = date.getMonth();
      month.firstDay = new Date(year, month.id, 1, 0, 0, 0, 0).getTime();
      month.lastDay = new Date(
        year,
        month.id + 1,
        0,
        23,
        59,
        59,
        999
      ).getTime();
      month.name = date.toLocaleString("default", { month: "long" });

      return {
        day,
        month,
        year,
        timestamp: _timestamp,
      };
    }

    const currentMonthDate = new Date(timestamp);
    const currentMonthDay = currentMonthDate.getDate();
    const currentMonth = currentMonthDate.getMonth();

    const previousMonthDate = new Date(timestamp);
    previousMonthDate.setDate(0);

    const previousMonthDay = previousMonthDate.getDate();
    const shouldPreviousAndCurrentDaysBeTheSame =
      previousMonthDay > currentMonthDay;

    if (shouldPreviousAndCurrentDaysBeTheSame)
      previousMonthDate.setDate(currentMonthDay);

    const nextMonthDate = new Date(timestamp);
    nextMonthDate.setMonth(currentMonth + 2, 0);

    const nextMonthDay = nextMonthDate.getDate();
    const shouldNextandCurrentDaysBeTheSame = nextMonthDay > currentMonthDay;

    if (shouldNextandCurrentDaysBeTheSame)
      nextMonthDate.setDate(currentMonthDay);

    const current = generateMonthData(currentMonthDate);
    const previous = generateMonthData(previousMonthDate);
    const next = generateMonthData(nextMonthDate);

    const returnValue = {
      current,
      next,
      previous,
    };

    return returnValue;
  }
}
