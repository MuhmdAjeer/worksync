import { Subjects, Publisher, RequestOTPEvent } from '@worksyncplus/common';

export class RequestOTPPublisher extends Publisher<RequestOTPEvent> {
  subject: Subjects.RequestOTP = Subjects.RequestOTP;
}
