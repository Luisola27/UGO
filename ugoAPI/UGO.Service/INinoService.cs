using UGO.Models;

namespace UGO.Service
{
    public interface INinoService
    {
        Task<List<Nino>> GetNinosAsync();
        Task<Nino> GetNinoByIdAsync(int ninoId);
        Task<bool> ExistingIdAsync(string identification);
        Task<List<Nino>> MissingGiftAsync();
        Task<List<Nino>> MissingSponsorAsync();
        Task<Nino> SaveNinoAsync(string name, string? identification, int age, int gender);
        Task<bool> DeleteNinoAsync(int ninoId);
    }
}
