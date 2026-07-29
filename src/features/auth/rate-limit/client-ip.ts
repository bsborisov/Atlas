type HeaderReader = {
  get(name: string): string | null;
};

const UNKNOWN_IP = "unknown";

export function getClientIp(headers: HeaderReader): string {
  const forwardedFor = headers.get("x-forwarded-for");

  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0]?.trim();

    if (firstIp) {
      return firstIp;
    }
  }

  return headers.get("x-real-ip")?.trim() || UNKNOWN_IP;
}
