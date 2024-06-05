namespace ugoAPI.GraphQL.GraphQLMutationTypes
{
    public class NinoInput
    {
        public int NinoId { get; set; }
        public string Name { get; set; }
        public string? Identification { get; set; }
        public int Age { get; set; }
        public int Gender { get; set; }
        public string? Sponsor { get; set; }
        public int Gift { get; set; }
    }
    public class NinoInputType : InputObjectType<NinoInput>
    {
        protected override void Configure(IInputObjectTypeDescriptor<NinoInput> descriptor)
        {
            descriptor.Field(n => n.NinoId).Type<IntType>();
            descriptor.Field(n => n.Name).Type<StringType>().Name("Name");
            descriptor.Field(n => n.Identification).Type<StringType>().Name("Identification");
            descriptor.Field(n => n.Age).Type<IntType>().Name("Age");
            descriptor.Field(n => n.Gender).Type<IntType>().Name("Gender");
            descriptor.Field(n => n.Sponsor).Type<StringType>().Name("Sponsor");
            descriptor.Field(n => n.Gift).Type<IntType>().Name("Gift");
        }
    }
}
