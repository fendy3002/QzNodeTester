import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as lo from 'lodash';
import * as MobxReact from 'mobx-react';
import { BrowserRouter } from "react-router-dom";
import Master from './template/master';

import store from './store';

let App = (element: any) => {
    ReactDOM.render(
        <MobxReact.Provider {...store()}>
            <BrowserRouter>
                <Master />
            </BrowserRouter>
        </MobxReact.Provider>,
        element
    );
};
export default App;