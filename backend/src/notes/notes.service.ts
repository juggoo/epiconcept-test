import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { Tenant } from './entities/tenant.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  async create(tenantId: string, createNoteDto: CreateNoteDto) {
    const tenant = await this.tenantRepository.findOneBy({ tenantId });
    if (!tenant) throw new Error('Tenant not found');
    const partialNote: DeepPartial<Note> = {
      ...createNoteDto,
      tenant,
    } as DeepPartial<Note>;
    const note = this.noteRepository.create(partialNote);
    return this.noteRepository.save(note);
  }

  async findAll(tenantId: string) {
    const tenant = await this.tenantRepository.findOneBy({ tenantId });
    if (!tenant) throw new Error('Tenant not found');
    return this.noteRepository.find({ where: { tenant } });
  }

  async findOne(tenantId: string, id: string) {
    const tenant = await this.tenantRepository.findOneBy({ tenantId });
    if (!tenant) throw new Error('Tenant not found');
    return this.noteRepository.findOne({ where: { id, tenant } });
  }

  async update(tenantId: string, id: string, updateNoteDto: UpdateNoteDto) {
    const tenant = await this.tenantRepository.findOneBy({ tenantId });
    if (!tenant) throw new Error('Tenant not found');
    await this.noteRepository.update({ id, tenant }, updateNoteDto);
    return this.noteRepository.findOne({ where: { id, tenant } });
  }

  async remove(tenantId: string, id: string) {
    const tenant = await this.tenantRepository.findOneBy({ tenantId });
    if (!tenant) throw new Error('Tenant not found');
    return this.noteRepository.delete({ id, tenant });
  }
}
