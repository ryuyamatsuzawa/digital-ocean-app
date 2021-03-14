import prisma, { User } from "../../lib/prisma";
import type { NextApiHandler } from 'next';

//ReadonlyにしたらUserの中のすべてのプロパティを返す
export type Users = Pick<User, "id" | "name" | "email" | "password" | "salt" >[];


const getUser: NextApiHandler = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        email: true,
        name: true,
        password: true,
        id:true,
        salt: true,
      },
    });
    res.status(200).json(users)
  } catch (error) {
    res.json({ error })
  }
};

export default getUser;