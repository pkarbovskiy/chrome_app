/* const port = chrome.runtime.connect({name: "chrome_app"});

const button = document.createElement('button')
button.innerText = 'Sync This Category to other stores'
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
const app = document.getElementById('app')
app.appendChild(button)
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