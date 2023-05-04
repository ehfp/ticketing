import { Subjects, OrderCancelledEvent, Publisher } from "@ehfpinheiro/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}