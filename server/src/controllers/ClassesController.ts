import { Request, Response } from 'express';

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHoursToMinutes';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {

  async index (request: Request, response: Response) {
    const filters = request.query;

    if(!filters.week_day || !filters.subject || !filters.time) {
      return response.status(400).json({
        error: 'Missing filters to search classes'
      });
    }

    const timeInMinutes = convertHourToMinutes(filters.time as string);

    const classes = await db('classes')
      .whereExists(function() {
        this.select('classe_schedule.*')
          .from('classe_schedule')
          .whereRaw('`classe_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`classe_schedule`.`weekday` = ??', [Number(filters.week_day)])
          .whereRaw('`classe_schedule`.`from` <= ??', [timeInMinutes])
          .whereRaw('`classe_schedule`.`to` > ??', [timeInMinutes])
      })
      .where('classes.subject', '=', filters.subject as string)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*']);

    return response.json(classes);
  }

  async create (request: Request, response: Response) {
  
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = request.body;
    
    //transactions allows to insert all or nothing
    const transaction = await db.transaction();
  
    try {
  
      const insertedUsersId = await transaction('users').insert({
        name,
        avatar,
        whatsapp,
        bio
      });
  
      const user_id = insertedUsersId[0];
  
      const insertedClassesIds = await transaction('classes').insert({
        subject,
        cost,
        user_id
      });
  
      const class_id = insertedClassesIds[0];
  
      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          weekday: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to)
        };
      })
  
      await transaction('classe_schedule').insert(classSchedule);
  
      //changes are commited in the DB just in this moment
      await transaction.commit();
  
      return response.status(201).send();
    } catch (error) {
      //in case somethings goes wrong, a rollback happens
      await transaction.rollback();
  
      return response.status(400).json({
        error: 'Unexpected error creating a new class'
      })
    }  
  }
}