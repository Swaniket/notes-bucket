export const formattedDate = (date) => {
  const timeZoneOffset = new Date().getTimezoneOffset().toString();
  const formattedDate = new Date(date).toLocaleString("en-US", {
    timeZoneOffset: timeZoneOffset,
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return formattedDate;
};
