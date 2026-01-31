import { PaymentCreatedEvent, Listener, Subjects, OrderStatus } from '@motway_ticketing/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/order';
import { queueGroupName } from './queue-group-name';

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
    const order = await Order.findById(data.orderId);
    if (!order) {
      throw new Error('Order not found');
    }
    // Не устанавливаю версию так как после установки статуса Complete других изменений не планируется,
    // иначе надо бы было делать выпуст события OrderUpdated дабы остальные сервисы узнали об изменении статуса
    // и версия бы установилась автоматически
    order.set({
      status: OrderStatus.Complete
    });
    await order.save();

    msg.ack();
  }
}