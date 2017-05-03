import React, { PropTypes } from "react";

import Grid from "react-bootstrap/lib/Grid";

const App = ( { children } ) => {
    return (
        <div>
            <Grid id="appContainer">
                {children}
            </Grid>
        </div>
    );
};

App.propTypes = {
    "children": PropTypes.element.isRequired
};

export default App;
