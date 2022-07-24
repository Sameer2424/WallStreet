const ws_schema = window.location.protocol === "http:" ? "ws:" : "wss:";

const socket = new WebSocket("ws://localhost:8001/ws/realtime-cmp/");


socket.onmessage = function(e){
    var data = JSON.parse(e.data);
    var playerElems = document.getElementsByClassName("openOrderModal");
    [].slice.call(playerElems).forEach(function (eachPlayer) {
        if (eachPlayer.getAttribute('data-company') == data['company_id']){
            //TODO: will break for different structure
            if (eachPlayer.firstElementChild.lastElementChild.hasAttribute('stock_price')){
                var ep = eachPlayer.firstElementChild.lastElementChild;
                ep.firstElementChild.innerText = data['cmp'];

            }
        }

    });
}