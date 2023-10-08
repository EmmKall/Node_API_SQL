import { Router } from "express";
import { getAll, findById, store, update, destroy, login, confirm, forget_password, update_pass } from '../controller/user.controller.js';

const router = Router();

router.get( '/', getAll );
router.get( '/:id', findById );
router.post( '/', store );
router.put( '/:id', update );
router.delete( '/:id', destroy);
router.post( '/login', login );
router.get( '/confirm/:token', confirm );
router.post( '/forget_pass', forget_password );
router.post( '/update_pass', update_pass );

export default router;
