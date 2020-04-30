const { dataGenerator, generators } = require('../dataGenerator')

module.exports = {
    data: dataGenerator({
        template: {
            name: generators.string([1, 3]),
            type: generators.string([1, 2]),
            notes: () => dataGenerator({ count: 3, value: generators.string() })
        }
    })
}