define([
	'js/model.js'
], function(Model) {
	'use strict';
	
	function Presenter(view, model) {
		this.model = model;
		this.view = view;
	
		var todoForm = document.getElementById('todo-form'),
			todoList = document.getElementById('todo-list');
	
		todoForm.addEventListener('todo-delete', handleDelete.bind(this));
		todoList.addEventListener('todo-add', handleAdd.bind(this));
		todoList.addEventListener('todo-edit', handleEdit.bind(this));
		

		var todoUpdate = function() {
			Model.saveState(this.model.state);
		}.bind(this);
	
		function handleEdit(event) {
			this.model.editItem(event.detail);
			todoUpdate();
		}
	
		function handleDelete(event) {
			this.view.removeTodo(event.detail.id);
			this.model.removeItem(event.detail.id);
			todoUpdate();
		}
	
		function handleAdd(event) {
			var todo = this.model.createItem(event.detail.title),
				todoDOM = this.view.createTodo(todo);
	
			this.model.addItem(todo);
			this.view.addTodo(todoDOM);
			todoUpdate();
		}
	
		this.constructor = function () {
			this.model.state.forEach(function(element) {
				var todoDOM = this.view.createTodo(element);
				this.view.addTodo(todoDOM);
			}, this);
		}
	
		this.constructor();
	}

	return Presenter;
});
