using HotChocolate.Resolvers;
using UGO.Models;
using UGO.Service;
using ugoAPI.GraphQL.GraphQLMutationTypes;

namespace ugoAPI.GraphQL.GraphQLMutation
{
    public class NinoMutation
    {
        public static async Task<Nino> SaveNinoResolverAsync(NinoInput input, [Service] INinoService ninoService)
        {
            return await ninoService.SaveNinoAsync(input.Name, input.Identification, input.Age, input.Gender);
        }
        public static async Task<bool> DeleteNinoAsync(IResolverContext context, [Service] INinoService ninoService)
        {
            var ninoId = context.ArgumentValue<int>("ninoId");
            return await ninoService.DeleteNinoAsync(ninoId).ConfigureAwait(false);
        }

        public class NinoMutationType : ObjectType
        {
            protected override void Configure(IObjectTypeDescriptor descriptor)
            {
                descriptor.Field("saveNino")
                    .Argument("ninoId", a => a.Type<NonNullType<NinoInputType>>())
                    .Resolve(ctx =>
                        SaveNinoResolverAsync(ctx.ArgumentValue<NinoInput>("input"),
                        ctx.Service<INinoService>())
                    )
                    .Type<NinoType>();

                descriptor.Field("deleteNino")
                    .Argument("ninoId", a => a.Type<IntType>())
                    .Resolve(async ctx =>
                    {
                        var args = ctx.ArgumentValue<int>("ninoId");
                        var ninoService = ctx.Service<INinoService>();
                        return await DeleteNinoAsync(ctx, ninoService);
                    })
                    .Type<BooleanType>();
            }
        }
    }
}
