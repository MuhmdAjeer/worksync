import { Injectable } from '@nestjs/common';
import { render } from '@react-email/components';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
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

  constructor(configSvc: ConfigService) {
    this.transporter = nodemailer.createTransport(
      {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: configSvc.getOrThrow('MAILER_MAIL'),
          pass: configSvc.getOrThrow('MAILER_PASS'),
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
  private generateEmail = (template: ReactElement) => {
    return render(template);
  };
  async sendMail({ email, subject, template }: SendMailConfiguration) {
    const html = this.generateEmail(template);

    await this.transporter.sendMail({
      to: email,
      subject,
      html,
    });
  }
}
