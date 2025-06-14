import { getIdleGames } from "@/entities/game/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

export async function GamesList() {
  const games = await getIdleGames();
  console.log(games);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {games.map((game) => {
        return(
          <Card key={game.id}  className="min-w-[250px]">
          <CardHeader>
            <CardTitle>Игра с : {game.creator.login}</CardTitle>
          </CardHeader>
          <CardContent>Рейтинг: {game.creator.rating}</CardContent>
        </Card>
        )
      }
      )}
    </div>
  );
}