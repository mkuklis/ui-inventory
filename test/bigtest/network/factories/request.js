import { Factory } from 'miragejs';
import faker from 'faker';

export default Factory.extend({
  id: (i) => 'requestId' + i,
  requestType: () => faker.random.arrayElement(['Hold', 'Page', 'Recall']),
  requestDate: () => faker.date.past().toISOString().substring(0, 10),
  status: () => 'Open - Not yet filled',
  position: (i) => i + 1,
  fulfillmentPreference: 'Hold Shelf',
  holdShelfExpirationDate: '2017-01-20',
  loan: {
    dueDate: '2017-09-19T12:42:21.000Z',
  }
});
