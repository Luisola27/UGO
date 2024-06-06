using UGO.Models;

namespace UGO.Service
{
    public interface IUserService
    {
        Task<List<User>> GetUsersAsync();
    }
}
