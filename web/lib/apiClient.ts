import axios, { getAdapter, type AxiosInstance } from "axios";
import { CreateUserDto } from "@/generated/dto/create-user-dto";
import { VerifyOTPDto } from "@/generated/dto/verify-otpdto";
import { SendOTPDto } from "@/generated/dto/send-otpdto";
export class ApiClient {
  private readonly http: AxiosInstance;

  constructor(private readonly baseURL = "http://worksync.test/") {
    this.http = axios.create({
      baseURL: this.baseURL,
      timeout: 200000,
    });
  }

  public async registerUser(userDto: CreateUserDto): Promise<CreateUserDto> {
    return (await this.http.post<CreateUserDto>("/api/auth/register", userDto))
      .data;
  }

  public async verifyToken(data: VerifyOTPDto): Promise<void> {
    return (await this.http.post(`/api/auth/verify/otp`, data)).data;
  }
  public async login(data: CreateUserDto): Promise<{ access_token: string }> {
    return (await this.http.post(`/api/auth/login`, data)).data;
  }
  public async resendCode(data: SendOTPDto): Promise<void> {
    return (await this.http.post(`/api/auth/verify/otp/send`, data)).data;
  }
}

const client = new ApiClient();
export default client;
