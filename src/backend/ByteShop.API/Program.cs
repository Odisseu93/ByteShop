using ByteShop.API.Filters;
using ByteShop.Application;
using ByteShop.Infrastructure;
using Microsoft.OpenApi.Models;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRouting(option => option.LowercaseUrls = true);

builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddApplication();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "ByteShop"
    });
    var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
});

builder.Services.AddCors(cfg => {
cfg.AddDefaultPolicy(policy => {
    policy
        .WithOrigins("http://127.0.0.1:5173/", "https://127.0.0.1:5173/")
        .AllowAnyMethod()
        .SetIsOriginAllowedToAllowWildcardSubdomains() 
        .AllowAnyHeader();
});

builder.Services.AddMvc(options => options.Filters.Add(typeof(ExceptionsFilter)));


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
