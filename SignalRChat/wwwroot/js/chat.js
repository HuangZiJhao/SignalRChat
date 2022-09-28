
var UserName;
var person = prompt("请输入你的名字", "Harry Potter");
if (person != null && person != "") {
    UserName = person;
}

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub/123").build();

//Disable the send button until connection is established.
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    li.textContent = `${user} says ${message}`;
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
    connection.invoke("UserConnected", UserName);

}).catch(function (err) {
    return console.error(err.toString());
});

connection.on("GetConnectedUsers", function (UserList) {
    document.getElementById("UserList").innerHTML = ""
    UserList.forEach(user => {
        var li = document.createElement("li");
        document.getElementById("UserList").appendChild(li);
        li.textContent = user;
    })
})

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage",message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});