import { SkillModel } from './skill.model';

export class Skill implements SkillModel {
  category: string;
  compulsory: boolean;
  description: string;
  id: number;
  name: string;

  constructor(category?: string) {
    this.category = category;
  }
}
