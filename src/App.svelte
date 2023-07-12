<script>
import { onMount } from 'svelte';
import config from '../config.json';
import Navigation from './components/Navigation.svelte';
import NotificationsList from './components/NotificationsList.svelte';
import { notificationService } from './stores/notificationStore.mjs';
import Erp from './tabs/Erp.svelte';
import Log from './tabs/Log.svelte';
import Product from './tabs/Product.svelte';
import Setting from './tabs/Setting.svelte';
const {
    TABS,
    WS_TOKEN,
    WS_DOMAIN
} = config
let tab = 'product'
function switchTab(tabName) {
    tab = tabName
}
onMount(() => {
    const socket = new WebSocket(`${WS_DOMAIN}?token=${WS_TOKEN}`);

    // Connection opened
    socket.addEventListener('open', function (event) {
        console.log("It's open")
    });

    // Listen for messages
    socket.addEventListener('message', function (event) {
        try {
            if (event.data !== '--ping--') {
                chrome.runtime.sendMessage({ action: 'increaseCount' }, response => {
                    // Process the response received from the background script
                    const responseData = response.response;
                })
                notificationService.update(JSON.parse(event.data))
            }
        } catch (error) {
            console.error(error)
        }
    });

    const sendMessage = (message) => {
        if (socket.readyState <= 1) {
            socket.send(message)
        }
    }
})
/* chrome.runtime.onConnect.addListener(function(port) {
    if (port.name == "chrome_app") {
        port.onMessage.addListener(function(msg) {
            if (msg.joke == "Knock knock")
                port.postMessage({question: "Who's there?"});
            else if (msg.answer == "Madame")
                port.postMessage({question: "Madame who?"});
            else if (msg.answer == "Madame... Bovary")
                port.postMessage({question: "I don't get it."});
        })
    }
})
  chrome.storage.sync.set({
    favoriteColor: color,
    likesColor: likesColor
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    favoriteColor: 'red',
    likesColor: true
  }, function(items) {
    document.getElementById('color').value = items.favoriteColor;
    document.getElementById('like').checked = items.likesColor;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options)


 */
</script>

<main>
    <aside class="aside">
        <Navigation 
            {switchTab}
            tab={tab}
            tabsToShow={TABS.split(',')}
        />
    </aside>
    {#if tab === 'logs' }
        <Log />
    {/if}
    {#if tab === 'product' }
        <Product />
    {/if}
    {#if tab === 'erp'}
        <Erp />
    {/if}
    {#if tab === 'settings'}
        <Setting />
    {/if}
    <NotificationsList />
</main>