import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { ApiService } from '../../Services/api.service';
import { UserStoreService } from '../../Services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  public users: any = [];
  public Name: string = '';
  constructor(
    private auth: AuthService,
    private api: ApiService,
    private userStore: UserStoreService
  ) {}
  ngOnInit(): void {
    this.api.getUsers().subscribe((res) => {
      this.users = res;
    });
    this.userStore.getUserNameFromStore().subscribe((val) => {
      let UserName = this.auth.getUserNameFromToken();
      this.Name = val || UserName;
    });
  }

  LogOut() {
    this.auth.signOut();
  }
}
