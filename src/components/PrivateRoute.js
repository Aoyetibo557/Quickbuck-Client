import React from 'react';
import { Route} from 'react-router-dom';
import { Redirect } from 'react-dom'
import Token from '../Token';

function PrivateRoute( { component:Component, ...rest}) {
    const { token } = Token();

    return (
        <Route
            {...rest}
            render={props => {
                return token ? <Component {...props} /> : <Redirect to="/" />
            }}
        >
        </Route>
    )
}

export default PrivateRoute
