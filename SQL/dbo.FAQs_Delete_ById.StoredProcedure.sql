USE [Interrogas]
GO
/****** Object:  StoredProcedure [dbo].[FAQs_Delete_ById]    Script Date: 5/6/2022 3:54:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		Isis Jackson
-- Create date: 4/5/2022
-- Description:	FAQs Delete By Id
-- Code Reviewer: 


-- MODIFIED BY: Isis Jackson
-- MODIFIED DATE:4/5/2022
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE PROC [dbo].[FAQs_Delete_ById]
			@Id int

AS

/*

Declare @Id int = 2

Execute dbo.FAQs_Delete_ById @Id

Select * from dbo.FAQs

*/

BEGIN

DELETE FROM [dbo].[FAQs]
      WHERE @Id = Id


END
GO
