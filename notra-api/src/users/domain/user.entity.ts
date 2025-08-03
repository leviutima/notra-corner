export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}


export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public surname: string,
    public email: string,
    public birthDate: Date,
    public password: string,
    public role: UserRole
  ) {}

  // updateFullName(newName: string, newSurname: string) {
  //   ((this.name = newName), (this.surname = newSurname));
  // }

  // updateEmail(newEmail: string) {
  //   this.email = newEmail;
  // }
}
