using DataConnection.Entities;

namespace ugoAPI.GraphQL.GraphQLMutationTypes
{
    public class NinoInputType : InputObjectType<Nino>
    {
        protected override void Configure(IInputObjectTypeDescriptor<Nino> descriptor)
        {
            descriptor.Field(n => n.Name).Type<StringType>().Name("Name");
            descriptor.Field(n => n.Identification).Type<StringType>().Name("Identification");
            descriptor.Field(n => n.Age).Type<IntType>().Name("Age");
            descriptor.Field(n => n.Gender).Type<IntType>().Name("Gender");
            descriptor.Field(n => n.Sponsor).Type<StringType>().Name("Sponsor");
            descriptor.Field(n => n.Gift).Type<IntType>().Name("Gift");
        }
    }
}
