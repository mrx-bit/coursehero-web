import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {HttpClient} from '@angular/common/http';

class AddNewUserComponent {
}

@Injectable({
    providedIn: 'root'
})
export class CoreService {

    collapseSidebar = false;
    collapseSidebarStatus: boolean;
    sidenavMode = 'side';
    sidenavOpen = true;
    horizontalSideNavMode = 'over';
    horizontalSideNavOpen = false;
    projectDetailsContent: any;
    editProductData: any;

    constructor(private http: HttpClient) {
    }
}
