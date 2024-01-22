import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private UserName$ = new BehaviorSubject<string>('');
  private role$ = new BehaviorSubject<string>('');

  constructor() {}

  public getRoleFromStore() {
    return this.role$.asObservable();
  }

  public setRoleFromStore(role: string) {
    return this.role$.next(role);
  }

  public getUserNameFromStore() {
    return this.UserName$.asObservable();
  }

  public setUserNameFromStore(UserName: string) {
    return this.UserName$.next(UserName);
  }
}
