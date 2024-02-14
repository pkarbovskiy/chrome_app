import { writable } from 'svelte/store';
function createNotifications() {
    const {subscribe, update, set} = writable({
        notifArr:[],
        notifDic:{},
    })
    function updateNotification(inNotif) {
        return update(notifObj => {
            const existingNotif = notifObj.notifDic[inNotif.id]
            if (existingNotif != null) {
                // Update existing notification
                notifObj.notifArr[existingNotif] = inNotif
            } else {
                // Add new notification
                notifObj.notif = notifObj.notifArr.push(inNotif)
                notifObj.notifDic[inNotif.id] = notifObj.notifArr.length - 1
            }
            return notifObj
        })
    }
    function markAsRead(id) {

        const existingNotif = notifObj.notifDic[id]
        if (existingNotif != null) {
            notifObj.notifArr[existingNotif].new = null
        }

    }
    return {
        subscribe,
        update: updateNotification,
        reset: () => set({
            notifArr:[],
            notifDic:{},
        }),
        // partialReset:
        markAsRead: markAsRead
    }
}
export const notificationService = createNotifications()
