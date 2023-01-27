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

<div class="flex min-w-[300px] max-w-[500px] flex-col gap-5 rounded p-4">
  <div class="font-semibold">
    <DateTimePicker label="Set time" bind:value={dateTimeValue} />
  </div>
  <div class="grid grid-cols-[auto_1fr] items-center gap-2 font-semibold">
    <span> Set timezone: </span>
    <SelectTimezone bind:selectedTimezone />
  </div>
  <div class="flex flex-col gap-3 border border-gray-100 p-4">
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
          <div class="flex flex-col sm:flex-row">
            <span class="font-semibold">
              {i + 1}. {timezone} -
            </span>
            <span>
              <!-- TODO: check if interval needs to be changed -->
              <Clock
                {timezone}
                dateTime={derivedDateTimeWithTimezone}
                format={'MMM DD - hh:mm a'}
              />
            </span>
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
