const { PrismaClient } = require("../src/generated/prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Создаем пользователя
  const user = await prisma.user.create({
    data: {
      login: "user",
      passwordHash: "asdadasd",
      rating: 1000,
    },
  });
  const user2 = await prisma.user.create({
    data:{
      login: "user2",
      passwordHash: "asdadasd",
      rating: 1000,
    }
  })
  console.log("Created user:", user);

  // Создаем поле для игры (3x3 для крестиков-ноликов)
  const field = Array(9).fill(null);

  // Создаем первую игру
  await prisma.game.create({
    data: {
      field: field, // Передаем JSON-совместимый массив
      status: "idle",
      players: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  // Создаем вторую игру
  await prisma.game.create({
    data: {
      field: field,
      status: "idle",
      players: {
        connect: {
          id: user2.id,
        },
      },
    },
  });

  // Проверяем, что данные сохранились
  const games = await prisma.game.findMany({ include: { players: true } });
  console.log("Games in DB:", games);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Error:", e);
    await prisma.$disconnect();
    process.exit(1);
  });