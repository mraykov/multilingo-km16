import { createConnection } from 'typeorm';
import { Language } from '../entities/languages.entity';

const main = async () => {

  const connection = await createConnection();
  const languageRepo = connection.getRepository(Language);

  let enLang = await languageRepo.findOne({ where: { language: 'en' } });
  if (!enLang) {
    enLang = languageRepo.create();
    enLang.language = 'en';
    await languageRepo.save(enLang);
  }

  let bgLang = await languageRepo.findOne({ where: { language: 'bg' } });
  if (!bgLang) {
    bgLang = languageRepo.create();
    bgLang.language = 'bg';
    await languageRepo.save(bgLang);
  }

  let deLang = await languageRepo.findOne({ where: { language: 'de' } });
  if (!deLang) {
    deLang = languageRepo.create();
    deLang.language = 'de';
    await languageRepo.save(deLang);
  }

  let esLang = await languageRepo.findOne({ where: { language: 'es' } });
  if (!esLang) {
    esLang = languageRepo.create();
    esLang.language = 'es';
    await languageRepo.save(esLang);
  }

  let frLang = await languageRepo.findOne({ where: { language: 'fr' } });
  if (!frLang) {
    frLang = languageRepo.create();
    frLang.language = 'fr';
    await languageRepo.save(frLang);
  }

  let itLang = await languageRepo.findOne({ where: { language: 'it' } });
  if (!itLang) {
    itLang = languageRepo.create();
    itLang.language = 'it';
    await languageRepo.save(itLang);
  }

  await connection.close();

  // tslint:disable-next-line: no-console
  console.log('Languages seeded successfully!');

};

main()
// tslint:disable-next-line: no-console
.catch(console.log);
