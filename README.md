# Sasquatch Coding Ghost Theme

This theme adapted from [Troy Hunt](https://github.com/troyhunt/troyhunt.com-ghost-theme) and cloned from [Shayne Boyer's](https://github.com/spboyer/th-ghost-theme) theme.


## Configure Ghost for Local Development
- [Install (local/dev)](https://docs.ghost.org/v1/docs/install-local)
-  ```npm i -g ghost-cli@latest``` to install the CLI 
- Create a clean ghost directory
- ```mkdir ghost && cd $_```
- Run ```ghost install local```

## Building and Deploying Locally
- Make any changes needed to Handlebars files or other content
- Run ``` gulp build-dist``` task to build the zip file for the theme
- To update the version of the theme, update the package.json version
- Run ```ghost start``` from the ```ghost``` directory and browse to the url specified to test the theme changes (upload theme zip file)
