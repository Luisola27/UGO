using DataConnection.Entities;

namespace ugoAPI.GraphQL.GraphQLQueriesTypes
{
    public class NinoGraphType : ObjectType<Nino>
    {
        protected override void Configure(IObjectTypeDescriptor<Nino> descriptor)
        {
            descriptor.Field(n => n.NinoId).Type<IntType>();
            descriptor.Field(n => n.Name).Type<StringType>();
            descriptor.Field(n => n.Identification).Type<StringType>();
            descriptor.Field(n => n.Age).Type<IntType>();
            descriptor.Field(n => n.Gender).Type<IntType>();
            descriptor.Field(n => n.Sponsor).Type<StringType>();
            descriptor.Field(n => n.Gift).Type<IntType>();
        }
    }
}