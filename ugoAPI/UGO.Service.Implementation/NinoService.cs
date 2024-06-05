using AutoMapper;
using UGO.DataAcces;
using UGO.Models;

namespace UGO.Service.Implementation
{
    public class NinoService : INinoService
    {
        private readonly INinoDataAccess _ninoDataAccess;
        private readonly IMapper _mapper;

        public NinoService(INinoDataAccess ninoDataAccess, IMapper mapper)
        {
            _ninoDataAccess = ninoDataAccess;
            _mapper = mapper;
        }
        public async Task<List<Nino>> GetNinosAsync()
        {
            return await _ninoDataAccess.GetNinosAsync();
        }
        public async Task<Nino> GetNinoByIdAsync(int ninoId)
        {
            return await _ninoDataAccess.GetNinoByIdAsync(ninoId);
        }
        public async Task<bool> ExistingIdAsync(string identification)
        {
            return await _ninoDataAccess.ExistingIdAsync(identification);
        }
        public async Task<List<Nino>> MissingGiftAsync()
        {
            return await _ninoDataAccess.MissingGiftAsync();
        }
        public async Task<List<Nino>> MissingSponsorAsync()
        {
            return await _ninoDataAccess.MissingSponsorAsync();
        }
        public async Task<Nino> SaveNinoAsync(string name, string? identification, int age, int gender)
        {
            var nino = new Nino
            {
                Name = name,
                Identification = identification,
                Age = age,
                Gender = gender
            };

            await _ninoDataAccess.SaveNinoAsync(nino).ConfigureAwait(false);
            return _mapper.Map<Nino>(nino);
        }
        public async Task<bool> DeleteNinoAsync(int ninoId)
        {
            var isDeleted = await _ninoDataAccess.DeleteNinoAsync(ninoId);
            if(!isDeleted)
            {
                throw new ArgumentOutOfRangeException(nameof(ninoId), "The id nino for deletion do not exist.");
            }

            return isDeleted;
        }
    }
}
