import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ColumnFilterItemModel } from './shared/columnFilterItemModel';

@Component({
    selector: 'columnFilterItem',
    templateUrl: '/app/+dashboard/columnFilterItem.component.html',
    styleUrls: ['/app/+dashboard/columnFilterItem.component.css'],
})
export class ColumnFilterItem implements OnInit {
    @Input("model") item: ColumnFilterItemModel;
    @Output() onChanged: EventEmitter<ColumnFilterItemModel> ;
    constructor() { 
        this.onChanged = new EventEmitter<ColumnFilterItemModel>();
    }
    
    ngOnInit() { }
    
    
    onElementChange(event:any){
        this.onChanged.emit(event.target);
        console.log(this.item, event.target.checked);
        // this.item.checked = true;
        
    }
}