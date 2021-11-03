import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe('SendForgotPasswordMailUseCase', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider,
    );
  });

  it('should be able to send forgot password e-mail to user', async () => {
    const sendMail = spyOn(mailProvider, 'sendMail');

    await usersRepositoryInMemory.create({
      driver_license: '930348',
      email: 'bokod@lunlo.eh',
      name: 'Joe Thompson',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('bokod@lunlo.eh');

    expect(sendMail).toHaveBeenCalled();
  });

  it('should be able to create an users token', async () => {
    const generateTokenMail = spyOn(usersTokensRepositoryInMemory, 'create');

    await usersRepositoryInMemory.create({
      driver_license: '712935',
      email: 'focesto@befise.sj',
      name: 'Melvin White',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('focesto@befise.sj');

    expect(generateTokenMail).toHaveBeenCalled();
  });

  it('should not be able to send forgot password e-mail to inexistent user', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('bokod@lunlo.eh'),
    ).rejects.toEqual(new AppError('User does not exists!', 404));
  });
});
