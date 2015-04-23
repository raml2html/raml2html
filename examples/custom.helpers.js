module.exports = {
    ifValue:
        function (value, options) {
            if (options.hash.contains && options.hash.hasOwnProperty('contains')) {
                if (value.indexOf(options.hash.contains) > -1) {
                    return options.fn(this);
                }
            } else {
                if (eval(value)) {
                    return options.fn(this);
                }
            }
            return options.inverse(this);
        }
}
