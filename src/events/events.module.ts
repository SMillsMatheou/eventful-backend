import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { UserEvent } from './user-event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, UserEvent])],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
