import * as bcrypt from 'bcryptjs'

export class AuthProvider {
  static async generateHash(password: string): Promise<string> {
    return bcrypt.hash(password, 10)
  }
}
