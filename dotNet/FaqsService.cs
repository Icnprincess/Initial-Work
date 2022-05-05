using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain.Faqs;
using Sabio.Models.Requests.Faqs;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Faqs
{
    public class FaqsService : IFaqsService
    {
        IDataProvider _data = null;

        public FaqsService(IDataProvider data)  
        {
            _data = data; 
        }

        public Faq GetById(int id)
        {
            string procName = "[dbo].[FAQs_SelectById]";

            Faq faq = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);

            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                faq = MapFAQ(reader, ref startingIndex);
            });
            return faq;
        }        

        public Paged<Faq> GetByCreatedBy(int pageIndex, int pageSize, int userId)
        {
            Paged<Faq> pagedResult = null;
            List<Faq> result = null;
            int totalCount = 0;
            string procName = "[dbo].[FAQs_Select_ByCreatedBy_Paginated]";

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@Index", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                    parameterCollection.AddWithValue("@UserId", userId);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Faq faq = MapFAQ(reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }

                    if (result == null)
                    {
                        result = new List<Faq>();
                    }

                    result.Add(faq);
                }
            );
            if (result != null)
            {
                pagedResult = new Paged<Faq>(result, pageIndex, pageSize, totalCount);
            }

            return pagedResult;
        }

        public Paged<Faq> GetBySearch(int pageIndex, int pageSize, string query)
        {
            Paged<Faq> pagedResult = null;
            List<Faq> result = null;
            int totalCount = 0;
            string procName = "[dbo].[FAQs_Search_Paginated]";

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@Index", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                    parameterCollection.AddWithValue("@Query", query);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Faq faq = MapFAQ(reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }

                    if (result == null)
                    {
                        result = new List<Faq>();
                    }

                    result.Add(faq);
                }
            );
            if (result != null)
            {
                pagedResult = new Paged<Faq>(result, pageIndex, pageSize, totalCount);
            }

            return pagedResult;
        }

        public Paged<Faq> GetAllPagination(int pageIndex, int pageSize)
        {
            Paged<Faq> pagedResult = null;
            List<Faq> result = null;
            int totalCount = 0;
            string procName = "[dbo].[FAQs_SelectAll_Pagination]";

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@Index", pageIndex);
                    parameterCollection.AddWithValue("@pageSize", pageSize);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Faq faq = MapFAQ(reader, ref startingIndex);


                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }

                    if (result == null)
                    {
                        result = new List<Faq>();
                    }

                    result.Add(faq);
                }
            );
            if (result != null)
            {
                pagedResult = new Paged<Faq>(result, pageIndex, pageSize, totalCount);
            }

            return pagedResult;
        }

        public void Delete(int id)
        {
            string procName = "[dbo].[FAQs_Delete_ById]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);

            }, returnParameters: null);
        }

        public int Add(FaqAddRequest model, int userId)
        {
            int id = 0;
            string procName = "[dbo].[FAQs_Insert]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col, userId);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;

                col.Add(idOut);

            }, returnParameters: delegate (SqlParameterCollection returnCol)
            {
                object oldId = returnCol["@Id"].Value;

                int.TryParse(oldId.ToString(), out id);

            });
            return id;
        }       

        public void Update(FaqUpdateRequest model, int userId)
        {
            string procName = "[dbo].[FAQs_Update]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col, userId);
                col.AddWithValue("@Id", model.Id);

            }, returnParameters: null);
        }

        private static void AddCommonParams(FaqAddRequest model, SqlParameterCollection col, int userId)
        {
            col.AddWithValue("@Question", model.Question);
            col.AddWithValue("@Answer", model.Answer);
            col.AddWithValue("@CategoryId", model.CategoryId);
            col.AddWithValue("@SortOrder", model.SortOrder);
            col.AddWithValue("@CreatedBy", userId);
            col.AddWithValue("@ModifiedBy", userId);
        }

        private static Faq MapFAQ(IDataReader reader, ref int startingIndex)
        {
            Faq faq = new Faq();            

            faq.Id = reader.GetSafeInt32(startingIndex++);
            faq.Question = reader.GetSafeString(startingIndex++);
            faq.Answer = reader.GetSafeString(startingIndex++);
            faq.CategoryId = reader.GetSafeInt32(startingIndex++);
            faq.SortOrder = reader.GetSafeInt32(startingIndex++);           
            return faq;
        }

    }
}
