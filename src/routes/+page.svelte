<script lang="ts">
  import Clock from '$lib/components/clock.svelte';
  import DateTimePicker from '$lib/components/date-time-picker.svelte';
  import SelectTimezone from '$lib/components/select-timezone.svelte';
  import { DATE_TIME_FORMAT } from '$lib/constants/date-format';
  import { LocalStorageKey } from '$lib/enums/local-storage';
  import TrashCanRegular from '$lib/icons/trash-can-regular.svelte';
  import autoAnimate from '$lib/utils/auto-animate';
  import { LocalStorageUtil } from '$lib/utils/local-storage';
  import dayjs from 'dayjs';
  import uniq from 'lodash/uniq';

  let dateTimeValue: string = dayjs().format(DATE_TIME_FORMAT);
  let selectedTimezone: string = LocalStorageUtil.get(LocalStorageKey.AppTimezone) || 'Asia/Manila';
  let recentTimezones: string[] = LocalStorageUtil.get(LocalStorageKey.RecentTimezones) || [];

  $: derivedDateTimeWithTimezone = dayjs(dateTimeValue)
    .tz(selectedTimezone)
    .format(DATE_TIME_FORMAT);

  $: LocalStorageUtil.set(LocalStorageKey.RecentTimezones, recentTimezones);
  $: LocalStorageUtil.set(LocalStorageKey.AppTimezone, selectedTimezone);
</script>

<div class="relative w-full min-w-[300px] max-w-[600px] rounded">
  <div class="sticky top-12 z-10 flex flex-col gap-5 bg-white p-4">
    <div class="font-semibold">
      <DateTimePicker label="Set time" bind:value={dateTimeValue} />
    </div>
    <div class="grid grid-cols-[auto_1fr] items-center gap-2 font-semibold">
      <span> Set timezone: </span>
      <SelectTimezone bind:selectedTimezone />
    </div>
  </div>

  <div class="m-4 flex flex-col gap-3 border border-gray-100 p-4">
    <div class="flex items-center">
      <SelectTimezone
        onSelect={(value) => {
          recentTimezones = uniq([value, ...recentTimezones].slice(0, 10));
        }}
      />
    </div>
    <div class="font-semibold">Timezones:</div>
    <div use:autoAnimate class="flex flex-col gap-3">
      {#each recentTimezones as timezone, i (timezone)}
        <div
          class="flex place-content-between items-center rounded border border-gray-300 py-4 px-4"
        >
          <div class="grid grid-cols-[auto_1fr] gap-2 sm:grid-cols-[auto_1fr_auto]">
            <div class="font-semibold">
              {i + 1}.
            </div>
            <div class="flex gap-4 font-semibold">
              {timezone} <span class="hidden sm:block">-</span>
            </div>
            <div class="col-[2/2] sm:col-[3/3]">
              <Clock
                {timezone}
                dateTime={derivedDateTimeWithTimezone}
                format={'MMM DD - hh:mm a'}
              />
            </div>
          </div>
          <button
            class="w-4 cursor-pointer fill-red-500 transition-all duration-200 ease-in-out hover:scale-125"
            on:click={() => {
              recentTimezones.splice(i, 1);
              recentTimezones = recentTimezones;
            }}
          >
            <TrashCanRegular />
          </button>
        </div>
      {/each}
    </div>
  </div>
</div>
