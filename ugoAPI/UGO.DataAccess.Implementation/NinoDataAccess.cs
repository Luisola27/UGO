using DataConnection;
using Microsoft.EntityFrameworkCore;
using UGO.DataAcces;
using UGO.Models;

namespace UGO.DataAccess.Implementation
{
    public class NinoDataAccess : INinoDataAccess
    {
        private readonly ContextDb _context;

        public NinoDataAccess(ContextDb context)
        {
            _context = context;
        }
        public async Task<List<Nino>> GetNinosAsync()
        {
            return await _context.Nino.ToListAsync();
        }
        public async Task<Nino> GetNinoByIdAsync(int ninoId)
        {
            return await _context.Nino.FirstOrDefaultAsync(x => x.NinoId == ninoId);
        }
        public async Task<bool> ExistingIdAsync(string identification)
        {
            return _context.Nino.Any(x => x.Identification == identification);
        }
        public async Task<List<Nino>> MissingGiftAsync()
        {
            return await _context.Nino.Where(x => x.Gift == 0).ToListAsync();
        }
        public async Task<List<Nino>> MissingSponsorAsync()
        {
            return await _context.Nino.Where(x => x.Sponsor == null).ToListAsync();
        }
        public async Task<Nino> SaveNinoAsync(Nino nino)
        {
            await _context.Nino.AddAsync(nino);
            await _context.SaveChangesAsync();
            return nino;
        }
        public async Task<bool> DeleteNinoAsync(int ninoId)
        {
            var nino = await _context.Nino.FindAsync(ninoId);
            if (nino == null)
            {
                return false;
            }

            _context.Nino.Remove(nino);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
