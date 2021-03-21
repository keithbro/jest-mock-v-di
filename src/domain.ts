export interface ICreatePersonData {
  name: string;
}

export interface IPerson {
  id: number;
  name: string;
}

export function createPerson(data: ICreatePersonData): IPerson {
  return { name: data.name, id: Math.ceil(Math.random() * 9999999) } as const;
}
