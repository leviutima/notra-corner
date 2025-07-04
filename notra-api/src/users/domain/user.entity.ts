export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public surname: string,
    public email: string,
    public birthDate: Date,
    public password: string,
  ) {}

  // updateFullName(newName: string, newSurname: string) {
  //   ((this.name = newName), (this.surname = newSurname));
  // }

  // updateEmail(newEmail: string) {
  //   this.email = newEmail;
  // }
}
