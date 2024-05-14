import axios, { getAdapter, type AxiosInstance, AxiosError } from "axios";
import { CreateUserDto } from "@/generated/dto/create-user-dto";
import { VerifyOTPDto } from "@/generated/dto/verify-otpdto";
import { SendOTPDto } from "@/generated/dto/send-otpdto";
import { OnboardDto } from "@/generated/dto/onboard-dto";
import { User } from "next-auth";
import { getSession } from "next-auth/react";

export interface ApiAuthProvider {
  getToken: () => Promise<string | undefined>;
  onAuthError: (err: Error) => void | Promise<void>;
}

export class ApiClient {
  private readonly http: AxiosInstance;

  constructor(
    private readonly baseURL = "http://worksync.test/",
    private readonly authProvider: ApiAuthProvider
  ) {
    this.http = axios.create({
      baseURL: this.baseURL,
      timeout: 200000,
    });
    this.http.interceptors.request.use(async (config: any) => {
      // const token = await this.authProvider.getToken()
      // This is required by the interceptor api

      const session = await getSession();
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${session?.access_token}`,
      };
      return config;
    });
    this.http.interceptors.response.use(
      (ok) => ok,
      async (err: AxiosError) => {
        if (Boolean(err.isAxiosError) && err.response?.status === 401) {
          await this.authProvider.onAuthError(err);
        }
        throw err;
      }
    );
  }

  public async registerUser(userDto: CreateUserDto): Promise<CreateUserDto> {
    return (await this.http.post<CreateUserDto>("/api/auth/register", userDto))
      .data;
  }

  public async verifyToken(data: VerifyOTPDto): Promise<void> {
    return (await this.http.post(`/api/auth/verify/otp`, data)).data;
  }
  public async login(data: CreateUserDto): Promise<{ access_token: string }> {
    return (
      await this.http.post<{ access_token: string }>(`/api/auth/login`, data)
    ).data;
  }
  public async resendCode(data: SendOTPDto): Promise<void> {
    return (await this.http.post(`/api/auth/verify/otp/send`, data)).data;
  }
  public async onboardUser(data: OnboardDto): Promise<void> {
    return (await this.http.post(`/api/workspace/onboarding`, data)).data;
  }
  public async getCurrentUser(): Promise<User> {
    return (await this.http.get(`/api/auth/currentUser`)).data;
  }
}
const client = new ApiClient(undefined, {
  getToken: async (): Promise<string | undefined> => "$32423",
  async onAuthError(): Promise<void> {
    // localStorage.clear();
    // window.location.href = "/auth/register";
  },
});

export default client;

export interface MyUser {
  id: string;
  name: string;
  email: string;
  image: string;
}
