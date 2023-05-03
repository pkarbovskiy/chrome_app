<script>
import config from '../../config.json';
import { get, post } from '../common.mjs';
const {
    MIDDLEWARE_URL:URL,
    ADD_SKUES,
    ADD_ONLY_IMAGES,
} = config

let currentlyProcessing = ''
let currentlyInQueue = []
let skues = ''
/**
 * method to filter everything which is not a skue based on template
 * @param skues {[String]} array of skues
 * @returns [skues]
 */
function filterOutNonSkues(skues) {
    return skues.filter(item => /^[A-Za-z]{2,4}[0-9]{4}$/.test(item.trim())).map(item => item.trim().toUpperCase())
}
async function getCurrentlyInQueue() {
    try {
        const response = await get(`${URL}${CURRENTLY_IN_QUEUE}`).then( data => data.json())
        currentlyInQueue = response?.messages || []
        if (response == null) {
            throw 'Incorrect response from the server'
        }
    } catch(e) {
        console.error(e)
    }
}
async function getCurrentlyProcessing() {
    try {
        const response = await get(`${URL}${CURRENTLY_PROCESSING}`).then( data => data.json())

        currentlyProcessing = response?.currentlyProcessing || ''
        if (response == null) {
            throw 'Incorrect response from the server'
        }
    } catch(e) {
        console.error(e)
    }
}
async function addSkues() {
    if (skues != '') {
        if (!Array.isArray(skues)) {
            skues = skues.split(',')
        }
        skues = filterOutNonSkues(skues)
        if (skues.length > 0) {
            try {
                const response = await post(`${URL}${ADD_SKUES}`,{skues})

                currentlyProcessing = getCurrentlyProcessing()
                if (!response.ok) {
                    throw 'Error has occured'
                }
            } catch(e) {
                console.error(e)
            }
        } else {
            console.error('Provided skues are not correct')
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
                const response = await post(`${URL}${ADD_ONLY_IMAGES}`, {skues})
                currentlyProcessing = getCurrentlyProcessing()
                if (!response.ok) {
                    throw 'Error has occured'
                }
            } catch(e) {
                console.error(e)
            }
        } else {
            console.error('Provided skues are not correct')
        }
    }
}
</script>
<section class="main-section">
    <article class="add-skues one-article">
        <h2>Sync Products</h2>
        <input type="text" name="" id="skues" bind:value="{skues}" placeholder="Enter list of stylenames devided by comma">
        <div class="buttons">
            <button on:click={addSkues} class="btn-main">Sync Stylenames</button>
            <button on:click={addSkuesImageOnly} class="btn-main">Images Only</button>
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
</section>