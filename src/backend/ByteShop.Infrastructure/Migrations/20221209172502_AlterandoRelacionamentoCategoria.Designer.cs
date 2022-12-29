﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using ByteShop.Infrastructure.Context;

#nullable disable

namespace ByteShop.Infrastructure.Migrations
{
    [DbContext(typeof(ByteShopDbContext))]
    [Migration("20221209172502_AlterandoRelacionamentoCategoria")]
    partial class AlterandoRelacionamentoCategoria
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.0");

            modelBuilder.Entity("ByteShop.Domain.Entities.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("ParentCategoryId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("ParentCategoryId");

                    b.ToTable("Category");
                });

            modelBuilder.Entity("ByteShop.Domain.Entities.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Brand")
                        .IsRequired()
                        .HasColumnType("nvarchar(30)");

                    b.Property<int>("CategoryId")
                        .HasColumnType("INTEGER");

                    b.Property<decimal>("CostPrice")
                        .HasPrecision(18, 2)
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<float>("Heigth")
                        .HasColumnType("REAL");

                    b.Property<bool>("IsActive")
                        .HasColumnType("INTEGER");

                    b.Property<float>("Lenght")
                        .HasColumnType("REAL");

                    b.Property<string>("MainImageUrl")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(60)");

                    b.Property<decimal>("Price")
                        .HasPrecision(18, 2)
                        .HasColumnType("TEXT");

                    b.Property<string>("SKU")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("SecondaryImageUrl")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Stock")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Warranty")
                        .HasColumnType("INTEGER");

                    b.Property<float>("Weight")
                        .HasColumnType("REAL");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.ToTable("Product");
                });

            modelBuilder.Entity("ByteShop.Domain.Entities.Category", b =>
                {
                    b.HasOne("ByteShop.Domain.Entities.Category", "ParentCategory")
                        .WithMany("ChildCategories")
                        .HasForeignKey("ParentCategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ParentCategory");
                });

            modelBuilder.Entity("ByteShop.Domain.Entities.Product", b =>
                {
                    b.HasOne("ByteShop.Domain.Entities.Category", "Category")
                        .WithMany("Products")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");
                });

            modelBuilder.Entity("ByteShop.Domain.Entities.Category", b =>
                {
                    b.Navigation("ChildCategories");

                    b.Navigation("Products");
                });
#pragma warning restore 612, 618
        }
    }
}
