import { Injectable } from '@nestjs/common'
import GithubOauthClient from 'github-oauth-ts'

const { BUHTIG_CLIENT_ID: clientId, BUHTIG_CLIENT_SECRET: clientSecret } =
  process.env

@Injectable()
export class GithubAuthService {
  private readonly githubClient

  constructor() {
    this.githubClient = new GithubOauthClient({
      clientId,
      clientSecret,
      redirectUri: 'https://react-hero.krezz.me/login',
      scope: 'user:email',
    })
  }

  async getPayloadFromToken(githubAuthCode: string) {
    const accessToken = await this.githubClient.getAccessToken(githubAuthCode)
    const {
      id: githubId,
      email,
      name,
    } = await this.githubClient.getUserInfo(accessToken)

    const [firstName, lastName] = name.split(' ')
    return {
      firstName,
      lastName: lastName || '',
      email,
      githubId,
    }
  }
}
