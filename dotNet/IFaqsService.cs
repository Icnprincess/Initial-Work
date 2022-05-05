using Sabio.Models;
using Sabio.Models.Domain.Faqs;
using Sabio.Models.Requests.Faqs;

namespace Sabio.Services.Faqs
{
    public interface IFaqsService
    {
        int Add(FaqAddRequest model, int userId);
        void Delete(int id);
        Paged<Faq> GetAllPagination(int pageIndex, int pageSize);
        Paged<Faq> GetByCreatedBy(int pageIndex, int pageSize, int userId);
        Paged<Faq> GetBySearch(int pageIndex, int pageSize, string query);
        Faq GetById(int id);
        void Update(FaqUpdateRequest model, int userId);
    }
}