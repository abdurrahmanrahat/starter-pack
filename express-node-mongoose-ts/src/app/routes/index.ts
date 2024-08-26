import express from 'express';

const router = express.Router();

// router.use('/users', UserRoutes);

const moduleRoutes = [
  {
    path: '/users',
    route: "UserRoutes",
  },

];

moduleRoutes.forEach((item) => router.use(item.path, item.route));

export default router;
