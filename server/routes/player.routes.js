import {Router} from 'express';
import { playerController } from '../controllers/player.controller.js';

const router = Router();

router.route("/players")
.get(playerController.getAllPlayers)
.post(playerController.createPlayer)

router.route("/players/:id")
.get(playerController.getOnePlayer)
.put(playerController.updateOnePlayer)
.delete(playerController.deleteOnePlayer)

export default router;