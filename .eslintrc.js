module.exports = {

    "env": {
        "es6": true,
        "node": true,
        "mocha": true,
        "mongo": true
    },
    "extends": ["eslint:recommended", 'plugin:react/recommended'],
    "parserOptions": {
        "sourceType": "module"
    },
  
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        
        
        "semi": [
            "error",
            "always"
        ]
    },

};