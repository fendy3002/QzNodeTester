import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as lo from 'lodash';
import * as MobxReact from 'mobx-react';

import store from './store';

let App = (element: any) => {
    ReactDOM.render(
        <MobxReact.Provider {...store()}>
            <AppComponent />
        </MobxReact.Provider>,
        element
    );
};
export default App;