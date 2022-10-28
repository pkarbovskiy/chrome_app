<script>

import Navigation from './Navigation.svelte'
import config from '../config.json'

let skues = ''
let navSku = ''

const {
    MIDDLEWARE_URL:URL,
    ADD_SKUES,
    ADD_ONLY_IMAGES,
    CLEAR_CACHE,
    PROCESS_NEXT_MESSAGE,
    CURRENTLY_IN_QUEUE,
    CURRENTLY_PROCESSING,
    IMPORT_NAV_TO_PIM_TODAY,
    IMPORT_NAV_TO_PIM_BY_SKU,
    TABS
} = config 

let error = ''
let message = ''
let currentlyProcessing = ''
let currentlyInQueue = []

const messagesDic = {
    'PROCESSING': 'Processing request'
}
let tab = 'product'
function switchTab(tabName) {
    tab = tabName
}
/**
 * method to filter everything which is not a skue based on template
 * @param skues {[String]} array of skues
 * @returns [skues]
 */
function filterOutNonSkues(skues) {
    return skues.filter(item => /^[A-Za-z]{2,4}[0-9]{4}$/.test(item.trim())).map(item => item.trim().toUpperCase())
}
async function addSkues() {
    if (skues != '') {
        if (!Array.isArray(skues)) {
            skues = skues.split(',')
        }
        skues = filterOutNonSkues(skues)
        if (skues.length > 0) {
            try {
                error = ''
                message = messagesDic['PROCESSING']
                const response = await fetch(`${URL}${ADD_SKUES}`, {
                    method: 'POST',
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({skues})
                })
                message = ''
                currentlyProcessing = getCurrentlyProcessing()
                if (!response.ok) {
                    throw 'Error has occured'
                }
            } catch(e) {
                error = e
            }
        } else {
            error = 'Provided skues are not correct'
        }
    }
}
async function addSkuesImageOnly() {
    if (skues != '') {
        if (!Array.isArray(skues)) {
            skues = skues.split(',')
        }
        skues = filterOutNonSkues(skues)
        if (skues.length > 0) {
            try {
                error = ''
                message = messagesDic['PROCESSING']
                const response = await fetch(`${URL}${ADD_ONLY_IMAGES}`, {
                    method: 'POST',
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({skues})
                })
                message = ''
                currentlyProcessing = getCurrentlyProcessing()
                if (!response.ok) {
                    throw 'Error has occured'
                }
            } catch(e) {
                error = e
            }
            for (const item of skues) {
                forceQueue()
            }
        } else {
            error = 'Provided skues are not correct'
        }
    }
}
async function clearCacheForSkues() {
    if (skues != '') {
        if (!Array.isArray(skues)) {
            skues = skues.split(',')
        }
        skues = filterOutNonSkues(skues)
        if (skues.length > 0) {
            try {
                error = ''
                message = messagesDic['PROCESSING']
                const response = await fetch(`${URL}${CLEAR_CACHE}`, {
                    method: 'POST',
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({skues})
                })
                message = ''
                currentlyProcessing = getCurrentlyProcessing()
                if (!response.ok) {
                    throw 'Error has occured'
                }
            } catch(e) {
                error = e
            }
        } else {
            error = 'Provided skues are not correct'
        }
    }
}
async function forceQueue() {
    try {
        error = ''
        message = messagesDic['PROCESSING']

        const response = await fetch(`${URL}${PROCESS_NEXT_MESSAGE}`, {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then( data => data.json())
        message = ''
        getCurrentlyProcessing()
        currentlyInQueue = response?.messages || []
        if (response == null) {
            throw 'Incorrect response from the server'
        }
    } catch(e) {
        message = ''
        error = e
    }
}
async function getCurrentlyInQueue() {
    try {
        error = ''
        message = messagesDic['PROCESSING']
        const response = await fetch(`${URL}${CURRENTLY_IN_QUEUE}`, {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then( data => data.json())
        message = ''
        currentlyInQueue = response?.messages || []
        if (response == null) {
            throw 'Incorrect response from the server'
        }
    } catch(e) {
        message = ''
        error = e
    }
}
async function getCurrentlyProcessing() {
    try {
        error = ''
        message = messagesDic['PROCESSING']
        const response = await fetch(`${URL}${CURRENTLY_PROCESSING}`, {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then( data => data.json())
        message = ''
        currentlyProcessing = response?.currentlyProcessing || ''
        if (response == null) {
            throw 'Incorrect response from the server'
        }
    } catch(e) {
        message = ''
        error = e
    }
}
async function processFromNavForToday() {
    try {
        error = ''
        message = 'Processing'
        const response = await fetch(`${URL}${IMPORT_NAV_TO_PIM_TODAY}`, {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        message = ''
        if (response == null || !response.ok) {
            throw 'Incorrect response from the server'
        }
    } catch(e) {
        error = e
    }
}
async function importFromNavUsingSku() {
    try {
        error = ''
        if (navSku !== '') {
            message = messagesDic['PROCESSING']
            const response = await fetch(`${URL}${IMPORT_NAV_TO_PIM_BY_SKU}`, {
                method: 'POST',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({navSku})
            })
            message = ''
            currentlyProcessing = getCurrentlyProcessing()
            
            if (!response.ok) {
                throw 'Error has occured'
            }
        } else {
            error = 'Enter value before submitting'
        }

    } catch(e) {
        error = e
    }
}
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
    {#if tab === 'product' }
    <section class="main-section">
        <article class="add-skues one-article">
            <h2>Sync Products</h2>
            <input type="text" name="" id="skues" bind:value="{skues}" placeholder="Enter list of stylenames devided by comma">
            <div class="buttons">
                <button on:click={addSkues} class="btn-main">Sync Stylenames</button>
                <button on:click={addSkuesImageOnly} class="btn-main">Images Only</button>
                <button on:click={clearCacheForSkues} class="btn-main">Clear Cache</button>
            </div>
        </article>
        <article class="in-queue one-article">
            <h2>Processing queue</h2>
            <button class="btn-main" on:click={getCurrentlyInQueue}>Show Queue</button>
            {#if currentlyInQueue.length > 0}
            <ol class="list">
                {#each currentlyInQueue as one, i}
                <li>{one}</li>
                {/each}
            </ol>
            {/if}
        </article>
        <article class="currently-processing one-article">
            <h2>Currently Processing</h2>
            <button class="btn-main" on:click={getCurrentlyProcessing}>Show/Refresh</button>
            {#if currentlyProcessing != ''}
            <span>{@html currentlyProcessing}</span>
            {/if}
        </article>
        <article class="one-article">
            <h2>Force Queue</h2>
            <button class="btn-main" on:click={forceQueue}>Force Queue</button>
        </article>
    </section>
    {/if}
    {#if tab === 'nav'}
    <section class="main-section">
        <article id="erp" class="one-article">
            <h2>Sync Nav To Pim</h2>
            <input class="nav-input-field" type="text" name="" bind:value="{navSku}" placeholder="Enter stylenames separated by comma">
            <button class="nav-execute btn-main" on:click={importFromNavUsingSku}>By Stylename</button>
            <button class="nav-process btn-main" on:click={processFromNavForToday}>Sync Today's Products</button>
        </article>
    </section>
    {/if}
    {#if tab === 'settings_'}
    <section class="main-section">
        <article id="config" class="one-article">
            <label for="taglist">Tags List</label>
            <textarea name="taglist" id="taglist" cols="30" rows="10"></textarea>
            <div>
                <label for="season">Season - Folder id</label>
                <input type="text" id="season" value=""> <input type="text" id="folderId" value="">
            </div>
        </article>
    </section>
    {/if}
</main>