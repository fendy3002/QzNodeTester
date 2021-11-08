import * as React from 'react';
import { Routes, Route, Link } from "react-router-dom";

import * as mobxReact from 'mobx-react';
let { observer, inject } = mobxReact;

class AppRoutes extends React.Component {
    render() {
        return <Routes>
            <Route path="/" element={<></>} />
        </Routes>
    }
};

export default inject("authStore")(
    observer(AppRoutes)
);