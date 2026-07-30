import { format } from "date-fns";

export function formatDate(date: Date) {
  if (!date) {
    date = new Date(0, 0, 0)
  }

  return format(date, "dd/MM/yy");
}
