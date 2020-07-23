import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { lazyReducerEnhancer } from 'pwa-helpers/lazy-reducer-enhancer.js';
import thunk from 'redux-thunk';

// reducers
import { App } from 'Reducers/App';
import { Router } from 'Reducers/Router';
import { Notification } from 'Reducers/Notification';
import { View } from 'Reducers/View';

import { User } from 'Reducers/User';
import { Team } from 'Reducers/Team';
import { Invite } from 'Reducers/Invite';
import { Google } from 'Reducers/Google';
import { Facebook } from 'Reducers/Facebook';

import { Media } from 'Reducers/Media';
import { Course } from 'Reducers/Course';
import { Module } from 'Reducers/Module';
import { Lesson } from 'Reducers/Lesson';

import { Form } from 'Reducers/Form';
import { LoginForm } from 'Reducers/LoginForm';
import { SignupForm } from 'Reducers/SignupForm';
import { ForgotForm } from 'Reducers/ForgotForm';
import { ResetForm } from 'Reducers/ResetForm';
import { UI } from 'Reducers/UI';
import { Assessment } from 'Reducers/Assessment';


import { LearnMaterial } from 'Reducers/LearnMaterial';

// subscribers
import { UserSubscriber } from 'Subscribers/User';

const devCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * Function gathering all the local storage states
 * @return {Object} object with state from local storage
 */
const combinedSubscribers = () => {

    return {

        User: UserSubscriber.getState(),

    };

};

export const store = createStore(
    state => state,
    combinedSubscribers(),
    devCompose(
        lazyReducerEnhancer(combineReducers),
        applyMiddleware(thunk),
    )
);

store.addReducers({
    App,
    Router,
    Notification,
    View,

    User,
    Team,
    Invite,
    Google,
    Facebook,

    LearnMaterial,
    Media,
    Course,
    Module,
    Lesson,

    Form,
    LoginForm,
    SignupForm,
    ForgotForm,
    ResetForm,

    UI,
    Assessment

});

/**
 * Add subscribers to store to handle local storage states
 */
store.subscribe(() => {

    const state = store.getState();

    UserSubscriber.writeState(state);

});
