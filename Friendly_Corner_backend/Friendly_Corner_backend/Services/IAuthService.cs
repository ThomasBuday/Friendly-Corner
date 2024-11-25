namespace Friendly_Corner_backend.Services
{
    public interface IAuthService
    {
        string GenerateToken(string username, string role);
    }
}