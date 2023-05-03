<script>
import config from '../../config.json';
import { get, post } from '../common.mjs';
const {
    MIDDLEWARE_URL:URL,
    IMPORT_NAV_TO_PIM_TODAY,
    IMPORT_NAV_TO_PIM_BY_SKU,
} = config

let navSku = ''
async function processFromNavForToday() {
    try {
        const response = await get(`${URL}${IMPORT_NAV_TO_PIM_TODAY}`)
        if (response == null || !response.ok) {
            throw 'Incorrect response from the server'
        }
    } catch(e) {
        console.error(e)
    }
}

async function importFromNavUsingSku() {
    try {
        error = ''
        if (navSku !== '') {
            const response = await post(`${URL}${IMPORT_NAV_TO_PIM_BY_SKU}`, {navSku})
            currentlyProcessing = getCurrentlyProcessing()
            
            if (!response.ok) {
                throw 'Error has occured'
            }
        } else {
            console.error('Enter value before submitting')
        }

    } catch(e) {
        console.error(e)
    }
}
</script>
<section class="main-section">
    <article id="erp" class="one-article">
        <h2>Sync Nav To Pim</h2>
        <input class="nav-input-field" type="text" name="" bind:value="{navSku}" placeholder="Enter stylenames separated by comma">
        <button class="nav-execute btn-main" on:click={importFromNavUsingSku}>By Stylename</button>
        <button class="nav-process btn-main" on:click={processFromNavForToday}>Sync Today's Products</button>
    </article>
</section>