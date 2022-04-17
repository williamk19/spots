module.exports = {
    "env": {
        "node": true,
        "browser": true,
        "es2021": true,
        "jest": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true,
            "tsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        'no-undef': 'off',
    }
}
