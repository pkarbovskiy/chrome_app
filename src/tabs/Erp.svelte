<script>
import config from '../../config.json';
import { get, post, roundThis } from '../common.mjs';
import Grid from '../widgets/Grid.svelte';
const {
    MIDDLEWARE_URL:URL,
    IMPORT_NAV_TO_PIM_TODAY,
    IMPORT_NAV_TO_PIM_BY_SKU,
    GET_PRICES_QNTY_BY_STYLENAME,
} = config

let navStylename = ''
let pricesAndQnties = []
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

async function getPricesQntyByStylename() {
    try {
        if (navStylename !== '') {
            const queryString = new URLSearchParams({stylename:navStylename}).toString()
            const response = await get(`${URL}${GET_PRICES_QNTY_BY_STYLENAME}?${queryString}`).then( data => data.json())
                  
            const allValues = response?.jsonList || []
            pricesAndQnties = allValues.reduce((acc, row) => {
                acc[row['Item_No']] ??= []
                const sale = roundThis(row['Sales_Price'], 2)
                const price = roundThis(row['Unit_Price'], 2)
                acc[row['Item_No']].push({
                    Store: row['Webstore_Code'],
                    Variant: row['Variant_Code'],
                    Qnty: row['Quantity'],
                    'Reg/Sale': `${price} / ${sale === price? '-' : sale}`,
                    'Inv Flag': row['Inventory_Updated'],
                    'Price Flag': row['Price_Updated']
                })
                return acc
            }, {})
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
        <h2>Get prices, quantity for stylenames</h2>
        <button class="nav-execute btn-main" on:click={getPricesQntyByStylename}>Get Prices</button>
        {#if Object.keys(pricesAndQnties).length > 0}
            {#each  Object.keys(pricesAndQnties) as stylename}
                <h3>{stylename}</h3>
                <Grid rows={pricesAndQnties[stylename]} headers={pricesAndQnties[stylename].length > 0? Object.keys(pricesAndQnties[stylename][0]): []} />
            {/each}
        {/if}
    </article>
</section>