import * as React from 'react';

import * as mobxReact from 'mobx-react';
let { observer, inject } = mobxReact;

class Header extends React.Component {
    render() {
        return <></>;
    }
};

export default inject("authStore")(
    observer(Header)
);