import { createConnection } from 'typeorm';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';

const main = async () => {

  const connection = await createConnection();
  const roleRepo = connection.getRepository(Role);
  const userRepo = connection.getRepository(User);

  // Clean all data
  await roleRepo.delete({});
  await userRepo.delete({});

  await connection.close();

  // tslint:disable-next-line: no-console
  console.log(`Data cleaned successfully!`);

};

main()
  // tslint:disable-next-line: no-console
  .catch(console.log);
