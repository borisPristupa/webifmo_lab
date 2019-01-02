import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    template:
        '<div ><header> </header></div>' +
        // '<div><data></data></div>' +
        '<div ><authorization> </authorization></div>' +
        '<div ><footer> </footer></div>',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    name= '';
}