import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentRepository';

import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (req, res) => {
  const appointmentRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentRepository.find();

  return res.status(200).json(appointments);
});

appointmentsRouter.post('/', async (req, res) => {
  try {
    const { provider_id, date } = req.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      provider_id,
      date: parsedDate,
    });

    return res.json({ message: 'A new appointments a created', appointment });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

export default appointmentsRouter;
