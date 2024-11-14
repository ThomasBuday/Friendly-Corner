using Friendly_Corner_backend.Models;
using Microsoft.EntityFrameworkCore;


public class AppDbContext:DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {}
    public DbSet<User> Users { get; set; }
    public DbSet<Room> Rooms { get; set; }
     public DbSet<Member> Members { get; set; }
        public DbSet<Booking> Bookings { get; set; }
         protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Booking>()
                .HasKey(b => b.BookingId);
        }
    
}
