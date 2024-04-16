1. create database with this script
USE [Demo]
GO

/****** Object:  Table [dbo].[nino]    Script Date: 4/16/2024 3:48:43 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[nino](
	[ninoId] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](100) NOT NULL,
	[identification] [varchar](50) NULL,
	[age] [int] NULL,
	[gender] [int] NULL,
	[sponsor] [varchar](100) NULL,
	[gift] [int] NULL,
 CONSTRAINT [PK_nino] PRIMARY KEY CLUSTERED 
(
	[ninoId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

2.Edit DefaultConnection file in the direction ...\UGO\ugoAPI\ugoAPI\appsettings.json with you string connection.
