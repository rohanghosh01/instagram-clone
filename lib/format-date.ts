import moment from "moment";

export function formatDate(date: string): string {
  const now = moment();
  const inputDate = moment(date);
  const diffInSeconds = now.diff(inputDate, "seconds");

  if (diffInSeconds < 1) return "now";
  if (diffInSeconds < 60) return `${diffInSeconds} sec`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;
  return `${Math.floor(diffInSeconds / 604800)}w`;
}
