define([], function() {
	'use strict';
	
	function createElement(tag, props) {
		var item = document.createElement(tag);
	
		for (var prop in props) {
			if (!props.hasOwnProperty(prop)) continue;
	
			item.setAttribute(prop, props[prop]);
		}
	
		if (arguments.length > 2) {
			for (var i = 2; i < arguments.length; i++) {
				if (arguments[i].nodeType === 3 || arguments[i].nodeType === 1 || typeof arguments[i] === 'string') {
	
					if (typeof arguments[i] === 'string') {
						item.appendChild(document.createTextNode(arguments[i]));
						continue;
					}
	
					if (arguments[i].nodeType === 3 || arguments[i].nodeType === 1) {
						item.appendChild(arguments[i]);
					}
				}
			}
		}
	
		return item;
	}

	return {
		createElement: createElement
	}
});