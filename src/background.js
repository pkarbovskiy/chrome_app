// console.log('loaded')
let currentNumber = 0
// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'increaseCount') {
        currentNumber += 1
        if (currentNumber > 0) {
            chrome.browserAction.setBadgeText({text: `${currentNumber}`})
            const data = 'Some data from the background script'
        }
        // Perform any necessary actions or data retrieval

    }
    // Send a response back to the content script
    sendResponse({ response: currentNumber })
})
