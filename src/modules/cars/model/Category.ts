import { v4 as uuidv4 } from 'uuid'


class Category {
  id?: string;
  name: string;
  description: string;
  created_at: Date;

  // faz com que crie um ID se o objeto ainda não existir
  constructor() {
    if(!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Category }