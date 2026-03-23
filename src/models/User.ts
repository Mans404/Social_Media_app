export class User {
  id: number;
  name: string;
  email: string;

  constructor(data: { id: number; name: string; email: string }) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
  }
}
