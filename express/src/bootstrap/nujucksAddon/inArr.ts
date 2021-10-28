import * as coreType from '../../types';
export default (config: coreType.config.app, nunjucksEnv) => {
    nunjucksEnv.addGlobal('_inArr', function (arr, value) {
        return arr ? 
            arr.indexOf(value) >= 0 : 
            false;
    });
    return;
}