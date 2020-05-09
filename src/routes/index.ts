import { Router } from 'express';
import AppointmentRoutes from './appointment.routes';
import UserRoutes from './users.routes';

const routes = Router();

routes.use('/appointments', AppointmentRoutes);
routes.use('/users', UserRoutes);

export default routes;
