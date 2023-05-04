import { Subjects, Publisher, ExpirationCompleteEvent } from "@ehfpinheiro/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}