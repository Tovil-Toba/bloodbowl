import { SkillModel } from './skill.model';

export class Skill implements SkillModel {
  id: number;
  category: string;
  name: string;
  description: string;
  compulsory: boolean;

  constructor(skill?: Record<string, any>) {
    this.id = skill?.id;
    this.category = skill?.category ?? '';
    this.name = skill?.name ?? '';
    this.description = skill?.description ?? '';
    this.compulsory = !!skill?.compulsory;
  }
}
