using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Allup.Models;
public class Product : BaseEntity
{
    public string Title { get; set; }
    [Column(TypeName = "smallmoney")]
    public double Price { get; set; }
    [Column(TypeName = "smallmoney")]
    public double DiscountedPrice { get; set; }
    [Column(TypeName = "smallmoney")]
    public double ExTax { get; set; }
    [StringLength(255)]
    public string? MainImage { get; set; }
    [StringLength(255)]
    public string? HoverImage { get; set; }
    [StringLength(5)]
    public string Seria { get; set; }
    public int Number { get; set; }
    public int Count { get; set; }
    public string? SmallDescription { get; set; }
    public string? Description { get; set; }
    public bool IsBestSeller { get; set; }
    public bool IsNewArrival { get; set; }
    public bool IsFeatured { get; set; }

    public int CategoryId { get; set; }
    public Category Category { get; set; }

    public int BrandId { get; set; }
    public Brand? Brand { get; set; }

    public IEnumerable<ProductImage> ProductImages { get; set; }
}
