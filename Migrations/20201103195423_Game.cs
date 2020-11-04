using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WarApp.Migrations
{
    public partial class Game : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Game",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    user_id = table.Column<int>(nullable: false),
                    gameTime = table.Column<DateTime>(nullable: false),
                    numMoves = table.Column<int>(nullable: false),
                    timesWar = table.Column<int>(nullable: false),
                    gameOver = table.Column<bool>(nullable: false),
                    savedGame = table.Column<bool>(nullable: false),
                    saveState = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Game", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Game");
        }
    }
}
