
const chatSocket = new WebSocket(
	'ws://' +
	window.location.host + 
	'/ws/chat/' +
	roomID +
	'/'
);


chatSocket.onmessage = function(e){
    var data = JSON.parse(e.data);
    console.log(data);
    var htmlData = "{username}:"+
    			   "\n\n"+
    			   "{message}\n\n"
    if ('messages' in data){
	    var htmlData = "{username}:"+
			   "\n"+
			   "{message}\n\n"
		var previousMessages = '';
		data['messages'].forEach(function(eachMsg){
			previousMessages +=  htmlData.replace("{username}", eachMsg.author).replace(
	    	"{message}", eachMsg.content)
		})
		$("#chatroom").text(previousMessages);
    }
    else {
    	htmlData = htmlData.replace("{username}", data.message.author).replace(
    		"{message}\n\n", data.message.content)
    	$("#chatroom").append(htmlData);
    }

}


$(document).ready(function () {
	chatSocket.onopen = function(e) {
	    chatSocket.send(JSON.stringify(
			{"command": "fetch_messages", "from_username": username, "room_id": roomID}
		));
	};
		
	$("#submit").click(function(){
		// send message on clicking submit
		var message = $("#message").val();
		$("#message").val('');
		chatSocket.send(JSON.stringify(
			{"command": "new_message", 
			"message": message+"\n\n", 
			"from_username": username, 
			"room_id": roomID}
		));
	})

});

