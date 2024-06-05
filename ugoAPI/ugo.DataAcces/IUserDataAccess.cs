using UGO.Models;

namespace UGO.DataAcces
{
    public interface IUserDataAccess
    {
        Task<List<User>> GetUsersAsync();
    }
}
