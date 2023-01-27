<script lang="ts">
  import dayjs from 'dayjs';
  import { onMount } from 'svelte';

  export let dateTime = '';
  export let interval = 0;
  export let format = 'MMM DD, YYYY - hh:mm:ss a';
  export let timezone = dayjs.tz.guess();

  $: time = dayjs(dateTime)
    .tz(timezone || 'Asia/Manila')
    .format(format);

  let timer: NodeJS.Timer;

  onMount(() => {
    if (!interval) return;
    timer = setInterval(() => {
      time = dayjs(dateTime).tz(timezone).format(format);
    }, interval);

    return () => {
      clearInterval(timer);
    };
  });
</script>

{time}
