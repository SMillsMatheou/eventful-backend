import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dtos/CreateEvent.dto';
import { UserEvent } from './user-event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
    @InjectRepository(UserEvent)
    private userEventsRepository: Repository<UserEvent>,
  ) {}

  async getEventsByUser(id: number): Promise<Event[]> {
    const events = await this.eventsRepository
      .createQueryBuilder('event')
      .leftJoin('event.userEvents', 'userEvent')
      .where('userEvent.userId = :id', { id })
      .getMany();

    return events;
  }

  async create(eventData: CreateEventDto): Promise<Event> {
    const code = await this.generateUniqueCode();

    const event = await this.eventsRepository.save({ ...eventData, code });

    const userEvent = new UserEvent();
    userEvent.user = event.createdBy;
    userEvent.event = event;
    userEvent.role = 'owner';

    await this.userEventsRepository.save(userEvent);

    return event;
  }

  private async generateUniqueCode(length: number = 6): Promise<string> {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    do {
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        result += chars[randomIndex];
      }
    } while (!(await this.isCodeUnique(result)));

    return result;
  }

  private async isCodeUnique(code: string): Promise<boolean> {
    const existingEvent = await this.eventsRepository.findOne({
      where: { code },
    });
    return !existingEvent;
  }
}
