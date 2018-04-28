import * as Alexa from 'ask-sdk';
import Requests from './requests';

const LaunchRequestHandler = {

    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'Welcome to your personal social media updates. Please choose which updates you want to hear';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'You can say hello to me!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'Goodbye! Have a nice day!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    }
};

const GetLastSocialMediaUpdateIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    if(request.intent.slots !== undefined){
      let attributes = {'currentSocialMedia': request.intent.slots.socialMediaName.value};
      handlerInput.attributesManager.setSessionAttributes(attributes);
    }
    return (request.type === 'IntentRequest' && request.intent.name === 'GetLastSocialMediaUpdateIntent');
  },
  handle(handlerInput) {
    let attributes = handlerInput.attributesManager.getSessionAttributes();
    attributes['currentPostNumber'] = 0;
    handlerInput.attributesManager.setSessionAttributes(attributes);

    let requests = new Requests();
    return new Promise((resolve, reject) => {
      let socialMediaStringPromise;
      if(handlerInput.attributesManager.getSessionAttributes().currentSocialMedia === 'reddit'){
        socialMediaStringPromise = requests.redditTIL(0);
      } else if(handlerInput.attributesManager.getSessionAttributes().currentSocialMedia === 'forum'){
        socialMediaStringPromise = requests.webhoseio('moldova', 0);
      }
      socialMediaStringPromise
              .then((speechText) => {
                resolve(handlerInput.responseBuilder
                        .speak(speechText)
                        .reprompt(speechText)
                        .withSimpleCard('Getting Last Reddit updates', speechText)
                        .getResponse());
              })
              .catch((error) => {
              	reject(error);
              });
    });
  }
};

const GetNextSocialMediaUpdateIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (request.type === 'IntentRequest' && request.intent.name === 'GetNextSocialMediaUpdateIntent');
  },
  handle(handlerInput) {
    let requests = new Requests();
    return new Promise((resolve, reject) => {
      let attributes = handlerInput.attributesManager.getSessionAttributes();
      requests.redditTIL(++attributes['currentPostNumber'])
              .then((speechText) => {
                resolve(handlerInput.responseBuilder
                        .speak(speechText)
                        .reprompt(speechText)
                        .withSimpleCard('Getting Last Reddit updates', speechText)
                        .getResponse());
              })
              .catch((error) => {
              	reject(error);
              });
    });
  }
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  }
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.main = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    GetLastSocialMediaUpdateIntentHandler,
    GetNextSocialMediaUpdateIntentHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
