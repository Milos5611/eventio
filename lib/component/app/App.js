import React, {PropTypes} from "react";
import HeaderContainer from "./HeaderContainer";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = ({children}) => {
	return (
		<MuiThemeProvider>
			<div id="appContainer">
				<HeaderContainer />
				{children}
			</div>
		</MuiThemeProvider>
	);
};

App.propTypes = {
	"children": PropTypes.element.isRequired
};

export default App;
