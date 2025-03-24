export interface Environment {
  gogoUrl: string;
  gogoSecret: string;
}

export function getGogoEnv(): Environment | undefined {
  const gogoUrl = process.env.GOGO_URL;
  const gogoSecret = process.env.GOGO_SECRET;

  if (!gogoUrl || !gogoSecret) {
    console.error(
      "GOGO_URL or GOGO_SECRET is not set, remember to add them to your environment variables.",
    );
    return undefined;
  }

  return {
    gogoUrl,
    gogoSecret,
  };
}
