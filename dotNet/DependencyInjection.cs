using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Sabio.Data;
using Sabio.Models.Domain;
using Sabio.Models.Domain.LookUps;
using Sabio.Services;
using Sabio.Services.Candidates;
using Sabio.Services.Faqs;
using Sabio.Services.Interfaces;
using Sabio.Services.Interfaces.Newsletters;
using Sabio.Services.ScrappedData;
using Sabio.Web.Api.StartUp.DependencyInjection;
using Sabio.Web.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using Sabio.Services.Newsletters;

namespace Sabio.Web.StartUp
{
    public class DependencyInjection
    {
        public static void ConfigureServices(IServiceCollection services, IConfiguration configuration)
        {
            if (configuration is IConfigurationRoot)
            {
                services.AddSingleton<IConfigurationRoot>(configuration as IConfigurationRoot); 
            }

            services.AddSingleton<IConfiguration>(configuration);

            string connString = configuration.GetConnectionString("Default");
            // https://docs.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-2.2
            // The are a number of differe Add* methods you can use. Please verify which one you
            // should be using services.AddScoped<IMyDependency, MyDependency>();

            // services.AddTransient<IOperationTransient, Operation>();

            // services.AddScoped<IOperationScoped, Operation>();

            // services.AddSingleton<IOperationSingleton, Operation>();

            services.AddSingleton<IAuthenticationService<int>, WebAuthenticationService>();

            services.AddSingleton<ICandidateService, CandidateService>();

            services.AddSingleton<IBlogsService, BlogsService>();

            services.AddSingleton<IElectionResultsService, ElectionResultsService>();

            services.AddSingleton<IElectionsService, ElectionsService>();

            services.AddSingleton<IEmailService, EmailService>();

            services.AddSingleton<Sabio.Data.Providers.IDataProvider, SqlDataProvider>(delegate (IServiceProvider provider)
            {
                return new SqlDataProvider(connString);
            }
            );
          
            services.AddSingleton<IElectionResultsService, ElectionResultsService>();

            services.AddSingleton<IFaqsService, FaqsService>();

            services.AddSingleton<IFileService, FileService>();

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddSingleton<IIdentityProvider<int>, WebAuthenticationService>();

            services.AddSingleton<IInstitutionMapper, InstitutionService>();

            services.AddSingleton<IInstitutionService, InstitutionService>();

            services.AddSingleton<ILocationService, LocationService>();

            services.AddSingleton<ILookUpService, LookUpService>();

            services.AddSingleton<IMapService, MapService>();

            services.AddSingleton<INewsletterService, NewsletterService>();

            services.AddSingleton<INewslettersSubscriptionService, NewsletterSubscriptionsServices>();

            services.AddSingleton<INewsletterTemplateService, NewsletterTemplateService>();

            services.AddSingleton<IPollsService, PollsService>();

            services.AddSingleton<IPollstersService, PollsterService>();

            services.AddSingleton<IPublicBlogsService, PublicBlogsService>();

            services.AddSingleton<IScrapedDataService, ScrapedDataService>();

            services.AddSingleton<ISurveysService, SurveysService>();

            services.AddSingleton<IReferenceService, ReferenceService>();
            
            services.AddSingleton<ISurveyAnswerService, SurveyAnswerService>();

            services.AddSingleton<ISurveyInstanceService, SurveyInstanceService>(); 
            
            services.AddSingleton<ISurveysService, SurveysService>();

            services.AddSingleton<IUserService, UserService>();

           

            



            GetAllEntities().ForEach(tt =>
            {
                IConfigureDependencyInjection idi = Activator.CreateInstance(tt) as IConfigureDependencyInjection;

                //This will not error by way of being null. BUT if the code within the method does
                // then we would rather have the error loadly on startup then worry about debuging the issues as it runs
                idi.ConfigureServices(services, configuration);
            });
        }

        public static List<Type> GetAllEntities()
        {
            return AppDomain.CurrentDomain.GetAssemblies().SelectMany(x => x.GetTypes())
                 .Where(x => typeof(IConfigureDependencyInjection).IsAssignableFrom(x) && !x.IsInterface && !x.IsAbstract)
                 .ToList();
        }

        public static void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
        }
    }
}
