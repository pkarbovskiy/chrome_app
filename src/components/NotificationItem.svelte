<script>
    import { textForTopic } from "../common.mjs";
    export let notif = {}
</script>
<p class="notification {notif?.new? 'NEW': ''} {notif.type} {notif.action} {notif.topic}">
    <span class="item"><strong class="{notif.action}">{textForTopic[notif.topic]}</strong>:{notif.message}</span>
    <span>{(new Date(notif.receivedOn)).toDateString()}</span>
</p>

<style>
    .notification {
        --padding: .5rem 1rem 0.76rem 2.5rem;
        display: flex;
        flex-wrap: wrap;
        position: relative;
        color: #667;
        padding: var(--padding);
        margin: 0;
        border-left: 6px solid;
    }
    /* .notification:focus-within {

    } */
    .notification > .item {
        flex-grow: 2;
    }
    .INV_PRICES {
        --inventory-color: #5510d4;
        color: var(--inventory-color);
    }
    .ORDER {
        color: #4ea12a;
    }
    .FINISHED::before {
        content: '';
        position: absolute;
        top: 5px;
        left: 9px;
        z-index: 10;
        width: 25px;
        height: 24px;
        background: #0c6220 no-repeat center/67% url(../images/check.svg);
        border-radius: 30px;
    }
    .FINISHED::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0px;
        z-index: 10;
        width: 2px;
        height: 34px;
        border-radius: 0;
        background: none;
    }
    .INV_PRICES.FINISHED::after {
        border-left: var(--inventory-color) 5px solid;        
    }
    .FINISHED {        
        opacity: .8;
        color: #0c6220;
        border-color: #0c6220;
    }
    .NEW {
        font-weight: bold;
        color: #223;
    }
    .NEW::after {
        content: '';
        position: absolute;
        top: -5px;
        left: -5px;
        width: 5px;
        height: 5px;
        border-radius: 100%;
        background-color: #265bd6;
    }
    .WARNING {
        color: #c9bb3b; 
    }
    .WARNING::before {
        content: '';
        position: absolute;
        top: 11px;
        left: 9px;
        z-index: 10;
        width: 25px;
        height: 25px;
        border-radius: 0;
        background: url(../images/triangle-exclamation.svg) no-repeat;
    }
    .ERROR {
        color: #e32626;
    }
    .ERROR::before {
        content: '';
        position: absolute;
        top: 11px;
        left: 9px;
        z-index: 10;
        width: 25px;
        height: 25px;
        background: url(../images/circle-x.svg) no-repeat;
        fill: #e32626;
    }
    .CONTINUE::before, .START::before {
        content: '';
        position: absolute;
        top: 8px;
        left: 6px;
        z-index: 10;
        width: 25px;
        height: 24px;
        animation-name: spin;
        animation-duration: 2000ms;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        background: url(../images/rotate.svg) no-repeat;
        fill: #ffffff;
    }
    @keyframes spin {
        from {
            transform:rotate(0deg);
        }
        to {
            transform:rotate(360deg);
        }
    }
</style>