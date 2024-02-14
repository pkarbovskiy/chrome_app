// console.log('loaded')
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
const socket = new WebSocket(`${WS_DOMAIN}?token=${WS_TOKEN}`)

// WebSocket event listener for connection open
socket.onopen = () => {
  console.log('WebSocket connection opened');
}

// WebSocket event listener for receiving messages
socket.onmessage = (event) => {
    try {
        if (event.data !== '--ping--') {

            const data = JSON.parse(event.data)
            data.receivedOn = Date.now()
            if (storeNotif) {
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
            }
            chrome.runtime.sendMessage(data);
        }
    } catch (error) {
        console.error(error)
    }
  
  // Send the message to the extension itself
};

// WebSocket event listener for connection close
socket.onclose = () => {
  console.log('WebSocket connection closed');
};

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'increaseCount') {
        currentNumber += 1
        if (currentNumber > 0) {
            chrome.browserAction.setBadgeBackgroundColor(
                {color: '#00FF00'},  // Also, also green
                () => { /* ... */ },
              )
            chrome.browserAction.setBadgeText({text: `${notifObj.notifArr.length}`})
            const data = 'Some data from the background script'
        }
        // Perform any necessary actions or data retrieval
    }
    if (message.command == 'GET_ALL_STORED_NOTIF') {
        console.log(notifObj.notifArr)
        chrome.runtime.sendMessage({type:'ALL_NOTIF', notif:notifObj.notifArr})
        notifObj.notifDic = {}
        notifObj.notifArr = []
        // storeNotif = 0
    }
    // if (message.command == 'STOP_STORRING_NOTIF') {
    //     storeNotif = 0  
    // }
    if (message.command == 'START_STORRING_NOTIF') {
        storeNotif = 1 
    }

    
})
