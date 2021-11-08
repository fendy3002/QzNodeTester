import { observable, toJS, makeObservable } from 'mobx';

export default class store {
    constructor() {
        [
        ].forEach((handler) => {
            this[handler] = this[handler].bind(this);
        });
        makeObservable(this);
    }
    
};