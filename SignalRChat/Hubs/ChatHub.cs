using System;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        private readonly static ConnectionMapping<string> UserList =
             new ConnectionMapping<string>();

        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }

        public void UserConnected(string name)
        {
            string message = " 歡迎使用者 " + name + " 加入聊天室 ";
            UserList.Add(name,Context.ConnectionId);
            List<string> UsersList = UpdatesersList();
            Clients.All.SendAsync("GetConnectedUsers", UsersList);

            SendMessage(message);
        }

        public List<string> UpdatesersList() {
            return UserList.GetUsers();
        }

        public async Task SendMessage(string message)
        {
            var Users = UserList.GetConnection("Leo");
            await Clients.Others.SendAsync("ReceiveMessage","Leo", message);
        }
        public override Task OnDisconnectedAsync(Exception? exception)
        {
            return base.OnDisconnectedAsync(exception);
        }
    }

}

