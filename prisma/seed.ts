import { PrismaClient } from "@prisma/client";
import { LoremIpsum } from "lorem-ipsum";
import bcrypt from "bcryptjs";
import { addDays } from "date-fns";

const prisma = new PrismaClient();

async function main() {
  const d = new Date(2014, 1, 1);
  const list = [];
  const lorem = new LoremIpsum();
  const passwordHash = await bcrypt.hash("testi123", 10);
  const user = await prisma.user.create({
    data: {
      username: "antti",
      password_hash: passwordHash,
    },
  });

  for (let i = 0; i < 1000; i++) {
    const day = addDays(d, Math.round(Math.random() * 2600));
    const text = lorem.generateWords(Math.round(Math.random() * 10));
    const log = prisma.log.create({
      data: {
        text,
        user_id: user.id,
        created_at: day,
        updated_at: day,
      },
    });

    list.push(log);
  }

  const result = await Promise.all(list);
  console.log("🤡 result: ", result);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
