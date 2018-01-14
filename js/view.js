define([
	'js/helpers.js'
], function(helpers) {
	'use strict';
	
	function View() {
		var createElement = helpers.createElement,
			todoForm = document.getElementById('todo-form'),
			todoList = document.getElementById('todo-list'),
			addInput = document.getElementById('add-input'),
			addButton = document.getElementById('add-button');
	
		todoForm.addEventListener('submit', submitForm);
	
		function submitForm(event) {
			event.preventDefault();
	
			var value = addInput.value;
			if (!value) return alert('Введите значение в поле формы');
	
			handleAdd(value);
		}
	
		function handleAdd(value) {
			var event = new CustomEvent('todo-add', {
				detail: {
					title: value
				}
			});
	
			todoList.dispatchEvent(event);
		}
	
		function handleDelete(event) {
			event.preventDefault();
			var todoId = this.closest('.todo-item').getAttribute('data-id');
	
			var event = new CustomEvent('todo-delete', {
				detail: {
					id: todoId
				}
			});
			todoForm.dispatchEvent(event);
		}
	
		function handleEdit(event) {
			event.preventDefault();
			var parent = this.closest('.todo-item'),
				todoId = parent.getAttribute('data-id'),
				input = parent.querySelector('.textfield'),
				checkbox = parent.querySelector('.checkbox'),
				title = parent.querySelector('.title-text');
	
			if (!parent.classList.contains('editing')) {
				parent.classList.add('editing');
				this.textContent = 'Сохранить';
				input.value = title.textContent;
	
			} else {
				this.textContent = 'Изменить';
				title.textContent = input.value;
				parent.classList.remove('editing');
	
				var event = new CustomEvent('todo-edit', {
					detail: {
						id: todoId,
						data: {
							title: title.textContent
						}
					}
				});
				todoList.dispatchEvent(event);
			}
		}
	
		function handleChange(event) {
			var parent = this.closest('.todo-item'),
				todoId = parent.getAttribute('data-id');
	
			parent.classList.toggle('completed');
	
			var event = new CustomEvent('todo-edit', {
				detail: {
					id: todoId,
					data: {
						completed: this.checked === true ? true : false
					}
				}
			});
			todoList.dispatchEvent(event);
		}
	
		function bindEvents(todoItem) {
			var checkbox = todoItem.querySelector('.checkbox'),
				editButton = todoItem.querySelector('.edit'),
				deleteButton = todoItem.querySelector('.delete');
	
			deleteButton.addEventListener('click', handleDelete);
			editButton.addEventListener('click', handleEdit);
			checkbox.addEventListener('change', handleChange);
	
			return todoItem;
		}
	
		this.createTodo = function (options) {

			var title = options.title,
				id = options.id || Date.now(),
				completed = options.completed ? true : false;
	
			var checkbox = createElement('input', { 'type': 'checkbox', 'class': 'checkbox' }),
				titleText = createElement('span', { 'class': 'title-text' }, title),
				label = createElement('label', { 'class': 'title' }, checkbox, titleText),
				textfield = createElement('input', { 'class': 'textfield', 'type': 'text' }),
				editButton = createElement('button', { 'class': 'edit' }, 'Измениеть'),
				deleteButton = createElement('button', { 'class': 'delete' }, 'Удалить'),
				todoItem = createElement('li', { 'class': 'todo-item', 'data-id': id }, label, textfield, editButton, deleteButton);
	
			if (completed) {
				checkbox.checked = completed;
				todoItem.classList.add('completed');
			}
	
			return bindEvents(todoItem);
		};
	
		this.addTodo = function (todo) {
			todoList.appendChild(todo);
			addInput.value = '';
		};
	
		this.removeTodo = function (id) {
			var todoItems = todoList.childNodes;
			for (var i = 0; i < todoItems.length; i++) {
				if (todoItems[i].getAttribute('data-id') != id) continue;
				todoList.removeChild(todoItems[i]);
			}
		};
	}

	return View;
});
