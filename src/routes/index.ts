import { Router } from 'express';
import AppointmentRoutes from './appointment.routes';
import UserRoutes from './users.routes';
import SessionRoutes from './sessions.routes';

const routes = Router();

routes.use('/appointments', AppointmentRoutes);
routes.use('/users', UserRoutes);
routes.use('/sessions', SessionRoutes);

export default routes;
