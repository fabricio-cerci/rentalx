import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { UserTokens } from '@modules/accounts/infra/typeorm/entities/UserTokens';

import { IUsersTokensRepository } from '../IUsersTokensRepository';

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  private usersTokens: UserTokens[] = [];

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id,
    });

    this.usersTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserTokens> {
    return this.usersTokens.find(
      userToken =>
        userToken.user_id === user_id &&
        userToken.refresh_token === refresh_token,
    );
  }

  async deleteById(id: string): Promise<void> {
    const userToken = this.usersTokens.find(userToken => userToken.id === id);

    this.usersTokens.splice(this.usersTokens.indexOf(userToken), 1);
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    return this.usersTokens.find(
      userToken => userToken.refresh_token === refresh_token,
    );
  }
}

export { UsersTokensRepositoryInMemory };
