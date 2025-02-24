<script>
    export let tab
    export let switchTab
    export let tabsToShow
    function capitalize(name) {
        return `${name.charAt(0).toUpperCase()}${name.slice(1)}`
    }
</script>

<ul class="nav">
    {#each tabsToShow as oneTab}
    <li class="item {tab === oneTab? "active" : ""}" on:click={() => switchTab(oneTab)}>
        <i class="{oneTab}" id="{oneTab}"></i>
        <label for="{oneTab}" class="nav-label">{capitalize(oneTab)}</label>
    </li>
    {/each}
</ul>
<style>
    .nav {
        top: 20px;
        position: sticky;
    }
    .nav-label {
	    font-size: 11px;
    }
    ul.nav {
        display:flex;
        flex-flow: column;
        justify-content: center;
        width: 100%;
        padding: 0;
        margin: 0;
    }
    .nav .item {
        display: flex;
        flex-flow: column;
        align-items: center;
        width: 100%;
        padding-left: 2px;
        box-sizing: border-box;
    }
    .nav .item:hover {
        border-left: solid #ccc 4px;
        padding-left: 0px;
    }
    .item.active {
	    border-left: solid #fff 4px;
        padding-left: 0px;
    }
    .item + .item {
	    margin-top: 10px;
    }
    li.item label {
        color: #fff;
    }
    .activity {
    	background: no-repeat;
    	background-image: url('../images/chart-line.svg');
    }
    .settings {
    	background: no-repeat;
    	background-image: url('../images/gear.svg');
    }
    .product {
    	background: no-repeat;
    	background-image: url('../images/list-ul.svg');
    }
    .logs {
    	background: no-repeat;
    	background-image: url('../images/list-check.svg');
    }
    .erp {
    	background: no-repeat;
    	background-image: url('../images/gears.svg');
    }
    .nav-input-field {
    	width: 375px;
        margin-right: 65px;
    }
</style>