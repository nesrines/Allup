using Allup.DataAccessLayer;
using Allup.ViewModels.HomeVMs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Allup.Controllers;
public class HomeController : Controller
{
    private readonly AppDbContext _context;
    public HomeController(AppDbContext context) { _context = context; }

    public async Task<IActionResult> Index()
    {
        HomeVM homeVM = new HomeVM
        {
            Sliders = await _context.Sliders.Where(s => !s.IsDeleted).ToListAsync(),
            Categories = await _context.Categories.Where(c => !c.IsDeleted && c.ParentId == null).ToListAsync(),
            NewArrivals = await _context.Products.Where(p => !p.IsDeleted && p.IsNewArrival).ToListAsync(),
            BestSellers = await _context.Products.Where(p => !p.IsDeleted && p.IsBestSeller).ToListAsync(),
            Featured = await _context.Products.Where(p => !p.IsDeleted && p.IsFeatured).ToListAsync()
        };
        return View(homeVM);
    }
}