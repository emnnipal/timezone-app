<script>
  import './styles.css';
  import dayjs from 'dayjs';
  import utc from 'dayjs/plugin/utc';
  import timezone from 'dayjs/plugin/timezone';
  import AppLogo from '$lib/icons/app-logo.svelte';

  dayjs.extend(utc);
  dayjs.extend(timezone);
</script>

<svelte:head>
  <title>Timezone App</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="svelte-app h-full">
  <section class="relative flex flex-col items-center gap-4">
    <div
      class="sticky flex w-full justify-center border border-gray-200 py-3 text-lg font-semibold shadow-md"
    >
      <AppLogo className="mr-3 w-6" />
      Timezone App
    </div>
    <slot />
  </section>
</div>
