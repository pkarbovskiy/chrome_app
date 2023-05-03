<!-- Grid.svelte -->
<script>  
    export let headers = []
    export let rows = []
</script>
  
<div class="grid-table" style="--columns-amount:{headers.length}">
<!-- Render headers -->
{#each headers as header}
    <div class="grid-cell grid-header">{header}</div>
{/each}

<!-- Render rows -->
{#each rows as row}
    {#each headers as header}
    <div class="grid-cell grid-row">{row[header]}</div>
    {/each}
{/each}
</div>
  
<style>
    .grid-table {
        display: grid;
        grid-template-columns: repeat(var(--columns-amount), 1fr);
        grid-auto-rows: minmax(50px, auto);
        grid-gap: 1px;
        border: 1px solid black;
    }

    .grid-cell {
        padding: 10px;
        border: 1px solid black;
    }

    .grid-header {
        font-weight: bold;
        background-color: #ccc;
    }
</style>
  