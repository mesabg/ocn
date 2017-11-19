/**
 * Global imports
 */
import { EventEmitter } from '@angular/core';
declare const io:any;

/**
 * Socket class definition
 */
export class SocketIO{
    /**
     * Variables
     */
    private $io:any;
    public $event:{[key: string]:EventEmitter<any>};

    /**
     * SocketIO
     * @param baseConnection => URL to make connection
     */
    constructor(private baseConnection:string, private options:{[key:string]:any} = null){
        this.$io = io.connect(this.baseConnection, this.options);
    };

    /**
     * Methods
     */
    public registerEvent(name:string):EventEmitter<any>{
        this.$event[name] = new EventEmitter<any>();
        let self:SocketIO = this;
        this.$io.on(name, function(data){
            self.$event[name].emit(data);
        });
        return this.$event[name];
    }
};
