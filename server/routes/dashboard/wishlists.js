import { Router } from 'express';
import checkRole from '../../middlewares/requireRole.js';
import { getWishlistedProducts } from '../../controller/wishlist.js';

const wishlistsRouter = Router();

wishlistsRouter.get('/', checkRole(''), getWishlistedProducts);

export default wishlistsRouter;
