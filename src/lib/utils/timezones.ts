export const timezones = Intl as unknown as { supportedValuesOf: (name: string) => string[] };

// some timezones aren't available in dayjs
export const invalidTimezones = ['Americana/Indiana'].map((timezone) => {
  return timezone.split('/')[1].toLowerCase();
});

export const groupedTimezones = Object.entries(
  timezones.supportedValuesOf('timeZone').reduce((acc, timezone) => {
    const [region = '', city = ''] = timezone.split('/');

    if (!region || !city) return acc;

    const groupedCities = acc[region] || [];

    if (!invalidTimezones.includes(city.toLowerCase())) {
      groupedCities.push(city);
    }

    return {
      ...acc,
      [region]: groupedCities,
    };
  }, {} as Record<string, string[]>)
);
