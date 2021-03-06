USE [Interrogas]
GO
/****** Object:  StoredProcedure [dbo].[FAQs_Select_ByCreatedBy_Paginated]    Script Date: 5/6/2022 3:54:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Isis Jackson
-- Create date: 4/6/2022
-- Description:	FAQs Select Paginated by CreatedBy
-- Code Reviewer: 


-- MODIFIED BY: Isis Jackson
-- MODIFIED DATE:4/6/2022
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE PROC [dbo].[FAQs_Select_ByCreatedBy_Paginated]
		@Index int
		,@PageSize int
		,@UserId int

AS

/*

DECLARE 
		@Index int = 0
		,@PageSize int = 5
		,@UserId int = 0

EXECUTE dbo.FAQs_Select_ByCreatedBy_Paginated
		@Index 
		,@PageSize 
		,@UserId
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
WHERE CreatedBy = @UserId
ORDER By Id

OFFSET @OffSet ROWS
FETCH NEXT @PageSize ROWS ONLY

END
GO
