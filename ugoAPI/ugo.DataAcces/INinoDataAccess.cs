using UGO.Models;

namespace UGO.DataAcces
{
    public interface INinoDataAccess
    {
        Task<List<Nino>> GetNinosAsync();
        Task<Nino> GetNinoByIdAsync(int ninoId);
        Task<bool> ExistingIdAsync(string identification);
        Task<List<Nino>> MissingGiftAsync();
        Task<List<Nino>> MissingSponsorAsync();
        Task<Nino> SaveNinoAsync(Nino nino);
        Task<bool> DeleteNinoAsync(int ninoId);
    }
}
