﻿using ByteShop.Domain.Entities;
using ByteShop.Domain.Interfaces.Repositories;
using ByteShop.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace ByteShop.Infrastructure.Repositories;
public class ProductRepository : Repository<Product>, IProductRepository
{
    private readonly ByteShopDbContext _context;

    public ProductRepository(ByteShopDbContext context): base(context)
    {
        _context = context;
    }        

    public override async Task<Product> GetByIdAsync(int id)=>
        await _context.Product.FirstOrDefaultAsync(x => x.IsActive == true && x.Id == id);


    public async Task<(IEnumerable<Product> products, int quantityProduct)> GetAllAsync(
        string sku, string name, string brand, string category, 
        int? actualPage, int? itemsPerPage)
    {
        var query = _context.Product.AsQueryable().Where(x => x.IsActive);

        if (!string.IsNullOrEmpty(sku))
            query = query.Where(x => x.SKU.ToLower().Contains(sku.ToLower()));

        if (!string.IsNullOrEmpty(name))
            query = query.Where(x => x.Name.ToLower().Contains(name.ToLower()));
        
        if (!string.IsNullOrEmpty(brand))
            query = query.Where(x => x.Brand.ToLower().Contains(brand.ToLower()));
        
        if (!string.IsNullOrEmpty(category))
            query = query.Where(x => x.Brand.ToLower().Contains(category.ToLower()));

        if(actualPage.HasValue && itemsPerPage.HasValue)
            query = SetPagination(actualPage.Value, itemsPerPage.Value, query);

        int itemsTotal = await query.AsNoTracking().CountAsync();
        var products = await query.AsNoTracking().ToListAsync();

        return (products, itemsTotal);
    }

    private IQueryable<Product> SetPagination(
        int? actualPage, int? itemsPerPage, IQueryable<Product> query)
    {
        if (actualPage.HasValue && itemsPerPage.HasValue)
            return query.AsNoTracking()
                   .Skip((actualPage.Value - 1) * itemsPerPage.Value)
                   .Take(itemsPerPage.Value);
        return query;
    }
}
