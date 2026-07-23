export type Country = 'India' | 'United States' | 'Canada' | 'Australia' | 'Israel' | 'New Zealand' | 'Singapore';

export class UserPayload {
  public username: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public password: string;
  public address1: string;
  public country: Country;
  public state: string;
  public city: string;
  public zipcode: string;
  public phone: string;

  constructor(username: string, email: string, password: string = 'test123') {
    this.username = username;
    this.email = email;
    this.password = password;
    
    this.firstName = 'test';
    this.lastName = 'test';
    this.address1 = 'test';
    this.country = 'Singapore';
    this.state = 'test';
    this.city = 'test';
    this.zipcode = '1234';
    this.phone = '1234567890';
  }

  static getDefaultUser(): UserPayload {
    return new UserPayload('testuser2288821111', 'testuser2288821111@email.com', 'test123')
  }
}