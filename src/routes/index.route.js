import { Router } from "express";
const router = Router();
import { ping } from "../controller/index.controller.js";
/* https://www.youtube.com/watch?v=3dSkc-DIM74 */
router.get( '/ping', ping );

export default router;
