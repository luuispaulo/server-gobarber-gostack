import { Router } from 'express';
import AppointmentRoutes from './appointment.routes';

const routes = Router();

routes.get('/', (req, res) => res.status(200).json({ message: 'Hello Dev.' }));
routes.use('/appointments', AppointmentRoutes);

export default routes;
