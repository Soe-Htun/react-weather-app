export const timeFormat = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
  timeZone: "UTC",
});


export const formattedDate = new Intl.DateTimeFormat("en-US",{
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
});