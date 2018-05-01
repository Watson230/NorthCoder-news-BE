module.exports = {

    "env": {
        "es6": true,
        "node": true,
        "mocha": true
    },
    "extends": ["eslint:recommended", 'plugin:react/recommended','plugin:mocha/recommended'],
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