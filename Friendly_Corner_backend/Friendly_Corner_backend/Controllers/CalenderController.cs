using Friendly_Corner_backend.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Friendly_Corner_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "user")] // Only allow users with the "user" role
    public class CalendarController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CalendarController(AppDbContext context)
        {
            _context = context;
        }

        // Get all bookings for the user
        [HttpGet("bookings")]
        public async Task<IActionResult> GetBookings()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Assumes the JWT contains the user ID
            var bookings = await _context.MeetingRoomBookings
                .Where(b => b.UserId.ToString() == userId)
                .Select(b => new
                {
                    b.BookingType, // "Heldag", "Halvdag", or "Helgdag"
                    b.StartTime,
                    b.EndTime,
                    b.Price // Include the price in the response
                })
                .ToListAsync();

            return Ok(bookings);
        }

        // Book a predefined option (Heldag, Halvdag, or Helgdag)
        [HttpPost("book")]
        public async Task<IActionResult> BookOption([FromBody] BookingDto bookingDto)
        {
            // Define predefined options with durations and prices
            var bookingOptions = new Dictionary<string, (TimeSpan Duration, decimal Price)>
            {
                { "Heldag", (TimeSpan.FromHours(8), 3000) },
                { "Halvdag", (TimeSpan.FromHours(4), 1800) },
                { "Helgdag", (TimeSpan.FromHours(8), 4000) }
            };

            // Validate the booking type
            if (!bookingOptions.ContainsKey(bookingDto.BookingType))
                return BadRequest("Invalid booking type.");

            // Determine the booking duration and price
            var (duration, price) = bookingOptions[bookingDto.BookingType];
            var startTime = bookingDto.StartTime;
            var endTime = startTime.Add(duration);

            // Check for overlapping bookings
            var isOverlapping = await _context.MeetingRoomBookings.AnyAsync(b =>
                ((startTime >= b.StartTime && startTime < b.EndTime) ||
                 (endTime > b.StartTime && endTime <= b.EndTime)));

            if (isOverlapping)
                return Conflict("The selected time slot is already booked.");

            // Save the booking
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Assumes the JWT contains the user ID
            var booking = new MeetingRoomBooking
            {
                UserId = int.Parse(userId),
                BookingType = bookingDto.BookingType,
                StartTime = startTime,
                EndTime = endTime,
                Price = price // Save the price
            };

            _context.MeetingRoomBookings.Add(booking);
            await _context.SaveChangesAsync();

            return Ok($"Room booked successfully for {bookingDto.BookingType} at {price:C}!");
        }
    }

    // Data Transfer Object for booking
    public class BookingDto
    {
        public string BookingType { get; set; } = default!; // "Heldag", "Halvdag", or "Helgdag"
        public DateTime StartTime { get; set; } // Start time provided by the user
    }

    // Entity for MeetingRoomBooking
   
}