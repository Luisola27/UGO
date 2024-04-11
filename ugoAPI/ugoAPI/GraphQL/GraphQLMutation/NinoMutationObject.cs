using ugoAPI.GraphQL.GraphQLMutationTypes;
using ugoAPI.GraphQL.GraphQLQueriesTypes;

namespace ugoAPI.GraphQL.GraphQLMutation
{
    public class NinoMutationObject : ObjectType<AppMutation>
    {
        protected override void Configure(IObjectTypeDescriptor<AppMutation> descriptor)
        {
            descriptor.Field(n => n.SaveNino(default))
                .Type<NinoGraphType>()
                .Name("saveNino")
                .Argument("input", a => a.Type<NinoInputType>());

            descriptor.Field(n => n.DeleteNino(default))
                .Type<NonNullType<BooleanType>>()
                .Name("deleteNino")
                .Argument("id", a => a.Type<NinoInputType>());

            descriptor.Field(n => n.UpdateNino(default, default))
                .Type<NinoGraphType>()
                .Name("updateNino")
                .Argument("id", a => a.Type<NinoInputType>())
                .Argument("input", a => a.Type<NinoInputType>());

            descriptor.Field(n => n.UpdateSponsor(default, default))
                .Type<NinoGraphType>()
                .Name("updateSponsor")
                .Argument("input", a => a.Type<NinoInputType>());
        }
    }
}
