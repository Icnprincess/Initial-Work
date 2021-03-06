USE [Interrogas]
GO
/****** Object:  StoredProcedure [dbo].[FAQs_Update]    Script Date: 5/6/2022 3:54:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Isis Jackson
-- Create date: 4/5/2022
-- Description:	FAQs Update
-- Code Reviewer: 


-- MODIFIED BY: Isis Jackson
-- MODIFIED DATE:4/5/2022
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE PROC [dbo].[FAQs_Update]
			@Id int
			,@Question nvarchar(255)
			,@Answer nvarchar(2000)
			,@CategoryId int
			,@SortOrder int
			,@CreatedBy int
			,@ModifiedBy int			

AS

/*

Declare 
		@Id int = 1
		,@Question nvarchar(255) = 'What is FAQs??'
		,@Answer nvarchar(2000) = 'Frequently Asked Questions'
		,@CategoryId int = 0
		,@SortOrder int = 0	
		,@CreatedBy int = 7
		,@ModifiedBy int = 7
		

EXECUTE dbo.FAQs_Update
		@Id 
		,@Question 
		,@Answer 
		,@CategoryId 
		,@SortOrder	
		,@CreatedBy
		,@ModifiedBy
		

	SELECT *
	FROM dbo.FAQs
	WHERE Id = @Id
*/

BEGIN

UPDATE [dbo].[FAQs]

SET [Question] = @Question
      ,[Answer] = @Answer
      ,[CategoryId] = @CategoryId
      ,[SortOrder] = @SortOrder  
	  ,[CreatedBy] = @CreatedBy
	  ,[ModifiedBy] = @ModifiedBy
	  ,[DateModified] = GETUTCDATE()

WHERE Id = @Id

END



GO
