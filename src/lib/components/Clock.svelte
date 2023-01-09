<script lang="ts">
  import dayjs from 'dayjs';
  import { onMount } from 'svelte';

  export let interval = 1000;
  export let format = 'MMM DD, YYYY - hh:mm:ss a';
  export let timezone = dayjs.tz.guess();

  $: time = dayjs()
    .tz(timezone || 'Asia/Manila')
    .format(format);

  let timer: NodeJS.Timer;

  onMount(() => {
    timer = setInterval(() => {
      // const localTime = dayjs().utc().tz(localTimezone).format();
      // console.log('localTimezone', localTimezone, localTime);
      time = dayjs().tz(timezone).format(format);
    }, interval);
    return () => {
      clearInterval(timer);
    };
  });
</script>

{time}
