using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Data.Entity
{
    public partial class champoochampContext : DbContext
    {
        public champoochampContext()
        {
        }

        public champoochampContext(DbContextOptions<champoochampContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Brand> Brand { get; set; }
        public virtual DbSet<Category> Category { get; set; }
        public virtual DbSet<Collection> Collection { get; set; }
        public virtual DbSet<Color> Color { get; set; }
        public virtual DbSet<Contact> Contact { get; set; }
        public virtual DbSet<Discount> Discount { get; set; }
        public virtual DbSet<Employee> Employee { get; set; }
        public virtual DbSet<EmployeeGroupRules> EmployeeGroupRules { get; set; }
        public virtual DbSet<Feedback> Feedback { get; set; }
        public virtual DbSet<GoodsReceipt> GoodsReceipt { get; set; }
        public virtual DbSet<GoodsReceiptDetail> GoodsReceiptDetail { get; set; }
        public virtual DbSet<GroupRules> GroupRules { get; set; }
        public virtual DbSet<Invoice> Invoice { get; set; }
        public virtual DbSet<InvoiceDetail> InvoiceDetail { get; set; }
        public virtual DbSet<Material> Material { get; set; }
        public virtual DbSet<Post> Post { get; set; }
        public virtual DbSet<PostTag> PostTag { get; set; }
        public virtual DbSet<Product> Product { get; set; }
        public virtual DbSet<ProductImages> ProductImages { get; set; }
        public virtual DbSet<ProductVariant> ProductVariant { get; set; }
        public virtual DbSet<Reviews> Reviews { get; set; }
        public virtual DbSet<Role> Role { get; set; }
        public virtual DbSet<Rule> Rule { get; set; }
        public virtual DbSet<Size> Size { get; set; }
        public virtual DbSet<Slide> Slide { get; set; }
        public virtual DbSet<Suplier> Suplier { get; set; }
        public virtual DbSet<Tag> Tag { get; set; }
        public virtual DbSet<Unit> Unit { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySql("server=localhost;database=champoochamp;user=root");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Brand>(entity =>
            {
                entity.ToTable("brand");

                entity.Property(e => e.Id).HasColumnType("smallint(6)");

                entity.Property(e => e.Country).HasColumnType("varchar(255)");

                entity.Property(e => e.CreatedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'current_timestamp()'");

                entity.Property(e => e.DisplayOrder)
                    .HasColumnType("smallint(6)")
                    .HasDefaultValueSql("'1'");

                entity.Property(e => e.Logo).HasColumnType("varchar(255)");

                entity.Property(e => e.MetaTitle).HasColumnType("varchar(255)");

                entity.Property(e => e.ModifiedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.Name).HasColumnType("varchar(255)");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasDefaultValueSql("'b\\'1\\''");
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("category");

                entity.HasIndex(e => e.ParentId)
                    .HasName("fk_category__category");

                entity.Property(e => e.Id).HasColumnType("smallint(6)");

                entity.Property(e => e.CreatedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'current_timestamp()'");

                entity.Property(e => e.DisplayOrder)
                    .HasColumnType("smallint(6)")
                    .HasDefaultValueSql("'1'");

                entity.Property(e => e.MetaDescriptions).HasColumnType("varchar(2555)");

                entity.Property(e => e.MetaKeywords).HasColumnType("varchar(255)");

                entity.Property(e => e.MetaTitle).HasColumnType("varchar(255)");

                entity.Property(e => e.ModifiedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.Name).HasColumnType("varchar(255)");

                entity.Property(e => e.ParentId).HasColumnType("smallint(6)");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasDefaultValueSql("'b\\'1\\''");

                entity.Property(e => e.Thumbnail).HasColumnType("varchar(255)");

                entity.HasOne(d => d.Parent)
                    .WithMany(p => p.InverseParent)
                    .HasForeignKey(d => d.ParentId)
                    .HasConstraintName("fk_category__category");
            });

            modelBuilder.Entity<Collection>(entity =>
            {
                entity.ToTable("collection");

                entity.Property(e => e.Id).HasColumnType("smallint(6)");

                entity.Property(e => e.CreatedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'current_timestamp()'");

                entity.Property(e => e.DisplayOrder)
                    .HasColumnType("smallint(6)")
                    .HasDefaultValueSql("'1'");

                entity.Property(e => e.MetaDescriptions).HasColumnType("varchar(2555)");

                entity.Property(e => e.MetaKeywords).HasColumnType("varchar(255)");

                entity.Property(e => e.MetaTitle).HasColumnType("varchar(255)");

                entity.Property(e => e.ModifiedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.Name).HasColumnType("varchar(255)");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasDefaultValueSql("'b\\'1\\''");

                entity.Property(e => e.Thumbnail).HasColumnType("varchar(255)");
            });

            modelBuilder.Entity<Color>(entity =>
            {
                entity.ToTable("color");

                entity.Property(e => e.Id).HasColumnType("smallint(6)");

                entity.Property(e => e.Code).HasColumnType("varchar(25)");

                entity.Property(e => e.CreatedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'current_timestamp()'");

                entity.Property(e => e.DisplayOrder)
                    .HasColumnType("smallint(6)")
                    .HasDefaultValueSql("'1'");

                entity.Property(e => e.ModifiedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.Name).HasColumnType("varchar(255)");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasDefaultValueSql("'b\\'1\\''");
            });

            modelBuilder.Entity<Contact>(entity =>
            {
                entity.ToTable("contact");

                entity.Property(e => e.Id).HasColumnType("int(11)");

                entity.Property(e => e.Address).HasColumnType("varchar(255)");

                entity.Property(e => e.CreatedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'current_timestamp()'");

                entity.Property(e => e.District).HasColumnType("varchar(255)");

                entity.Property(e => e.Email).HasColumnType("varchar(255)");

                entity.Property(e => e.Logo).HasColumnType("varchar(255)");

                entity.Property(e => e.ModifiedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.Name).HasColumnType("varchar(255)");

                entity.Property(e => e.Phone).HasColumnType("varchar(255)");

                entity.Property(e => e.Province).HasColumnType("varchar(255)");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasDefaultValueSql("'b\\'1\\''");

                entity.Property(e => e.Ward).HasColumnType("varchar(255)");
            });

            modelBuilder.Entity<Discount>(entity =>
            {
                entity.ToTable("discount");

                entity.Property(e => e.Id).HasColumnType("smallint(6)");

                entity.Property(e => e.Code).HasColumnType("varchar(255)");

                entity.Property(e => e.CreatedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'current_timestamp()'");

                entity.Property(e => e.ModifiedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.Name).HasColumnType("varchar(2555)");

                entity.Property(e => e.Rate)
                    .HasColumnType("smallint(6)")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasDefaultValueSql("'b\\'1\\''");
            });

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.ToTable("employee");

                entity.HasIndex(e => e.RoleId)
                    .HasName("fk_employee__role");

                entity.Property(e => e.Id).HasColumnType("smallint(6)");

                entity.Property(e => e.Address).HasColumnType("varchar(2555)");

                entity.Property(e => e.Avatar).HasColumnType("varchar(255)");

                entity.Property(e => e.CreatedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'current_timestamp()'");

                entity.Property(e => e.DateOfBirth).HasColumnType("date");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.ModifiedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.Name).HasColumnType("varchar(255)");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnType("varchar(2555)");

                entity.Property(e => e.Phone).HasColumnType("varchar(255)");

                entity.Property(e => e.RoleId).HasColumnType("smallint(6)");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasDefaultValueSql("'b\\'1\\''");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Employee)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_employee__role");
            });

            modelBuilder.Entity<EmployeeGroupRules>(entity =>
            {
                entity.ToTable("employee_group_rules");

                entity.HasIndex(e => e.EmployeeId)
                    .HasName("fk_employee_group_rules__employee");

                entity.HasIndex(e => e.GroupRulesId)
                    .HasName("fk_employee_group_rules__group_rules");

                entity.Property(e => e.Id).HasColumnType("smallint(6)");

                entity.Property(e => e.EmployeeId).HasColumnType("smallint(6)");

                entity.Property(e => e.GroupRulesId).HasColumnType("smallint(6)");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.EmployeeGroupRules)
                    .HasForeignKey(d => d.EmployeeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_employee_group_rules__employee");

                entity.HasOne(d => d.GroupRules)
                    .WithMany(p => p.EmployeeGroupRules)
                    .HasForeignKey(d => d.GroupRulesId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_employee_group_rules__group_rules");
            });

            modelBuilder.Entity<Feedback>(entity =>
            {
                entity.ToTable("feedback");

                entity.HasIndex(e => e.UserId)
                    .HasName("fk_feedback__user");

                entity.Property(e => e.Id).HasColumnType("int(11)");

                entity.Property(e => e.Content).HasColumnType("varchar(2555)");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'current_timestamp()'");

                entity.Property(e => e.Email).HasColumnType("varchar(255)");

                entity.Property(e => e.FirstName).HasColumnType("varchar(255)");

                entity.Property(e => e.LastName).HasColumnType("varchar(255)");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasDefaultValueSql("'b\\'1\\''");

                entity.Property(e => e.UserId).HasColumnType("int(11)");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Feedback)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("fk_feedback__user");
            });

            modelBuilder.Entity<GoodsReceipt>(entity =>
            {
                entity.ToTable("goods_receipt");

                entity.HasIndex(e => e.SuplierId)
                    .HasName("fk_goods_receipt__suplier");

                entity.Property(e => e.Id).HasColumnType("smallint(6)");

                entity.Property(e => e.CreatedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'current_timestamp()'");

                entity.Property(e => e.ModifiedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasDefaultValueSql("'b\\'1\\''");

                entity.Property(e => e.SuplierId).HasColumnType("smallint(6)");

                entity.Property(e => e.Total)
                    .HasColumnType("decimal(10,0)")
                    .HasDefaultValueSql("'0'");

                entity.HasOne(d => d.Suplier)
                    .WithMany(p => p.GoodsReceipt)
                    .HasForeignKey(d => d.SuplierId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_goods_receipt__suplier");
            });

            modelBuilder.Entity<GoodsReceiptDetail>(entity =>
            {
                entity.ToTable("goods_receipt_detail");

                entity.HasIndex(e => e.GoodsReceiptId)
                    .HasName("fk_goods_receipt_detail__goods_receipt");

                entity.HasIndex(e => e.ProductVariantId)
                    .HasName("fk_goods_receipt_detail__product_variant");

                entity.Property(e => e.Id).HasColumnType("int(11)");

                entity.Property(e => e.CreatedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'current_timestamp()'");

                entity.Property(e => e.GoodsReceiptId).HasColumnType("smallint(6)");

                entity.Property(e => e.ModifiedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.Price)
                    .HasColumnType("decimal(10,0)")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.ProductVariantId)
                    .IsRequired()
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.Quantity)
                    .HasColumnType("smallint(6)")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasDefaultValueSql("'b\\'1\\''");

                entity.Property(e => e.Total)
                    .HasColumnType("decimal(10,0)")
                    .HasDefaultValueSql("'0'");

                entity.HasOne(d => d.GoodsReceipt)
                    .WithMany(p => p.GoodsReceiptDetail)
                    .HasForeignKey(d => d.GoodsReceiptId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_goods_receipt_detail__goods_receipt");

                entity.HasOne(d => d.ProductVariant)
                    .WithMany(p => p.GoodsReceiptDetail)
                    .HasForeignKey(d => d.ProductVariantId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_goods_receipt_detail__product_variant");
            });

            modelBuilder.Entity<GroupRules>(entity =>
            {
                entity.ToTable("group_rules");

                entity.Property(e => e.Id).HasColumnType("smallint(6)");

                entity.Property(e => e.CreatedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'current_timestamp()'");

                entity.Property(e => e.Discription).HasColumnType("varchar(2555)");

                entity.Property(e => e.ModifiedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.Name).HasColumnType("varchar(255)");

                entity.Property(e => e.Rules)
                    .IsRequired()
                    .HasColumnName("rules")
                    .HasColumnType("varchar(2555)");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasDefaultValueSql("'b\\'1\\''");
            });

            modelBuilder.Entity<Invoice>(entity =>
            {
                entity.ToTable("invoice");

                entity.HasIndex(e => e.DiscountId)
                    .HasName("fk_invoice__discount");

                entity.HasIndex(e => e.EmployeeId)
                    .HasName("fk_invoice__employee");

                entity.HasIndex(e => e.UserId)
                    .HasName("fk_invoice__user");

                entity.Property(e => e.Id).HasColumnType("int(11)");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'current_timestamp()'");

                entity.Property(e => e.CustomerAddress).HasColumnType("varchar(255)");

                entity.Property(e => e.CustomerDistrict).HasColumnType("varchar(255)");

                entity.Property(e => e.CustomerEmail).HasColumnType("varchar(255)");

                entity.Property(e => e.CustomerName).HasColumnType("varchar(255)");

                entity.Property(e => e.CustomerPhone).HasColumnType("varchar(255)");

                entity.Property(e => e.CustomerProvince).HasColumnType("varchar(255)");

                entity.Property(e => e.CustomerWard).HasColumnType("varchar(255)");

                entity.Property(e => e.DiscountId).HasColumnType("smallint(6)");

                entity.Property(e => e.EmployeeId).HasColumnType("smallint(6)");

                entity.Property(e => e.Message).HasColumnType("varchar(2555)");

                entity.Property(e => e.ModifiedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.PaymentMethod).HasColumnType("varchar(255)");

                entity.Property(e => e.ShipDate).HasColumnType("datetime");

                entity.Property(e => e.ShipMoney)
                    .HasColumnType("decimal(10,0)")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.Status)
                    .HasColumnType("smallint(6)")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.Total)
                    .HasColumnType("decimal(10,0)")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.UserId).HasColumnType("int(11)");

                entity.HasOne(d => d.Discount)
                    .WithMany(p => p.Invoice)
                    .HasForeignKey(d => d.DiscountId)
                    .HasConstraintName("fk_invoice__discount");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.Invoice)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("fk_invoice__employee");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Invoice)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("fk_invoice__user");
            });

            modelBuilder.Entity<InvoiceDetail>(entity =>
            {
                entity.ToTable("invoice_detail");

                entity.HasIndex(e => e.InvoiceId)
                    .HasName("fk_invoice_detail__invoice");

                entity.HasIndex(e => e.ProductVariantId)
                    .HasName("fk_invoice_detail__product_variant");

                entity.Property(e => e.Id).HasColumnType("smallint(6)");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'current_timestamp()'");

                entity.Property(e => e.InvoiceId).HasColumnType("int(11)");

                entity.Property(e => e.ModifiedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.PriceCurrent)
                    .HasColumnType("decimal(10,0)")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.ProductVariantId)
                    .IsRequired()
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.Quantity)
                    .HasColumnType("smallint(6)")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasDefaultValueSql("'b\\'1\\''");

                entity.Property(e => e.Total)
                    .HasColumnType("decimal(10,0)")
                    .HasDefaultValueSql("'0'");

                entity.HasOne(d => d.Invoice)
                    .WithMany(p => p.InvoiceDetail)
                    .HasForeignKey(d => d.InvoiceId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_invoice_detail__invoice");

                entity.HasOne(d => d.ProductVariant)
                    .WithMany(p => p.InvoiceDetail)
                    .HasForeignKey(d => d.ProductVariantId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_invoice_detail__product_variant");
            });

            modelBuilder.Entity<Material>(entity =>
            {
                entity.ToTable("material");

                entity.Property(e => e.Id).HasColumnType("smallint(6)");

                entity.Property(e => e.CreatedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'current_timestamp()'");

                entity.Property(e => e.ModifiedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.Name).HasColumnType("varchar(255)");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasDefaultValueSql("'b\\'1\\''");
            });

            modelBuilder.Entity<Post>(entity =>
            {
                entity.ToTable("post");

                entity.HasIndex(e => e.EmployeeId)
                    .HasName("fk_post__employee");

                entity.Property(e => e.Id).HasColumnType("smallint(6)");

                entity.Property(e => e.Content).HasColumnType("text");

                entity.Property(e => e.CreatedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'current_timestamp()'");

                entity.Property(e => e.EmployeeId).HasColumnType("smallint(6)");

                entity.Property(e => e.MetaDescriptions).HasColumnType("varchar(2555)");

                entity.Property(e => e.MetaKeywords).HasColumnType("varchar(255)");

                entity.Property(e => e.MetaTittle).HasColumnType("varchar(255)");

                entity.Property(e => e.ModifiedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasDefaultValueSql("'b\\'1\\''");

                entity.Property(e => e.Tags).HasColumnType("varchar(2555)");

                entity.Property(e => e.Views)
                    .HasColumnType("int(11)")
                    .HasDefaultValueSql("'0'");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.Post)
                    .HasForeignKey(d => d.EmployeeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_post__employee");
            });

            modelBuilder.Entity<PostTag>(entity =>
            {
                entity.ToTable("post_tag");

                entity.HasIndex(e => e.PostId)
                    .HasName("fk_post_tag__post");

                entity.HasIndex(e => e.TagId)
                    .HasName("fk_post_tag__tag");

                entity.Property(e => e.Id).HasColumnType("smallint(6)");

                entity.Property(e => e.PostId).HasColumnType("smallint(6)");

                entity.Property(e => e.TagId).HasColumnType("smallint(6)");

                entity.HasOne(d => d.Post)
                    .WithMany(p => p.PostTag)
                    .HasForeignKey(d => d.PostId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_post_tag__post");

                entity.HasOne(d => d.Tag)
                    .WithMany(p => p.PostTag)
                    .HasForeignKey(d => d.TagId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_post_tag__tag");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("product");

                entity.HasIndex(e => e.BrandId)
                    .HasName("fk_product__brand");

                entity.HasIndex(e => e.CategoryId)
                    .HasName("fk_product__category");

                entity.HasIndex(e => e.CollectionId)
                    .HasName("fk_product__collection");

                entity.HasIndex(e => e.MaterialId)
                    .HasName("fk_product__material");

                entity.HasIndex(e => e.SuplierId)
                    .HasName("fk_product__suplier");

                entity.HasIndex(e => e.UnitId)
                    .HasName("fk_product__unit");

                entity.Property(e => e.Id).HasColumnType("smallint(6)");

                entity.Property(e => e.BrandId).HasColumnType("smallint(6)");

                entity.Property(e => e.CategoryId).HasColumnType("smallint(6)");

                entity.Property(e => e.CollectionId).HasColumnType("smallint(6)");

                entity.Property(e => e.CreatedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'current_timestamp()'");

                entity.Property(e => e.Description).HasColumnType("varchar(2555)");

                entity.Property(e => e.Detail).HasColumnType("varchar(2555)");

                entity.Property(e => e.DiscountAmount)
                    .HasColumnType("smallint(6)")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.MaterialId).HasColumnType("smallint(6)");

                entity.Property(e => e.MetaDescriptions).HasColumnType("varchar(2555)");

                entity.Property(e => e.MetaKeywords).HasColumnType("varchar(255)");

                entity.Property(e => e.MetaTitle).HasColumnType("varchar(255)");

                entity.Property(e => e.ModifiedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.Name).HasColumnType("varchar(255)");

                entity.Property(e => e.Price)
                    .HasColumnType("decimal(10,0)")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.PromotionPrice)
                    .HasColumnType("decimal(10,0)")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasDefaultValueSql("'b\\'1\\''");

                entity.Property(e => e.SuplierId).HasColumnType("smallint(6)");

                entity.Property(e => e.TotalQuantity)
                    .HasColumnType("smallint(6)")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.UnitId).HasColumnType("smallint(6)");

                entity.Property(e => e.Views)
                    .HasColumnType("int(11)")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.WarrantyPeriod).HasColumnType("varchar(255)");

                entity.HasOne(d => d.Brand)
                    .WithMany(p => p.Product)
                    .HasForeignKey(d => d.BrandId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_product__brand");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Product)
                    .HasForeignKey(d => d.CategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_product__category");

                entity.HasOne(d => d.Collection)
                    .WithMany(p => p.Product)
                    .HasForeignKey(d => d.CollectionId)
                    .HasConstraintName("fk_product__collection");

                entity.HasOne(d => d.Material)
                    .WithMany(p => p.Product)
                    .HasForeignKey(d => d.MaterialId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_product__material");

                entity.HasOne(d => d.Suplier)
                    .WithMany(p => p.Product)
                    .HasForeignKey(d => d.SuplierId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_product__suplier");

                entity.HasOne(d => d.Unit)
                    .WithMany(p => p.Product)
                    .HasForeignKey(d => d.UnitId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_product__unit");
            });

            modelBuilder.Entity<ProductImages>(entity =>
            {
                entity.ToTable("product_images");

                entity.Property(e => e.Id).HasColumnType("int(11)");

                entity.Property(e => e.CreatedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'current_timestamp()'");

                entity.Property(e => e.ImageUrls).HasColumnType("varchar(2555)");

                entity.Property(e => e.ModifiedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasDefaultValueSql("'b\\'1\\''");
            });

            modelBuilder.Entity<ProductVariant>(entity =>
            {
                entity.ToTable("product_variant");

                entity.HasIndex(e => e.ColorId)
                    .HasName("fk_product_variant__color");

                entity.HasIndex(e => e.ProductId)
                    .HasName("fk_product_variant__product");

                entity.HasIndex(e => e.ProductImagesId)
                    .HasName("fk_product_variant__product_images");

                entity.HasIndex(e => e.SizeId)
                    .HasName("fk_product_variant__size");

                entity.Property(e => e.Id).HasColumnType("varchar(255)");

                entity.Property(e => e.ColorId).HasColumnType("smallint(6)");

                entity.Property(e => e.CreatedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'current_timestamp()'");

                entity.Property(e => e.ModifiedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.ProductId).HasColumnType("smallint(6)");

                entity.Property(e => e.ProductImagesId).HasColumnType("int(11)");

                entity.Property(e => e.Quantity)
                    .HasColumnType("smallint(6)")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.SizeId).HasColumnType("smallint(6)");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasDefaultValueSql("'b\\'1\\''");

                entity.Property(e => e.Thumbnail).HasColumnType("varchar(255)");

                entity.HasOne(d => d.Color)
                    .WithMany(p => p.ProductVariant)
                    .HasForeignKey(d => d.ColorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_product_variant__color");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductVariant)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_product_variant__product");

                entity.HasOne(d => d.ProductImages)
                    .WithMany(p => p.ProductVariant)
                    .HasForeignKey(d => d.ProductImagesId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_product_variant__product_images");

                entity.HasOne(d => d.Size)
                    .WithMany(p => p.ProductVariant)
                    .HasForeignKey(d => d.SizeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_product_variant__size");
            });

            modelBuilder.Entity<Reviews>(entity =>
            {
                entity.ToTable("reviews");

                entity.HasIndex(e => e.ProductId)
                    .HasName("fk_reviews__product");

                entity.HasIndex(e => e.UserId)
                    .HasName("fk_reviews__user");

                entity.Property(e => e.Id).HasColumnType("int(11)");

                entity.Property(e => e.Content).HasColumnType("varchar(2555)");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'current_timestamp()'");

                entity.Property(e => e.ProductId).HasColumnType("smallint(6)");

                entity.Property(e => e.SatisfactionRate).HasDefaultValueSql("'1'");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasDefaultValueSql("'b\\'1\\''");

                entity.Property(e => e.UserId).HasColumnType("int(11)");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Reviews)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_reviews__product");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Reviews)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_reviews__user");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("role");

                entity.Property(e => e.Id).HasColumnType("smallint(6)");

                entity.Property(e => e.CreatedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'current_timestamp()'");

                entity.Property(e => e.Discription).HasColumnType("varchar(2555)");

                entity.Property(e => e.ModifiedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.Name).HasColumnType("varchar(255)");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasDefaultValueSql("'b\\'1\\''");
            });

            modelBuilder.Entity<Rule>(entity =>
            {
                entity.ToTable("rule");

                entity.Property(e => e.Id).HasColumnType("varchar(255)");

                entity.Property(e => e.Discription).HasColumnType("varchar(2555)");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasDefaultValueSql("'b\\'1\\''");
            });

            modelBuilder.Entity<Size>(entity =>
            {
                entity.ToTable("size");

                entity.Property(e => e.Id).HasColumnType("smallint(6)");

                entity.Property(e => e.CategoryId).HasColumnType("smallint(6)");

                entity.Property(e => e.CreatedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'current_timestamp()'");

                entity.Property(e => e.DisplayOrder)
                    .HasColumnType("smallint(6)")
                    .HasDefaultValueSql("'1'");

                entity.Property(e => e.ModifiedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.Name).HasColumnType("varchar(255)");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasDefaultValueSql("'b\\'1\\''");
            });

            modelBuilder.Entity<Slide>(entity =>
            {
                entity.ToTable("slide");

                entity.Property(e => e.Id).HasColumnType("smallint(6)");

                entity.Property(e => e.CreatedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'current_timestamp()'");

                entity.Property(e => e.Discription).HasColumnType("varchar(2555)");

                entity.Property(e => e.DisplayOrder)
                    .HasColumnType("smallint(6)")
                    .HasDefaultValueSql("'1'");

                entity.Property(e => e.Image).HasColumnType("varchar(255)");

                entity.Property(e => e.Link).HasColumnType("varchar(2555)");

                entity.Property(e => e.ModifiedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasDefaultValueSql("'b\\'1\\''");
            });

            modelBuilder.Entity<Suplier>(entity =>
            {
                entity.ToTable("suplier");

                entity.Property(e => e.Id).HasColumnType("smallint(6)");

                entity.Property(e => e.Address).HasColumnType("varchar(2555)");

                entity.Property(e => e.CreatedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'current_timestamp()'");

                entity.Property(e => e.Description).HasColumnType("varchar(2555)");

                entity.Property(e => e.Email).HasColumnType("varchar(255)");

                entity.Property(e => e.Logo).HasColumnType("varchar(255)");

                entity.Property(e => e.ModifiedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.Name).HasColumnType("varchar(255)");

                entity.Property(e => e.Phone).HasColumnType("varchar(255)");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasDefaultValueSql("'b\\'1\\''");
            });

            modelBuilder.Entity<Tag>(entity =>
            {
                entity.ToTable("tag");

                entity.Property(e => e.Id).HasColumnType("smallint(6)");

                entity.Property(e => e.CreatedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'current_timestamp()'");

                entity.Property(e => e.ModifiedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.Name).HasColumnType("varchar(255)");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasDefaultValueSql("'b\\'1\\''");
            });

            modelBuilder.Entity<Unit>(entity =>
            {
                entity.ToTable("unit");

                entity.Property(e => e.Id).HasColumnType("smallint(6)");

                entity.Property(e => e.CreatedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'current_timestamp()'");

                entity.Property(e => e.ModifiedBy).HasColumnType("smallint(6)");

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.Name).HasColumnType("varchar(255)");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasDefaultValueSql("'b\\'1\\''");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("user");

                entity.Property(e => e.Id).HasColumnType("int(11)");

                entity.Property(e => e.Address).HasColumnType("varchar(255)");

                entity.Property(e => e.Avatar).HasColumnType("varchar(255)");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'current_timestamp()'");

                entity.Property(e => e.DateOfBirth).HasColumnType("date");

                entity.Property(e => e.District).HasColumnType("varchar(255)");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.Favorites).HasColumnType("varchar(2555)");

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

                entity.Property(e => e.Name).HasColumnType("varchar(255)");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnType("varchar(2555)");

                entity.Property(e => e.Phone).HasColumnType("varchar(255)");

                entity.Property(e => e.Province).HasColumnType("varchar(255)");

                entity.Property(e => e.ShoppingCarts).HasColumnType("varchar(2555)");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasColumnType("bit(1)")
                    .HasDefaultValueSql("'b\\'1\\''");

                entity.Property(e => e.VerificationCode).HasColumnType("varchar(255)");

                entity.Property(e => e.Ward).HasColumnType("varchar(255)");
            });
        }
    }
}
