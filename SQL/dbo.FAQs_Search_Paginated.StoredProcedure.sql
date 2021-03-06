USE [Interrogas]
GO
/****** Object:  StoredProcedure [dbo].[FAQs_Search_Paginated]    Script Date: 5/6/2022 3:54:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[FAQs_Search_Paginated]
		@Index int
		,@PageSize int
		,@Query nvarchar(100)

AS

/*
DECLARE 
		@Index int = 0
		,@PageSize int = 100
		,@Query nvarchar(100) = 'test'

EXECUTE dbo.FAQs_Search_Paginated
		@Index 
		,@PageSize 
		,@Query 
*/

BEGIN

Declare @Offset int = @Index * @PageSize 

SELECT [Id]
      ,[Question]
      ,[Answer]
      ,[CategoryId]
      ,[SortOrder]      
	  ,TotalCount = COUNT(1) OVER()

FROM [dbo].[FAQs]
WHERE (Question LIKE '%' + @Query + '%')

Order by Id
Offset @offset Row
Fetch Next @pageSize Row Only

END
GO
