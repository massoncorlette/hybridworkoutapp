https://developers.strava.com/docs/authentication/ (developer manual for authentication for strava)

https://developers.strava.com/docs/reference/#api-Athletes-getLoggedInAthlete

https://developers.strava.com/docs/reference/



Graphical representations for zone training,pacing,weight lifting vs running, ect. 


Feedback logic from Notifactions
Mobile friendly

## Overview
This template is set up with Webpack, Babel, and essential plugins to start a modern JavaScript project.

## Future Improvements
- Adding React setup for building dynamic user interfaces.
- Incorporating Node.js/Express backend to make it a full-stack starter.

## HOW TO USE THIS TEMPLATE
1. Clone the repo.
2. Run `npm install`.
3. Start the dev server with `npm start`.


## Available Scripts
- **`npm start`**: Start the development server.
- **`npm run build`**: Create a production-ready build.
- **`npm run lint`**: Run ESLint to analyze code quality.

------------------------------------------------------------------------

Webpack is used in this project to bundle and optimize source code from the `src` folder, making it ready for the browser. Here's how it works:

1. **Entry Point**: Webpack starts with `src/index.js` and looks for dependencies (JavaScript modules, CSS, images, etc.).
2. **Module Bundling**: Webpack uses loaders like `babel-loader` for JavaScript and `css-loader` for CSS, bundling all files together.
3. **Output**: The bundled files are saved in the `dist` folder, with a single JavaScript file (`bundle.js`) and an HTML file generated by `html-webpack-plugin`.
4. **Development Server**: During development, `webpack-dev-server` serves the content from `dist` and automatically reloads the browser when changes are saved.

-----------------------------------------------------------------------

The `package.json` file is the core configuration for the project. It includes:

- **Project Metadata**: Name, version, and description of the app.
- **Scripts**: Command shortcuts like `npm start` to run the development server.
- **Dependencies**: Lists all the required packages for the app and the dev environment.

Running `npm install` will install all the dependencies listed here.

Together, package.json and package-lock.json are essential for managing your project's dependencies:

package.json:

- Describes the project.
- Lists the dependencies and development dependencies.
- Contains scripts for common tasks like building and serving the project.

package-lock.json:

- Locks the exact versions of dependencies and sub-dependencies.
- Ensures consistency and reproducibility across different environments.



## Optional Adjustments

Before running the build, you may optionally want to adjust some configuration settings to better fit your project:

1. **Update the Entry Point**:
   - By default, Webpack uses `src/index.js` as the entry point. If you need to change the starting point of your application, you can update the `entry` property in `webpack.config.js` accordingly.

2. **Modify `.gitignore`**:
   - Make sure that unnecessary files and folders are not committed to your repository by updating the `.gitignore` file.
   - By default, the following are ignored:
     ```
     node_modules/
     dist/
     ```

3. **Adjust `webpack.config.js`**:
   - If you need to handle additional asset types or customize how certain files are bundled, you can modify the Webpack configuration.
   - For example, you can add new loaders or change the plugins.

Once any necessary adjustments are made, simply run:

```bash
npm run build
