using System;
using System.Collections.Generic;
using System.Linq;

namespace SignalRChat.Hubs
{
    public class ConnectionMapping<T>
    {
        private readonly Dictionary<T, string> _connections = new Dictionary<T, string>();

        public int Count
        {
            get
            {
                return _connections.Count;
            }
        }

        public void Add(T key, string connectionId)
        {
            if (!_connections.TryGetValue(key, out string connections))
            {
                _connections.Add(key, connectionId);
            }
            else if (String.IsNullOrEmpty(connections)) {
                _connections[key] = connectionId;
            }  
        }

        public string GetConnection(T key)
        {
            if (_connections.TryGetValue(key,out string connection))
            {
                return connection;
            }

            return string.Empty;
        }

        public List<T> GetUsers() {
            List<T> Users = _connections.Keys.ToList();
            return Users;
        }

        public void Remove(T key, string connectionId)
        {
            lock (_connections)
            {
                if (!_connections.TryGetValue(key, out string connections))
                {
                    return;
                }

                _connections.Remove(key);
                    
                
            }
        }
    }
}

