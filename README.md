# generator-api

## Getting started

- Make sure you have [yeoman](https://github.com/yeoman/yo) installed on your machine:
    `npm install -g yo`
- Install the generator **globally**: `npm install -g git+https://github.com/duibu05/generator-api.git#<branch || tag>`
- Run: `yo api`, or `yo` and choose `Api` option

## Running the generated project

Make sure you have node version `>= 8` because this project uses native supported ES6 features.

### Development

- Run: `mongod` to start the local mongodb in a separated terminal instance (If you don't have mongodb installed locally, visit It's [webpage](https://docs.mongodb.com/manual/installation/) to learn how to install it).
- Run: `npm run dev` to run the app (By default the app will run at `localhost:8080`, you can change this in the config file).

**Did you choose Docker (:whale:) support?**

You only need [Docker](https://docs.docker.com/engine/installation/) and [docker-compose](https://docs.docker.com/compose/install/) installed, forget about having node, mongodb or npm.

- Run: `docker-compose up` to run the app. _You might need `sudo` for this one_.

_NOTE_: The Dockerfile uses `node:latest` as its starting point, if you wish to use another version of Node check out the available ones [here](https://hub.docker.com/_/node/).

### Production

You'll likely be consuming mongodb as a service, so make sure to set the env var pointing at it. Then run `npm start`.

**Using Docker**

Build the Docker container and run it:

```bash
sudo docker build -t <image-name> .
sudo docker run \
  -p <host-port>:8080 \
  -d <image-name> \
  -e MONGO_DB_URI=mongodb://<username>:<password>@<host>:<port> \
  npm run start
```

## Architecture
Assuming we use `user` and `pet` models the generated project will look like this:

```
├───index.js
├───routes.js
├───package.json
├───config.js
└───lib/
|   ├───controller.js
|   ├───facade.js
└───modules/
    ├───user/
    │   └───controller.js
    |   └───facade.js
    |   └───router.js
    |   └───schema.js
    └───pet/
        └───controller.js
        └───facade.js
        └───router.js
        └───schema.js
```

#### Controller:
HTTP layer, in this instance you can manage express request, response and next. In `lib/controller` are the basic RESTful methods `find`, `findOne`, `findById`, `create`, `update` and `remove`. Because this class is extending from there, you got that solved. You can overwrite extended methods or create custom ones here.

#### Facade:
This layer works as a simplified interface of mongoose and as business model layer, in this instance you can manage your business logic.
Here are some use case examples:
* Validate collection `x` before creating collection `y`
* Create collection `x` before creating collection `y`

In `lib/facade` you have the basic support for RESTful methods. Because this class is extending from there, you got that solved. You can overwrite extended methods or create custom ones here. Also you can support more mongoose functionality like `skip`, `sort` etc.

## Model subgenerator

Once you have the generated project, if you want to add a new model you can simply run `yo api:model`. This will generate a new folder under `model`, in order to make it work, you just need to import the route into the `routes.js`.

Example:

* Run `yo api:model`, write foo (What ever model name you want)
* Go to `routes.js` and import the new generated model route `const foo = require('./modules/foo/router')`
* Use the imported route `router.use('/foo', foo)`

## Contributing
Contributors are welcome, please fork and send pull requests! If you find a bug or have any ideas on how to improve this project please submit an issue.


## License
[MIT License](https://github.com/ndelvalle/generator-api/blob/master/LICENSE)

## Style guide
[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
