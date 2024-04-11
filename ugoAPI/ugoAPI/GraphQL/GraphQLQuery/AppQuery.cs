using DataConnection;
using DataConnection.Entities;

namespace ugoAPI.GraphQL.GraphQLQuery
{
    public class AppQuery
    {
        private readonly ContextDb _context;

        public AppQuery(ContextDb context)
        {
            _context = context;
        }
        public List<Nino> GetNino()
        {
            return _context.Nino.ToList();
        }

        public Nino GetNinoById(int idNino)
        {
            var nino = _context.Nino.FirstOrDefault(x => x.NinoId == idNino);

            return nino;
        }

        public bool ExistingIdentification(string identification)
        {
            return _context.Nino.Any(x => x.Identification == identification);
        }
    }
}
