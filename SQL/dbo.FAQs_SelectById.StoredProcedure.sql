USE [Interrogas]
GO
/****** Object:  StoredProcedure [dbo].[FAQs_SelectById]    Script Date: 5/6/2022 3:54:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		Isis Jackson
-- Create date: 4/6/2022
-- Description:	FAQs Select By Id
-- Code Reviewer: 


-- MODIFIED BY: Isis Jackson
-- MODIFIED DATE:4/6/2022
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE PROC [dbo].[FAQs_SelectById]
			@Id int 

AS

/*

	Declare @Id int = 2;
	Execute dbo.FAQs_SelectById @Id

*/

BEGIN

SELECT [Id]
      ,[Question]
      ,[Answer]
      ,[CategoryId]
      ,[SortOrder]
      

FROM [dbo].[FAQs]
WHERE Id = @Id

END

GO
