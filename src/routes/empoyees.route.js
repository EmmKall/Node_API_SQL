import { Router } from "express";
import { getAll, findById, store, update, destroy } from '../controller/employees.controller.js';

const router = Router();

router.get( '/', getAll );
router.get( '/:id', findById );
router.post( '/', store );
router.put( '/', update );
router.delete( '/', destroy);

export default router;
