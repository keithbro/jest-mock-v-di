export interface ICreatePersonData {
  name: string;
  favouriteColour: string;
}

export interface IPerson {
  id: number;
  name: string;
}

export function createPerson(data: ICreatePersonData): IPerson {
  return { name: data.name, id: Math.ceil(Math.random() * 9999999) } as const;
}

export class InvalidColourError extends Error {
  constructor() {
    super();
    this.message = "Invalid Colour";
  }
}
