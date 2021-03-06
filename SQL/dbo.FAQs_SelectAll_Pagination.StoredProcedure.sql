USE [Interrogas]
GO
/****** Object:  StoredProcedure [dbo].[FAQs_SelectAll_Pagination]    Script Date: 5/6/2022 3:54:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Isis Jackson
-- Create date: 4/6/2022
-- Description:	FAQs Select All By Pagination
-- Code Reviewer: 


-- MODIFIED BY: Isis Jackson
-- MODIFIED DATE:4/6/2022
-- Code Reviewer: 
-- Note: 
-- =============================================
CREATE PROC [dbo].[FAQs_SelectAll_Pagination]
		@Index int
		,@PageSize int

AS

/*

DECLARE 
		@Index int = 0
		,@PageSize int = 5
		

EXECUTE dbo.FAQs_SelectAll_Pagination
		@Index 
		,@PageSize 

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
ORDER BY Id

OFFSET @OffSet Rows
Fetch Next @PageSize Rows ONLY

END
GO
