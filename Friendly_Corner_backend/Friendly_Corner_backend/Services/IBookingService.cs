using Friendly_Corner_backend.Models;

namespace Friendly_Corner_backend.Services
{
    public interface IBookingService
    {
        // Method to book a meeting room for a given date and duration
        Task<bool> BookMeetingRoomAsync(DateTime date, int duration, int roomId, int userId);
        
        // Method to get all bookings for a specific user
        Task<IEnumerable<Booking>> GetBookingsForUserAsync(int userId);
        
        // Method to get all bookings for a specific meeting room
        Task<IEnumerable<Booking>> GetBookingsForRoomAsync(int roomId);
        
        // Method to cancel a specific booking
        Task<bool> CancelBookingAsync(int bookingId);
        
        // Method to check if a meeting room is available for a given date and time
        Task<bool> CheckRoomAvailabilityAsync(int roomId, DateTime date, int duration);
        
        // Method to get all bookings (for admin purposes)
        Task<IEnumerable<Booking>> GetAllBookingsAsync();
        
        // Method to update an existing booking (e.g., change the date or room)
        Task<bool> UpdateBookingAsync(int bookingId, DateTime newDate, int newDuration, int newRoomId);
    }
}