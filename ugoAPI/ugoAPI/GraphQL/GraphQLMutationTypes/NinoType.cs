using UGO.Models;

namespace ugoAPI.GraphQL.GraphQLMutationTypes
{
    public class NinoType : ObjectType<Nino>
    {
        protected override void Configure(IObjectTypeDescriptor<Nino> descriptor)
        {
            descriptor.Field(f => f.Name).Type<StringType>();
            descriptor.Field(f => f.Identification).Type<StringType>();
            descriptor.Field(f => f.Age).Type<IntType>();
            descriptor.Field(f => f.Gender).Type<StringType>();
        }
    }
}
