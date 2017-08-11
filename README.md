# revolt-frontend
Frontend for radiorevolt.no

## Setup

To install all dependencies run
```
npm install
```

Then serve the webapp by running
```
npm start
```
## Branch naming
All branches must be named "\<type>/\<JIRA id>-\<description>"
* See below for different \<type>s available
* \<JIRA id> Corresponding issue ID on the JIRA project page
* \<description> Short description of the issue, use dash (-) as spaces

Example: "feat/023-refactor-store-page"

### Branch types
* **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
* **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
* **docs**: Documentation only changes
* **feat**: A new feature
* **fix**: A bug fix
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **test**: Adding missing tests or correcting existing tests


To get content for the webpage (not just the skeleton) follow the readme at <a href="https://github.com/Studentmediene/revolt-backend">https://github.com/Studentmediene/revolt-backend</a>.
You might also need to allow cross-origin resource sharing. If you have Chrome, use this plugin: <a href=""
https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?utm_source=chrome-app-launcher-info-dialog>Allow-Control-Allow-Origin: *</a>
