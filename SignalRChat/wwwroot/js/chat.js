
var _UserName;
var person = prompt("请输入你的名字", "Harry Potter");
if (person != null && person != "") {
    _UserName = person;
}

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub/123").build();

connection.on("ReceiveMessage", function (user, message) {
    printMessage(false, message);
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
    connection.invoke("UserConnected", _UserName);

}).catch(function (err) {
    return console.error(err.toString());
});

connection.on("GetConnectedUsers", function (UserList) {
    if (UserList.includes(_UserName)) {
        UserList.splice(UserList.indexOf(_UserName), 1);
    } 
    document.getElementById("usersList").innerHTML = "";
    printConnectedUser(UserList);
})

document.getElementById("sendButton").addEventListener("click", function (event) {
    var message = document.getElementById("messageInput").value;
    printMessage(true, message);
    connection.invoke("SendMessage",message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

function printMessage(isOut,message) {

    var eTemplate = document.querySelector(isOut ? '#chatOutcomingTemplate' : '#chatIncomingTemplate').cloneNode(true);
    var eContent = eTemplate.querySelector('#content');
    //eContent.innerHTML = "";
    eContent.innerHTML = message;
    var eTime = eTemplate.querySelector('#time');
    //eTime.innerHTML = "";
    eTime.innerHTML = "2022/10/11";
    var messageMain = eTemplate.querySelector('#message');
    document.getElementById("messagesList").appendChild(messageMain);

}

function printConnectedUser(UserList) {
    UserList.forEach(user => {
        var eTemplate = document.querySelector('#userTemplate').cloneNode(true);
        var eUserName = eTemplate.querySelector('#userName');
        eUserName.innerHTML = user;
        var eTime = eTemplate.querySelector('#time');
        eTime.innerHTML = '2022/10/11';
        var eUserMain = eTemplate.querySelector('#userMain');
        document.getElementById("usersList").appendChild(eUserMain);
    })
}