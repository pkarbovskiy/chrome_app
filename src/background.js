import config from '../config.json';
let currentNumber = 0
const {
    WS_TOKEN,
    WS_DOMAIN
} = config

const notifObj = {
    notifDic: {},
    notifArr: []
}
let storeNotif = 1
let socket
let reconnectInterval = 1000 // Initial reconnect interval
const maxReconnectInterval = 30000 // Max reconnect interval
const reconnectDecay = 1.5

function connect() {
    socket = new WebSocket(`${WS_DOMAIN}?token=${WS_TOKEN}`)
  
    socket.onopen = function(event) {
      console.log('WebSocket connection established');
      reconnectInterval = 1000; // Reset reconnect interval on a successful connection
    };
  
    socket.onclose = function(event) {
      console.log('WebSocket connection closed, attempting to reconnect...')
      setTimeout(() => {
        connect() // Attempt to reconnect
        // Increase the reconnect interval with an upper limit
        reconnectInterval = Math.min(maxReconnectInterval, reconnectInterval * reconnectDecay)
      }, reconnectInterval)
    }
  
    socket.onerror = function(error) {
      console.error('WebSocket error:', error)
      socket.close() // Ensure the socket is closed on error
    };
  
    socket.onmessage = function(event) {
        console.log(event.data)
        try {
            if (!['--ping--','--pong--'].includes(event.data)) {   
                const data = JSON.parse(event.data)    
                data.receivedOn = Date.now()

                const existingNotif = notifObj.notifDic[data.id]
                if (existingNotif != null) {
                    // Update existing notification
                    notifObj.notifArr[existingNotif] = data
                } else {
                    // Add new notification
                    notifObj.notifArr.push(data)
                    notifObj.notifDic[data.id] = notifObj.notifArr.length - 1
                    chrome.browserAction.setBadgeText({text: `${notifObj.notifArr.length}`})
                }

                chrome.runtime.sendMessage(data);
            } else if(event.data === '--ping--') {
                socket.send('--pong--')
            }
        } catch (error) {
            console.error(error)
        }
    };
}
  
connect()

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'increaseCount') {
        currentNumber += 1
        if (currentNumber > 0) {
            chrome.browserAction.setBadgeBackgroundColor(
                {color: '#00FF00'},  // Also green
                () => { /* ... */ },
              )
            chrome.browserAction.setBadgeText({text: `${notifObj.notifArr.length}`})
            const data = 'Some data from the background script'
        } else {

        }
        // Perform any necessary actions or data retrieval
    }
    if (message.action === 'setCount') {
        if (message.value === 0) {
            chrome.browserAction.setBadgeText({text: ``})
            return
        }
        chrome.browserAction.setBadgeText({text: `${message.value}`})
    }
    if (message.command == 'GET_ALL_STORED_NOTIF') {
        chrome.runtime.sendMessage({type:'ALL_NOTIF', notif:notifObj.notifArr})

    }
   
})
