import { Body, Controller, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { OnboardDto } from 'src/dtos/CreateWorkspaceDto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
// import { JwtAuthGuard } from '@worksyncplus/common';
import { OnboardingService } from 'src/services/onboarding.service';
@Controller('onboarding')
export class OnboardingController {
  constructor(private onboardingSvc: OnboardingService) {}

  private readonly logger = new Logger('auth controller');

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async onboardUser(@Req() request: Request, @Body() onboardDto: OnboardDto) {
    this.logger.log(request.cookies);
    // return request;
    // return await this.onboardingSvc.onboardUser(onboardDto);
  }
}
