export abstract class ViewPage{
    private _url: string;
    private clickableElementsId: Array<string> = [];

    get url() {
        return this._url;
    }

    set url(value) {
        this._url = value;
    }

    getElementById(id: string): JQuery{
        return $("#"+id);
    }

    setClickListener(element: JQuery, listener: (...args:any[]) => any){
        let id = "#"+element.attr('id');
        this.clickableElementsId.push(id);
        $(document).on("click", id , listener);
    }

    abstract onLoad(data: any);
    abstract onReturn(data: any);

    onExit(){
        for(let id of this.clickableElementsId)
            $(document).off("click", id);
    }
}