using Friendly_Corner_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Friendly_Corner_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberController : ControllerBase
    {
        private readonly AppDbContext _context ;
        public MemberController(AppDbContext context)
        {
            _context=context;
        }

        // GET: api/member
        [HttpGet]
        public ActionResult<IEnumerable<Member>> GetMembers()
        {
            return _context.Members.ToList();
        }

        // GET: api/member/5
        [HttpGet("{id}")]
        public ActionResult<Member> GetMember(int id)
        {
            var member = _context.Members.Find(id);
            if (member == null)
            {
                return NotFound();
            }
            return member;
        }

        // POST: api/member
        [HttpPost]
        public ActionResult<Member> PostMember(Member member)
        {
            _context.Members.Add(member);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetMember), new { id = member.MemberId }, member);
        }

        // PUT: api/member/5
        [HttpPut("{id}")]
        public IActionResult PutMember(int id, Member member)
        {
            if (id != member.MemberId)
            {
                return BadRequest();
            }

            _context.Entry(member).State = EntityState.Modified;
            _context.SaveChanges();

            return NoContent();
        }

        // DELETE: api/member/5
        [HttpDelete("{id}")]
        public IActionResult DeleteMember(int id)
        {
            var member = _context.Members.Find(id);
            if (member == null)
            {
                return NotFound();
            }

            _context.Members.Remove(member);
            _context.SaveChanges();

            return NoContent();
        }
    }
}