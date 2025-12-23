import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { Tenant } from './entities/tenant.entity';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Note, Tenant])],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
