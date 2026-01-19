import { Image, Video } from "lucide-react";

export const FormatTime = (date = "") => {
  const time = new Date(date);

  return time.toLocaleTimeString("en-us", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
