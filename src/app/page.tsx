import { prisma } from "@/shared/lib/db";
import { Button } from "@/shared/ui/button";
import { Card, CardTitle } from "@/shared/ui/card";

export default async function Home() {
  const games = await prisma.game.findMany();

  console.log(games);
  return (
    <div className="">
      <Button size="lg" variant="destructive">
        Hello
      </Button>
      {games.map((game) => {
        return (
          <Card key={game.id}>
            <CardTitle>{game.name}</CardTitle>
          </Card>
        );
      })}
    </div>
  );
}
