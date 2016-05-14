export class ColumnFilterItemModel{
    public checked:boolean;
    public valid:boolean;
    public disabled:boolean;
    public failureText:string
    public name:string;
    constructor(name:string, checked?:boolean, disabled?:boolean){
        this.name = name;
        this.checked = checked || false;
        this.disabled = disabled || false;
        this.valid = true;
        this.failureText = "";
    };
}
