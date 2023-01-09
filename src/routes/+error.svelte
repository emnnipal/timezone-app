<script>
  import { page } from '$app/stores';
</script>

<div>
  <h1>{$page.status}: {$page?.error?.message}</h1>
  <h1>Error {JSON.stringify($page?.error)}</h1>
</div>
