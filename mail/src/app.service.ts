import { Injectable } from '@nestjs/common';
import { render } from '@react-email/components';
import * as nodemailer from 'nodemailer';
import { ReactElement } from 'react';

interface SendMailConfiguration {
  email: string;
  subject: string;
  text?: string;
  template: any;
}

@Injectable()
export class AppService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport(
      {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'muhmdajeer.dev@gmail.com',
          pass: 'nacetmeybebrjvxf',
        },
      },
      {
        from: {
          name: 'Worksync',
          address: 'Worksync.dev',
        },
      },
    );
  }
  generateHtml = (template: ReactElement) => {
    return render(template);
  };
  async sendMail({ email, subject, template }: SendMailConfiguration) {
    await this.transporter.sendMail({
      to: email,
      subject,
      html: template,
    });
  }
}
