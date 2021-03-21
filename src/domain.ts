export interface CreatePersonData {
  name: string;
}

export interface Person {
  id: number;
  name: string;
}

export function createPerson(data: CreatePersonData): Person {
  return { name: data.name, id: Math.ceil(Math.random() * 9999999) } as const;
}
