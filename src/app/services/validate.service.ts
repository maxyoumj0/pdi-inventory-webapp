import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user) {
    if (user.name.length === 0 || user.username.length === 0 || user.password.length === 0) {
      return false;
    } else {
      return true;
    }
  }
}
