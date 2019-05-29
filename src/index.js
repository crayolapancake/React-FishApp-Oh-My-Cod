import React from 'react';
import { render } from 'react-dom';
import Router from './components/Router';
import './css/style.css'

// render 'main' (index.html) to DOM
render (<Router />, document.querySelector('#main'))
// router manages wether to go to App or StorePicker
