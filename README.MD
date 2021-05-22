# basic-messaging-service
## Developer Guide
### Prereqs
This project assumes you have the following installed and functioning on your machine:

* [docker](https://docs.docker.com/desktop/)
* [aws-cli](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
* [sam-cli](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
* [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/)
* [node14](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/)

### Local Setup
Once you've checked out the repository to a local directory you can use the following command to start the service:

```bash
npm start
```

### Testing
Unit tests can be executed by running:
```
npm test
```

Integration tests can be executed by running the following command with the local server running:
```
npm run integration-test
```