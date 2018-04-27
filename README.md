# Handelsblatt hackX

This is the boilerplate as a starting point for developing an alexa skill.
Happy coding!

## Getting Started

### Prerequisites

#### Amazon Developer Account

To build any type of skill, you need an account on the [Amazon developer console](https://developer.amazon.com/alexa/console/ask).

You use the developer console to create a configuration for the skill. This configuration collects information about the skill, such as its name, the type of interaction model to use, the endpoint or content feed, and other information. The Alexa service uses the configuration to determine which user requests should be sent to the service for your skill.

#### AWS Credentials

The simplest option for for hosting your code is to use AWS Lambda (an Amazon Web Services offering). In this case, you need an account with [Amazon Web Services](http://aws.amazon.com/) in addition to your developer portal account.

#### Development Environment

A development environment appropriate for the programming language you plan to use. You can author a Lambda function in Node.js, Java, Python, or C#. You can author a web service in any language appropriate for web services.

#### Serverless

To test & deploy your source code to AWS [Serverless](https://serverless.com/) comes pretty handy.

#### Hosting Space (optional)

A publicly accessible web site to host any images, audio files, or video files that you use in your skill. If you have no such files other than for a skill icon, you do not need to host any resources. One possible solution is to use an Amazon Simple Storage Service (S3) instance, (an Amazon Web Services offering).

### Installing

Clone this repository
```
$ git clone git@bitbucket.org:169labs/hackX.git
```
Install SDK
```
$ npm install --save ask-sdk
```

Test your Skill Code
```
$ npx serverless invoke local -f hackX -p testLaunchRequest.json
```

Deploy your code
```
$ npx serverless deploy
```

### Ressources

#### API for Realtime Share Data

Docs:
http://interface.gatrixx.com/handelsblatt/HELP/helpShare

User: handelsblattmediagroup
Passwort: h4ck4th0n

Samples:

TopFlop:
http://interface.gatrixx.com/handelsblatt/TOPFLOP/OVERVIEW/

Dax TopFlop:
http://interface.gatrixx.com/handelsblatt/TOP/COMPOSITION/5

Dax Flops:
http://interface.gatrixx.com/handelsblatt/FLOP/COMPOSITION/5

#### API for full text article search

http://www.handelsblatt.com/contentexport/feed/hackathon-schlagzeilen?cxpst=Daimler&cxplt=5


#### External Tools

[Amazon developer console](https://developer.amazon.com/alexa/console/ask)

[Amazon Web Services](http://aws.amazon.com/)

[Alexa Skills Kit](https://developer.amazon.com/alexa-skills-kit/)

[ASK SDK v2 for Node.js](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs)

[Serverless](https://serverless.com/)
