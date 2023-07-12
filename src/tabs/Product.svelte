<script>
import config from '../../config.json';
import { get, post } from '../common.mjs';
const {
    MIDDLEWARE_URL:URL,
    ADD_STYLENAMES,
    CURRENTLY_IN_QUEUE,
    ALLOWED_ONLY_FOR_STYLENAME,
    CURRENTLY_PROCESSING
} = config

let currentlyProcessing = {}
let currentlyInQueue = []
let stylename = ''
/**
 * method to filter everything which is not a stylename based on template
 * @param stylename {[String]} array of skues
 * @returns {stylename[]} return list of correct stylenames
 */
function filterNotCorrectStylenames(stylename) {
    return stylename.filter(item => /^[A-Za-z]{2,4}[0-9]{4}$/.test(item.trim())).map(item => item.trim().toUpperCase())
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

        const products = response?.currentlyProcessing?.products 
        if (products) {
            currentlyProcessing = Object.keys(products).reduce((acc, item) => {
                const itemParts = item.split('::')
                acc.stylename = itemParts[0]
                acc.stores.push(itemParts[1])
                return acc
            },{stylename, stores:[]})
        }
        if (response == null) {
            throw 'Incorrect response from the server'
        }
    } catch(e) {
        console.error(e)
    }
}
async function addStylenamesToQueue(extra = '') {
    if (stylename != '') {
        if (!Array.isArray(stylename)) {
            stylename = stylename.split(',')
        }
        stylename = filterNotCorrectStylenames(stylename)
        if (ALLOWED_ONLY_FOR_STYLENAME.split(',').includes(extra)) {
            stylename = stylename.map(style => `${style}::${extra}`)
        }
        if (stylename.length > 0) {
            try {
                const response = await post(`${URL}${ADD_STYLENAMES}`,{skues: stylename})

                await getCurrentlyProcessing()
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
        <input type="text" name="" id="skues" bind:value="{stylename}" placeholder="Enter list of stylenames devided by comma">
        <div class="buttons">
            <button on:click={() => addStylenamesToQueue()} class="btn-main">Full Sync</button>
            <button on:click={() => addStylenamesToQueue('images')} class="btn-main">Images Only</button>
            <button on:click={() => addStylenamesToQueue('text')} class="btn-main">Text Only</button>
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
        {#if Object.keys(currentlyProcessing).length > 0}
            <h3>{currentlyProcessing.stylename}</h3>
            <ul>
                {#each currentlyProcessing.stores as stylename}
                <li>{stylename}</li> 
                {/each}
            </ul>
        {/if}
    </article>
</section>