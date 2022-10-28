<script>
    export let tab
    export let switchTab
    export let tabsToShow
</script>

<ul class="nav">
    <li class="item {tab === "activity"? "active" : ""}" on:click={() => switchTab("activity")}>
        <i class="activity" id="activity"></i>
        <label for="activity" class="nav-label">Activity</label>
    </li>
    <li class="item {tab === "product"? "active" : ""}" on:click={() => switchTab("product")}>
        <i class="product" id="product"></i>
        <label for="product" class="nav-label">Products</label>                
    </li>
    <li class="item {tab === "nav"? "active" : ""}" on:click={() => switchTab("nav")}>
        <i class="erp" id="navIcon"></i>
        <label for="navIcon" class="nav-label">Nav</label>
    </li>
    <li class="item {tab === "logs"? "active" : ""}" on:click={() => switchTab("logs")}>
        <i class="logs" id="navIcon"></i>
        <label for="navIcon" class="nav-label">Logs</label>
    </li>
    <li class="item {tab === "settings"? "active" : ""}" on:click={() => switchTab("settings")}>
        <i class="settings" id="settings"></i>
        <label for="settings" class="nav-label">Settings</label>
    </li>
</ul>