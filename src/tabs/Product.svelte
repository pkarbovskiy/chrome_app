<script>
import config from '../../config.json';
import { get, post } from '../common.mjs';
const {
    MIDDLEWARE_URL_ALT:URL,
    ADD_STYLENAMES,
    CURRENTLY_IN_QUEUE,
    ALLOWED_ONLY_FOR_STYLENAME,
    MODEL_GROUPS,
    CREATE_COLLECTION,
    SYNC_MODELS,
    SYNC_BREADCRUMBS,
    SYNC_OTHER_LIST,
    SYNC_PRICE_FEED
} = config

let model = {}
let currentlyInQueue = []
let stylename = ''
let collectionName = ''
let stylesForCollection = ''
let forceChecked = false
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
async function syncBreadcrumbs() {
    try {
        const response = await post(`${URL}${SYNC_BREADCRUMBS}`).then( data => data.json())
    } catch(error) {
        console.error(error)
    }
}
async function syncModels() {
    try {
        const response = await post(`${URL}${SYNC_MODELS}`).then( data => data.json())
        if (response == null) {
            throw 'Incorrect response from the server'
        }
    } catch(error) {
        console.error(error)
    }
}
async function syncOtherLists() {
    try {
        const response = await post(`${URL}${SYNC_OTHER_LIST}`).then( data => data.json())
        if (response == null) {
            throw 'Incorrect response from the server'
        }
    } catch(error) {
        console.error(error)
    }
}
async function syncPriceFeed() {
    try {
        const response = await get(`${URL}${SYNC_PRICE_FEED}`).then( data => data.json())
        if (response == null) {
            throw 'Incorrect response from the server'
        }
    } catch(error) {
        console.error(error)
    }
}
async function checkModelGroup() {
    try {
        let stylenames = []
        if (stylename != '') {
            if (!Array.isArray(stylename)) {
                stylename = stylename.split(',')
            }
            stylename = filterNotCorrectStylenames(stylename)
            stylenames = stylename.slice(0)
            console.log(`${URL}${MODEL_GROUPS}`)
            model = await post(`${URL}${MODEL_GROUPS}`,{stylenames:stylename}).then( data => data.json())
        }
    } catch(e) {
        console.error(e)
    }
}
async function addStylenamesToQueue(extra = '') {
    let stylenamesLocal = []
    if (stylename != '') {
        if (!Array.isArray(stylename)) {
            stylename = stylename.split(',')
        }
        stylename = filterNotCorrectStylenames(stylename)
        stylenamesLocal = stylename.slice(0)
        if (ALLOWED_ONLY_FOR_STYLENAME.split(',').includes(extra)) {
            stylenamesLocal = stylenamesLocal.map(style => `${style}::${extra}${forceChecked?'::forceS3Resync':''}`)
        }
        if (stylenamesLocal.length > 0) {
            try {
                console.log(stylenamesLocal)
                const response = await post(`${URL}${ADD_STYLENAMES}`, {skues: stylenamesLocal})
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
async function createCollection(extra = '') {
    if (stylesForCollection != '') {
        if (!Array.isArray(stylesForCollection)) {
            stylesForCollection = stylesForCollection.split(',')
        }
        stylesForCollection = filterNotCorrectStylenames(stylesForCollection)

        if (collectionName !== '' && stylesForCollection.length > 0) {

            try {
                const response = await post(`${URL}${CREATE_COLLECTION}`, {collectionName, stylesForCollection})

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
            <button on:click={() => addStylenamesToQueue('meta')} class="btn-main">Meta Only</button>
            <button on:click={() => addStylenamesToQueue('images')} class="btn-main">Images Only</button>
            <button on:click={() => addStylenamesToQueue('text')} class="btn-main">Text Only</button>
            <button on:click={() => addStylenamesToQueue()} class="btn-main">Full Sync</button>
            <label for="forceSync">
                Force Image Sync
                <input type="checkbox" name="forceSync" id="forceSync" bind:checked={forceChecked}>
            </label>
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
        <h2>Check Model</h2>
        <div class="buttons">
            <button class="btn-main" on:click={checkModelGroup}>Check if exist</button>
        </div>
        {#if Object.keys(model).length > 0}
            {#each Object.keys(model) as oneModel}
                <h3>{oneModel}</h3>
                <ul>
                    <li>
                        <span>{`redis/shopi: ${model[oneModel].areTheSameArr? `✓`: `✕`}`}</span>
                        <span>{model[oneModel].model}</span>
                        <ul>
                            {#each model[oneModel].prodInModel as prodInModel}
                                <li>{prodInModel}</li>
                            {/each}
                        </ul>
                    </li> 
                </ul>
            {/each}
        {/if}
    </article>
    <article class="currently-processing one-article">
        <h2>Create Collection</h2>
        <input type="text" name="" id="collectionName" bind:value="{collectionName}" placeholder="Enter collection name">
        <input type="text" name="" id="stylesForCollection" bind:value="{stylesForCollection}" placeholder="Enter list of stylenames devided by comma">
        <div class="buttons">
            <button on:click={() => createCollection()} class="btn-main">Create</button>
        </div>
    </article>
    <article class="one-article">
        <h2>Sync Global Data</h2>
        <div class="buttons">
            <button on:click={() => syncBreadcrumbs()} class="btn-main">Breadcrumbs</button>
            <button on:click={() => syncModels()} class="btn-main">Models</button>
            <button on:click={() => syncOtherLists()} class="btn-main">Other Lists</button>
            <button on:click={() => syncPriceFeed()} class="btn-main">Price Feed</button>
        </div>
    </article>
</section>