export function capitalizeWords(str: string): string {
  return str
    .split(/[^a-zA-Z0-9]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function formatPhoneNumber(phone: string): string {
  return phone.replace(/^(\d{4})(\d{7})$/, "$1-$2");
}

export function capitalizeEachWord(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // If date is today
  if (date.toDateString() === today.toDateString()) {
    return `Today at ${date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })}`;
  }

  // If date is yesterday
  if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday at ${date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })}`;
  }

  // For any other date
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function maskCNIC(value: string): string {
  const digits = value.replace(/[^0-9]/g, "");
  const parts = [
    digits.slice(0, 5),
    digits.slice(5, 12),
    digits.slice(12, 13)
  ].filter(Boolean);
  return parts.join("-");
}

export function maskPhoneNumber(value: string): string {
  const digits = value.replace(/[^0-9]/g, "");
  if (!digits.startsWith("03")) return "";
  return digits.slice(0, 11);
}
