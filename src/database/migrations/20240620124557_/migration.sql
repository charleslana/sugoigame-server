-- CreateEnum
CREATE TYPE "RoleEnum" AS ENUM ('admin', 'user');

-- CreateEnum
CREATE TYPE "GenderEnum" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "FactionEnum" AS ENUM ('pirate', 'marine', 'revolutionary');

-- CreateEnum
CREATE TYPE "SeaEnum" AS ENUM ('north-blue', 'east-blue', 'south-blue', 'west-blue');

-- CreateEnum
CREATE TYPE "BreedEnum" AS ENUM ('human', 'dwarf', 'giant', 'merman', 'cyborg');

-- CreateEnum
CREATE TYPE "CharacterClassEnum" AS ENUM ('swordsman', 'shooter', 'fighter');

-- CreateTable
CREATE TABLE "tb_user" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "gender" "GenderEnum" NOT NULL,
    "credit" INTEGER NOT NULL DEFAULT 0,
    "banned_time" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_user_role" (
    "id" SERIAL NOT NULL,
    "name" "RoleEnum" NOT NULL DEFAULT 'user',
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_user_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_character" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_avatar" (
    "id" SERIAL NOT NULL,
    "image" INTEGER NOT NULL,
    "character_id" INTEGER NOT NULL,

    CONSTRAINT "tb_avatar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_user_character" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "faction" "FactionEnum" NOT NULL,
    "sea" "SeaEnum" NOT NULL,
    "breed" "BreedEnum" NOT NULL,
    "class" "CharacterClassEnum" NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "coin" INTEGER NOT NULL DEFAULT 5500,
    "hp" INTEGER NOT NULL DEFAULT 100,
    "mp" INTEGER NOT NULL DEFAULT 100,
    "stamina" INTEGER NOT NULL DEFAULT 60,
    "exp" INTEGER NOT NULL DEFAULT 0,
    "banned_time" TIMESTAMP(3),
    "user_id" INTEGER NOT NULL,
    "character_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_user_character_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_user_email_key" ON "tb_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tb_character_name_key" ON "tb_character"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tb_user_character_name_key" ON "tb_user_character"("name");

-- AddForeignKey
ALTER TABLE "tb_user_role" ADD CONSTRAINT "tb_user_role_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_avatar" ADD CONSTRAINT "tb_avatar_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "tb_character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_user_character" ADD CONSTRAINT "tb_user_character_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_user_character" ADD CONSTRAINT "tb_user_character_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "tb_character"("id") ON DELETE CASCADE ON UPDATE CASCADE;
