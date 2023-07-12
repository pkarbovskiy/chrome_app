<script>
    import { notificationService } from '../stores/notificationStore.mjs';
    import NotificationItem from './NotificationItem.svelte';
    $: notification = $notificationService
    // const notification = {
    //     notifArr:[
    //     {id: '3cbdf377-ac66-4a9a-a703-e5266c6bdadb', new:true, receivedOn:Date.now(), topic: 'PRODUCT', message: 'LSW4093', type: 'NOTIFICATION', action: 'FINISHED'},
    //     {id: '4658ed2e-e52c-4e0e-aa13-7b4f091760c7', new:true, receivedOn:Date.now(), topic: 'PRODUCT', message: 'LSW4157', type: 'ERROR', action: 'ERROR'},
    //     {id: '502688bc-5f20-4add-a1eb-4c1c1729d074', new:true, receivedOn:Date.now(), topic: 'PRODUCT', message: 'LSW3234', type: 'WARNING', action: 'WARNING'},
    //     {id: '87711bbc-c6ef-4b65-a181-9b43383922fa', new:true, receivedOn:Date.now(), topic: 'PRODUCT', message: 'LSW4137', type: 'NOTIFICATION', action: 'FINISHED'},
    // ]}
    let toggle = false
    function toggleNotif() {
        toggle = !toggle
    }
</script>
<button class="{toggle?'opened':''} notif-toggler" on:click={toggleNotif}></button>
<section class="notifications-list {toggle?'':'hide'}">
    <h2>Notifications</h2>
    <ul>
        {#each notification.notifArr as one}
        <li><NotificationItem  notif={one} /></li>
        {/each}
    </ul>
</section>
<style>
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
        color: #fff;
        padding-left: 1rem;
    }
    .notifications-list > ul {
        container-type: inline-size;
        box-sizing: border-box;
        padding-inline-start: 0;
        width: 100cqw;
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