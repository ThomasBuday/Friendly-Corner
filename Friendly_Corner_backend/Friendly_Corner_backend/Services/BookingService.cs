using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Friendly_Corner_backend.Data; // Namespace where AppDbContext is defined
using Friendly_Corner_backend.Models; // Namespace where Booking model is defined

namespace Friendly_Corner_backend.Services
{
    public class BookingService : IBookingService
    {
        private readonly AppDbContext _context;

        public BookingService(AppDbContext context)
        {
            _context = context;
        }

        // Method to book a meeting room for a given date and duration
        public async Task<bool> BookMeetingRoomAsync(DateTime date, int duration, int roomId, int userId)
        {
            // Step 1: Validate the booking date
            if (date < DateTime.Now)
            {
                throw new ArgumentException("Booking date cannot be in the past.");
            }

            // Step 2: Check if the meeting room is available
            var endTime = date.AddMinutes(duration);
            bool isRoomAvailable = !await _context.Bookings
                .Where(b => b.RoomId == roomId) // Filter by the selected room
                .AnyAsync(b => b.StartTime < endTime && date < b.EndTime); // Check for overlapping bookings

            if (!isRoomAvailable)
            {
                return false; // Room is already booked for the requested time slot
            }

            // Step 3: Create a new booking
            var booking = new Booking
            {
                StartTime = date,
                EndTime = date.AddMinutes(duration), // End time is calculated from the start time and duration
                UserId = userId, // Assign the user who is making the booking
                RoomId = roomId, // Assign the room being booked
                CreatedAt = DateTime.Now // Set the created timestamp
            };

            _context.Bookings.Add(booking); // Add the new booking to the database
            await _context.SaveChangesAsync(); // Save changes to the database

            return true; // Booking successful
        }

        // Method to get all bookings for a specific user
        public async Task<IEnumerable<Booking>> GetBookingsForUserAsync(int userId)
        {
            return await _context.Bookings
                .Where(b => b.UserId == userId)
                .Include(b => b.Room) // Include room details
                .Include(b => b.User) // Include user details
                .ToListAsync();
        }

        // Method to get all bookings for a specific meeting room
        public async Task<IEnumerable<Booking>> GetBookingsForRoomAsync(int roomId)
        {
            return await _context.Bookings
                .Where(b => b.RoomId == roomId)
                .Include(b => b.Room) // Include room details
                .Include(b => b.User) // Include user details
                .ToListAsync();
        }

        // Method to cancel a specific booking
        public async Task<bool> CancelBookingAsync(int bookingId)
        {
            var booking = await _context.Bookings.FindAsync(bookingId);
            if (booking == null)
            {
                return false; // Booking not found
            }

            _context.Bookings.Remove(booking); // Remove the booking from the database
            await _context.SaveChangesAsync(); // Save changes to the database

            return true; // Booking cancelled successfully
        }

        // Method to check if a meeting room is available for a given date and time
        public async Task<bool> CheckRoomAvailabilityAsync(int roomId, DateTime date, int duration)
        {
            var endTime = date.AddMinutes(duration);
            bool isRoomAvailable = !await _context.Bookings
                .Where(b => b.RoomId == roomId) // Filter by the selected room
                .AnyAsync(b => b.StartTime < endTime && date < b.EndTime); // Check for overlapping bookings

            return isRoomAvailable;
        }

        // Method to get all bookings (for admin purposes)
        public async Task<IEnumerable<Booking>> GetAllBookingsAsync()
        {
            return await _context.Bookings
                .Include(b => b.Room) // Include room details
                .Include(b => b.User) // Include user details
                .ToListAsync();
        }

        // Method to update an existing booking (e.g., change the date or room)
        public async Task<bool> UpdateBookingAsync(int bookingId, DateTime newDate, int newDuration, int newRoomId)
        {
            var booking = await _context.Bookings.FindAsync(bookingId);
            if (booking == null)
            {
                return false; // Booking not found
            }

            // Check if the new booking time slot is available
            var newEndTime = newDate.AddMinutes(newDuration);
            bool isRoomAvailable = !await _context.Bookings
                .Where(b => b.RoomId == newRoomId) // Filter by the new room
                .AnyAsync(b => b.StartTime < newEndTime && newDate < b.EndTime); // Check for overlapping bookings

            if (!isRoomAvailable)
            {
                return false; // Room is already booked for the requested time slot
            }

            // Update the booking details
            booking.StartTime = newDate;
            booking.EndTime = newDate.AddMinutes(newDuration);
            booking.RoomId = newRoomId;

            _context.Bookings.Update(booking); // Update the booking in the database
            await _context.SaveChangesAsync(); // Save changes to the database

            return true; // Booking updated successfully
        }
    }
}