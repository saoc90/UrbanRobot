import { FORM_DIRECTIVES, FormBuilder, ControlGroup } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { ColumnFilterItem } from "./columnFilterItem.component";
import { ColumnFilterItemModel } from './shared/ColumnFilterItemModel';
@Component({
    selector: 'sideBarFilter',
    templateUrl: 'app/+dashboard/sideBarFilter.component.html',
    styleUrls: ['app/+dashboard/sideBarFilter.component.html'],
    directives: [FORM_DIRECTIVES, ColumnFilterItem]
})
export class SideBarFilterComponent implements OnInit {
    @Input() maxColumnOnGrid: number;

    @Input() model: any;

    _columnNames: Array<String>;

    columnFilterItemModels: Array<ColumnFilterItemModel> = [];

    @Output() columnState: EventEmitter<Object> = new EventEmitter<Object>();

    lastState: any;
    count: number;

    constructor() {
    }

    ngOnInit() {
        this._columnNames = Object.getOwnPropertyNames(this.model[0]);
        var count = 1;
        this._columnNames.forEach((name: string) => {
            let checked = (count <= this.maxColumnOnGrid);
            let disabled = (count > this.maxColumnOnGrid);
            this.columnFilterItemModels.push(
                new ColumnFilterItemModel(name, checked, disabled));
            count++;
        });

    }

    onFilterChange(event: ColumnFilterItemModel) {
        var count = 0;
        var currentChangedItem: any = {};
        var checked = this.columnFilterItemModels.forEach((cur) => {
            if (cur.name === event.name) {
                currentChangedItem = cur;
                if(!event.checked){
                    cur.checked = false;
                }else{cur.checked = true;}
            }

            if (cur.checked) {
                count++;
            }
        });
        if (count <= this.maxColumnOnGrid) {
            var disable = count >= this.maxColumnOnGrid;
            this.columnFilterItemModels.forEach(cur => 
            cur.disabled = disable && !cur.checked
            );
            
            this.columnState.emit(this.columnFilterItemModels);
        } else {
            this.columnFilterItemModels.forEach(cur => 
            cur.disabled = false
            );
            currentChangedItem.checked = false;
            event.checked = false
            this.columnState.emit(this.columnFilterItemModels);
        }
    }

}
