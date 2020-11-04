using Microsoft.EntityFrameworkCore.Migrations;

namespace WarApp.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    userName = table.Column<string>(nullable: false),
                    gamesPlayed = table.Column<int>(nullable: false),
                    gamesWon = table.Column<int>(nullable: false),
                    gamesLost = table.Column<int>(nullable: false),
                    totalMoves = table.Column<int>(nullable: false),
                    timesWar = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "User");
        }
    }
}
