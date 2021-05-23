# basic-messaging-service
## Developer Guide
### Project Structure
* [infrastructure/](./infrastructure) - Contains the basic cloudformation definition of the service.
* [jest/](./jest) - Contains the test configuration for jest
* [scripts/](./scripts) - Contains any service scripts used by NPM
* [src/](./src) - Contains the project source code
* [test/](./test) - Contains the source code for integration and unit tests
### Prereqs
This project assumes you have the following installed and functioning on your machine. Older versions will likely work, but, for troubleshooting purposes, successfully tested versions are listed in parenthesis.

* [docker](https://docs.docker.com/desktop/) (20.10.6)
* [aws-cli](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) (2.2.5)
* [sam-cli](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html) (1.23.0)
* [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/) (6.14.13)
* [node14](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/) (14.17.0)

Once you have them setup you may proceed wtih the local setup instructions.

### Local Setup
Once you've checked out the repository to a local directory you will need to insall the node dependencies:

```
npm install
```

Once the dependencies are installed, you can use the following command to start the service:

```
npm start
```

This command will do the following in order:
* start the dynamo docker container
* create the docker network used to connect the API to the container
* build the source with webpack
* start the web server using sam-cli.

> Depending on your platform you may encounter an issue mounting the directory for dynamo. 
By default the project will attempt to mount to `./docker/dynamodb` some platforms will automatically create this on the attempt to mount, but others require the directory be created manually prior. If you see an error mounting this directory simple create it within the working directory and run the command again.

If this is your first time starting the service you will then need to run the following command to initialize your locally running dynamo database. 

```
npm run dynamo:init
```

This will create a local messages table that the service will interact with. Data within this table should be persisted between service restarts.

#### Verifying your local service
Once the service has been setup you can verify the service is working as expected through the following curl:

```
curl --location --request GET 'localhost:3000/hello'
```

>You may encounter an unsupported runtime error if your sam-cli version is out of date. If you encounter this error please upgrade your version of sam-cli and restart the server.

If you see the following response then you service is running and able to connect to the docker network your dynamo instance is running in.

```
{
    "message": "Hello World!"
}
```

From here you can use the API as defined in the swagger file located [here](./swagger.yml).
### Testing
#### Unit Testing
NOTE: Some unit tests have been omitted for time; however, I've included enough basic tests so you get the gist of my testing approach.

Unit tests can be executed by running:
```
npm test
```

#### Integration Testing
NOTE: Some integration tests have been omitted for time; however, I've included enough to cover the happy paths for each endpoint and a few basic error cases.

Integration tests can be executed by running the following command with the local server running:
```
npm run test:integration
```