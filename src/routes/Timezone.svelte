<script lang="ts">
  import { groupedTimezones } from '$lib/constants/timezones';
  import { clickOutside } from '$lib/helpers/svelte-helpers';
  // import dayjs from 'dayjs';
  import classNames from 'classnames';

  let searchValue = '';
  let showOptions = false;
  let timer: NodeJS.Timeout;
  let filteredTimezones = groupedTimezones;
  let selectedTimezone = '';

  const handleClick = (region: string, city: string) => {
    showOptions = false;
    searchValue = city;
    selectedTimezone = `${region}/${city}`;
  };

  $: {
    clearTimeout(timer);
    timer = setTimeout(() => {
      let result = [];
      for (const [region, cities] of groupedTimezones) {
        const filteredCities = cities.filter((city) =>
          `${region}/${city}`.toLowerCase().includes(searchValue.toLowerCase())
        );
        if (filteredCities.length > 0) {
          result.push([region, filteredCities]);
        }
      }
      filteredTimezones = result as typeof groupedTimezones;
    }, 150);
  }
</script>

<section class="flex flex-col items-center gap-4">
  <div
    class="flex w-full justify-center border border-gray-200 py-3 text-lg font-semibold shadow-md"
  >
    Timezone - App
  </div>
  <div class="flex flex-col gap-5">
    <!-- TODO: create reusable component -->
    <div class="flex items-center">
      <span>Search:</span>

      <div
        class="relative ml-2"
        use:clickOutside
        on:click_outside={() => {
          showOptions = false;
        }}
      >
        <input
          on:input={() => {
            showOptions = true;
          }}
          on:click={() => {
            showOptions = true;
          }}
          class="min-w-[275px] rounded border border-gray-400 p-2"
          bind:value={searchValue}
        />

        {#if showOptions}
          <div
            class="absolute mt-1 max-h-[300px] w-full overflow-y-auto rounded border border-gray-300"
          >
            {#each filteredTimezones as [region, cities] (region)}
              {#if cities.length > 0}
                <div>
                  <div class="sticky top-0 bg-gray-200 p-2 font-semibold">{region}</div>
                  {#each cities as city}
                    <div
                      class={classNames('cursor-pointer py-2 px-4 hover:bg-blue-100', {
                        'bg-blue-300': selectedTimezone === `${region}/${city}`,
                      })}
                      on:click={() => handleClick(region, city)}
                      on:keydown={() => handleClick(region, city)}
                    >
                      {city}
                    </div>
                  {/each}
                </div>
              {/if}
            {/each}
            {#if filteredTimezones.length === 0}
              <div class="bg-white p-2 font-semibold">No results</div>
            {/if}
          </div>
        {/if}
      </div>
    </div>
    <div>
      Timezone:
      <span class="font-semibold">
        {selectedTimezone || 'none'}
      </span>
    </div>
  </div>
</section>
