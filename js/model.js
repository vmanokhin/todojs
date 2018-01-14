define([], function() {
	'use strict';
	
	function Model(state) {
		this.state = state || [];
	
		var getTodoPositionFromState = (function (id) {
			for (var i = 0; i < this.state.length; i++) {
				if (this.state[i].id != id) continue;
				return i;
			}
		}).bind(this);
	
		this.getItem = function (id) {
			return this.state[getTodoPositionFromState(id)];
		};
	
		this.createItem = function (title) {
			var todoItem = {
				title: title,
				id: Date.now(),
				completed: false
			};
	
			return todoItem;
		};
	
		this.addItem = function (todo) {
			this.state.push(todo);
		};
	
		this.removeItem = function (id) {
			this.state.splice(getTodoPositionFromState(id), 1);
		};
	
		this.editItem = function (todo) {
			var itemIndex = getTodoPositionFromState(todo.id);
	
			for (var prop in todo.data) {
				if (!todo.data.hasOwnProperty(prop)) continue;
	
				this.state[itemIndex][prop] = todo.data[prop];
			}
		};
	}
	
	
	Model.loadState = function () {
		var state = JSON.parse(localStorage.getItem('todo-state'));
		return state !== null ? state : [];
	};
	
	Model.saveState = function (state) {
		var string = JSON.stringify(state);
		localStorage.setItem('todo-state', string);
	};

	return Model;
});
