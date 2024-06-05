using DataConnection;
using Microsoft.EntityFrameworkCore;
using UGO.DataAcces;
using UGO.DataAccess.Implementation;
using UGO.Service;
using UGO.Service.Implementation;
using ugoAPI.GraphQL.UsersGraph.GraphQLSchema;
using static ugoAPI.GraphQL.GraphQLMutation.NinoMutation;
using static ugoAPI.GraphQL.UsersGraph.GraphQLSchema.AppQueryTest;

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
                .AddQueryType<NinoQueryType>()
                .AddMutationType<NinoMutationType>();

            services.AddScoped<NinoQueryType>();


            services.AddScoped<IUserDataAccess, UserDataAccess>();
            services.AddScoped<IUserService, UserService>();

            services.AddScoped<INinoDataAccess, NinoDataAccess>();
            services.AddScoped<INinoService, NinoService>();

            services.AddScoped<NinoMutationType>();

            services.AddAutoMapper(typeof(Startup));

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", builder =>
                {
                    builder.WithOrigins("http://localhost:5173")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials();
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
