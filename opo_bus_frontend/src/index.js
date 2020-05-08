import React, {Suspense} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import * as serviceWorker from 'serviceWorker';

// redux for authentication
import {createStore, applyMiddleware} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "rootReducer";
import {userLoggedIn} from "actions/auth.js";

import allRoutes from "allRoutes";

import "assets/css/styles.css";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

var token = localStorage.getItem("esp51JWT");

if (token != null) {
  try {
      const user = {
          username: token
      }
        store.dispatch(userLoggedIn(user));
  } catch(err) {
    console.log(err)
  }
}

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Suspense
                fallback={
                    <div className="full-page-loader">
                        <img
                            width="200"
                            src={require("assets/img/icon.png")}
                            alt="OPOBus"
                        />
                    </div>
                }
            >
                <Switch>
                    {allRoutes.map((prop, key) => {
                        if (prop.redirect) {
                            return <Redirect from={prop.path} to={prop.to} key={key} />;
                        }
                        return (
                            <Route
                                path={prop.path}
                                key={key}
                                exact
                                render={(props) => (
                                    <prop.layout {...props}>
                                        <prop.component {...props} />
                                    </prop.layout>
                                )}
                            />
                        );
                    })}
                </Switch>
            </Suspense>
        </Provider>
    </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.register();