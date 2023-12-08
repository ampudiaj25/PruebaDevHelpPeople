using System;
using System.Collections.Generic;
using System.Configuration;
using Microsoft.EntityFrameworkCore;

namespace BolsaEmpleoWebAPI.Models;

public partial class BolsaEmpleoDbContext : DbContext
{
    public BolsaEmpleoDbContext()
    {
    }

    public BolsaEmpleoDbContext(DbContextOptions<BolsaEmpleoDbContext> options)
        : base(options)
    {
        this.ChangeTracker.LazyLoadingEnabled = false; 
    }

    public virtual DbSet<Ciudadano> Ciudadanos { get; set; }

    public virtual DbSet<Postulacione> Postulaciones { get; set; }

    public virtual DbSet<TiposDocumento> TiposDocumentos { get; set; }

    public virtual DbSet<Vacante> Vacantes { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-T5EA3L8;DataBase=BolsaEmpleoDB;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Ciudadano>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Ciudadan__3213E83F4E1F8200");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Apellidos)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("apellidos");
            entity.Property(e => e.AspiracionSalarial)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("aspiracionSalarial");
            entity.Property(e => e.Cedula)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("cedula");
            entity.Property(e => e.Correo)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("correo");
            entity.Property(e => e.FechaNacimiento).HasColumnName("fechaNacimiento");
            entity.Property(e => e.Nombres)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("nombres");
            entity.Property(e => e.Profesion)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("profesion");
            entity.Property(e => e.TipoDocumentoId).HasColumnName("tipoDocumentoId");

            entity.HasOne(d => d.TipoDocumento).WithMany(p => p.Ciudadanos)
                .HasForeignKey(d => d.TipoDocumentoId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Ciudadano__tipoD__398D8EEE");
                //.IsRequired(false);


            //entity.HasOne(a => a.TipoDocumento)
            //    .WithMany()
            //    .HasForeignKey(a => a.TipoDocumentoId)
            //    .IsRequired(false);

        });

        modelBuilder.Entity<Postulacione>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Postulac__3213E83F960DAB76");

            entity.HasIndex(e => e.CiudadanoId, "UQ_Ciudadano_Unico").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CiudadanoId).HasColumnName("ciudadanoId");
            entity.Property(e => e.Fecha)
                .HasColumnType("datetime")
                .HasColumnName("fecha");
            entity.Property(e => e.VacanteId).HasColumnName("vacanteId");

            entity.HasOne(d => d.Ciudadano).WithOne(p => p.Postulacione)
                .HasForeignKey<Postulacione>(d => d.CiudadanoId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Postulaci__ciuda__3F466844");

            entity.HasOne(d => d.Vacante).WithMany(p => p.Postulaciones)
                .HasForeignKey(d => d.VacanteId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Postulaci__vacan__403A8C7D");
        });

        modelBuilder.Entity<TiposDocumento>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__TiposDoc__3213E83F47D40934");

            entity.ToTable("TiposDocumento");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<Vacante>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Vacantes__3213E83F7FAA36CE");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Cargo)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("cargo");
            entity.Property(e => e.Codigo)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("codigo");
            entity.Property(e => e.Descripcion)
                .IsUnicode(false)
                .HasColumnName("descripcion");
            entity.Property(e => e.Empresa)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("empresa");
            entity.Property(e => e.Estado).HasColumnName("estado");
            entity.Property(e => e.Salario)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("salario");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
