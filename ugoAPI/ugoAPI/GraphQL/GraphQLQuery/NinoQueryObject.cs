using ugoAPI.GraphQL.GraphQLQueriesTypes;

namespace ugoAPI.GraphQL.GraphQLQuery
{
    public class NinoQueryObject : ObjectType<AppQuery>
    {
        protected override void Configure(IObjectTypeDescriptor<AppQuery> descriptor)
        {
            descriptor.Field(g => g.GetNino())
                .Type<ListType<NinoGraphType>>().Name("getNinos");

            descriptor.Field(g => g.GetNinoById(default))
                .Type<NinoGraphType>().Name("getNinoById");

            descriptor.Field(g => g.ExistingIdentification(default))
                .Type<BooleanType>().Name("existNino");
        }
    }
}
