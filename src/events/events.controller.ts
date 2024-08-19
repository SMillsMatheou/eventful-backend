import { Controller, Get, Post, Req } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './event.entity';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async getEventsByUser(@Req() req): Promise<Event[]> {
    return this.eventsService.getEventsByUser(req.user.id);
  }

  @Post()
  async createEvent(@Req() req): Promise<Event> {
    return this.eventsService.create({ ...req.body, createdBy: req.user });
  }
}
