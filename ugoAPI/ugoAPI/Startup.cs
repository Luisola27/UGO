using DataConnection;
using Microsoft.EntityFrameworkCore;
using ugoAPI.GraphQL.GraphQLMutation;
using ugoAPI.GraphQL.GraphQLQuery;

namespace ugoAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration) 
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddDbContext<ContextDb>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"),
                b => b.MigrationsAssembly("ugoAPI"));
            });

            services.AddGraphQLServer()
                .AddQueryType<NinoQueryObject>()
                .AddMutationType<NinoMutationObject>()
                ;

            services.AddScoped((provider) =>
            {
                var db = provider.GetRequiredService<ContextDb>();
                return new AppQuery(db);
            });

            services.AddScoped<AppMutation>();

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", builder =>
                {
                    builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
                });
            });

            services.AddAuthorization();
        }
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("AllowAll");

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapGraphQL();
            });
        }
    }
}
