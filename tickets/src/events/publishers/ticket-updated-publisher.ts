import { Subjects, Publisher, TicketUpdatedEvent } from "@ehfpinheiro/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}