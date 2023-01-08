<script>
  import './styles.css';
  import dayjs from 'dayjs';
  import utc from 'dayjs/plugin/utc';
  import timezone from 'dayjs/plugin/timezone';

  dayjs.extend(utc);
  dayjs.extend(timezone);
</script>

<div class="svelte-app ">
  <main>
    <slot />
  </main>
</div>
