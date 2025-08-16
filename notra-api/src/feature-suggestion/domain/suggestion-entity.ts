export class Suggestion {
  constructor(
    private readonly id: string,
    private name: string,
    private surname: string,
    private email: string,
    private suggestion: string
  ) {}

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getSurname(): string {
    return this.surname;
  }

  public setSurname(surname: string): void {
    this.surname = surname;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public getSuggestion(): string {
    return this.suggestion;
  }

  public setSuggestion(suggestion: string): void {
    this.suggestion = suggestion;
  }
}
