import { Router } from 'express';

const wishlistsRouter = Router();

wishlistsRouter.get('/', (req, res) => {
  res.render('wishlists/wishlists', { title: 'Wishlists' });
});

export default wishlistsRouter;
