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
{#each rows as row, i}
    {#each headers as header}
    <div class="grid-cell grid-row {i%2?"":"odd"}">{@html row[header]}</div>
    {/each}
{/each}
</div>
  
<style>
    .grid-table {
        --even-child-colour: #ccc;
        display: grid;
        grid-template-columns: repeat(var(--columns-amount), minmax(max-content, 1fr));
        grid-auto-rows: minmax(25px, auto);
        box-sizing: border-box;
    }
    .grid-cell.odd {
        background-color: var(--even-child-colour);
    }
    .grid-cell {
        padding: 5px;
        overflow-wrap: anywhere;
    }

    .grid-header {
        font-weight: bold;
    }
</style>
  