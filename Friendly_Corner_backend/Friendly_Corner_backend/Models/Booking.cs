namespace Friendly_Corner_backend.Models
{
    public class Booking
    {
        public int Id { get; set; }         // Primary Key
        public DateTime StartTime { get; set; }  // Start time of the booking
        public DateTime EndTime { get; set; }    // End time of the booking
        public decimal Price { get; set; }  // Price of the booking
        public int UserId { get; set; }     // Foreign Key for the User

        // Navigation Property
        public User User { get; set; }

    }
}
