export class Actor {
  _id: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  description: string;
  country: Country;
  image: File;
}

export enum Country {
  Netherlands = 'Netherlands',
  America = 'America',
  GreatBritan = 'Great-Britan',
  India = 'India',
  Germany = 'Germany',
  Belgium = 'Belgium',
  France = 'France',
  Polen = 'Polen',
}
