import * as coreType from '../../types';
export default (config: coreType.config.app, nunjucksEnv) => {
    nunjucksEnv.addFilter('propOnly', function (data, keys) {
        let newProp: any = {};
        for(let key of keys){
            newProp[key] = data[key];
        }
        return newProp;
    });
    return;
}
