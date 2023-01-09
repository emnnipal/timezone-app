<script lang="ts">
  import { clickOutside } from '$lib/utils/svelte-helpers';
  import classNames from 'classnames';
  import { groupedTimezones } from '$lib/utils/timezones';
  import lowerCase from 'lodash/lowerCase';
  import XMark from '$lib/icons/XMark.svelte';

  export let selectedTimezone = '';
  export let onSelect: (timezone: string) => void;
  export let placeholder = 'Select timezone';
  export let showClearButton = true;

  let showOptions = false;
  let searchValue = selectedTimezone;
  let filteredTimezones = groupedTimezones;
  let timer: NodeJS.Timeout;

  $: {
    clearTimeout(timer);
    timer = setTimeout(() => {
      let result = [];
      for (const [region, cities] of groupedTimezones) {
        const filteredCities = cities.filter((city) =>
          lowerCase(`${region}/${city}`).includes(lowerCase(searchValue || ''))
        );
        if (filteredCities.length > 0) {
          result.push([region, filteredCities]);
        }
      }
      filteredTimezones = result as typeof groupedTimezones;
    }, 250);
  }

  const handleClick = (region: string, city: string) => {
    showOptions = false;
    selectedTimezone = `${region}/${city}`;
    searchValue = selectedTimezone;
    onSelect(selectedTimezone);
  };
</script>

<div
  class="relative w-full min-w-[275px]"
  use:clickOutside
  on:click_outside={() => {
    showOptions = false;
  }}
>
  <div class="relative">
    <input
      on:input={() => {
        showOptions = true;
      }}
      on:click={() => {
        showOptions = true;
      }}
      class={classNames(
        'z-0 w-full rounded border border-gray-400 p-2 px-4 font-semibold outline-none placeholder:font-normal',
        {
          'border-gray-50': !!searchValue,
        }
      )}
      bind:value={searchValue}
      {placeholder}
    />
    {#if showClearButton}
      <button
        class={classNames(
          'absolute top-0 right-0 cursor-pointer rounded-full py-3 px-4 transition-all duration-200 ease-in-out hover:scale-110 hover:fill-gray-900',
          {
            'fill-gray-600': !!searchValue,
            'fill-gray-200': !searchValue,
          }
        )}
        on:click={() => {
          searchValue = '';
        }}
      >
        <XMark className="w-3" />
      </button>
    {/if}
  </div>

  <div
    class={classNames(
      'absolute z-10 mt-1 max-h-[300px] w-full overflow-y-auto rounded border border-gray-300',
      {
        hidden: !showOptions,
      }
    )}
  >
    {#each filteredTimezones as [region, cities] (region)}
      {#if cities.length > 0}
        <div>
          <div class="sticky top-0 border-b border-gray-300 bg-gray-200 p-2 px-4 font-semibold">
            {region}
          </div>
          {#each cities as city}
            <div
              class={classNames(
                'cursor-pointer py-2 px-8 hover:bg-blue-100',
                'transition-all duration-200 ease-in-out',
                {
                  'bg-blue-300': selectedTimezone === `${region}/${city}`,
                  'bg-gray-50': selectedTimezone !== `${region}/${city}`,
                }
              )}
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
      <div class="bg-gray-50 p-2 font-semibold">No results</div>
    {/if}
  </div>
</div>
