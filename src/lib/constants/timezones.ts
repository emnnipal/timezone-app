export const timezones = Intl as unknown as { supportedValuesOf: (name: string) => string[] };

export const groupedTimezones = Object.entries(
  timezones.supportedValuesOf('timeZone').reduce((acc, timezone) => {
    const [region, city] = timezone.split('/');
    const groupedCities = acc[region] || [];
    groupedCities.push(city);

    return {
      ...acc,
      [region]: groupedCities,
    };
  }, {} as Record<string, string[]>)
);
