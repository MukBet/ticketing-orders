import { Publisher, OrderCancelledEvent, Subjects } from '@motway_ticketing/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}