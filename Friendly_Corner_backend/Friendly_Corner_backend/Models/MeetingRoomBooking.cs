namespace Friendly_Corner_backend.Data
{
 public class MeetingRoomBooking
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string BookingType { get; set; } = default!;
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public decimal Price { get; set; }
    }
}