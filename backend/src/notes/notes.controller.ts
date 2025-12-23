import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(
    @Headers('x-tenant-id') tenantId: string,
    @Body() createNoteDto: CreateNoteDto,
  ) {
    return this.notesService.create(tenantId, createNoteDto);
  }

  @Get()
  findAll(@Headers('x-tenant-id') tenantId: string) {
    return this.notesService.findAll(tenantId);
  }

  @Get(':id')
  findOne(@Headers('x-tenant-id') tenantId: string, @Param('id') id: string) {
    return this.notesService.findOne(tenantId, id);
  }

  @Put(':id')
  update(
    @Headers('x-tenant-id') tenantId: string,
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    return this.notesService.update(tenantId, id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Headers('x-tenant-id') tenantId: string, @Param('id') id: string) {
    return this.notesService.remove(tenantId, id);
  }
}
