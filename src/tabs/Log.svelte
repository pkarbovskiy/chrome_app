<script>
import config from '../../config.json';
import { get, post } from '../common.mjs';
import Grid from '../widgets/Grid.svelte';
const {
    MIDDLEWARE_URL:URL,
    PRODUCT_LOG,
    ORDER_LOG,
    PRICES_AND_QNTY_LOG,
} = config

let log = [] 
async function getProductLog() {
    try {
        const response = await get(`${URL}${PRODUCT_LOG}`).then( data => data.json())

        log = response?.jsonList || []
        if (response == null) {
            throw 'Incorrect response from the server'
        }
    } catch(e) {
        console.error(e)
    }
}
async function getPriceAndQntyLog() {
    try {
        const response = await get(`${URL}${PRICES_AND_QNTY_LOG}`).then( data => data.json())
        if (response == null) {
            throw 'Incorrect response from the server'
        }
        log = response.jsonList.map(item => {
            const invParts = item.inventory.split('/')
            return {...item, inventory: +invParts[0] !== +invParts[1]?`<span class="red">${invParts[0]}</span>/${invParts[1]}`: item.inventory}
        })
    } catch(e) {
        console.error(e)
    }
}
async function getOrderLog() {
    try {
        const response = await get(`${URL}${ORDER_LOG}`).then( data => data.json())
        log = response?.jsonList || []    

        if (response == null) {
            throw 'Incorrect response from the server'
        }
    } catch(e) {
        console.error(e)
    }
}
</script>
<section class="main-section">
    <article class="one-article">
        <div class="buttons">
            <button on:click={getProductLog} class="btn-main">Product Log</button>
            <button on:click={getOrderLog} class="btn-main">Order Log</button>
            <button on:click={getPriceAndQntyLog} class="btn-main">Price And Qnty Log</button>
        </div>
    </article>
    {#if log.length>0}        
    <article class="one-article">
        <Grid rows={log} headers={log.length > 0? Object.keys(log[0]): []} />
    </article>
    {/if}
</section>