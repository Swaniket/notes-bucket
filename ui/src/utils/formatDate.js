import { formatDistanceToNow, parseISO } from "date-fns";

export const formattedDate = (date) => {
  const dateDistance = formatDistanceToNow(parseISO(date), {
    includeSeconds: true,
    addSuffix: true,
  });

  return dateDistance;
};
