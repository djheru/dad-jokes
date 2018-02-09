'use strict';

const alexaSkillKit = require('alexa-skill-kit');
const MessageTemplate = require('alexa-message-builder');
const fetchRandom = require('./jokesApi');

const sampleCommands = `
  You can say:
  Tell me a joke
  Tell me a good one
  What's a good joke
`;

const skillText = `
  Hello from Dad Jokes.
  I have puns and corny jokes
  Want to hear one?
  ${sampleCommands}
`;

function dadJokes(event, context) {
  alexaSkillKit(event, context, (message) => {
    console.log(message);
    if (message.type === 'LaunchRequest') {
      return new MessageTemplate()
        .addText(skillText)
        .addRepromptText(sampleCommands)
        .keepSession()
        .get();
    } else if (message.intent.name === 'TellJoke') {
      return fetchRandom().then(joke => joke);
    } else {
      return new MessageTemplate()
        .addText(sampleCommands)
        .keepSession()
        .get();
    }
  });
}

exports.handler = dadJokes;