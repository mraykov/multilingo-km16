import { createConnection } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from '../entities/role.entity';
import { RoleTypes } from '../../common/enums/role.enum';

const main = async () => {

  const connection = await createConnection();
  const roleRepo = connection.getRepository(Role);
  const userRepo = connection.getRepository(User);

  let admin = await roleRepo.findOne({ where: { roleName: RoleTypes.Admin } });
  if (!admin) {
    admin = new Role();
    admin.roleName = RoleTypes.Admin;
    admin = await roleRepo.save(admin);
  }

  let contributor = await roleRepo.findOne({ where: { roleName: RoleTypes.Contributor } });
  if (!contributor) {
    contributor = new Role();
    contributor.roleName = RoleTypes.Contributor;
    contributor = await roleRepo.save(contributor);
  }

  let editor = await roleRepo.findOne({ where: { roleName: RoleTypes.Editor } });
  if (!editor) {
    editor = new Role();
    editor.roleName = RoleTypes.Editor;
    editor = await roleRepo.save(editor);
  }

  let userAdmin = await userRepo.findOne({ where: { username: 'administrator' } });
  if (!userAdmin) {
    userAdmin = new User();
    userAdmin.username = 'administrator';
    userAdmin.email = 'admin@admin.com';
    userAdmin.firstName = 'Admin';
    userAdmin.lastName = 'Super';
    userAdmin.password = await bcrypt.hash('admin007', 10);
    userAdmin.role = admin;
    await userRepo.save(userAdmin);
  }

  let userContributor = await userRepo.findOne({ where: { username: 'kristian' } });
  if (!userContributor) {
    userContributor = new User();
    userContributor.username = 'kristian';
    userContributor.email = 'kris@contributor.com';
    userContributor.firstName = 'Kris';
    userContributor.lastName = 'Hadzhiev';
    userContributor.password = await bcrypt.hash('kristian03', 10);
    userContributor.role = contributor;
    await userRepo.save(userContributor);
  }

  let userEditor = await userRepo.findOne({ where: { username: 'martin' } });
  if (!userEditor) {
    userEditor = new User();
    userEditor.username = 'martin';
    userEditor.email = 'martin@editor.com';
    userEditor.firstName = 'Martin';
    userEditor.lastName = 'Pavlov';
    userEditor.password = await bcrypt.hash('martin02', 10);
    userEditor.role = editor;
    await userRepo.save(userEditor);
  }

  await connection.close();

  // tslint:disable-next-line: no-console
  console.log(`Users and their roles seeded successfully`);

};

main()
  // tslint:disable-next-line: no-console
  .catch(console.log);
