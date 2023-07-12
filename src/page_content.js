import config from '../config.json';
import { post } from "./common.mjs";

const port = chrome.runtime.connect({name: "chrome_app"});

function urlMatchesPattern(url, pattern) {
  const regex = new RegExp(pattern);
  return regex.test(url);
}
console.error('hello')
// Function to add the button
async function addButtonToAppDiv() {
  const stores = config.STORES.split(',')
//   debugger
  // Check if the current URL matches the desired pattern
  if (urlMatchesPattern(window.location.href, config.COLLECTION_URL.replace('::stores::',`(${stores.join('|')})`))) {
    // Create the button element
    const button = document.createElement('button');
    button.style= `
        margin: 50px 20px 0 0; 
        position: fixed;
        top: 50px;
        right: 50px;
        z-index: 20;
        border: 0px;
        background: #14a27a;
        color: #fff;
        border-radius:3px;
        font-weight: 600;
        cursor: pointer;
        padding: 5px;
    `
    button.textContent = 'Sync Category';

    // Add click event listener to the button
    button.addEventListener('click', async () => {
        const store = window.location.host.split('.').shift()
        let collectionId = window.location.pathname.split('/').pop()
        let collections = [collectionId]
        if (collectionId === 'collections') {
            collections = []
            const checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked')
            if (checkedCheckboxes.length > 0) {
                for (const oneCheckbox of checkedCheckboxes) {
                    if (oneCheckbox?.id?.indexOf('gid://shopify/Collection/')===0) {
                        collections.push(oneCheckbox.id.split('/').pop())
                    }
                }        
                
            }
        }
        
        try {
            if (collections.length > 0) {
                await post(`${config.MIDDLEWARE_URL}${config.COLLECTION_SYNC}`, {collections, store})
            }
        } catch(e) {
            console.error(e)
        }

    })

    // Find the div with ID "app"
    const appDiv = document.getElementById('app');
    if (appDiv) {
      appDiv.appendChild(button);
    }
  }
}
addButtonToAppDiv()
// Call the addButtonToAppDiv function when the DOM is ready
// document.addEventListener('DOMContentLoaded', addButtonToAppDiv)
/* 
button.addEventListener('click', async (el) => {

    const collectionId = window.location.pathname.split('/').pop()
    //todo: add sync cat
    const response = await fetch('', {
      method: 'POST', 
      mode: 'cors', 
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({collectionId, store:'lole-ca-en'}) // body data type must match "Content-Type" header
    })
})


/* port.postMessage({joke: "Knock knock"});
port.onMessage.addListener(function(msg) {
  if (msg.question == "Who's there?")
    port.postMessage({answer: "Madame"});
  else if (msg.question == "Madame who?")
    port.postMessage({answer: "Madame... Bovary"});
}) */ 