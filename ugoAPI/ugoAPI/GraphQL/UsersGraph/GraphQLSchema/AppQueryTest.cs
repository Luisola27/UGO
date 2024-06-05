using GraphQL;
using HotChocolate.Resolvers;
using UGO.Models;
using UGO.Service;
using ugoAPI.GraphQL.GraphQLMutationTypes;

namespace ugoAPI.GraphQL.UsersGraph.GraphQLSchema
{
    public class AppQueryTest
    {

        public static async Task<List<Nino>> GetNinoResolverAsync([Service] INinoService ninoService)
        {
            return await ninoService.GetNinosAsync();
        }

        public static async Task<Nino> GetNinoByIdResolverAsync(IResolverContext context, [Service] INinoService ninoService)
        {
            var args = context.ArgumentValue<NinoInput>("input");

            return await ninoService.GetNinoByIdAsync(args.NinoId).ConfigureAwait(false);
        }

        public static async Task<List<Nino>> MissingGiftResolverAsync([Service] INinoService ninoService)
        {
            return await ninoService.MissingGiftAsync();
        }

        public static async Task<List<Nino>> MissingSponsorResolverAsync([Service] INinoService ninoService)
        {
            return await ninoService.MissingSponsorAsync();
        }

        public class NinoQueryType : ObjectType
        {

            protected override void Configure(IObjectTypeDescriptor descriptor)
            {
                descriptor.Field("getNinos")
                    .Resolve(ctx => 
                    GetNinoResolverAsync(ctx.Service<INinoService>()));

                descriptor.Field("getNinoById")
                    .Argument("input", a => a.Type<NonNullType<NinoInputType>>())
                    .Resolve(async ctx =>
                    {
                        var args = ctx.ArgumentValue<NinoInput>("input");
                        var ninoService = ctx.Service<INinoService>();
                        return await GetNinoByIdResolverAsync(ctx, ninoService);
                    })
                    .Type<NinoType>();

                descriptor.Field("getNinosMissingGift")
                    .Resolve(ctx =>
                    MissingGiftResolverAsync(ctx.Service<INinoService>()));

                descriptor.Field("getNinosMissingSponsor")
                    .Resolve(ctx =>
                    MissingSponsorResolverAsync(ctx.Service<INinoService>()));
            }

            //protected override void Configure(IObjectTypeDescriptor descriptor)
            //{
            //    descriptor.Field("getUsers")
            //        .Resolve(ctx =>
            //            GetUsersResolverAsync(ctx.Service<IUserService>())
            //                );
            //}

        }
    }
}
