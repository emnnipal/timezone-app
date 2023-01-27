<script lang="ts">
  export let value: string;
  export let label = '';

  let date: string = value.split('T')?.[0];
  let time: string = value.split('T')?.[1];

  $: value = `${date}T${time}`;
</script>

<div class="flex w-full flex-col gap-2 rounded">
  <span>
    {label}
  </span>
  <div class="flex gap-3 px-4">
    <input class="rounded border bg-white p-2" type="date" bind:value={date} />
    <input class="rounded border bg-white p-2" type="time" bind:value={time} />
  </div>
</div>
