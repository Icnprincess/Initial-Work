USE [Interrogas]
GO
/****** Object:  Table [dbo].[FAQs]    Script Date: 5/6/2022 3:49:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FAQs](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Question] [nvarchar](255) NOT NULL,
	[Answer] [nvarchar](2000) NOT NULL,
	[CategoryId] [int] NOT NULL,
	[SortOrder] [int] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[ModifiedBy] [int] NOT NULL,
 CONSTRAINT [PK_FAQs] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[FAQs] ADD  CONSTRAINT [DF_FAQs_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[FAQs] ADD  CONSTRAINT [DF_FAQs_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[FAQs]  WITH CHECK ADD  CONSTRAINT [FK_FAQs_Users] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[FAQs] CHECK CONSTRAINT [FK_FAQs_Users]
GO
ALTER TABLE [dbo].[FAQs]  WITH NOCHECK ADD  CONSTRAINT [FK_FAQs_Users1] FOREIGN KEY([ModifiedBy])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[FAQs] NOCHECK CONSTRAINT [FK_FAQs_Users1]
GO
/****** Object:  StoredProcedure [dbo].[FAQs_Delete_ById]    Script Date: 5/6/2022 3:49:10 PM ******/
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
/****** Object:  StoredProcedure [dbo].[FAQs_Insert]    Script Date: 5/6/2022 3:49:10 PM ******/
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
/****** Object:  StoredProcedure [dbo].[FAQs_Search_Paginated]    Script Date: 5/6/2022 3:49:10 PM ******/
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
/****** Object:  StoredProcedure [dbo].[FAQs_Select_ByCreatedBy_Paginated]    Script Date: 5/6/2022 3:49:10 PM ******/
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
/****** Object:  StoredProcedure [dbo].[FAQs_SelectAll_Pagination]    Script Date: 5/6/2022 3:49:10 PM ******/
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
/****** Object:  StoredProcedure [dbo].[FAQs_SelectById]    Script Date: 5/6/2022 3:49:10 PM ******/
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
/****** Object:  StoredProcedure [dbo].[FAQs_Update]    Script Date: 5/6/2022 3:49:10 PM ******/
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
