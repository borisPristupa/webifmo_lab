import {Component} from '@angular/core';

@Component({
    selector: 'base',
    template:
    '<div ><header> </header></div>' +
    '<div><data></data></div>' +
    '<div> <graph> </graph> </div>' +
    '<div ><footer> </footer></div>',
    styleUrls:  ['./app.component.css']
})
export class AppBaseComponent {
    name= '';
}