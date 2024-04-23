/*
  Warnings:

  - Added the required column `slug` to the `news_list` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `news_list` ADD COLUMN `slug` VARCHAR(100) NOT NULL;
