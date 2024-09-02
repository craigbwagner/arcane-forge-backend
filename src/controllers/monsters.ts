import { Request, Response } from "express";
import { Monster } from "../models/monster";
import { User } from "../models/user";

async function index(req: Request, res: Response){
  try {
    const monsters: typeof Monster[] = await Monster.find();
    res.status(200).json(monsters);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(400).json({ error: err.message });
    }
  }
}

// async function create(req: Request, res: Response){
//   try {
//     const monsterData = req.body;
//     delete monsterData.user;
//     const monster = await Monster.create(monsterData);
//     const user = await User.findById(req.body.creator)
//     if(!user) {
//       return res.status(404).json({ error: "User not found." })
//     }
//     user.monsters.push(monster._id)
//     user.save()

//     res.status(201).json(monster);
//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       return res.status(400).json({ error: err.message });
//     }
//   }
// }

// async function getMonster(req: Request, res:Response) {
//   try {
//     const monster = await Monster.findById(req.params.id);
//     if (!monster) {
//       return res.status(404).json({ error: "Monster not found." })
//     } else {
//       res.status(200).json(monster);
//     }
//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       return res.status(400).json({ error: err.message });
//     }
//   }
// }

// async function update(req: Request, res: Response) {
//   try {
//     const monster: typeof Monster | null = await Monster.findById(req.params.id);
//     if (!monster) {
//       return res.status(404).json({ error: "Monster not found." });
//     } else {
//       const updatedMonster: typeof Monster | null = await Monster.findByIdAndUpdate(req.params.id, req.body, { new: true });
//       if (!updatedMonster) {
//         return res.status(400).json({ error: "Failed to update monster." });
//       }
//       res.status(200).json(updatedMonster);
//     }
//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       return res.status(400).json({ error: err.message });
//     }
//   }
// }

// async function destroy(req: Request, res: Response) {
//   try {
//     const monster = await Monster.findById(req.params.id);
//     if (!monster) {
//       return res.status(404).json({ error: "Monster not found." });
//     } else {
//       const user = await User.findById(monster.creator)
//       console.log(monster._id)
//       if(!user) {
//         return res.status(404).json({ error: "User not found." })
//       }
//       user.monsters = user.monsters.filter(monsterId => monsterId === monster._id)
//       console.log(user.monsters)
//       user.save();
//       await Monster.findByIdAndDelete(req.params.id);
//       res.status(204).end();
//     }
//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       return res.status(400).json({ error: err.message });
//     }
//   }
// }

  export default { index };
