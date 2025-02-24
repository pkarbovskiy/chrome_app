<script>
    import { notificationService } from '../stores/notificationStore.mjs';
    import NotificationItem from './NotificationItem.svelte';
    $: notification = $notificationService
    let toggle = false
    function toggleNotif() {
        toggle = !toggle
    }
    function resetList() {
        notification.notifArr = []
    }
</script>
<button class="{toggle?'opened':''} notif-toggler" on:click={toggleNotif}></button>
<section class="notifications-list {toggle?'':'hide'}">
    <h2>Notifications</h2>
    <ul>
        {#each notification.notifArr.toReversed() as one}
        <li><NotificationItem  notif={one} /></li>
        {/each}
    </ul>
    <button class="btn-reset btn-main" on:click={resetList()}>Clean List</button>
</section>
<style>
    .btn-reset {
        margin: .5rem;
    }
    .notif-toggler {
        position: absolute;
        z-index: 10;
        top: 4px;
        right: 7px;
        width: 3em;
        height: 3em;
        border-radius: 100%;
        background: var(--nav-box-color) no-repeat center/58% url(../images/bell.svg)
    }
    .notifications-list {
        container-type: inline-size;
        display: flex;
        flex-flow: column;
        position: absolute;
        top: 15px;
        bottom: 15px;
        right: 8px;
        background: rgb(206,223,231);
        width: 20rem;
        border-radius: 2%;
        --devider-colour: #999;
    }
    .notifications-list > h2 {
        color: var(--nav-box-color);
        padding-left: 0.7rem;
        margin: 0.7rem 0.5rem;
    }
    .notifications-list > ul {
        container-type: inline-size;
        box-sizing: border-box;
        margin: 0;
        padding-inline-start: 0;
        width: 100cqw;
        border-top: 1px #eee solid;
        border-bottom: 1px #eee solid;
        overflow-y: scroll;
        overflow-x: hidden;
        height: calc( 100cqh - 123px );
    }
    .notifications-list > ul::-webkit-scrollbar {
        display: none;
    }
    .notifications-list > ul > li {
        list-style: none;
        width: 100cqw;
    }
    .notifications-list > ul > li + li {
        border-top: 1px solid var(--devider-colour)
    }
    .hide {
        display: none;
    }
</style>