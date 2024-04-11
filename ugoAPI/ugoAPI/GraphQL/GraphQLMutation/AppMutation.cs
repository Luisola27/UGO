using DataConnection;
using DataConnection.Entities;
using ugoAPI.GraphQL.GraphQLQuery;

namespace ugoAPI.GraphQL.GraphQLMutation
{
    public class AppMutation
    {
        private readonly AppQuery _appQuery;
        private readonly ContextDb _context;

        public AppMutation(AppQuery appQuery, ContextDb context)
        {
            _appQuery = appQuery;
            _context = context;
        }

        public Nino SaveNino(Nino input)
        {
            var ninoId = _appQuery.ExistingIdentification(input.Identification);

            if (ninoId)
            {
                throw new Exception("La cedula del niño ya existe");
            }

            Nino newnino = new Nino
            {
                Name = input.Name,
                Identification = input.Identification,
                Age = input.Age,
                Gender = input.Gender,
                Sponsor = null,
                Gift = 0,
            };

            _context.Nino.Add(newnino);
            _context.SaveChanges();
            return newnino;
        }

        public bool DeleteNino(int idNino)
        {
            var ninoToDelete = _context.Nino.Find(idNino);

            if (ninoToDelete == null)
            {
                throw new Exception("El niño no existe"); ;
            }

            _context.Nino.Remove(ninoToDelete);
            _context.SaveChanges();
            return true;
        }

        public Nino UpdateSponsor(int ninoId, string sponsor)
        {
            var existingNino = _appQuery.GetNinoById(ninoId);

            if (existingNino == null)
            {
                throw new Exception("El niño no existe");
            }

            existingNino.Sponsor = sponsor;

            _context.SaveChanges();

            return existingNino;
        }

        public Nino UpdateNino(int ninoId, Nino input)
        {
            var existing = _context.Nino.Find(ninoId);

            if (existing == null)
            {
                return null;
            }

            if (input.Name != null)
            {
                existing.Name = input.Name;
            }

            if (input.Identification != null)
            {
                existing.Identification = input.Identification;
            }

            if (input.Age != null)
            {
                existing.Age = input.Age;
            }

            if (input.Gender != null)
            {
                existing.Gender = input.Gender;
            }

            if (input.Sponsor != null)
            {
                existing.Sponsor = input.Sponsor;
            }

            if (input.Gift != null)
            {
                existing.Gift = input.Gift;
            }

            _context.SaveChanges();
            return existing;
        }
    }
}
