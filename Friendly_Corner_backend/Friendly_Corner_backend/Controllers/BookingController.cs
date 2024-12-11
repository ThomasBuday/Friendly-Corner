using Friendly_Corner_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Friendly_Corner_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BookingController(AppDbContext context)
        {
            _context = context;
        }

        // Get available half-hour time slots for booking
        [HttpGet("availability")]
        public async Task<IActionResult> CheckSlotAvailability(DateTime startTime, DateTime endTime)
        {
            var isAvailable = !await _context.Bookings.AnyAsync(b =>
                b.StartTime < endTime && b.EndTime > startTime);

            if (isAvailable)
            {
                return Ok(new { isAvailable = true });
            }

            return Ok(new { isAvailable = false, message = "The selected time slot is already booked." });
        }

        [HttpPost("book")]
        public async Task<IActionResult> BookSlot([FromBody] BookingDto bookingDto)
        {
            if (bookingDto == null)
                return BadRequest(new { message = "Booking data is required." });

            Console.WriteLine($"StartTime: {bookingDto.StartTime}, EndTime: {bookingDto.EndTime}, UserId: {bookingDto.UserId}");

            if (bookingDto.UserId <= 0)
                return BadRequest(new { message = "Invalid User ID." });

            var user = await _context.Users.FindAsync(bookingDto.UserId);
            if (user == null)
                return BadRequest(new { message = "User not found." });

            // Ensure the start and end times are valid
            if (bookingDto.StartTime >= bookingDto.EndTime)
                return BadRequest(new { message = "Start time must be before end time." });

            // Ensure booking falls within allowed hours
            var startHour = bookingDto.StartTime.Hour;
            var endHour = bookingDto.EndTime.Hour;

            if (startHour < 8 || endHour > 18)
                return BadRequest(new { message = "Bookings can only be made between 08:00 and 18:00." });

            // Check if the slot is already booked
            var overlappingBooking = await _context.Bookings
                .FirstOrDefaultAsync(b => b.StartTime < bookingDto.EndTime && b.EndTime > bookingDto.StartTime);

            if (overlappingBooking != null)
                return BadRequest(new { message = "The selected time slot is already booked." });

            // Calculate the duration in hours
            var totalHours = (bookingDto.EndTime - bookingDto.StartTime).TotalHours;

            // Determine the price based on the duration
            decimal price;
            if (totalHours >= 8) // Full day
            {
                price = 3000; // Heldag
            }
            else if (totalHours >= 4) // Half day
            {
                price = 1800; // Halvdag
            }
            else
            {
                return BadRequest(new { message = "Bookings must be at least 4 hours long." });
            }

            // Create the new booking
            var newBooking = new Booking
            {
                StartTime = bookingDto.StartTime,
                EndTime = bookingDto.EndTime,
                Price = price,
                UserId = bookingDto.UserId
            };

            _context.Bookings.Add(newBooking);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Booking confirmed.", price });
        }

        public class BookingDto
        {
            public DateTime StartTime { get; set; }
            public DateTime EndTime { get; set; }
            public decimal Price { get; set; }
            public int UserId { get; set; }
        }
    }
}
