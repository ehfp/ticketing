import { Subjects, Publisher, TicketCreatedEvent } from "@ehfpinheiro/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;

  
}