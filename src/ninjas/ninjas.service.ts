import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Injectable()
export class NinjasService {
  private ninjas = [
    { id: 1, name: 'Ninja 1', weapon: 'stars' },
    { id: 2, name: 'Ninja 2', weapon: 'sword' },
  ];

  getNinjas(weapon?: 'stars' | 'sword') {
    if (weapon) {
      return this.ninjas.filter((ninja) => ninja.weapon === weapon);
    }
    return this.ninjas;
  }

  getOneNinja(id: number) {
    const ninja = this.ninjas.find((ninja) => ninja.id === id);

    if (!ninja) {
      throw new Error('Ninja not found');
    }

    return ninja;
  }

  createNinja(createNinjaDto: CreateNinjaDto) {
    const newNinja = {
      ...createNinjaDto,
      id: this.ninjas.length + 1,
    };

    this.ninjas.push(newNinja);
    return newNinja;
  }

  updateNinja(id: number, updateNinjaDto: UpdateNinjaDto) {
    this.ninjas = this.ninjas.map((ninja) => {
      if (ninja.id === id) {
        return {
          ...ninja,
          ...updateNinjaDto,
        };
      }
      return ninja;
    });

    return this.getOneNinja(id);
  }

  removeNinja(id: number) {
    const toBeRemoved = this.getOneNinja(id);
    this.ninjas = this.ninjas.filter((ninja) => ninja.id !== id);
    return toBeRemoved;
  }
}
