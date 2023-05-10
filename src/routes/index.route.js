import { Router } from "express";
const router = Router();
import { ping, pong } from "../controller/index.controller.js";
/* https://www.youtube.com/watch?v=3dSkc-DIM74 */
router.get( '/ping', ping );
router.get( '/pong', pong );

export default router;
