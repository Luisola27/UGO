using DataConnection;
using Microsoft.EntityFrameworkCore;
using UGO.DataAcces;
using UGO.Models;


namespace UGO.DataAccess.Implementation
{
    public class UserDataAccess : IUserDataAccess
    {
        private readonly ContextDb _dbConnection;

        public UserDataAccess(ContextDb dbConnection) 
        {
            _dbConnection = dbConnection;
        }
        public async Task<List<User>> GetUsersAsync()
        {
            return await _dbConnection.User.ToListAsync();
        }
    }
}
