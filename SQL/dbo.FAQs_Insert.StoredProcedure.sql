USE [Interrogas]
GO
/****** Object:  StoredProcedure [dbo].[FAQs_Insert]    Script Date: 5/6/2022 3:54:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		Isis Jackson
-- Create date: 4/5/2022
-- Description:	FAQs Insert
-- Code Reviewer: 


-- MODIFIED BY: Isis Jackson
-- MODIFIED DATE:4/5/2022
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE PROC [dbo].[FAQs_Insert]			
			@Question nvarchar(255)
			,@Answer nvarchar(2000)
			,@CategoryId int
			,@SortOrder int	
			,@CreatedBy int
			,@ModifiedBy int
			,@Id int OUTPUT

AS

/*
Declare		
		@Id int = 0
		,@Question nvarchar(255) = 'What is FAQs?'
		,@Answer nvarchar(2000) = 'Frequently Asked Questions'
		,@CategoryId int = 0
		,@SortOrder int = 0
		,@CreatedBy int = 3
		,@ModifiedBy int = 3
		

Execute dbo.FAQs_Insert
		@Question 
		,@Answer 
		,@CategoryId 
		,@SortOrder	
		,@CreatedBy 
		,@ModifiedBy 
		,@Id OUTPUT

SELECT *
FROM dbo.FAQs
WHERE ID = @Id
*/

BEGIN

INSERT INTO [dbo].[FAQs]
           ([Question]
           ,[Answer]
           ,[CategoryId]
           ,[SortOrder]
		   ,[CreatedBy] 
		   ,[ModifiedBy])          
           
     VALUES
			(@Question 
			,@Answer 
			,@CategoryId 
			,@SortOrder
			,@CreatedBy
			,@ModifiedBy) 

SET @Id = SCOPE_IDENTITY()

END
GO
