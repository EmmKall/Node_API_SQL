import { Router } from "express";
import { getAll, findById, store, update, destroy, login, confirm } from '../controller/user.controller.js';

const router = Router();

router.get( '/', getAll );
router.get( '/:id', findById );
router.post( '/', store );
router.put( '/:id', update );
router.delete( '/:id', destroy);
router.post( '/login', login );
router.get( '/confirm/:token', confirm )

export default router;
