using UGO.DataAcces;
using UGO.Models;

namespace UGO.Service.Implementation
{
    public class UserService : IUserService
    {
        private readonly IUserDataAccess _userDataAccess;

        public UserService(IUserDataAccess userDataAccess)
        {
            _userDataAccess = userDataAccess;
        }

        public async Task<List<User>> GetUsersAsync()
        {
            return await _userDataAccess.GetUsersAsync();
        }
    }
}
