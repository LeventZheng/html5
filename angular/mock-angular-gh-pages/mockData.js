Mock.mock('http://g.cn', {
    'name': '@name()',
    'age|1-100': 100,
    'color': '@color',
    'female|1-2':true,
    'family|1':{
        father:'a',
        mother:'b',
        brother:'c',
        sister:'d'
    }
});