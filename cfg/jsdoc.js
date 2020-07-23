module.exports = {
    'tags': {
        'allowUnknownTags': true,
    },
    'source': {
        'include': [],
        'exclude': [
            '.git',
            'node_modules',
        ],
        'includePattern': '.+\\.js(x|doc)?$',
    },
    'plugins': ['plugins/markdown'],
    'opts': {
        'encoding': 'utf8',
        'template': 'templates/default',
        'destination': 'doc',
        'recurse': true,
        'verbose': true,
    },
    'markdown': {
        'parser': 'gfm',
        'hardwrap': true,
    },
    'templates': {
        'cleverLinks': false,
        'monospaceLinks': false,
        'default': {
            'outputSourceFiles': true,
            'includeDate': true,
        },
    },
};
