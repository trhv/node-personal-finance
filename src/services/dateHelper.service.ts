class DateHelper{
  public isLastDay(dateToCheck: string): boolean {
    let checkDay = Number(dateToCheck.split('/')[0]);
    let checkMonth = Number(dateToCheck.split('/')[1]);
    let checkYear = Number(20 + dateToCheck.split('/')[2]);

    const now = new Date();
    // Create a date object for the previous day
    const previousDay = new Date();
    previousDay.setDate(now.getDate() - 1);
    return (
      checkYear === previousDay.getFullYear() &&
      checkMonth === (previousDay.getMonth() + 1) &&
      checkDay === previousDay.getDate()
    );
  }
}
export = new DateHelper();