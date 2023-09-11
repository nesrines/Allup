using Allup.DataAccessLayer;
using Allup.Services.Interfaces;
using Allup.Services.Implementations;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<AppDbContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromSeconds(10);
});

builder.Services.AddHttpContextAccessor();

builder.Services.AddScoped<ILayoutService, LayoutService>();

var app = builder.Build();
app.MapControllerRoute("Default", "{controller=Home}/{action=Index}/{id?}");
app.UseStaticFiles();
app.UseSession();
app.Run();