<script>
import config from '../../config.json';
import { get, post } from '../common.mjs';
const {
    MIDDLEWARE_URL_ALT:URL,
    IMPORT_NAV_TO_PIM_TODAY,
    IMPORT_NAV_TO_PIM_BY_SKU,
    RUN_REPORT,
} = config

let navStylename = ''
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
async function getNewReport() {
    try {
        const response = await get(`${URL}${RUN_REPORT}`)
        if (response == null || !response.ok) {
            throw 'Incorrect response from the server'
        }
    } catch(e) {
        console.error(e)
    }
}

async function importFromNavByStylename() {
    try {
        if (navStylename !== '') {
            const response = await post(`${URL}${IMPORT_NAV_TO_PIM_BY_SKU}`, {navSku: navStylename})
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
        <input class="nav-input-field" type="text" name="" bind:value="{navStylename}" placeholder="Enter stylenames separated by comma">
        <h2>Sync Nav To Pim</h2>
        <button class="nav-execute btn-main" on:click={importFromNavByStylename}>Sync By Stylename</button>
        <button class="nav-process btn-main" on:click={processFromNavForToday}>Sync Today's Products</button>
    </article>
    <article class="one-article">
        <button class="nav-process btn-main" on:click={getNewReport}>Get New Report</button>
    </article>
</section>