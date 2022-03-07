export function getMonthToUi(date: string) {
  let month = date.split("-")[1];

  if (Number(month) < 10 && month[0] !== "0") return "0" + month;

  return month;
}
