export async function post(url, payload) {
    return fetch(url, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    })
}
export async function get(url) {
    return fetch(url, {
        method: 'GET',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export function roundThis(number, precition) {
    return Math.round(
        (number + Number.EPSILON) * Math.pow(10, precition)
    ) / Math.pow(10, precition)
}

export const textForTopic = {
    PRODUCT: 'Product',
    INV_PRICES: 'Inventory',
    ORDERS: 'Order',
    COLLECTIONS: 'Collection',
    S3_IMAGE_SYNC: 'S3_image_sync',
    SYNC_LISTS: 'Sync_lists',
    INVOICES: 'Invoice',    
}