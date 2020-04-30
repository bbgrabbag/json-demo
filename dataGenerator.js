const _pickNumberFromRange = range => (Math.random() * (range[1] - range[0])) + range[0];
const _idGenerator = (() => {
    let id = 0;
    return () => { return id++ }
})();
const _iterable = count => Array.from(Array(count));
const _generateDataFromTemplate = (template) => {
    return Object.keys(template).reduce((o, k) => ({
        ...o,
        [k]: template[k]()
    }), { id: _idGenerator() })
}

const generators = {
    number: (range = [1, 100], places = 0) => () => {
        return +(_pickNumberFromRange(range)).toFixed(places)
    },
    boolean: (value) => () => value === undefined ? Math.random() < .5 : value,
    string: (wordRange = [3, 9], letterRange = [4, 10]) => () => {
        const wordCount = Math.floor(_pickNumberFromRange(wordRange));
        return _iterable(wordCount).map(() => {
            const letterCount = Math.floor(_pickNumberFromRange(letterRange));
            return _iterable(letterCount).reduce(w => {
                const l = String.fromCharCode(Math.floor(_pickNumberFromRange([72, 98])))
                return `${w}${l}`
            }, '')
        }).join(' ');
    }
}

const dataGenerator = (config) => {
    if (config.count < 1) throw ('Count must be a positive number')
    if (!config.count || config.count === 1) {
        if (config.value !== undefined) {
            return config.value();
        } else {
            if (config.template === undefined) throw ('Configurations with no value must contain a template')
            return _generateDataFromTemplate(config.template)
        }
    } else {
        if (config.value !== undefined) {
            return _iterable(config.count).map(() => config.value());
        } else {
            if (config.template === undefined) throw ('Configurations with no value must contain a template')
            return _iterable(config.count).map(() => _generateDataFromTemplate(config.template))
        }
    }
}

module.exports = {
    dataGenerator,
    generators,
    pickIntegerFromRange: (...args) => Math.floor(_pickNumberFromRange(...args))
};
