using GrantTracker.Application.Interfaces.Repositories;
using GrantTracker.Infrastructure.Persistence;
using GrantTracker.Infrastructure.Persistence.Seeders;
using GrantTracker.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var services = builder.Services;
var configuration = builder.Configuration;

services.AddDbContext<GrantDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

services.AddScoped<IGrantRepository, GrantRepository>();


services.AddOpenApi();
services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.MapOpenApi();

//    using (var scope = app.Services.CreateScope())
//    {
//        var context = scope.ServiceProvider.GetRequiredService<GrantDbContext>();
//        await GrantSeeder.SeedAsync(context);
//    }
//}
//}
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    configuration.AddUserSecrets<Program>();

    using var scope = app.Services.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<GrantDbContext>();
    await GrantSeeder.SeedAsync(context);
}


app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/", () => "Hello World!");

app.MapGet("/api/weather", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
