if (Array.prototype.forEach === undefined) {
	Array.prototype.forEach = function(fn, context) {
		context = context ? context : this;

		var i = 0,
				max = this.length;

		for (; i < max; i++) {
			fn.call(context, this[i], i, this);
		}

	};
}