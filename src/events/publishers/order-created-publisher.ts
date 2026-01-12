import { Publisher, OrderCreatedEvent, Subjects } from '@motway_ticketing/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
