import { createConnection } from 'typeorm';
import { Article } from '../entities/article.entity';
import { ArticleVersion } from '../entities/article-version.entity';
import { User } from '../entities/user.entity';
import { Language } from '../entities/languages.entity';

const main = async () => {

  const connection = await createConnection();
  const articleRepo = connection.getRepository(Article);
  const articleVersionRepo = connection.getRepository(ArticleVersion);
  const userRepo = connection.getRepository(User);
  const languageRepo = connection.getRepository(Language);

  const contributorUser = await userRepo.findOne({ where: { username: 'kristian' } });
  const adminUser = await userRepo.findOne({ where: { username: 'administrator' } });
  const enLang = await languageRepo.findOne({ where: { language: 'en' } });

  // First article about philosophy #1
  let articlePhilosophy = new Article();
  articlePhilosophy.author = Promise.resolve(contributorUser);
  articlePhilosophy = await articleRepo.save(articlePhilosophy);

  // Version 1
  let articleVersionPhilosophy = await articleVersionRepo.findOne({ where: { title: 'Philosophy', version: 1 } });
  if (!articleVersionPhilosophy) {
    articleVersionPhilosophy = articleVersionRepo.create();
    articleVersionPhilosophy.title = 'Philosophy';
    articleVersionPhilosophy.content = `Philosophy develops a fascination for wisdom which is different from knowledge. Philosophy is a way of thinking about the world, the universe, and society. It works by asking very basic questions about the nature of human thought, the nature of the universe, and the connections between them. The ideas in philosophy are often general and abstract. But this does not mean that philosophy is not about the real world. Ethics, for example, ask about how to be good in our day to day lives. Metaphysics asks about how the world works and what it is made of. Sometimes people talk about how they have a ‘personal philosophy’, which means the way a person thinks about the world. This article is not about people's ’personal philosophies’. This article is about the ideas that have been discussed by philosophers (people who think and write about ways of thinking) for a long time.`;
    articleVersionPhilosophy.version = 1;
    articleVersionPhilosophy.author = Promise.resolve(contributorUser);
    articleVersionPhilosophy.article = Promise.resolve(articlePhilosophy);
    articleVersionPhilosophy.language = Promise.resolve(enLang);
    await articleVersionRepo.save(articleVersionPhilosophy);
  }

  // First article about language #2
  let articleLanguage = new Article();
  articleLanguage.author = Promise.resolve(contributorUser);
  articleLanguage = await articleRepo.save(articleLanguage);

  // Version 1
  let articleVersionLanguage = await articleVersionRepo.findOne({ where: { title: 'Language', version: 1 } });
  if (!articleVersionLanguage) {
    articleVersionLanguage = articleVersionRepo.create();
    articleVersionLanguage.title = 'Language';
    articleVersionLanguage.content = `Language is a system that consists of the development, acquisition, maintenance, and use of complex systems of communication, particularly the human ability to do so; a language is any specific example of such a system. The scientific study of language is called linguistics. Questions concerning the philosophy of language, such as whether words can represent experience, have been debated at least since Gorgias and Plato in ancient Greece. Thinkers such as Rousseau have argued that language originated from emotions while others like Kant have held that it originated from rational and logical thought. 20th-century philosophers such as Wittgenstein argued that philosophy is really the study of language. Major figures in linguistics include Ferdinand de Saussure and Noam Chomsky.`;
    articleVersionLanguage.version = 1;
    articleVersionLanguage.author = Promise.resolve(contributorUser);
    articleVersionLanguage.article = Promise.resolve(articleLanguage);
    articleVersionLanguage.language = Promise.resolve(enLang);
    await articleVersionRepo.save(articleVersionLanguage);
  }

  // First article about Translation (biology) #3
  let articleTranslation = new Article();
  articleTranslation.author = Promise.resolve(contributorUser);
  articleTranslation = await articleRepo.save(articleTranslation);

  // Version 1
  let articleVersionTranslation = await articleVersionRepo.findOne({ where: { title: 'Translation (biology)', version: 1 } });
  if (!articleVersionTranslation) {
    articleVersionTranslation = articleVersionRepo.create();
    articleVersionTranslation.title = 'Translation (biology)';
    articleVersionTranslation.content = `Language is a system that consists of the development, acquisition, maintenance, and use of complex systems of communication, particularly the human ability to do so; a language is any specific example of such a system. The scientific study of language is called linguistics. Questions concerning the philosophy of language, such as whether words can represent experience, have been debated at least since Gorgias and Plato in ancient Greece. Thinkers such as Rousseau have argued that language originated from emotions while others like Kant have held that it originated from rational and logical thought. 20th-century philosophers such as Wittgenstein argued that philosophy is really the study of language. Major figures in linguistics include Ferdinand de Saussure and Noam Chomsky.`;
    articleVersionTranslation.version = 1;
    articleVersionTranslation.author = Promise.resolve(contributorUser);
    articleVersionTranslation.article = Promise.resolve(articleTranslation);
    articleVersionTranslation.language = Promise.resolve(enLang);
    await articleVersionRepo.save(articleVersionTranslation);
  }

  // First article about Tesla Cyber Truck #4
  let articleTeslaCyberTruck = new Article();
  articleTeslaCyberTruck.author = Promise.resolve(contributorUser);
  articleTeslaCyberTruck = await articleRepo.save(articleTeslaCyberTruck);

  // Version 1
  let articleVersionTeslaCyberTruck = await articleVersionRepo.findOne({ where: { title: 'Tesla Cyber Truck', version: 1 } });
  if (!articleVersionTeslaCyberTruck) {
    articleVersionTeslaCyberTruck = articleVersionRepo.create();
    articleVersionTeslaCyberTruck.title = 'Tesla Cyber Truck';
    articleVersionTeslaCyberTruck.content = `Tesla made electric passenger cars mainstream with the Model S and Model 3 sedans and the Model X crossover, and now its turning to one of the most important segments out right now—pickup trucks. At a bizarre event in Los Angeles, Elon Musk debuted the Tesla Cybertruck, the first truck from the brand. It'll go up against upcoming EV pickups from Ford and GM, plus new kids on the block, Rivian. Musk said at the reveal that we need something different than today's pickup trucks. And yes, that's certainly the case here.`;
    articleVersionTeslaCyberTruck.version = 1;
    articleVersionTeslaCyberTruck.author = Promise.resolve(contributorUser);
    articleVersionTeslaCyberTruck.article = Promise.resolve(articleTeslaCyberTruck);
    articleVersionTeslaCyberTruck.language = Promise.resolve(enLang);
    // articleVersionTeslaCyberTruck.
    await articleVersionRepo.save(articleVersionTeslaCyberTruck);
  }

  // First article about TypeScript #5
  let articleTypeScript = new Article();
  articleTypeScript.author = Promise.resolve(contributorUser);
  articleTypeScript = await articleRepo.save(articleTypeScript);

  // Version 1
  let articleVersionTypeScript = await articleVersionRepo.findOne({ where: { title: 'TypeScript', version: 1 } });
  if (!articleVersionTypeScript) {
    articleVersionTypeScript = articleVersionRepo.create();
    articleVersionTypeScript.title = 'TypeScript';
    articleVersionTypeScript.content = `TypeScript is an open-source programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript and adds optional static typing to the language. TypeScript is designed for development of large applications and transcompiles to JavaScript. As TypeScript is a superset of JavaScript, existing JavaScript programs are also valid TypeScript programs. TypeScript may be used to develop JavaScript applications for both client-side and server-side (Node.js, Deno) execution. There are multiple options available for transcompilation. Either the default TypeScript Checker can be used, or the Babel compiler can be invoked to convert TypeScript to JavaScript.`;
    articleVersionTypeScript.version = 1;
    articleVersionTypeScript.author = Promise.resolve(contributorUser);
    articleVersionTypeScript.article = Promise.resolve(articleTypeScript);
    articleVersionTypeScript.language = Promise.resolve(enLang);
    await articleVersionRepo.save(articleVersionTypeScript);
  }

  // First article about JavaScript #6
  let articleJavaScript = new Article();
  articleJavaScript.author = Promise.resolve(adminUser);
  articleJavaScript = await articleRepo.save(articleJavaScript);

  // Version 1
  let articleVersionJavaScript = await articleVersionRepo.findOne({ where: { title: 'JavaScript', version: 1 } });
  if (!articleVersionJavaScript) {
    articleVersionJavaScript = articleVersionRepo.create();
    articleVersionJavaScript.title = 'JavaScript';
    articleVersionJavaScript.content = `JavaScript often abbreviated as JS, is a high-level, just-in-time compiled, object-oriented programming language that conforms to the ECMAScript specification. JavaScript has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions. Alongside HTML and CSS, JavaScript is one of the core technologies of the World Wide Web. JavaScript enables interactive web pages and is an essential part of web applications. The vast majority of websites use it, and major web browsers have a dedicated JavaScript engine to execute it. As a multi-paradigm language, JavaScript supports event-driven, functional, and imperative (including object-oriented and prototype-based) programming styles. It has APIs for working with text, arrays, dates, regular expressions, and the DOM, but the language itself does not include any I/O, such as networking, storage, or graphics facilities. It relies upon the host environment in which it is embedded to provide these features.`;
    articleVersionJavaScript.version = 1;
    articleVersionJavaScript.author = Promise.resolve(adminUser);
    articleVersionJavaScript.article = Promise.resolve(articleJavaScript);
    articleVersionJavaScript.language = Promise.resolve(enLang);
    await articleVersionRepo.save(articleVersionJavaScript);
  }

  await connection.close();

  // tslint:disable-next-line: no-console
  console.log('Articles and article versions seeded!');

};

main()
// tslint:disable-next-line: no-console
.catch(console.log);
