// closest, contains class, classList methods

define([
	'js/model.js',
	'js/presenter.js',
	'js/view.js'
], function(Model, Presenter, View) {
	'use strict';
	
	var state = Model.loadState();

	var view = new View();
	var model = new Model(state);
	var app = new Presenter(view, model);
});