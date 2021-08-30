import { Film } from '../film/film.model';

export class User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  phoneNumber: string;
  password?: string;
  confirm?: string;
  admin: boolean;
  films: Film[];

  constructor(values: any = {}) {
    Object.assign(this, values);

    if (values.firtName) {
      this.firstName = values.name.first;
    }
    if (values.lastName) {
      this.lastName = values.lastName;
    }
    if (values._id) {
      this._id = values._id;
    }
  }
}
