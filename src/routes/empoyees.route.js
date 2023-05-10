import { Router } from "express";

const router = Router();

router.get( '/', ( req, res ) => res.status( 200 ).json({ msg: 'GetAll' }) );
router.get( '/:id', ( req, res ) => res.status( 200 ).json({ msg: 'find' }) );
router.post( '/', ( req, res ) => res.status( 200 ).json({ msg: 'store' }) );
router.put( '/', ( req, res ) => res.status( 200 ).json({ msg: 'update' }) );
router.delete( '/', ( req, res ) => res.status( 200 ).json({ msg: 'delete' }) );

export default router;
