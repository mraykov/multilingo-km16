import { createConnection } from 'typeorm';
import { Translations } from '../entities/translations.entity';
import { TranslationSourceEnum } from '../../common/enums/translation-source.enum';
import { TranslationTypeEnum } from '../../common/enums/translation-type.enum';

const main = async () => {

  const connection = await createConnection();
  const translationRepo = connection.getRepository(Translations);

  // Article #1 Title V1 IT Philosophy
  let translPhilosophyTitleIT = await translationRepo.findOne({ where: { text: `Philosophy`, originLanguage: 'en', targetLanguage: 'it' } });
  if (!translPhilosophyTitleIT) {
    translPhilosophyTitleIT = new Translations();
    translPhilosophyTitleIT.originLanguage = 'en';
    translPhilosophyTitleIT.targetLanguage = 'it';
    translPhilosophyTitleIT.source = TranslationSourceEnum.AUTO;
    translPhilosophyTitleIT.text = `Philosophy`;
    translPhilosophyTitleIT.translation = `Filosofia`;
    translPhilosophyTitleIT.type = TranslationTypeEnum.TITLE;
    await translationRepo.save(translPhilosophyTitleIT);
  }

  // Article #1 Title V1 EN Philosophy
  let translPhilosophyTitleEN = await translationRepo.findOne({ where: { text: `Philosophy`, originLanguage: 'en', targetLanguage: 'en' } });
  if (!translPhilosophyTitleEN) {
    translPhilosophyTitleEN = new Translations();
    translPhilosophyTitleEN.originLanguage = 'en';
    translPhilosophyTitleEN.targetLanguage = 'en';
    translPhilosophyTitleEN.source = TranslationSourceEnum.AUTO;
    translPhilosophyTitleEN.text = `Philosophy`;
    translPhilosophyTitleEN.translation = `Philosophy`;
    translPhilosophyTitleEN.type = TranslationTypeEnum.TITLE;
    await translationRepo.save(translPhilosophyTitleEN);
  }

  // Article #1 Title V1 DE Philosophy
  let translPhilosophyTitleDE = await translationRepo.findOne({ where: { text: `Philosophy`, originLanguage: 'en', targetLanguage: 'de' } });
  if (!translPhilosophyTitleDE) {
    translPhilosophyTitleDE = new Translations();
    translPhilosophyTitleDE.originLanguage = 'en';
    translPhilosophyTitleDE.targetLanguage = 'de';
    translPhilosophyTitleDE.source = TranslationSourceEnum.AUTO;
    translPhilosophyTitleDE.text = `Philosophy`;
    translPhilosophyTitleDE.translation = `Philosophie`;
    translPhilosophyTitleDE.type = TranslationTypeEnum.TITLE;
    await translationRepo.save(translPhilosophyTitleDE);
  }

  // Article #1 Title V1 FR Philosophy
  let translPhilosophyTitleFR = await translationRepo.findOne({ where: { text: `Philosophy`, originLanguage: 'en', targetLanguage: 'fr' } });
  if (!translPhilosophyTitleFR) {
    translPhilosophyTitleFR = new Translations();
    translPhilosophyTitleFR.originLanguage = 'en';
    translPhilosophyTitleFR.targetLanguage = 'fr';
    translPhilosophyTitleFR.source = TranslationSourceEnum.AUTO;
    translPhilosophyTitleFR.text = `Philosophy`;
    translPhilosophyTitleFR.translation = `Philosophie`;
    translPhilosophyTitleFR.type = TranslationTypeEnum.TITLE;
    await translationRepo.save(translPhilosophyTitleFR);
  }

  // Article #1 Title V1 BG Philosophy
  let translPhilosophyTitleBG = await translationRepo.findOne({ where: { text: `Philosophy`, originLanguage: 'en', targetLanguage: 'bg' } });
  if (!translPhilosophyTitleBG) {
    translPhilosophyTitleBG = new Translations();
    translPhilosophyTitleBG.originLanguage = 'en';
    translPhilosophyTitleBG.targetLanguage = 'bg';
    translPhilosophyTitleBG.source = TranslationSourceEnum.AUTO;
    translPhilosophyTitleBG.text = `Philosophy`;
    translPhilosophyTitleBG.translation = `Философия`;
    translPhilosophyTitleBG.type = TranslationTypeEnum.TITLE;
    await translationRepo.save(translPhilosophyTitleBG);
  }

  // Article #1 Title V1 ES Philosophy
  let translPhilosophyTitleES = await translationRepo.findOne({ where: { text: `Philosophy`, originLanguage: 'en', targetLanguage: 'es' } });
  if (!translPhilosophyTitleES) {
    translPhilosophyTitleES = new Translations();
    translPhilosophyTitleES.originLanguage = 'en';
    translPhilosophyTitleES.targetLanguage = 'es';
    translPhilosophyTitleES.source = TranslationSourceEnum.AUTO;
    translPhilosophyTitleES.text = `Philosophy`;
    translPhilosophyTitleES.translation = `Filosofía`;
    translPhilosophyTitleES.type = TranslationTypeEnum.TITLE;
    await translationRepo.save(translPhilosophyTitleES);
  }

  // Article #1 Content V1 EN Philosophy
  let translPhilosophyContentEN = await translationRepo.findOne({
    where: {
      text: `Philosophy develops a fascination for wisdom which is different from knowledge. Philosophy is a way of thinking about the world, the universe, and society. It works by asking very basic questions about the nature of human thought, the nature of the universe, and the connections between them. The ideas in philosophy are often general and abstract. But this does not mean that philosophy is not about the real world. Ethics, for example, ask about how to be good in our day to day lives. Metaphysics asks about how the world works and what it is made of. Sometimes people talk about how they have a ‘personal philosophy’, which means the way a person thinks about the world. This article is not about people's ’personal philosophies’. This article is about the ideas that have been discussed by philosophers (people who think and write about ways of thinking) for a long time.`,
      originLanguage: 'en', targetLanguage: 'en',
    },
  });
  if (!translPhilosophyContentEN) {
    translPhilosophyContentEN = new Translations();
    translPhilosophyContentEN.originLanguage = 'en';
    translPhilosophyContentEN.targetLanguage = 'en';
    translPhilosophyContentEN.source = TranslationSourceEnum.AUTO;
    translPhilosophyContentEN.text = `Philosophy develops a fascination for wisdom which is different from knowledge. Philosophy is a way of thinking about the world, the universe, and society. It works by asking very basic questions about the nature of human thought, the nature of the universe, and the connections between them. The ideas in philosophy are often general and abstract. But this does not mean that philosophy is not about the real world. Ethics, for example, ask about how to be good in our day to day lives. Metaphysics asks about how the world works and what it is made of. Sometimes people talk about how they have a ‘personal philosophy’, which means the way a person thinks about the world. This article is not about people's ’personal philosophies’. This article is about the ideas that have been discussed by philosophers (people who think and write about ways of thinking) for a long time.`;
    translPhilosophyContentEN.translation = `Philosophy develops a fascination for wisdom which is different from knowledge. Philosophy is a way of thinking about the world, the universe, and society. It works by asking very basic questions about the nature of human thought, the nature of the universe, and the connections between them. The ideas in philosophy are often general and abstract. But this does not mean that philosophy is not about the real world. Ethics, for example, ask about how to be good in our day to day lives. Metaphysics asks about how the world works and what it is made of. Sometimes people talk about how they have a ‘personal philosophy’, which means the way a person thinks about the world. This article is not about people's ’personal philosophies’. This article is about the ideas that have been discussed by philosophers (people who think and write about ways of thinking) for a long time.`;
    translPhilosophyContentEN.type = TranslationTypeEnum.CONTENT;
    await translationRepo.save(translPhilosophyContentEN);
  }

  // Article #1 Content V1 BG Philosophy
  let translPhilosophyContentBG = await translationRepo.findOne({
    where: {
      text: `Philosophy develops a fascination for wisdom which is different from knowledge. Philosophy is a way of thinking about the world, the universe, and society. It works by asking very basic questions about the nature of human thought, the nature of the universe, and the connections between them. The ideas in philosophy are often general and abstract. But this does not mean that philosophy is not about the real world. Ethics, for example, ask about how to be good in our day to day lives. Metaphysics asks about how the world works and what it is made of. Sometimes people talk about how they have a ‘personal philosophy’, which means the way a person thinks about the world. This article is not about people's ’personal philosophies’. This article is about the ideas that have been discussed by philosophers (people who think and write about ways of thinking) for a long time.`,
      originLanguage: 'en', targetLanguage: 'bg',
    },
  });
  if (!translPhilosophyContentBG) {
    translPhilosophyContentBG = new Translations();
    translPhilosophyContentBG.originLanguage = 'en';
    translPhilosophyContentBG.targetLanguage = 'bg';
    translPhilosophyContentBG.source = TranslationSourceEnum.AUTO;
    translPhilosophyContentBG.text = `Philosophy develops a fascination for wisdom which is different from knowledge. Philosophy is a way of thinking about the world, the universe, and society. It works by asking very basic questions about the nature of human thought, the nature of the universe, and the connections between them. The ideas in philosophy are often general and abstract. But this does not mean that philosophy is not about the real world. Ethics, for example, ask about how to be good in our day to day lives. Metaphysics asks about how the world works and what it is made of. Sometimes people talk about how they have a ‘personal philosophy’, which means the way a person thinks about the world. This article is not about people's ’personal philosophies’. This article is about the ideas that have been discussed by philosophers (people who think and write about ways of thinking) for a long time.`;
    translPhilosophyContentBG.translation = `Философията развива очарование за мъдрост, което е различно от знанието. Философията е начин на мислене за света, Вселената и обществото. Той работи, като задава много основни въпроси относно естеството на човешката мисъл, природата на Вселената и връзките между тях. Идеите във философията често са общи и абстрактни. Но това не означава, че философията не е за реалния свят. Например, етиката пита за това как да бъдем добри в ежедневието си. Метафизиката пита как работи светът и от какво е направен. Понякога хората говорят за това как имат „лична философия“, което означава начинът, по който човек мисли за света. Тази статия не е за личните философии на хората. Тази статия е за идеите, които са обсъждани от философи (хора, които мислят и пишат за начини на мислене) от дълго време.`;
    translPhilosophyContentBG.type = TranslationTypeEnum.CONTENT;
    await translationRepo.save(translPhilosophyContentBG);
  }

  // Article #1 Content V1 IT Philosophy
  let translPhilosophyContentIT = await translationRepo.findOne({
    where: {
      text: `Philosophy develops a fascination for wisdom which is different from knowledge. Philosophy is a way of thinking about the world, the universe, and society. It works by asking very basic questions about the nature of human thought, the nature of the universe, and the connections between them. The ideas in philosophy are often general and abstract. But this does not mean that philosophy is not about the real world. Ethics, for example, ask about how to be good in our day to day lives. Metaphysics asks about how the world works and what it is made of. Sometimes people talk about how they have a ‘personal philosophy’, which means the way a person thinks about the world. This article is not about people's ’personal philosophies’. This article is about the ideas that have been discussed by philosophers (people who think and write about ways of thinking) for a long time.`,
      originLanguage: 'en', targetLanguage: 'it',
    },
  });
  if (!translPhilosophyContentIT) {
    translPhilosophyContentIT = new Translations();
    translPhilosophyContentIT.originLanguage = 'en';
    translPhilosophyContentIT.targetLanguage = 'it';
    translPhilosophyContentIT.source = TranslationSourceEnum.AUTO;
    translPhilosophyContentIT.text = `Philosophy develops a fascination for wisdom which is different from knowledge. Philosophy is a way of thinking about the world, the universe, and society. It works by asking very basic questions about the nature of human thought, the nature of the universe, and the connections between them. The ideas in philosophy are often general and abstract. But this does not mean that philosophy is not about the real world. Ethics, for example, ask about how to be good in our day to day lives. Metaphysics asks about how the world works and what it is made of. Sometimes people talk about how they have a ‘personal philosophy’, which means the way a person thinks about the world. This article is not about people's ’personal philosophies’. This article is about the ideas that have been discussed by philosophers (people who think and write about ways of thinking) for a long time.`;
    translPhilosophyContentIT.translation = `La filosofia sviluppa un fascino per la saggezza che è diversa dalla conoscenza. La filosofia è un modo di pensare al mondo, all'universo e alla società. Funziona ponendo domande basilari sulla natura del pensiero umano, la natura dell'universo e le connessioni tra di loro. Le idee in filosofia sono spesso generali e astratte. Ma ciò non significa che la filosofia non riguardi il mondo reale. L'etica, ad esempio, chiede come essere bravi nelle nostre vite quotidiane. La metafisica chiede come funziona il mondo e di cosa è fatto. A volte le persone parlano di come hanno una "filosofia personale", che significa il modo in cui una persona pensa al mondo. Questo articolo non tratta delle "filosofie personali" delle persone. Questo articolo riguarda le idee che sono state discusse dai filosofi (persone che pensano e scrivono sui modi di pensare) per molto tempo.`;
    translPhilosophyContentIT.type = TranslationTypeEnum.CONTENT;
    await translationRepo.save(translPhilosophyContentIT);
  }

  // Article #1 Content V1 FR Philosophy
  let translPhilosophyContentFR = await translationRepo.findOne({
    where: {
      text: `Philosophy develops a fascination for wisdom which is different from knowledge. Philosophy is a way of thinking about the world, the universe, and society. It works by asking very basic questions about the nature of human thought, the nature of the universe, and the connections between them. The ideas in philosophy are often general and abstract. But this does not mean that philosophy is not about the real world. Ethics, for example, ask about how to be good in our day to day lives. Metaphysics asks about how the world works and what it is made of. Sometimes people talk about how they have a ‘personal philosophy’, which means the way a person thinks about the world. This article is not about people's ’personal philosophies’. This article is about the ideas that have been discussed by philosophers (people who think and write about ways of thinking) for a long time.`,
      originLanguage: 'en', targetLanguage: 'fr',
    },
  });
  if (!translPhilosophyContentFR) {
    translPhilosophyContentFR = new Translations();
    translPhilosophyContentFR.originLanguage = 'en';
    translPhilosophyContentFR.targetLanguage = 'fr';
    translPhilosophyContentFR.source = TranslationSourceEnum.AUTO;
    translPhilosophyContentFR.text = `Philosophy develops a fascination for wisdom which is different from knowledge. Philosophy is a way of thinking about the world, the universe, and society. It works by asking very basic questions about the nature of human thought, the nature of the universe, and the connections between them. The ideas in philosophy are often general and abstract. But this does not mean that philosophy is not about the real world. Ethics, for example, ask about how to be good in our day to day lives. Metaphysics asks about how the world works and what it is made of. Sometimes people talk about how they have a ‘personal philosophy’, which means the way a person thinks about the world. This article is not about people's ’personal philosophies’. This article is about the ideas that have been discussed by philosophers (people who think and write about ways of thinking) for a long time.`;
    translPhilosophyContentFR.translation = `La philosophie développe une fascination pour la sagesse différente de la connaissance. La philosophie est une façon de penser le monde, l'univers et la société. Cela fonctionne en posant des questions très basiques sur la nature de la pensée humaine, la nature de l'univers et les liens qui les unissent. Les idées en philosophie sont souvent générales et abstraites. Mais cela ne signifie pas que la philosophie ne concerne pas le monde réel. L'éthique, par exemple, demande comment être bon dans notre vie quotidienne. La métaphysique demande comment le monde fonctionne et de quoi il est fait. Parfois, les gens racontent qu’ils ont une «philosophie personnelle», c’est-à-dire la façon dont une personne perçoit le monde. Cet article ne concerne pas les philosophies personnelles des gens ». Cet article traite des idées discutées par les philosophes (des personnes qui pensent et écrivent sur des façons de penser) depuis longtemps.`;
    translPhilosophyContentFR.type = TranslationTypeEnum.CONTENT;
    await translationRepo.save(translPhilosophyContentFR);
  }

  // Article #1 Content V1 ES Philosophy
  let translPhilosophyContentES = await translationRepo.findOne({
    where: {
      text: `Philosophy develops a fascination for wisdom which is different from knowledge. Philosophy is a way of thinking about the world, the universe, and society. It works by asking very basic questions about the nature of human thought, the nature of the universe, and the connections between them. The ideas in philosophy are often general and abstract. But this does not mean that philosophy is not about the real world. Ethics, for example, ask about how to be good in our day to day lives. Metaphysics asks about how the world works and what it is made of. Sometimes people talk about how they have a ‘personal philosophy’, which means the way a person thinks about the world. This article is not about people's ’personal philosophies’. This article is about the ideas that have been discussed by philosophers (people who think and write about ways of thinking) for a long time.`,
      originLanguage: 'en', targetLanguage: 'es',
    },
  });
  if (!translPhilosophyContentES) {
    translPhilosophyContentES = new Translations();
    translPhilosophyContentES.originLanguage = 'en';
    translPhilosophyContentES.targetLanguage = 'es';
    translPhilosophyContentES.source = TranslationSourceEnum.AUTO;
    translPhilosophyContentES.text = `Philosophy develops a fascination for wisdom which is different from knowledge. Philosophy is a way of thinking about the world, the universe, and society. It works by asking very basic questions about the nature of human thought, the nature of the universe, and the connections between them. The ideas in philosophy are often general and abstract. But this does not mean that philosophy is not about the real world. Ethics, for example, ask about how to be good in our day to day lives. Metaphysics asks about how the world works and what it is made of. Sometimes people talk about how they have a ‘personal philosophy’, which means the way a person thinks about the world. This article is not about people's ’personal philosophies’. This article is about the ideas that have been discussed by philosophers (people who think and write about ways of thinking) for a long time.`;
    translPhilosophyContentES.translation = `La filosofía desarrolla una fascinación por la sabiduría que es diferente del conocimiento. La filosofía es una forma de pensar sobre el mundo, el universo y la sociedad. Funciona haciendo preguntas muy básicas sobre la naturaleza del pensamiento humano, la naturaleza del universo y las conexiones entre ellos. Las ideas en filosofía son a menudo generales y abstractas. Pero esto no significa que la filosofía no se trata del mundo real. La ética, por ejemplo, pregunta cómo ser buenos en nuestra vida cotidiana. La metafísica pregunta cómo funciona el mundo y de qué está hecho. A veces las personas hablan de cómo tienen una "filosofía personal", lo que significa la forma en que una persona piensa sobre el mundo. Este artículo no trata sobre las "filosofías personales" de las personas. Este artículo trata sobre las ideas que han sido discutidas por filósofos (personas que piensan y escriben sobre formas de pensar) durante mucho tiempo.`;
    translPhilosophyContentES.type = TranslationTypeEnum.CONTENT;
    await translationRepo.save(translPhilosophyContentES);
  }

  // Article #1 Content V1 DE Philosophy
  let translPhilosophyContentDE = await translationRepo.findOne({
    where: {
      text: `Philosophy develops a fascination for wisdom which is different from knowledge. Philosophy is a way of thinking about the world, the universe, and society. It works by asking very basic questions about the nature of human thought, the nature of the universe, and the connections between them. The ideas in philosophy are often general and abstract. But this does not mean that philosophy is not about the real world. Ethics, for example, ask about how to be good in our day to day lives. Metaphysics asks about how the world works and what it is made of. Sometimes people talk about how they have a ‘personal philosophy’, which means the way a person thinks about the world. This article is not about people's ’personal philosophies’. This article is about the ideas that have been discussed by philosophers (people who think and write about ways of thinking) for a long time.`,
      originLanguage: 'en', targetLanguage: 'de',
    },
  });
  if (!translPhilosophyContentDE) {
    translPhilosophyContentDE = new Translations();
    translPhilosophyContentDE.originLanguage = 'en';
    translPhilosophyContentDE.targetLanguage = 'de';
    translPhilosophyContentDE.source = TranslationSourceEnum.AUTO;
    translPhilosophyContentDE.text = `Philosophy develops a fascination for wisdom which is different from knowledge. Philosophy is a way of thinking about the world, the universe, and society. It works by asking very basic questions about the nature of human thought, the nature of the universe, and the connections between them. The ideas in philosophy are often general and abstract. But this does not mean that philosophy is not about the real world. Ethics, for example, ask about how to be good in our day to day lives. Metaphysics asks about how the world works and what it is made of. Sometimes people talk about how they have a ‘personal philosophy’, which means the way a person thinks about the world. This article is not about people's ’personal philosophies’. This article is about the ideas that have been discussed by philosophers (people who think and write about ways of thinking) for a long time.`;
    translPhilosophyContentDE.translation = `Die Philosophie entwickelt eine Faszination für Weisheit, die sich vom Wissen unterscheidet. Philosophie ist eine Denkweise über die Welt, das Universum und die Gesellschaft. Es funktioniert, indem sehr grundlegende Fragen über die Natur des menschlichen Denkens, die Natur des Universums und die Verbindungen zwischen ihnen gestellt werden. Die Ideen in der Philosophie sind oft allgemein und abstrakt. Dies bedeutet jedoch nicht, dass es in der Philosophie nicht um die reale Welt geht. Die Ethik zum Beispiel fragt, wie man in unserem täglichen Leben gut ist. Die Metaphysik fragt, wie die Welt funktioniert und woraus sie besteht. Manchmal reden die Leute darüber, wie sie eine „persönliche Philosophie“ haben, was bedeutet, wie ein Mensch über die Welt denkt. In diesem Artikel geht es nicht um die "persönlichen Philosophien" der Menschen. In diesem Artikel geht es um die Ideen, die Philosophen (Menschen, die über Denkweisen nachdenken und darüber schreiben) seit langem diskutieren.`;
    translPhilosophyContentDE.type = TranslationTypeEnum.CONTENT;
    await translationRepo.save(translPhilosophyContentDE);
  }

  // Article #2 Title V1 DE Language
  let translLanguageTitleDE = await translationRepo.findOne({ where: { text: `Language`, originLanguage: 'en', targetLanguage: 'de' } });
  if (!translLanguageTitleDE) {
    translLanguageTitleDE = new Translations();
    translLanguageTitleDE.originLanguage = 'en';
    translLanguageTitleDE.targetLanguage = 'de';
    translLanguageTitleDE.source = TranslationSourceEnum.AUTO;
    translLanguageTitleDE.text = `Language`;
    translLanguageTitleDE.translation = `Sprache`;
    translLanguageTitleDE.type = TranslationTypeEnum.TITLE;
    await translationRepo.save(translLanguageTitleDE);
  }

  // Article #2 Title V1 BG Language
  let translLanguageTitleBG = await translationRepo.findOne({ where: { text: `Language`, originLanguage: 'en', targetLanguage: 'bg' } });
  if (!translLanguageTitleBG) {
    translLanguageTitleBG = new Translations();
    translLanguageTitleBG.originLanguage = 'en';
    translLanguageTitleBG.targetLanguage = 'bg';
    translLanguageTitleBG.source = TranslationSourceEnum.AUTO;
    translLanguageTitleBG.text = `Language`;
    translLanguageTitleBG.translation = `език`;
    translLanguageTitleBG.type = TranslationTypeEnum.TITLE;
    await translationRepo.save(translLanguageTitleBG);
  }

  // Article #2 Title V1 EN Language
  let translLanguageTitleEN = await translationRepo.findOne({ where: { text: `Language`, originLanguage: 'en', targetLanguage: 'en' } });
  if (!translLanguageTitleEN) {
    translLanguageTitleEN = new Translations();
    translLanguageTitleEN.originLanguage = 'en';
    translLanguageTitleEN.targetLanguage = 'en';
    translLanguageTitleEN.source = TranslationSourceEnum.AUTO;
    translLanguageTitleEN.text = `Language`;
    translLanguageTitleEN.translation = `Language`;
    translLanguageTitleEN.type = TranslationTypeEnum.TITLE;
    await translationRepo.save(translLanguageTitleEN);
  }

  // Article #2 Title V1 IT Language
  let translLanguageTitleIT = await translationRepo.findOne({ where: { text: `Language`, originLanguage: 'en', targetLanguage: 'it' } });
  if (!translLanguageTitleIT) {
    translLanguageTitleIT = new Translations();
    translLanguageTitleIT.originLanguage = 'en';
    translLanguageTitleIT.targetLanguage = 'it';
    translLanguageTitleIT.source = TranslationSourceEnum.AUTO;
    translLanguageTitleIT.text = `Language`;
    translLanguageTitleIT.translation = `linguaggio`;
    translLanguageTitleIT.type = TranslationTypeEnum.TITLE;
    await translationRepo.save(translLanguageTitleIT);
  }

  // Article #2 Title V1 ES Language
  let translLanguageTitleES = await translationRepo.findOne({ where: { text: `Language`, originLanguage: 'en', targetLanguage: 'es' } });
  if (!translLanguageTitleES) {
    translLanguageTitleES = new Translations();
    translLanguageTitleES.originLanguage = 'en';
    translLanguageTitleES.targetLanguage = 'es';
    translLanguageTitleES.source = TranslationSourceEnum.AUTO;
    translLanguageTitleES.text = `Language`;
    translLanguageTitleES.translation = `Idioma`;
    translLanguageTitleES.type = TranslationTypeEnum.TITLE;
    await translationRepo.save(translLanguageTitleES);
  }

  // Article #2 Title V1 FR Language
  let translLanguageTitleFR = await translationRepo.findOne({ where: { text: `Language`, originLanguage: 'en', targetLanguage: 'fr' } });
  if (!translLanguageTitleFR) {
    translLanguageTitleFR = new Translations();
    translLanguageTitleFR.originLanguage = 'en';
    translLanguageTitleFR.targetLanguage = 'fr';
    translLanguageTitleFR.source = TranslationSourceEnum.AUTO;
    translLanguageTitleFR.text = `Language`;
    translLanguageTitleFR.translation = `La langue`;
    translLanguageTitleFR.type = TranslationTypeEnum.TITLE;
    await translationRepo.save(translLanguageTitleFR);
  }

  // Article #2 Content V1 IT Language
  let translLanguageContentIT = await translationRepo.findOne({
    where: {
      text: `Language is a system that consists of the development, acquisition, maintenance, and use of complex systems of communication, particularly the human ability to do so; a language is any specific example of such a system. The scientific study of language is called linguistics. Questions concerning the philosophy of language, such as whether words can represent experience, have been debated at least since Gorgias and Plato in ancient Greece. Thinkers such as Rousseau have argued that language originated from emotions while others like Kant have held that it originated from rational and logical thought. 20th-century philosophers such as Wittgenstein argued that philosophy is really the study of language. Major figures in linguistics include Ferdinand de Saussure and Noam Chomsky.`,
      originLanguage: 'en', targetLanguage: 'it',
    },
  });
  if (!translLanguageContentIT) {
    translLanguageContentIT = new Translations();
    translLanguageContentIT.originLanguage = 'en';
    translLanguageContentIT.targetLanguage = 'it';
    translLanguageContentIT.source = TranslationSourceEnum.AUTO;
    translLanguageContentIT.text = `Language is a system that consists of the development, acquisition, maintenance, and use of complex systems of communication, particularly the human ability to do so; a language is any specific example of such a system. The scientific study of language is called linguistics. Questions concerning the philosophy of language, such as whether words can represent experience, have been debated at least since Gorgias and Plato in ancient Greece. Thinkers such as Rousseau have argued that language originated from emotions while others like Kant have held that it originated from rational and logical thought. 20th-century philosophers such as Wittgenstein argued that philosophy is really the study of language. Major figures in linguistics include Ferdinand de Saussure and Noam Chomsky.`;
    translLanguageContentIT.translation = `La lingua è un sistema che consiste nello sviluppo, acquisizione, manutenzione e uso di sistemi complessi di comunicazione, in particolare la capacità umana di farlo; una lingua è un esempio specifico di tale sistema. Lo studio scientifico della lingua si chiama linguistica. Le domande riguardanti la filosofia del linguaggio, come ad esempio se le parole possono rappresentare esperienza, sono state dibattute almeno da Gorgia e Platone nell'antica Grecia. Pensatori come Rousseau hanno sostenuto che il linguaggio ha avuto origine dalle emozioni, mentre altri come Kant hanno sostenuto che proveniva dal pensiero razionale e logico. Filosofi del 20 ° secolo come Wittgenstein sostenevano che la filosofia è davvero lo studio del linguaggio. I principali personaggi della linguistica includono Ferdinand de Saussure e Noam Chomsky.`;
    translLanguageContentIT.type = TranslationTypeEnum.CONTENT;
    await translationRepo.save(translLanguageContentIT);
  }

  // Article #2 Content V1 BG Language
  let translLanguageContentBG = await translationRepo.findOne({
    where: {
      text: `Language is a system that consists of the development, acquisition, maintenance, and use of complex systems of communication, particularly the human ability to do so; a language is any specific example of such a system. The scientific study of language is called linguistics. Questions concerning the philosophy of language, such as whether words can represent experience, have been debated at least since Gorgias and Plato in ancient Greece. Thinkers such as Rousseau have argued that language originated from emotions while others like Kant have held that it originated from rational and logical thought. 20th-century philosophers such as Wittgenstein argued that philosophy is really the study of language. Major figures in linguistics include Ferdinand de Saussure and Noam Chomsky.`,
      originLanguage: 'en', targetLanguage: 'bg',
    },
  });
  if (!translLanguageContentBG) {
    translLanguageContentBG = new Translations();
    translLanguageContentBG.originLanguage = 'en';
    translLanguageContentBG.targetLanguage = 'bg';
    translLanguageContentBG.source = TranslationSourceEnum.AUTO;
    translLanguageContentBG.text = `Language is a system that consists of the development, acquisition, maintenance, and use of complex systems of communication, particularly the human ability to do so; a language is any specific example of such a system. The scientific study of language is called linguistics. Questions concerning the philosophy of language, such as whether words can represent experience, have been debated at least since Gorgias and Plato in ancient Greece. Thinkers such as Rousseau have argued that language originated from emotions while others like Kant have held that it originated from rational and logical thought. 20th-century philosophers such as Wittgenstein argued that philosophy is really the study of language. Major figures in linguistics include Ferdinand de Saussure and Noam Chomsky.`;
    translLanguageContentBG.translation = `Езикът е система, която се състои в разработването, придобиването, поддържането и използването на сложни комуникационни системи, по-специално способността на човека да го прави; език е всеки конкретен пример за такава система. Научното изучаване на езика се нарича лингвистика. Въпросите, отнасящи се до философията на езика, като например дали думите могат да представляват опит, са дискутирани поне от Горгий и Платон в древна Гърция. Мислители като Русо твърдят, че езикът произхожда от емоции, докато други като Кант са приели, че той произхожда от рационална и логическа мисъл. Философи от 20 век като Витгенщайн твърдят, че философията наистина е изучаването на езика. Основни фигури в лингвистиката включват Фердинанд дьо Сосюр и Ноам Чомски.`;
    translLanguageContentBG.type = TranslationTypeEnum.CONTENT;
    await translationRepo.save(translLanguageContentBG);
  }

  // Article #2 Content V1 FR Language
  let translLanguageContentFR = await translationRepo.findOne({
    where: {
      text: `Language is a system that consists of the development, acquisition, maintenance, and use of complex systems of communication, particularly the human ability to do so; a language is any specific example of such a system. The scientific study of language is called linguistics. Questions concerning the philosophy of language, such as whether words can represent experience, have been debated at least since Gorgias and Plato in ancient Greece. Thinkers such as Rousseau have argued that language originated from emotions while others like Kant have held that it originated from rational and logical thought. 20th-century philosophers such as Wittgenstein argued that philosophy is really the study of language. Major figures in linguistics include Ferdinand de Saussure and Noam Chomsky.`,
      originLanguage: 'en', targetLanguage: 'fr',
    },
  });
  if (!translLanguageContentFR) {
    translLanguageContentFR = new Translations();
    translLanguageContentFR.originLanguage = 'en';
    translLanguageContentFR.targetLanguage = 'fr';
    translLanguageContentFR.source = TranslationSourceEnum.AUTO;
    translLanguageContentFR.text = `Language is a system that consists of the development, acquisition, maintenance, and use of complex systems of communication, particularly the human ability to do so; a language is any specific example of such a system. The scientific study of language is called linguistics. Questions concerning the philosophy of language, such as whether words can represent experience, have been debated at least since Gorgias and Plato in ancient Greece. Thinkers such as Rousseau have argued that language originated from emotions while others like Kant have held that it originated from rational and logical thought. 20th-century philosophers such as Wittgenstein argued that philosophy is really the study of language. Major figures in linguistics include Ferdinand de Saussure and Noam Chomsky.`;
    translLanguageContentFR.translation = `La langue est un système qui comprend le développement, l'acquisition, la maintenance et l'utilisation de systèmes de communication complexes, en particulier la capacité humaine à le faire. une langue est un exemple spécifique d'un tel système. L'étude scientifique de la langue s'appelle la linguistique. Des questions concernant la philosophie du langage, comme par exemple savoir si les mots peuvent représenter une expérience, ont été débattues au moins depuis Gorgias et Platon dans la Grèce antique. Des penseurs tels que Rousseau ont soutenu que le langage provenait d'émotions alors que d'autres, comme Kant, estimaient qu'il provenait d'une pensée rationnelle et logique. Les philosophes du 20ème siècle tels que Wittgenstein ont fait valoir que la philosophie est vraiment l'étude du langage. Les principales figures de la linguistique comprennent Ferdinand de Saussure et Noam Chomsky.`;
    translLanguageContentFR.type = TranslationTypeEnum.CONTENT;
    await translationRepo.save(translLanguageContentFR);
  }

  // Article #2 Content V1 EN Language
  let translLanguageContentEN = await translationRepo.findOne({
    where: {
      text: `Language is a system that consists of the development, acquisition, maintenance, and use of complex systems of communication, particularly the human ability to do so; a language is any specific example of such a system. The scientific study of language is called linguistics. Questions concerning the philosophy of language, such as whether words can represent experience, have been debated at least since Gorgias and Plato in ancient Greece. Thinkers such as Rousseau have argued that language originated from emotions while others like Kant have held that it originated from rational and logical thought. 20th-century philosophers such as Wittgenstein argued that philosophy is really the study of language. Major figures in linguistics include Ferdinand de Saussure and Noam Chomsky.`,
      originLanguage: 'en', targetLanguage: 'en',
    },
  });
  if (!translLanguageContentEN) {
    translLanguageContentEN = new Translations();
    translLanguageContentEN.originLanguage = 'en';
    translLanguageContentEN.targetLanguage = 'en';
    translLanguageContentEN.source = TranslationSourceEnum.AUTO;
    translLanguageContentEN.text = `Language is a system that consists of the development, acquisition, maintenance, and use of complex systems of communication, particularly the human ability to do so; a language is any specific example of such a system. The scientific study of language is called linguistics. Questions concerning the philosophy of language, such as whether words can represent experience, have been debated at least since Gorgias and Plato in ancient Greece. Thinkers such as Rousseau have argued that language originated from emotions while others like Kant have held that it originated from rational and logical thought. 20th-century philosophers such as Wittgenstein argued that philosophy is really the study of language. Major figures in linguistics include Ferdinand de Saussure and Noam Chomsky.`;
    translLanguageContentEN.translation = `Language is a system that consists of the development, acquisition, maintenance, and use of complex systems of communication, particularly the human ability to do so; a language is any specific example of such a system. The scientific study of language is called linguistics. Questions concerning the philosophy of language, such as whether words can represent experience, have been debated at least since Gorgias and Plato in ancient Greece. Thinkers such as Rousseau have argued that language originated from emotions while others like Kant have held that it originated from rational and logical thought. 20th-century philosophers such as Wittgenstein argued that philosophy is really the study of language. Major figures in linguistics include Ferdinand de Saussure and Noam Chomsky.`;
    translLanguageContentEN.type = TranslationTypeEnum.CONTENT;
    await translationRepo.save(translLanguageContentEN);
  }

  // Article #2 Content V1 ES Language
  let translLanguageContentES = await translationRepo.findOne({
    where: {
      text: `Language is a system that consists of the development, acquisition, maintenance, and use of complex systems of communication, particularly the human ability to do so; a language is any specific example of such a system. The scientific study of language is called linguistics. Questions concerning the philosophy of language, such as whether words can represent experience, have been debated at least since Gorgias and Plato in ancient Greece. Thinkers such as Rousseau have argued that language originated from emotions while others like Kant have held that it originated from rational and logical thought. 20th-century philosophers such as Wittgenstein argued that philosophy is really the study of language. Major figures in linguistics include Ferdinand de Saussure and Noam Chomsky.`,
      originLanguage: 'en', targetLanguage: 'es',
    },
  });
  if (!translLanguageContentES) {
    translLanguageContentES = new Translations();
    translLanguageContentES.originLanguage = 'en';
    translLanguageContentES.targetLanguage = 'es';
    translLanguageContentES.source = TranslationSourceEnum.AUTO;
    translLanguageContentES.text = `Language is a system that consists of the development, acquisition, maintenance, and use of complex systems of communication, particularly the human ability to do so; a language is any specific example of such a system. The scientific study of language is called linguistics. Questions concerning the philosophy of language, such as whether words can represent experience, have been debated at least since Gorgias and Plato in ancient Greece. Thinkers such as Rousseau have argued that language originated from emotions while others like Kant have held that it originated from rational and logical thought. 20th-century philosophers such as Wittgenstein argued that philosophy is really the study of language. Major figures in linguistics include Ferdinand de Saussure and Noam Chomsky.`;
    translLanguageContentES.translation = `El lenguaje es un sistema que consiste en el desarrollo, adquisición, mantenimiento y uso de sistemas complejos de comunicación, particularmente la capacidad humana para hacerlo; un lenguaje es cualquier ejemplo específico de dicho sistema. El estudio científico del lenguaje se llama lingüística. Preguntas sobre la filosofía del lenguaje, como si las palabras pueden representar la experiencia, se han debatido al menos desde Gorgias y Platón en la antigua Grecia. Pensadores como Rousseau han argumentado que el lenguaje se originó de las emociones, mientras que otros como Kant sostuvieron que se originó del pensamiento racional y lógico. Filósofos del siglo XX como Wittgenstein argumentaron que la filosofía es realmente el estudio del lenguaje. Las principales figuras de la lingüística incluyen a Ferdinand de Saussure y Noam Chomsky.`;
    translLanguageContentES.type = TranslationTypeEnum.CONTENT;
    await translationRepo.save(translLanguageContentES);
  }

  // Article #2 Content V1 DE Language
  let translLanguageContentDE = await translationRepo.findOne({
    where: {
      text: `Language is a system that consists of the development, acquisition, maintenance, and use of complex systems of communication, particularly the human ability to do so; a language is any specific example of such a system. The scientific study of language is called linguistics. Questions concerning the philosophy of language, such as whether words can represent experience, have been debated at least since Gorgias and Plato in ancient Greece. Thinkers such as Rousseau have argued that language originated from emotions while others like Kant have held that it originated from rational and logical thought. 20th-century philosophers such as Wittgenstein argued that philosophy is really the study of language. Major figures in linguistics include Ferdinand de Saussure and Noam Chomsky.`,
      originLanguage: 'en', targetLanguage: 'de',
    },
  });
  if (!translLanguageContentDE) {
    translLanguageContentDE = new Translations();
    translLanguageContentDE.originLanguage = 'en';
    translLanguageContentDE.targetLanguage = 'de';
    translLanguageContentDE.source = TranslationSourceEnum.AUTO;
    translLanguageContentDE.text = `Language is a system that consists of the development, acquisition, maintenance, and use of complex systems of communication, particularly the human ability to do so; a language is any specific example of such a system. The scientific study of language is called linguistics. Questions concerning the philosophy of language, such as whether words can represent experience, have been debated at least since Gorgias and Plato in ancient Greece. Thinkers such as Rousseau have argued that language originated from emotions while others like Kant have held that it originated from rational and logical thought. 20th-century philosophers such as Wittgenstein argued that philosophy is really the study of language. Major figures in linguistics include Ferdinand de Saussure and Noam Chomsky.`;
    translLanguageContentDE.translation = `Sprache ist ein System, das aus der Entwicklung, dem Erwerb, der Aufrechterhaltung und dem Einsatz komplexer Kommunikationssysteme besteht, insbesondere der menschlichen Fähigkeit, dies zu tun. Eine Sprache ist ein spezifisches Beispiel für ein solches System. Das wissenschaftliche Studium der Sprache heißt Linguistik. Spätestens seit Gorgias und Platon im antiken Griechenland wurde über Fragen der Sprachphilosophie diskutiert, ob Wörter Erfahrung repräsentieren können. Denker wie Rousseau haben argumentiert, dass Sprache von Emotionen herrührt, während andere wie Kant der Meinung sind, dass sie von rationalem und logischem Denken herrührt. Philosophen des 20. Jahrhunderts wie Wittgenstein argumentierten, dass Philosophie wirklich das Studium der Sprache ist. Zu den wichtigsten linguistischen Persönlichkeiten zählen Ferdinand de Saussure und Noam Chomsky.`;
    translLanguageContentDE.type = TranslationTypeEnum.CONTENT;
    await translationRepo.save(translLanguageContentDE);
  }

  // Article #3 Title V1 EN TranslationBiology
  let translTranslationBiologyTitleEN = await translationRepo.findOne({ where: { text: `Translation (biology)`, originLanguage: 'en', targetLanguage: 'en' } });
  if (!translTranslationBiologyTitleEN) {
    translTranslationBiologyTitleEN = new Translations();
    translTranslationBiologyTitleEN.originLanguage = 'en';
    translTranslationBiologyTitleEN.targetLanguage = 'en';
    translTranslationBiologyTitleEN.source = TranslationSourceEnum.AUTO;
    translTranslationBiologyTitleEN.text = `Translation (biology)`;
    translTranslationBiologyTitleEN.translation = `Translation (biology)`;
    translTranslationBiologyTitleEN.type = TranslationTypeEnum.TITLE;
    await translationRepo.save(translTranslationBiologyTitleEN);
  }

  // Article #3 Title V1 BG TranslationBiology
  let translTranslationBiologyTitleBG = await translationRepo.findOne({ where: { text: `Translation (biology)`, originLanguage: 'en', targetLanguage: 'bg' } });
  if (!translTranslationBiologyTitleBG) {
    translTranslationBiologyTitleBG = new Translations();
    translTranslationBiologyTitleBG.originLanguage = 'en';
    translTranslationBiologyTitleBG.targetLanguage = 'bg';
    translTranslationBiologyTitleBG.source = TranslationSourceEnum.AUTO;
    translTranslationBiologyTitleBG.text = `Translation (biology)`;
    translTranslationBiologyTitleBG.translation = `Превод (биология)`;
    translTranslationBiologyTitleBG.type = TranslationTypeEnum.TITLE;
    await translationRepo.save(translTranslationBiologyTitleBG);
  }

  // Article #3 Title V1 DE TranslationBiology
  let translTranslationBiologyTitleDE = await translationRepo.findOne({ where: { text: `Translation (biology)`, originLanguage: 'en', targetLanguage: 'de' } });
  if (!translTranslationBiologyTitleDE) {
    translTranslationBiologyTitleDE = new Translations();
    translTranslationBiologyTitleDE.originLanguage = 'en';
    translTranslationBiologyTitleDE.targetLanguage = 'de';
    translTranslationBiologyTitleDE.source = TranslationSourceEnum.AUTO;
    translTranslationBiologyTitleDE.text = `Translation (biology)`;
    translTranslationBiologyTitleDE.translation = `Übersetzung (Biologie)`;
    translTranslationBiologyTitleDE.type = TranslationTypeEnum.TITLE;
    await translationRepo.save(translTranslationBiologyTitleDE);
  }

  // Article #3 Title V1 FR TranslationBiology
  let translTranslationBiologyTitleFR = await translationRepo.findOne({ where: { text: `Translation (biology)`, originLanguage: 'en', targetLanguage: 'fr' } });
  if (!translTranslationBiologyTitleFR) {
    translTranslationBiologyTitleFR = new Translations();
    translTranslationBiologyTitleFR.originLanguage = 'en';
    translTranslationBiologyTitleFR.targetLanguage = 'fr';
    translTranslationBiologyTitleFR.source = TranslationSourceEnum.AUTO;
    translTranslationBiologyTitleFR.text = `Translation (biology)`;
    translTranslationBiologyTitleFR.translation = `Traduction (biologie)`;
    translTranslationBiologyTitleFR.type = TranslationTypeEnum.TITLE;
    await translationRepo.save(translTranslationBiologyTitleFR);
  }

  // Article #3 Title V1 ES TranslationBiology
  let translTranslationBiologyTitleES = await translationRepo.findOne({ where: { text: `Translation (biology)`, originLanguage: 'en', targetLanguage: 'es' } });
  if (!translTranslationBiologyTitleES) {
    translTranslationBiologyTitleES = new Translations();
    translTranslationBiologyTitleES.originLanguage = 'en';
    translTranslationBiologyTitleES.targetLanguage = 'es';
    translTranslationBiologyTitleES.source = TranslationSourceEnum.AUTO;
    translTranslationBiologyTitleES.text = `Translation (biology)`;
    translTranslationBiologyTitleES.translation = `Traducción (biología)`;
    translTranslationBiologyTitleES.type = TranslationTypeEnum.TITLE;
    await translationRepo.save(translTranslationBiologyTitleES);
  }

  // Article #3 Title V1 IT TranslationBiology
  let translTranslationBiologyTitleIT = await translationRepo.findOne({ where: { text: `Translation (biology)`, originLanguage: 'en', targetLanguage: 'it' } });
  if (!translTranslationBiologyTitleIT) {
    translTranslationBiologyTitleIT = new Translations();
    translTranslationBiologyTitleIT.originLanguage = 'en';
    translTranslationBiologyTitleIT.targetLanguage = 'it';
    translTranslationBiologyTitleIT.source = TranslationSourceEnum.AUTO;
    translTranslationBiologyTitleIT.text = `Translation (biology)`;
    translTranslationBiologyTitleIT.translation = `Traduzione (biologia)`;
    translTranslationBiologyTitleIT.type = TranslationTypeEnum.TITLE;
    await translationRepo.save(translTranslationBiologyTitleIT);
  }

  // Article #3 Content V1 EN TranslationBiology
  let translTranslationBiologyContentEN = await translationRepo.findOne({
    where: {
      text: `In molecular biology and genetics, translation is the process in which ribosomes in the cytoplasm or ER synthesize proteins after the process of transcription of DNA to RNA in the cell's nucleus. The entire process is called gene expression. In translation, messenger RNA (mRNA) is decoded in the ribosome decoding center to produce a specific amino acid chain or polypeptide. The polypeptide later folds into an active protein and performs its functions in the cell. The ribosome facilitates decoding by inducing the binding of complementary tRNA anticodon sequences to mRNA codons. The tRNAs carry specific amino acids that are chained together into a polypeptide as the mRNA passes through and is read by the ribosome.`,
      originLanguage: 'en', targetLanguage: 'en',
    },
  });
  if (!translTranslationBiologyContentEN) {
    translTranslationBiologyContentEN = new Translations();
    translTranslationBiologyContentEN.originLanguage = 'en';
    translTranslationBiologyContentEN.targetLanguage = 'en';
    translTranslationBiologyContentEN.source = TranslationSourceEnum.AUTO;
    translTranslationBiologyContentEN.text = `In molecular biology and genetics, translation is the process in which ribosomes in the cytoplasm or ER synthesize proteins after the process of transcription of DNA to RNA in the cell's nucleus. The entire process is called gene expression. In translation, messenger RNA (mRNA) is decoded in the ribosome decoding center to produce a specific amino acid chain or polypeptide. The polypeptide later folds into an active protein and performs its functions in the cell. The ribosome facilitates decoding by inducing the binding of complementary tRNA anticodon sequences to mRNA codons. The tRNAs carry specific amino acids that are chained together into a polypeptide as the mRNA passes through and is read by the ribosome.`;
    translTranslationBiologyContentEN.translation = `In molecular biology and genetics, translation is the process in which ribosomes in the cytoplasm or ER synthesize proteins after the process of transcription of DNA to RNA in the cell's nucleus. The entire process is called gene expression. In translation, messenger RNA (mRNA) is decoded in the ribosome decoding center to produce a specific amino acid chain or polypeptide. The polypeptide later folds into an active protein and performs its functions in the cell. The ribosome facilitates decoding by inducing the binding of complementary tRNA anticodon sequences to mRNA codons. The tRNAs carry specific amino acids that are chained together into a polypeptide as the mRNA passes through and is read by the ribosome.`;
    translTranslationBiologyContentEN.type = TranslationTypeEnum.CONTENT;
    await translationRepo.save(translTranslationBiologyContentEN);
  }

  // Article #3 Content V1 BG TranslationBiology
  let translTranslationBiologyContentBG = await translationRepo.findOne({
    where: {
      text: `In molecular biology and genetics, translation is the process in which ribosomes in the cytoplasm or ER synthesize proteins after the process of transcription of DNA to RNA in the cell's nucleus. The entire process is called gene expression. In translation, messenger RNA (mRNA) is decoded in the ribosome decoding center to produce a specific amino acid chain or polypeptide. The polypeptide later folds into an active protein and performs its functions in the cell. The ribosome facilitates decoding by inducing the binding of complementary tRNA anticodon sequences to mRNA codons. The tRNAs carry specific amino acids that are chained together into a polypeptide as the mRNA passes through and is read by the ribosome.`,
      originLanguage: 'en', targetLanguage: 'bg',
    },
  });
  if (!translTranslationBiologyContentBG) {
    translTranslationBiologyContentBG = new Translations();
    translTranslationBiologyContentBG.originLanguage = 'en';
    translTranslationBiologyContentBG.targetLanguage = 'bg';
    translTranslationBiologyContentBG.source = TranslationSourceEnum.AUTO;
    translTranslationBiologyContentBG.text = `In molecular biology and genetics, translation is the process in which ribosomes in the cytoplasm or ER synthesize proteins after the process of transcription of DNA to RNA in the cell's nucleus. The entire process is called gene expression. In translation, messenger RNA (mRNA) is decoded in the ribosome decoding center to produce a specific amino acid chain or polypeptide. The polypeptide later folds into an active protein and performs its functions in the cell. The ribosome facilitates decoding by inducing the binding of complementary tRNA anticodon sequences to mRNA codons. The tRNAs carry specific amino acids that are chained together into a polypeptide as the mRNA passes through and is read by the ribosome.`;
    translTranslationBiologyContentBG.translation = `В молекулярната биология и генетика преводът е процесът, при който рибозомите в цитоплазмата или ER синтезират протеини след процеса на транскрипция на ДНК в РНК в ядрото на клетката. Целият процес се нарича генна експресия. В превод, пратената РНК (тРНК) се декодира в центъра за декодиране на рибозомата, за да се получи специфична аминокиселинна верига или полипептид. По-късно полипептидът се сгъва в активен протеин и изпълнява функциите си в клетката. Рибозомата улеснява декодирането чрез индуциране на свързването на комплементарни tRNA антикодонови последователности с mRNA кодони. ТРНК съдържат специфични аминокиселини, които са свързани във верига в полипептид, докато мРНК преминава през и се чете от рибозомата.`;
    translTranslationBiologyContentBG.type = TranslationTypeEnum.CONTENT;
    await translationRepo.save(translTranslationBiologyContentBG);
  }

  // Article #3 Content V1 ES TranslationBiology
  let translTranslationBiologyContentES = await translationRepo.findOne({
    where: {
      text: `In molecular biology and genetics, translation is the process in which ribosomes in the cytoplasm or ER synthesize proteins after the process of transcription of DNA to RNA in the cell's nucleus. The entire process is called gene expression. In translation, messenger RNA (mRNA) is decoded in the ribosome decoding center to produce a specific amino acid chain or polypeptide. The polypeptide later folds into an active protein and performs its functions in the cell. The ribosome facilitates decoding by inducing the binding of complementary tRNA anticodon sequences to mRNA codons. The tRNAs carry specific amino acids that are chained together into a polypeptide as the mRNA passes through and is read by the ribosome.`,
      originLanguage: 'en', targetLanguage: 'es',
    },
  });
  if (!translTranslationBiologyContentES) {
    translTranslationBiologyContentES = new Translations();
    translTranslationBiologyContentES.originLanguage = 'en';
    translTranslationBiologyContentES.targetLanguage = 'es';
    translTranslationBiologyContentES.source = TranslationSourceEnum.AUTO;
    translTranslationBiologyContentES.text = `In molecular biology and genetics, translation is the process in which ribosomes in the cytoplasm or ER synthesize proteins after the process of transcription of DNA to RNA in the cell's nucleus. The entire process is called gene expression. In translation, messenger RNA (mRNA) is decoded in the ribosome decoding center to produce a specific amino acid chain or polypeptide. The polypeptide later folds into an active protein and performs its functions in the cell. The ribosome facilitates decoding by inducing the binding of complementary tRNA anticodon sequences to mRNA codons. The tRNAs carry specific amino acids that are chained together into a polypeptide as the mRNA passes through and is read by the ribosome.`;
    translTranslationBiologyContentES.translation = `En biología molecular y genética, la traducción es el proceso en el cual los ribosomas en el citoplasma o ER sintetizan proteínas después del proceso de transcripción de ADN a ARN en el núcleo de la célula. Todo el proceso se llama expresión génica. En la traducción, el ARN mensajero (ARNm) se decodifica en el centro de decodificación de ribosomas para producir una cadena o polipéptido de aminoácidos específico. El polipéptido luego se pliega en una proteína activa y realiza sus funciones en la célula. El ribosoma facilita la decodificación al inducir la unión de secuencias anticontonadoras de ARNt complementarias a codones de ARNm. Los ARNt transportan aminoácidos específicos que se encadenan en un polipéptido a medida que el ARNm pasa a través del ribosoma y lo lee.`;
    translTranslationBiologyContentES.type = TranslationTypeEnum.CONTENT;
    await translationRepo.save(translTranslationBiologyContentES);
  }

  // Article #3 Content V1 FR TranslationBiology
  let translTranslationBiologyContentFR = await translationRepo.findOne({
    where: {
      text: `In molecular biology and genetics, translation is the process in which ribosomes in the cytoplasm or ER synthesize proteins after the process of transcription of DNA to RNA in the cell's nucleus. The entire process is called gene expression. In translation, messenger RNA (mRNA) is decoded in the ribosome decoding center to produce a specific amino acid chain or polypeptide. The polypeptide later folds into an active protein and performs its functions in the cell. The ribosome facilitates decoding by inducing the binding of complementary tRNA anticodon sequences to mRNA codons. The tRNAs carry specific amino acids that are chained together into a polypeptide as the mRNA passes through and is read by the ribosome.`,
      originLanguage: 'en', targetLanguage: 'fr',
    },
  });
  if (!translTranslationBiologyContentFR) {
    translTranslationBiologyContentFR = new Translations();
    translTranslationBiologyContentFR.originLanguage = 'en';
    translTranslationBiologyContentFR.targetLanguage = 'fr';
    translTranslationBiologyContentFR.source = TranslationSourceEnum.AUTO;
    translTranslationBiologyContentFR.text = `In molecular biology and genetics, translation is the process in which ribosomes in the cytoplasm or ER synthesize proteins after the process of transcription of DNA to RNA in the cell's nucleus. The entire process is called gene expression. In translation, messenger RNA (mRNA) is decoded in the ribosome decoding center to produce a specific amino acid chain or polypeptide. The polypeptide later folds into an active protein and performs its functions in the cell. The ribosome facilitates decoding by inducing the binding of complementary tRNA anticodon sequences to mRNA codons. The tRNAs carry specific amino acids that are chained together into a polypeptide as the mRNA passes through and is read by the ribosome.`;
    translTranslationBiologyContentFR.translation = `En biologie moléculaire et en génétique, la traduction est le processus par lequel les ribosomes du cytoplasme ou du RE synthétisent des protéines après le processus de transcription de l'ADN en ARN dans le noyau de la cellule. L'ensemble du processus s'appelle l'expression des gènes. En traduction, l'ARN messager (ARNm) est décodé dans le centre de décodage du ribosome pour produire une chaîne ou un polypeptide d'acide aminé spécifique. Le polypeptide se plie ensuite en une protéine active et remplit ses fonctions dans la cellule. Le ribosome facilite le décodage en induisant la liaison de séquences anticodon d'ARN complémentaires à des codons d'ARNm. Les ARNt portent des acides aminés spécifiques qui sont enchaînés en un polypeptide lorsque l'ARNm passe à travers et est lu par le ribosome.`;
    translTranslationBiologyContentFR.type = TranslationTypeEnum.CONTENT;
    await translationRepo.save(translTranslationBiologyContentFR);
  }

  // Article #3 Content V1 IT TranslationBiology
  let translTranslationBiologyContentIT = await translationRepo.findOne({
    where: {
      text: `In molecular biology and genetics, translation is the process in which ribosomes in the cytoplasm or ER synthesize proteins after the process of transcription of DNA to RNA in the cell's nucleus. The entire process is called gene expression. In translation, messenger RNA (mRNA) is decoded in the ribosome decoding center to produce a specific amino acid chain or polypeptide. The polypeptide later folds into an active protein and performs its functions in the cell. The ribosome facilitates decoding by inducing the binding of complementary tRNA anticodon sequences to mRNA codons. The tRNAs carry specific amino acids that are chained together into a polypeptide as the mRNA passes through and is read by the ribosome.`,
      originLanguage: 'en', targetLanguage: 'it',
    },
  });
  if (!translTranslationBiologyContentIT) {
    translTranslationBiologyContentIT = new Translations();
    translTranslationBiologyContentIT.originLanguage = 'en';
    translTranslationBiologyContentIT.targetLanguage = 'it';
    translTranslationBiologyContentIT.source = TranslationSourceEnum.AUTO;
    translTranslationBiologyContentIT.text = `In molecular biology and genetics, translation is the process in which ribosomes in the cytoplasm or ER synthesize proteins after the process of transcription of DNA to RNA in the cell's nucleus. The entire process is called gene expression. In translation, messenger RNA (mRNA) is decoded in the ribosome decoding center to produce a specific amino acid chain or polypeptide. The polypeptide later folds into an active protein and performs its functions in the cell. The ribosome facilitates decoding by inducing the binding of complementary tRNA anticodon sequences to mRNA codons. The tRNAs carry specific amino acids that are chained together into a polypeptide as the mRNA passes through and is read by the ribosome.`;
    translTranslationBiologyContentIT.translation = `In biologia molecolare e genetica, la traduzione è il processo in cui i ribosomi nel citoplasma o ER sintetizzano le proteine dopo il processo di trascrizione del DNA in RNA nel nucleo della cellula. L'intero processo si chiama espressione genica. Nella traduzione, l'RNA messaggero (mRNA) viene decodificato nel centro di decodifica ribosomiale per produrre una specifica catena di aminoacidi o polipeptide. Il polipeptide successivamente si piega in una proteina attiva e svolge le sue funzioni nella cellula. Il ribosoma facilita la decodifica inducendo il legame delle sequenze complementari di anticorpo di tRNA con codoni di mRNA. I tRNA trasportano specifici aminoacidi che sono incatenati in un polipeptide mentre l'mRNA attraversa e viene letto dal ribosoma.`;
    translTranslationBiologyContentIT.type = TranslationTypeEnum.CONTENT;
    await translationRepo.save(translTranslationBiologyContentIT);
  }

  // Article #3 Content V1 DE TranslationBiology
  let translTranslationBiologyContentDE = await translationRepo.findOne({
    where: {
      text: `In molecular biology and genetics, translation is the process in which ribosomes in the cytoplasm or ER synthesize proteins after the process of transcription of DNA to RNA in the cell's nucleus. The entire process is called gene expression. In translation, messenger RNA (mRNA) is decoded in the ribosome decoding center to produce a specific amino acid chain or polypeptide. The polypeptide later folds into an active protein and performs its functions in the cell. The ribosome facilitates decoding by inducing the binding of complementary tRNA anticodon sequences to mRNA codons. The tRNAs carry specific amino acids that are chained together into a polypeptide as the mRNA passes through and is read by the ribosome.`,
      originLanguage: 'en', targetLanguage: 'de',
    },
  });
  if (!translTranslationBiologyContentDE) {
    translTranslationBiologyContentDE = new Translations();
    translTranslationBiologyContentDE.originLanguage = 'en';
    translTranslationBiologyContentDE.targetLanguage = 'de';
    translTranslationBiologyContentDE.source = TranslationSourceEnum.AUTO;
    translTranslationBiologyContentDE.text = `In molecular biology and genetics, translation is the process in which ribosomes in the cytoplasm or ER synthesize proteins after the process of transcription of DNA to RNA in the cell's nucleus. The entire process is called gene expression. In translation, messenger RNA (mRNA) is decoded in the ribosome decoding center to produce a specific amino acid chain or polypeptide. The polypeptide later folds into an active protein and performs its functions in the cell. The ribosome facilitates decoding by inducing the binding of complementary tRNA anticodon sequences to mRNA codons. The tRNAs carry specific amino acids that are chained together into a polypeptide as the mRNA passes through and is read by the ribosome.`;
    translTranslationBiologyContentDE.translation = `In der Molekularbiologie und Genetik ist Translation der Prozess, bei dem Ribosomen im Zytoplasma oder ER Proteine nach dem Prozess der Transkription von DNA zu RNA im Zellkern synthetisieren. Der gesamte Prozess wird als Genexpression bezeichnet. In der Translation wird Messenger-RNA (mRNA) im Ribosomendecodierungszentrum decodiert, um eine spezifische Aminosäurekette oder ein spezifisches Polypeptid zu produzieren. Das Polypeptid faltet sich später zu einem aktiven Protein und übt seine Funktionen in der Zelle aus. Das Ribosom erleichtert die Decodierung, indem es die Bindung von komplementären tRNA-Anticodon-Sequenzen an mRNA-Codons induziert. Die tRNAs tragen spezifische Aminosäuren, die beim Durchgang der mRNA zu einem Polypeptid verkettet sind und vom Ribosom gelesen werden.`;
    translTranslationBiologyContentDE.type = TranslationTypeEnum.CONTENT;
    await translationRepo.save(translTranslationBiologyContentDE);
  }

  // Article #4 Title V1 FR Tesla-Cyber-Truck
  let translTeslaCyberTruckTitleFR = await translationRepo.findOne({
    where: {
      text: `Tesla Cyber Truck`, originLanguage: 'en', targetLanguage: 'fr',
    },
  });
  if (!translTeslaCyberTruckTitleFR) {
    translTeslaCyberTruckTitleFR = new Translations();
    translTeslaCyberTruckTitleFR.originLanguage = 'en';
    translTeslaCyberTruckTitleFR.targetLanguage = 'fr';
    translTeslaCyberTruckTitleFR.source = TranslationSourceEnum.AUTO;
    translTeslaCyberTruckTitleFR.text = `Tesla Cyber Truck`;
    translTeslaCyberTruckTitleFR.translation = `Tesla Cyber Truck`;
    translTeslaCyberTruckTitleFR.type = TranslationTypeEnum.TITLE;
    await translationRepo.save(translTeslaCyberTruckTitleFR);
  }

  // Article #4 Title V1 ES Tesla-Cyber-Truck
  let translTeslaCyberTruckTitleES = await translationRepo.findOne({
    where: {
      text: `Tesla Cyber Truck`, originLanguage: 'en', targetLanguage: 'es',
    },
  });
  if (!translTeslaCyberTruckTitleES) {
    translTeslaCyberTruckTitleES = new Translations();
    translTeslaCyberTruckTitleES.originLanguage = 'en';
    translTeslaCyberTruckTitleES.targetLanguage = 'es';
    translTeslaCyberTruckTitleES.source = TranslationSourceEnum.AUTO;
    translTeslaCyberTruckTitleES.text = `Tesla Cyber Truck`;
    translTeslaCyberTruckTitleES.translation = `Tesla Cyber Truck`;
    translTeslaCyberTruckTitleES.type = TranslationTypeEnum.TITLE;
    await translationRepo.save(translTeslaCyberTruckTitleES);
  }

  // Article #4 Title V1 IT Tesla-Cyber-Truck
  let translTeslaCyberTruckTitleIT = await translationRepo.findOne({
    where: {
      text: `Tesla Cyber Truck`, originLanguage: 'en', targetLanguage: 'it',
    },
  });
  if (!translTeslaCyberTruckTitleIT) {
    translTeslaCyberTruckTitleIT = new Translations();
    translTeslaCyberTruckTitleIT.originLanguage = 'en';
    translTeslaCyberTruckTitleIT.targetLanguage = 'it';
    translTeslaCyberTruckTitleIT.source = TranslationSourceEnum.AUTO;
    translTeslaCyberTruckTitleIT.text = `Tesla Cyber Truck`;
    translTeslaCyberTruckTitleIT.translation = `Tesla Cyber Truck`;
    translTeslaCyberTruckTitleIT.type = TranslationTypeEnum.TITLE;
    await translationRepo.save(translTeslaCyberTruckTitleIT);
  }

  // Article #4 Title V1 EN Tesla-Cyber-Truck
  let translTeslaCyberTruckTitleEN = await translationRepo.findOne({
    where: {
      text: `Tesla Cyber Truck`, originLanguage: 'en', targetLanguage: 'en',
    },
  });
  if (!translTeslaCyberTruckTitleEN) {
    translTeslaCyberTruckTitleEN = new Translations();
    translTeslaCyberTruckTitleEN.originLanguage = 'en';
    translTeslaCyberTruckTitleEN.targetLanguage = 'en';
    translTeslaCyberTruckTitleEN.source = TranslationSourceEnum.AUTO;
    translTeslaCyberTruckTitleEN.text = `Tesla Cyber Truck`;
    translTeslaCyberTruckTitleEN.translation = `Tesla Cyber Truck`;
    translTeslaCyberTruckTitleEN.type = TranslationTypeEnum.TITLE;
    await translationRepo.save(translTeslaCyberTruckTitleEN);
  }

  // Article #4 Title V1 BG Tesla-Cyber-Truck
  let translTeslaCyberTruckTitleBG = await translationRepo.findOne({
    where: {
      text: `Tesla Cyber Truck`, originLanguage: 'en', targetLanguage: 'bg',
    },
  });
  if (!translTeslaCyberTruckTitleBG) {
    translTeslaCyberTruckTitleBG = new Translations();
    translTeslaCyberTruckTitleBG.originLanguage = 'en';
    translTeslaCyberTruckTitleBG.targetLanguage = 'bg';
    translTeslaCyberTruckTitleBG.source = TranslationSourceEnum.AUTO;
    translTeslaCyberTruckTitleBG.text = `Tesla Cyber Truck`;
    translTeslaCyberTruckTitleBG.translation = `Кибер камион Tesla`;
    translTeslaCyberTruckTitleBG.type = TranslationTypeEnum.TITLE;
    await translationRepo.save(translTeslaCyberTruckTitleBG);
  }

  // Article #4 Title V1 DE Tesla-Cyber-Truck
  let translTeslaCyberTruckTitleDE = await translationRepo.findOne({
    where: {
      text: `Tesla Cyber Truck`, originLanguage: 'en', targetLanguage: 'de',
    },
  });
  if (!translTeslaCyberTruckTitleDE) {
    translTeslaCyberTruckTitleDE = new Translations();
    translTeslaCyberTruckTitleDE.originLanguage = 'en';
    translTeslaCyberTruckTitleDE.targetLanguage = 'de';
    translTeslaCyberTruckTitleDE.source = TranslationSourceEnum.AUTO;
    translTeslaCyberTruckTitleDE.text = `Tesla Cyber Truck`;
    translTeslaCyberTruckTitleDE.translation = `Tesla Cyber Truck`;
    translTeslaCyberTruckTitleDE.type = TranslationTypeEnum.TITLE;
    await translationRepo.save(translTeslaCyberTruckTitleDE);
  }

  // Article #4 Content V1 BG Tesla-Cyber-Truck
  let translTeslaCyberTruckContentBG = await translationRepo.findOne({
    where: {
      text: `Tesla made electric passenger cars mainstream with the Model S and Model 3 sedans and the Model X crossover, and now its turning to one of the most important segments out right now—pickup trucks. At a bizarre event in Los Angeles, Elon Musk debuted the Tesla Cybertruck, the first truck from the brand. It'll go up against upcoming EV pickups from Ford and GM, plus new kids on the block, Rivian. Musk said at the reveal that we need something different than today's pickup trucks. And yes, that's certainly the case here.`,
      originLanguage: 'en', targetLanguage: 'bg',
    },
  });
  if (!translTeslaCyberTruckContentBG) {
    translTeslaCyberTruckContentBG = new Translations();
    translTeslaCyberTruckContentBG.originLanguage = 'en';
    translTeslaCyberTruckContentBG.targetLanguage = 'bg';
    translTeslaCyberTruckContentBG.source = TranslationSourceEnum.AUTO;
    translTeslaCyberTruckContentBG.text = `Tesla made electric passenger cars mainstream with the Model S and Model 3 sedans and the Model X crossover, and now its turning to one of the most important segments out right now—pickup trucks. At a bizarre event in Los Angeles, Elon Musk debuted the Tesla Cybertruck, the first truck from the brand. It'll go up against upcoming EV pickups from Ford and GM, plus new kids on the block, Rivian. Musk said at the reveal that we need something different than today's pickup trucks. And yes, that's certainly the case here.`;
    translTeslaCyberTruckContentBG.translation = `Tesla направи електрически леки автомобили масово с седаните Model S и Model 3 и кросоувъра Model X, а сега се насочва към един от най-важните сегменти в момента - пикапите. На странно събитие в Лос Анджелис Елон Мъск дебютира Tesla Cybertruck, първият камион от марката. Той ще върви срещу предстоящите EV пикапи от Ford и GM, както и нови деца от блока, Ривиан. Мъск каза при разкриването, че имаме нужда от нещо различно от днешните пикапи. И да, това със сигурност е така.`;
    translTeslaCyberTruckContentBG.type = TranslationTypeEnum.CONTENT;
    await translationRepo.save(translTeslaCyberTruckContentBG);
  }

  // Article #4 Content V1 EN Tesla-Cyber-Truck
  let translTeslaCyberTruckContentEN = await translationRepo.findOne({
    where: {
      text: `Tesla made electric passenger cars mainstream with the Model S and Model 3 sedans and the Model X crossover, and now its turning to one of the most important segments out right now—pickup trucks. At a bizarre event in Los Angeles, Elon Musk debuted the Tesla Cybertruck, the first truck from the brand. It'll go up against upcoming EV pickups from Ford and GM, plus new kids on the block, Rivian. Musk said at the reveal that we need something different than today's pickup trucks. And yes, that's certainly the case here.`,
      originLanguage: 'en', targetLanguage: 'en',
    },
  });
  if (!translTeslaCyberTruckContentEN) {
    translTeslaCyberTruckContentEN = new Translations();
    translTeslaCyberTruckContentEN.originLanguage = 'en';
    translTeslaCyberTruckContentEN.targetLanguage = 'en';
    translTeslaCyberTruckContentEN.source = TranslationSourceEnum.AUTO;
    translTeslaCyberTruckContentEN.text = `Tesla made electric passenger cars mainstream with the Model S and Model 3 sedans and the Model X crossover, and now its turning to one of the most important segments out right now—pickup trucks. At a bizarre event in Los Angeles, Elon Musk debuted the Tesla Cybertruck, the first truck from the brand. It'll go up against upcoming EV pickups from Ford and GM, plus new kids on the block, Rivian. Musk said at the reveal that we need something different than today's pickup trucks. And yes, that's certainly the case here.`;
    translTeslaCyberTruckContentEN.translation = `Tesla made electric passenger cars mainstream with the Model S and Model 3 sedans and the Model X crossover, and now its turning to one of the most important segments out right now—pickup trucks. At a bizarre event in Los Angeles, Elon Musk debuted the Tesla Cybertruck, the first truck from the brand. It'll go up against upcoming EV pickups from Ford and GM, plus new kids on the block, Rivian. Musk said at the reveal that we need something different than today's pickup trucks. And yes, that's certainly the case here.`;
    translTeslaCyberTruckContentEN.type = TranslationTypeEnum.CONTENT;
    await translationRepo.save(translTeslaCyberTruckContentEN);
  }

  // Article #4 Content V1 FR Tesla-Cyber-Truck
  let translTeslaCyberTruckContentFR = await translationRepo.findOne({
    where: {
      text: `Tesla made electric passenger cars mainstream with the Model S and Model 3 sedans and the Model X crossover, and now its turning to one of the most important segments out right now—pickup trucks. At a bizarre event in Los Angeles, Elon Musk debuted the Tesla Cybertruck, the first truck from the brand. It'll go up against upcoming EV pickups from Ford and GM, plus new kids on the block, Rivian. Musk said at the reveal that we need something different than today's pickup trucks. And yes, that's certainly the case here.`,
      originLanguage: 'en', targetLanguage: 'fr',
    },
  });
  if (!translTeslaCyberTruckContentFR) {
    translTeslaCyberTruckContentFR = new Translations();
    translTeslaCyberTruckContentFR.originLanguage = 'en';
    translTeslaCyberTruckContentFR.targetLanguage = 'fr';
    translTeslaCyberTruckContentFR.source = TranslationSourceEnum.AUTO;
    translTeslaCyberTruckContentFR.text = `Tesla made electric passenger cars mainstream with the Model S and Model 3 sedans and the Model X crossover, and now its turning to one of the most important segments out right now—pickup trucks. At a bizarre event in Los Angeles, Elon Musk debuted the Tesla Cybertruck, the first truck from the brand. It'll go up against upcoming EV pickups from Ford and GM, plus new kids on the block, Rivian. Musk said at the reveal that we need something different than today's pickup trucks. And yes, that's certainly the case here.`;
    translTeslaCyberTruckContentFR.translation = `Tesla a généralisé les voitures de tourisme électriques avec les berlines Model S et Model 3 et le multisegment Model X. Elle passe maintenant à l’un des segments les plus importants du moment: les camionnettes. Lors d'un événement étrange à Los Angeles, Elon Musk a présenté le Tesla Cybertruck, le premier camion de la marque. Cela fera face aux futurs camionnettes EV de Ford et de GM, ainsi qu'aux nouveaux enfants du quartier, Rivian. Musk a déclaré lors de la révélation qu'il nous fallait quelque chose de différent des camionnettes d'aujourd'hui. Et oui, c'est certainement le cas ici.`;
    translTeslaCyberTruckContentFR.type = TranslationTypeEnum.CONTENT;
    await translationRepo.save(translTeslaCyberTruckContentFR);
  }

  // Article #4 Content V1 IT Tesla-Cyber-Truck
  let translTeslaCyberTruckContentIT = await translationRepo.findOne({
    where: {
      text: `Tesla made electric passenger cars mainstream with the Model S and Model 3 sedans and the Model X crossover, and now its turning to one of the most important segments out right now—pickup trucks. At a bizarre event in Los Angeles, Elon Musk debuted the Tesla Cybertruck, the first truck from the brand. It'll go up against upcoming EV pickups from Ford and GM, plus new kids on the block, Rivian. Musk said at the reveal that we need something different than today's pickup trucks. And yes, that's certainly the case here.`,
      originLanguage: 'en', targetLanguage: 'it',
    },
  });
  if (!translTeslaCyberTruckContentIT) {
    translTeslaCyberTruckContentIT = new Translations();
    translTeslaCyberTruckContentIT.originLanguage = 'en';
    translTeslaCyberTruckContentIT.targetLanguage = 'it';
    translTeslaCyberTruckContentIT.source = TranslationSourceEnum.AUTO;
    translTeslaCyberTruckContentIT.text = `Tesla made electric passenger cars mainstream with the Model S and Model 3 sedans and the Model X crossover, and now its turning to one of the most important segments out right now—pickup trucks. At a bizarre event in Los Angeles, Elon Musk debuted the Tesla Cybertruck, the first truck from the brand. It'll go up against upcoming EV pickups from Ford and GM, plus new kids on the block, Rivian. Musk said at the reveal that we need something different than today's pickup trucks. And yes, that's certainly the case here.`;
    translTeslaCyberTruckContentIT.translation = `Tesla fece integrare le autovetture elettriche con le berline Model S e Model 3 e il crossover Model X, e ora si sta spostando su uno dei segmenti più importanti in questo momento: i camioncini. In un bizzarro evento a Los Angeles, Elon Musk ha debuttato con Tesla Cybertruck, il primo camion del marchio. Andrà contro i prossimi pickup EV di Ford e GM, oltre a nuovi bambini sul blocco, Rivian. Musk ha detto alla rivelazione che abbiamo bisogno di qualcosa di diverso rispetto ai camioncini di oggi. E sì, questo è certamente il caso qui.`;
    translTeslaCyberTruckContentIT.type = TranslationTypeEnum.CONTENT;
    await translationRepo.save(translTeslaCyberTruckContentIT);
  }

  // Article #4 Content V1 ES Tesla-Cyber-Truck
  let translTeslaCyberTruckContentES = await translationRepo.findOne({
    where: {
      text: `Tesla made electric passenger cars mainstream with the Model S and Model 3 sedans and the Model X crossover, and now its turning to one of the most important segments out right now—pickup trucks. At a bizarre event in Los Angeles, Elon Musk debuted the Tesla Cybertruck, the first truck from the brand. It'll go up against upcoming EV pickups from Ford and GM, plus new kids on the block, Rivian. Musk said at the reveal that we need something different than today's pickup trucks. And yes, that's certainly the case here.`,
      originLanguage: 'en', targetLanguage: 'es',
    },
  });
  if (!translTeslaCyberTruckContentES) {
    translTeslaCyberTruckContentES = new Translations();
    translTeslaCyberTruckContentES.originLanguage = 'en';
    translTeslaCyberTruckContentES.targetLanguage = 'es';
    translTeslaCyberTruckContentES.source = TranslationSourceEnum.AUTO;
    translTeslaCyberTruckContentES.text = `Tesla made electric passenger cars mainstream with the Model S and Model 3 sedans and the Model X crossover, and now its turning to one of the most important segments out right now—pickup trucks. At a bizarre event in Los Angeles, Elon Musk debuted the Tesla Cybertruck, the first truck from the brand. It'll go up against upcoming EV pickups from Ford and GM, plus new kids on the block, Rivian. Musk said at the reveal that we need something different than today's pickup trucks. And yes, that's certainly the case here.`;
    translTeslaCyberTruckContentES.translation = `Tesla hizo que los autos eléctricos de pasajeros se generalizaran con los sedanes Model S y Model 3 y el crossover Model X, y ahora se está convirtiendo en uno de los segmentos más importantes en este momento: las camionetas. En un extraño evento en Los Ángeles, Elon Musk estrenó el Tesla Cybertruck, el primer camión de la marca. Se enfrentará a las próximas camionetas EV de Ford y GM, además de nuevos niños en el bloque, Rivian. Musk dijo en la revelación que necesitamos algo diferente a las camionetas de hoy. Y sí, ese es ciertamente el caso aquí.`;
    translTeslaCyberTruckContentES.type = TranslationTypeEnum.CONTENT;
    await translationRepo.save(translTeslaCyberTruckContentES);
  }

  // Article #4 Content V1 DE Tesla-Cyber-Truck
  let translTeslaCyberTruckContentDE = await translationRepo.findOne({
    where: {
      text: `Tesla made electric passenger cars mainstream with the Model S and Model 3 sedans and the Model X crossover, and now its turning to one of the most important segments out right now—pickup trucks. At a bizarre event in Los Angeles, Elon Musk debuted the Tesla Cybertruck, the first truck from the brand. It'll go up against upcoming EV pickups from Ford and GM, plus new kids on the block, Rivian. Musk said at the reveal that we need something different than today's pickup trucks. And yes, that's certainly the case here.`,
      originLanguage: 'en', targetLanguage: 'de',
    },
  });
  if (!translTeslaCyberTruckContentDE) {
    translTeslaCyberTruckContentDE = new Translations();
    translTeslaCyberTruckContentDE.originLanguage = 'en';
    translTeslaCyberTruckContentDE.targetLanguage = 'de';
    translTeslaCyberTruckContentDE.source = TranslationSourceEnum.AUTO;
    translTeslaCyberTruckContentDE.text = `Tesla made electric passenger cars mainstream with the Model S and Model 3 sedans and the Model X crossover, and now its turning to one of the most important segments out right now—pickup trucks. At a bizarre event in Los Angeles, Elon Musk debuted the Tesla Cybertruck, the first truck from the brand. It'll go up against upcoming EV pickups from Ford and GM, plus new kids on the block, Rivian. Musk said at the reveal that we need something different than today's pickup trucks. And yes, that's certainly the case here.`;
    translTeslaCyberTruckContentDE.translation = `Tesla hat mit den Limousinen Model S und Model 3 sowie dem Crossover Model X den Massenmarkt für elektrische Personenkraftwagen erobert und sich nun einem der wichtigsten Segmente zugewandt - den Pickup-Trucks. Bei einer bizarren Veranstaltung in Los Angeles debütierte Elon Musk mit dem Tesla Cybertruck, dem ersten Truck der Marke. Es wird gegen bevorstehende EV-Pickups von Ford und GM sowie gegen neue Kinder im Block, Rivian, antreten. Musk sagte bei der Enthüllung, dass wir etwas anderes brauchen als die heutigen Pickups. Und ja, das ist hier sicherlich der Fall.`;
    translTeslaCyberTruckContentDE.type = TranslationTypeEnum.CONTENT;
    await translationRepo.save(translTeslaCyberTruckContentDE);
  }

  // Article #5 Title V1 IT JavaScript
  let translJavaScriptTitleIT = await translationRepo.findOne({ where: { text: `JavaScript`, originLanguage: 'en', targetLanguage: 'it' } });
  if (!translJavaScriptTitleIT) {
    translJavaScriptTitleIT = new Translations();
    translJavaScriptTitleIT.originLanguage = 'en';
    translJavaScriptTitleIT.targetLanguage = 'it';
    translJavaScriptTitleIT.source = TranslationSourceEnum.AUTO;
    translJavaScriptTitleIT.text = `JavaScript`;
    translJavaScriptTitleIT.translation = `JavaScript`;
    translJavaScriptTitleIT.type = TranslationTypeEnum.TITLE;
    await translationRepo.save(translJavaScriptTitleIT);
  }

  // Article #5 Title V1 ES JavaScript
  let translJavaScriptTitleES = await translationRepo.findOne({ where: { text: `JavaScript`, originLanguage: 'en', targetLanguage: 'es' } });
  if (!translJavaScriptTitleES) {
    translJavaScriptTitleES = new Translations();
    translJavaScriptTitleES.originLanguage = 'en';
    translJavaScriptTitleES.targetLanguage = 'es';
    translJavaScriptTitleES.source = TranslationSourceEnum.AUTO;
    translJavaScriptTitleES.text = `JavaScript`;
    translJavaScriptTitleES.translation = `JavaScript`;
    translJavaScriptTitleES.type = TranslationTypeEnum.TITLE;
    await translationRepo.save(translJavaScriptTitleES);
  }

  // Article #5 Title V1 BG JavaScript
  let translJavaScriptTitleBG = await translationRepo.findOne({ where: { text: `JavaScript`, originLanguage: 'en', targetLanguage: 'bg' } });
  if (!translJavaScriptTitleBG) {
    translJavaScriptTitleBG = new Translations();
    translJavaScriptTitleBG.originLanguage = 'en';
    translJavaScriptTitleBG.targetLanguage = 'bg';
    translJavaScriptTitleBG.source = TranslationSourceEnum.AUTO;
    translJavaScriptTitleBG.text = `JavaScript`;
    translJavaScriptTitleBG.translation = `JavaScript`;
    translJavaScriptTitleBG.type = TranslationTypeEnum.TITLE;
    await translationRepo.save(translJavaScriptTitleBG);
  }

  // Article #5 Title V1 EN JavaScript
  let translJavaScriptTitleEN = await translationRepo.findOne({ where: { text: `JavaScript`, originLanguage: 'en', targetLanguage: 'en' } });
  if (!translJavaScriptTitleEN) {
    translJavaScriptTitleEN = new Translations();
    translJavaScriptTitleEN.originLanguage = 'en';
    translJavaScriptTitleEN.targetLanguage = 'en';
    translJavaScriptTitleEN.source = TranslationSourceEnum.AUTO;
    translJavaScriptTitleEN.text = `JavaScript`;
    translJavaScriptTitleEN.translation = `JavaScript`;
    translJavaScriptTitleEN.type = TranslationTypeEnum.TITLE;
    await translationRepo.save(translJavaScriptTitleEN);
  }

  // Article #5 Title V1 FR JavaScript
  let translJavaScriptTitleFR = await translationRepo.findOne({ where: { text: `JavaScript`, originLanguage: 'en', targetLanguage: 'fr' } });
  if (!translJavaScriptTitleFR) {
    translJavaScriptTitleFR = new Translations();
    translJavaScriptTitleFR.originLanguage = 'en';
    translJavaScriptTitleFR.targetLanguage = 'fr';
    translJavaScriptTitleFR.source = TranslationSourceEnum.AUTO;
    translJavaScriptTitleFR.text = `JavaScript`;
    translJavaScriptTitleFR.translation = `JavaScript`;
    translJavaScriptTitleFR.type = TranslationTypeEnum.TITLE;
    await translationRepo.save(translJavaScriptTitleFR);
  }

  // Article #5 Title V1 DE JavaScript
  let translJavaScriptTitleDE = await translationRepo.findOne({ where: { text: `JavaScript`, originLanguage: 'en', targetLanguage: 'de' } });
  if (!translJavaScriptTitleDE) {
    translJavaScriptTitleDE = new Translations();
    translJavaScriptTitleDE.originLanguage = 'en';
    translJavaScriptTitleDE.targetLanguage = 'de';
    translJavaScriptTitleDE.source = TranslationSourceEnum.AUTO;
    translJavaScriptTitleDE.text = `JavaScript`;
    translJavaScriptTitleDE.translation = `JavaScript`;
    translJavaScriptTitleDE.type = TranslationTypeEnum.TITLE;
    await translationRepo.save(translJavaScriptTitleDE);
  }

  // Article #5 Content V1 EN JavaScript
  let translJavaScriptContentEN = await translationRepo.findOne({
    where: {
      text: `JavaScript often abbreviated as JS, is a high-level, just-in-time compiled, object-oriented programming language that conforms to the ECMAScript specification. JavaScript has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions. Alongside HTML and CSS, JavaScript is one of the core technologies of the World Wide Web. JavaScript enables interactive web pages and is an essential part of web applications. The vast majority of websites use it, and major web browsers have a dedicated JavaScript engine to execute it. As a multi-paradigm language, JavaScript supports event-driven, functional, and imperative (including object-oriented and prototype-based) programming styles. It has APIs for working with text, arrays, dates, regular expressions, and the DOM, but the language itself does not include any I/O, such as networking, storage, or graphics facilities. It relies upon the host environment in which it is embedded to provide these features.`,
      originLanguage: 'en', targetLanguage: 'en',
    },
  });
  if (!translJavaScriptContentEN) {
    translJavaScriptContentEN = new Translations();
    translJavaScriptContentEN.originLanguage = 'en';
    translJavaScriptContentEN.targetLanguage = 'en';
    translJavaScriptContentEN.source = TranslationSourceEnum.AUTO;
    translJavaScriptContentEN.text = `JavaScript often abbreviated as JS, is a high-level, just-in-time compiled, object-oriented programming language that conforms to the ECMAScript specification. JavaScript has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions. Alongside HTML and CSS, JavaScript is one of the core technologies of the World Wide Web. JavaScript enables interactive web pages and is an essential part of web applications. The vast majority of websites use it, and major web browsers have a dedicated JavaScript engine to execute it. As a multi-paradigm language, JavaScript supports event-driven, functional, and imperative (including object-oriented and prototype-based) programming styles. It has APIs for working with text, arrays, dates, regular expressions, and the DOM, but the language itself does not include any I/O, such as networking, storage, or graphics facilities. It relies upon the host environment in which it is embedded to provide these features.`;
    translJavaScriptContentEN.translation = `JavaScript often abbreviated as JS, is a high-level, just-in-time compiled, object-oriented programming language that conforms to the ECMAScript specification. JavaScript has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions. Alongside HTML and CSS, JavaScript is one of the core technologies of the World Wide Web. JavaScript enables interactive web pages and is an essential part of web applications. The vast majority of websites use it, and major web browsers have a dedicated JavaScript engine to execute it. As a multi-paradigm language, JavaScript supports event-driven, functional, and imperative (including object-oriented and prototype-based) programming styles. It has APIs for working with text, arrays, dates, regular expressions, and the DOM, but the language itself does not include any I/O, such as networking, storage, or graphics facilities. It relies upon the host environment in which it is embedded to provide these features.`;
    translJavaScriptContentEN.type = TranslationTypeEnum.CONTENT;
    await translationRepo.save(translJavaScriptContentEN);
  }

  // Article #5 Content V1 FR JavaScript
  let translJavaScriptContentFR = await translationRepo.findOne({
    where: {
      text: `JavaScript often abbreviated as JS, is a high-level, just-in-time compiled, object-oriented programming language that conforms to the ECMAScript specification. JavaScript has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions. Alongside HTML and CSS, JavaScript is one of the core technologies of the World Wide Web. JavaScript enables interactive web pages and is an essential part of web applications. The vast majority of websites use it, and major web browsers have a dedicated JavaScript engine to execute it. As a multi-paradigm language, JavaScript supports event-driven, functional, and imperative (including object-oriented and prototype-based) programming styles. It has APIs for working with text, arrays, dates, regular expressions, and the DOM, but the language itself does not include any I/O, such as networking, storage, or graphics facilities. It relies upon the host environment in which it is embedded to provide these features.`,
      originLanguage: 'en', targetLanguage: 'fr',
    },
  });
  if (!translJavaScriptContentFR) {
    translJavaScriptContentFR = new Translations();
    translJavaScriptContentFR.originLanguage = 'en';
    translJavaScriptContentFR.targetLanguage = 'fr';
    translJavaScriptContentFR.source = TranslationSourceEnum.AUTO;
    translJavaScriptContentFR.text = `JavaScript often abbreviated as JS, is a high-level, just-in-time compiled, object-oriented programming language that conforms to the ECMAScript specification. JavaScript has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions. Alongside HTML and CSS, JavaScript is one of the core technologies of the World Wide Web. JavaScript enables interactive web pages and is an essential part of web applications. The vast majority of websites use it, and major web browsers have a dedicated JavaScript engine to execute it. As a multi-paradigm language, JavaScript supports event-driven, functional, and imperative (including object-oriented and prototype-based) programming styles. It has APIs for working with text, arrays, dates, regular expressions, and the DOM, but the language itself does not include any I/O, such as networking, storage, or graphics facilities. It relies upon the host environment in which it is embedded to provide these features.`;
    translJavaScriptContentFR.translation = `JavaScript, souvent abrégé en JS, est un langage de programmation orienté objet de haut niveau, compilé juste à temps et conforme à la spécification ECMAScript. JavaScript comporte une syntaxe avec crochets, un typage dynamique, une orientation objet basée sur un prototype et des fonctions de premier ordre. Outre HTML et CSS, JavaScript est l’une des technologies de base du World Wide Web. JavaScript active les pages Web interactives et constitue une partie essentielle des applications Web. La grande majorité des sites Web l'utilisent et les principaux navigateurs Web disposent d'un moteur JavaScript dédié pour l'exécuter. En tant que langage multi-paradigme, JavaScript prend en charge les styles de programmation événementiels, fonctionnels et impératifs (y compris ceux orientés objet et basés sur des prototypes). Il possède des API pour travailler avec du texte, des tableaux, des dates, des expressions régulières et le DOM, mais le langage lui-même n'inclut pas d'E / S, telles que les fonctionnalités réseau, de stockage ou graphiques. Il s'appuie sur l'environnement hôte dans lequel il est intégré pour fournir ces fonctionnalités.`;
    translJavaScriptContentFR.type = TranslationTypeEnum.CONTENT;
    await translationRepo.save(translJavaScriptContentFR);
  }

  // Article #5 Content V1 IT JavaScript
  let translJavaScriptContentIT = await translationRepo.findOne({
    where: {
      text: `JavaScript often abbreviated as JS, is a high-level, just-in-time compiled, object-oriented programming language that conforms to the ECMAScript specification. JavaScript has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions. Alongside HTML and CSS, JavaScript is one of the core technologies of the World Wide Web. JavaScript enables interactive web pages and is an essential part of web applications. The vast majority of websites use it, and major web browsers have a dedicated JavaScript engine to execute it. As a multi-paradigm language, JavaScript supports event-driven, functional, and imperative (including object-oriented and prototype-based) programming styles. It has APIs for working with text, arrays, dates, regular expressions, and the DOM, but the language itself does not include any I/O, such as networking, storage, or graphics facilities. It relies upon the host environment in which it is embedded to provide these features.`,
      originLanguage: 'en', targetLanguage: 'it',
    },
  });
  if (!translJavaScriptContentIT) {
    translJavaScriptContentIT = new Translations();
    translJavaScriptContentIT.originLanguage = 'en';
    translJavaScriptContentIT.targetLanguage = 'it';
    translJavaScriptContentIT.source = TranslationSourceEnum.AUTO;
    translJavaScriptContentIT.text = `JavaScript often abbreviated as JS, is a high-level, just-in-time compiled, object-oriented programming language that conforms to the ECMAScript specification. JavaScript has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions. Alongside HTML and CSS, JavaScript is one of the core technologies of the World Wide Web. JavaScript enables interactive web pages and is an essential part of web applications. The vast majority of websites use it, and major web browsers have a dedicated JavaScript engine to execute it. As a multi-paradigm language, JavaScript supports event-driven, functional, and imperative (including object-oriented and prototype-based) programming styles. It has APIs for working with text, arrays, dates, regular expressions, and the DOM, but the language itself does not include any I/O, such as networking, storage, or graphics facilities. It relies upon the host environment in which it is embedded to provide these features.`;
    translJavaScriptContentIT.translation = `JavaScript spesso abbreviato in JS, è un linguaggio di programmazione orientato agli oggetti di alto livello, compilato just-in-time e conforme alle specifiche ECMAScript. JavaScript ha sintassi a parentesi graffa, digitazione dinamica, orientamento agli oggetti basato su prototipo e funzioni di prima classe. Oltre a HTML e CSS, JavaScript è una delle tecnologie di base del World Wide Web. JavaScript abilita le pagine Web interattive ed è una parte essenziale delle applicazioni web. La maggior parte dei siti Web lo utilizza e i principali browser Web dispongono di un motore JavaScript dedicato per eseguirlo. Come linguaggio multi-paradigma, JavaScript supporta stili di programmazione orientati agli eventi, funzionali e imperativi (compresi orientati agli oggetti e basati su prototipi). Dispone di API per lavorare con testo, array, date, espressioni regolari e DOM, ma la lingua in sé non include alcun I / O, come le funzionalità di rete, archiviazione o grafica. Si basa sull'ambiente host in cui è incorporato per fornire queste funzionalità.`;
    translJavaScriptContentIT.type = TranslationTypeEnum.CONTENT;
    await translationRepo.save(translJavaScriptContentIT);
  }

  // Article #5 Content V1 BG JavaScript
  let translJavaScriptContentBG = await translationRepo.findOne({
    where: {
      text: `JavaScript often abbreviated as JS, is a high-level, just-in-time compiled, object-oriented programming language that conforms to the ECMAScript specification. JavaScript has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions. Alongside HTML and CSS, JavaScript is one of the core technologies of the World Wide Web. JavaScript enables interactive web pages and is an essential part of web applications. The vast majority of websites use it, and major web browsers have a dedicated JavaScript engine to execute it. As a multi-paradigm language, JavaScript supports event-driven, functional, and imperative (including object-oriented and prototype-based) programming styles. It has APIs for working with text, arrays, dates, regular expressions, and the DOM, but the language itself does not include any I/O, such as networking, storage, or graphics facilities. It relies upon the host environment in which it is embedded to provide these features.`,
      originLanguage: 'en', targetLanguage: 'bg',
    },
  });
  if (!translJavaScriptContentBG) {
    translJavaScriptContentBG = new Translations();
    translJavaScriptContentBG.originLanguage = 'en';
    translJavaScriptContentBG.targetLanguage = 'bg';
    translJavaScriptContentBG.source = TranslationSourceEnum.AUTO;
    translJavaScriptContentBG.text = `JavaScript often abbreviated as JS, is a high-level, just-in-time compiled, object-oriented programming language that conforms to the ECMAScript specification. JavaScript has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions. Alongside HTML and CSS, JavaScript is one of the core technologies of the World Wide Web. JavaScript enables interactive web pages and is an essential part of web applications. The vast majority of websites use it, and major web browsers have a dedicated JavaScript engine to execute it. As a multi-paradigm language, JavaScript supports event-driven, functional, and imperative (including object-oriented and prototype-based) programming styles. It has APIs for working with text, arrays, dates, regular expressions, and the DOM, but the language itself does not include any I/O, such as networking, storage, or graphics facilities. It relies upon the host environment in which it is embedded to provide these features.`;
    translJavaScriptContentBG.translation = `JavaScript, често съкратено като JS, е обективно ориентиран, програмиран език за програмиране на високо ниво, отговарящ на спецификацията на ECMAScript. JavaScript има синтаксис с къдрава скоба, динамично въвеждане, функции, ориентирани към прототип на обект, и първокласни функции. Наред с HTML и CSS, JavaScript е една от основните технологии на световната мрежа. JavaScript позволява интерактивни уеб страници и е съществена част от уеб приложенията. По-голямата част от уебсайтовете го използват, а основните уеб браузъри имат специализиран JavaScript двигател, за да го изпълнят. Като език на много парадигма, JavaScript поддържа управлявани от събития, функционални и императивни (включително обектно-ориентирани и базирани на прототипи) стилове на програмиране. Той има API за работа с текст, масиви, дати, редовни изрази и DOM, но самият език не включва никакви I / O, като мрежови, съхранение или графични съоръжения. Разчита на хост средата, в която е вграден, за да предостави тези функции.`;
    translJavaScriptContentBG.type = TranslationTypeEnum.CONTENT;
    await translationRepo.save(translJavaScriptContentBG);
  }

  // Article #5 Content V1 ES JavaScript
  let translJavaScriptContentES = await translationRepo.findOne({
    where: {
      text: `JavaScript often abbreviated as JS, is a high-level, just-in-time compiled, object-oriented programming language that conforms to the ECMAScript specification. JavaScript has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions. Alongside HTML and CSS, JavaScript is one of the core technologies of the World Wide Web. JavaScript enables interactive web pages and is an essential part of web applications. The vast majority of websites use it, and major web browsers have a dedicated JavaScript engine to execute it. As a multi-paradigm language, JavaScript supports event-driven, functional, and imperative (including object-oriented and prototype-based) programming styles. It has APIs for working with text, arrays, dates, regular expressions, and the DOM, but the language itself does not include any I/O, such as networking, storage, or graphics facilities. It relies upon the host environment in which it is embedded to provide these features.`,
      originLanguage: 'en', targetLanguage: 'es',
    },
  });
  if (!translJavaScriptContentES) {
    translJavaScriptContentES = new Translations();
    translJavaScriptContentES.originLanguage = 'en';
    translJavaScriptContentES.targetLanguage = 'es';
    translJavaScriptContentES.source = TranslationSourceEnum.AUTO;
    translJavaScriptContentES.text = `JavaScript often abbreviated as JS, is a high-level, just-in-time compiled, object-oriented programming language that conforms to the ECMAScript specification. JavaScript has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions. Alongside HTML and CSS, JavaScript is one of the core technologies of the World Wide Web. JavaScript enables interactive web pages and is an essential part of web applications. The vast majority of websites use it, and major web browsers have a dedicated JavaScript engine to execute it. As a multi-paradigm language, JavaScript supports event-driven, functional, and imperative (including object-oriented and prototype-based) programming styles. It has APIs for working with text, arrays, dates, regular expressions, and the DOM, but the language itself does not include any I/O, such as networking, storage, or graphics facilities. It relies upon the host environment in which it is embedded to provide these features.`;
    translJavaScriptContentES.translation = `JavaScript a menudo abreviado como JS, es un lenguaje de programación orientado a objetos compilado justo a tiempo de alto nivel que se ajusta a la especificación ECMAScript. JavaScript tiene sintaxis de corchetes, escritura dinámica, orientación a objetos basada en prototipos y funciones de primera clase. Junto con HTML y CSS, JavaScript es una de las principales tecnologías de la World Wide Web. JavaScript habilita páginas web interactivas y es una parte esencial de las aplicaciones web. La gran mayoría de los sitios web lo usan, y los principales navegadores web tienen un motor de JavaScript dedicado para ejecutarlo. Como lenguaje de paradigmas múltiples, JavaScript admite estilos de programación impulsados por eventos, funcionales e imperativos (incluidos los orientados a objetos y basados en prototipos). Tiene API para trabajar con texto, matrices, fechas, expresiones regulares y DOM, pero el lenguaje en sí no incluye ninguna E / S, como redes, almacenamiento o instalaciones gráficas. Se basa en el entorno de host en el que está integrado para proporcionar estas características.`;
    translJavaScriptContentES.type = TranslationTypeEnum.CONTENT;
    await translationRepo.save(translJavaScriptContentES);
  }

  // Article #5 Content V1 DE JavaScript
  let translJavaScriptContentDE = await translationRepo.findOne({
    where: {
      text: `JavaScript often abbreviated as JS, is a high-level, just-in-time compiled, object-oriented programming language that conforms to the ECMAScript specification. JavaScript has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions. Alongside HTML and CSS, JavaScript is one of the core technologies of the World Wide Web. JavaScript enables interactive web pages and is an essential part of web applications. The vast majority of websites use it, and major web browsers have a dedicated JavaScript engine to execute it. As a multi-paradigm language, JavaScript supports event-driven, functional, and imperative (including object-oriented and prototype-based) programming styles. It has APIs for working with text, arrays, dates, regular expressions, and the DOM, but the language itself does not include any I/O, such as networking, storage, or graphics facilities. It relies upon the host environment in which it is embedded to provide these features.`,
      originLanguage: 'en', targetLanguage: 'de',
    },
  });
  if (!translJavaScriptContentDE) {
    translJavaScriptContentDE = new Translations();
    translJavaScriptContentDE.originLanguage = 'en';
    translJavaScriptContentDE.targetLanguage = 'de';
    translJavaScriptContentDE.source = TranslationSourceEnum.AUTO;
    translJavaScriptContentDE.text = `JavaScript often abbreviated as JS, is a high-level, just-in-time compiled, object-oriented programming language that conforms to the ECMAScript specification. JavaScript has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions. Alongside HTML and CSS, JavaScript is one of the core technologies of the World Wide Web. JavaScript enables interactive web pages and is an essential part of web applications. The vast majority of websites use it, and major web browsers have a dedicated JavaScript engine to execute it. As a multi-paradigm language, JavaScript supports event-driven, functional, and imperative (including object-oriented and prototype-based) programming styles. It has APIs for working with text, arrays, dates, regular expressions, and the DOM, but the language itself does not include any I/O, such as networking, storage, or graphics facilities. It relies upon the host environment in which it is embedded to provide these features.`;
    translJavaScriptContentDE.translation = `JavaScript wird oft als JS abgekürzt und ist eine Just-in-Time-kompilierte objektorientierte Programmiersprache auf hoher Ebene, die der ECMAScript-Spezifikation entspricht. JavaScript verfügt über geschweifte Klammern, dynamische Typisierung, prototypbasierte Objektorientierung und erstklassige Funktionen. JavaScript ist neben HTML und CSS eine der Kerntechnologien des World Wide Web. JavaScript aktiviert interaktive Webseiten und ist ein wesentlicher Bestandteil von Webanwendungen. Die überwiegende Mehrheit der Websites verwendet es, und große Webbrowser verfügen über eine dedizierte JavaScript-Engine, um es auszuführen. Als Multi-Paradigma-Sprache unterstützt JavaScript ereignisgesteuerte, funktionale und zwingende (einschließlich objektorientierter und prototypbasierter) Programmierstile. Es verfügt über APIs für die Arbeit mit Text, Arrays, Datumsangaben, regulären Ausdrücken und dem DOM. Die Sprache selbst enthält jedoch keine E / A-Funktionen wie Netzwerk-, Speicher- oder Grafikfunktionen. Es hängt von der Host-Umgebung ab, in die es eingebettet ist, um diese Funktionen bereitzustellen.`;
    translJavaScriptContentDE.type = TranslationTypeEnum.CONTENT;
    await translationRepo.save(translJavaScriptContentDE);
  }

  // Article #6 Title V1 ES TypeScript
  let translTypeScriptTitleES = await translationRepo.findOne({ where: { text: `TypeScript`, originLanguage: 'en', targetLanguage: 'es' } });
  if (!translTypeScriptTitleES) {
    translTypeScriptTitleES = new Translations();
    translTypeScriptTitleES.originLanguage = 'en';
    translTypeScriptTitleES.targetLanguage = 'es';
    translTypeScriptTitleES.source = TranslationSourceEnum.AUTO;
    translTypeScriptTitleES.text = `TypeScript`;
    translTypeScriptTitleES.translation = `Mecanografiado`;
    translTypeScriptTitleES.type = TranslationTypeEnum.TITLE;
    await translationRepo.save(translTypeScriptTitleES);
  }

  // Article #6 Title V1 BG TypeScript
  let translTypeScriptTitleBG = await translationRepo.findOne({ where: { text: `TypeScript`, originLanguage: 'en', targetLanguage: 'bg' } });
  if (!translTypeScriptTitleBG) {
    translTypeScriptTitleBG = new Translations();
    translTypeScriptTitleBG.originLanguage = 'en';
    translTypeScriptTitleBG.targetLanguage = 'bg';
    translTypeScriptTitleBG.source = TranslationSourceEnum.AUTO;
    translTypeScriptTitleBG.text = `TypeScript`;
    translTypeScriptTitleBG.translation = `написан на пишеща машина`;
    translTypeScriptTitleBG.type = TranslationTypeEnum.TITLE;
    await translationRepo.save(translTypeScriptTitleBG);
  }

  // Article #6 Title V1 EN TypeScript
  let translTypeScriptTitleEN = await translationRepo.findOne({ where: { text: `TypeScript`, originLanguage: 'en', targetLanguage: 'en' } });
  if (!translTypeScriptTitleEN) {
    translTypeScriptTitleEN = new Translations();
    translTypeScriptTitleEN.originLanguage = 'en';
    translTypeScriptTitleEN.targetLanguage = 'en';
    translTypeScriptTitleEN.source = TranslationSourceEnum.AUTO;
    translTypeScriptTitleEN.text = `TypeScript`;
    translTypeScriptTitleEN.translation = `TypeScript`;
    translTypeScriptTitleEN.type = TranslationTypeEnum.TITLE;
    await translationRepo.save(translTypeScriptTitleEN);
  }

  // Article #6 Title V1 IT TypeScript
  let translTypeScriptTitleIT = await translationRepo.findOne({ where: { text: `TypeScript`, originLanguage: 'en', targetLanguage: 'it' } });
  if (!translTypeScriptTitleIT) {
    translTypeScriptTitleIT = new Translations();
    translTypeScriptTitleIT.originLanguage = 'en';
    translTypeScriptTitleIT.targetLanguage = 'it';
    translTypeScriptTitleIT.source = TranslationSourceEnum.AUTO;
    translTypeScriptTitleIT.text = `TypeScript`;
    translTypeScriptTitleIT.translation = `Dattiloscritto`;
    translTypeScriptTitleIT.type = TranslationTypeEnum.TITLE;
    await translationRepo.save(translTypeScriptTitleIT);
  }

  // Article #6 Title V1 DE TypeScript
  let translTypeScriptTitleDE = await translationRepo.findOne({ where: { text: `TypeScript`, originLanguage: 'en', targetLanguage: 'de' } });
  if (!translTypeScriptTitleDE) {
    translTypeScriptTitleDE = new Translations();
    translTypeScriptTitleDE.originLanguage = 'en';
    translTypeScriptTitleDE.targetLanguage = 'de';
    translTypeScriptTitleDE.source = TranslationSourceEnum.AUTO;
    translTypeScriptTitleDE.text = `TypeScript`;
    translTypeScriptTitleDE.translation = `Typoskript`;
    translTypeScriptTitleDE.type = TranslationTypeEnum.TITLE;
    await translationRepo.save(translTypeScriptTitleDE);
  }

  // Article #6 Title V1 FR TypeScript
  let translTypeScriptTitleFR = await translationRepo.findOne({ where: { text: `TypeScript`, originLanguage: 'en', targetLanguage: 'fr' } });
  if (!translTypeScriptTitleFR) {
    translTypeScriptTitleFR = new Translations();
    translTypeScriptTitleFR.originLanguage = 'en';
    translTypeScriptTitleFR.targetLanguage = 'fr';
    translTypeScriptTitleFR.source = TranslationSourceEnum.AUTO;
    translTypeScriptTitleFR.text = `TypeScript`;
    translTypeScriptTitleFR.translation = `Manuscrit`;
    translTypeScriptTitleFR.type = TranslationTypeEnum.TITLE;
    await translationRepo.save(translTypeScriptTitleFR);
  }

  // Article #6 Content V1 FR TypeScript
  let translTypeScriptContentFR = await translationRepo.findOne({
    where: {
      text: `TypeScript is an open-source programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript and adds optional static typing to the language. TypeScript is designed for development of large applications and transcompiles to JavaScript. As TypeScript is a superset of JavaScript, existing JavaScript programs are also valid TypeScript programs. TypeScript may be used to develop JavaScript applications for both client-side and server-side (Node.js, Deno) execution. There are multiple options available for transcompilation. Either the default TypeScript Checker can be used, or the Babel compiler can be invoked to convert TypeScript to JavaScript.`,
      originLanguage: 'en', targetLanguage: 'fr',
    },
  });
  if (!translTypeScriptContentFR) {
    translTypeScriptContentFR = new Translations();
    translTypeScriptContentFR.originLanguage = 'en';
    translTypeScriptContentFR.targetLanguage = 'fr';
    translTypeScriptContentFR.source = TranslationSourceEnum.AUTO;
    translTypeScriptContentFR.text = `TypeScript is an open-source programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript and adds optional static typing to the language. TypeScript is designed for development of large applications and transcompiles to JavaScript. As TypeScript is a superset of JavaScript, existing JavaScript programs are also valid TypeScript programs. TypeScript may be used to develop JavaScript applications for both client-side and server-side (Node.js, Deno) execution. There are multiple options available for transcompilation. Either the default TypeScript Checker can be used, or the Babel compiler can be invoked to convert TypeScript to JavaScript.`;
    translTypeScriptContentFR.translation = `TypeScript est un langage de programmation open-source développé et maintenu par Microsoft. C'est un sur-ensemble syntaxique strict de JavaScript qui ajoute un typage statique optionnel au langage. TypeScript est conçu pour le développement d'applications volumineuses et la transcompilation en JavaScript. Comme TypeScript est un sur-ensemble de JavaScript, les programmes JavaScript existants sont également des programmes TypeScript valides. TypeScript peut être utilisé pour développer des applications JavaScript pour une exécution à la fois côté client et côté serveur (Node.js, Deno). Plusieurs options sont disponibles pour la transcompilation. Le vérificateur TypeScript par défaut peut être utilisé ou le compilateur Babel peut être appelé pour convertir TypeScript en JavaScript.`;
    translTypeScriptContentFR.type = TranslationTypeEnum.CONTENT;
    await translationRepo.save(translTypeScriptContentFR);
  }

  // Article #6 Content V1 ES TypeScript
  let translTypeScriptContentES = await translationRepo.findOne({
    where: {
      text: `TypeScript is an open-source programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript and adds optional static typing to the language. TypeScript is designed for development of large applications and transcompiles to JavaScript. As TypeScript is a superset of JavaScript, existing JavaScript programs are also valid TypeScript programs. TypeScript may be used to develop JavaScript applications for both client-side and server-side (Node.js, Deno) execution. There are multiple options available for transcompilation. Either the default TypeScript Checker can be used, or the Babel compiler can be invoked to convert TypeScript to JavaScript.`,
      originLanguage: 'en', targetLanguage: 'es',
    },
  });
  if (!translTypeScriptContentES) {
    translTypeScriptContentES = new Translations();
    translTypeScriptContentES.originLanguage = 'en';
    translTypeScriptContentES.targetLanguage = 'es';
    translTypeScriptContentES.source = TranslationSourceEnum.AUTO;
    translTypeScriptContentES.text = `TypeScript is an open-source programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript and adds optional static typing to the language. TypeScript is designed for development of large applications and transcompiles to JavaScript. As TypeScript is a superset of JavaScript, existing JavaScript programs are also valid TypeScript programs. TypeScript may be used to develop JavaScript applications for both client-side and server-side (Node.js, Deno) execution. There are multiple options available for transcompilation. Either the default TypeScript Checker can be used, or the Babel compiler can be invoked to convert TypeScript to JavaScript.`;
    translTypeScriptContentES.translation = `TypeScript es un lenguaje de programación de código abierto desarrollado y mantenido por Microsoft. Es un estricto superconjunto sintáctico de JavaScript y agrega una escritura estática opcional al lenguaje. TypeScript está diseñado para el desarrollo de grandes aplicaciones y transcompilaciones a JavaScript. Como TypeScript es un superconjunto de JavaScript, los programas JavaScript existentes también son programas válidos de TypeScript. TypeScript puede usarse para desarrollar aplicaciones JavaScript para la ejecución tanto del lado del cliente como del lado del servidor (Node.js, Deno). Hay múltiples opciones disponibles para la transcompilación. Se puede usar el Comprobador de TypeScript predeterminado o se puede invocar el compilador de Babel para convertir TypeScript a JavaScript.`;
    translTypeScriptContentES.type = TranslationTypeEnum.CONTENT;
    await translationRepo.save(translTypeScriptContentES);
  }

  // Article #6 Content V1 EN TypeScript
  let translTypeScriptContentEN = await translationRepo.findOne({
    where: {
      text: `TypeScript is an open-source programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript and adds optional static typing to the language. TypeScript is designed for development of large applications and transcompiles to JavaScript. As TypeScript is a superset of JavaScript, existing JavaScript programs are also valid TypeScript programs. TypeScript may be used to develop JavaScript applications for both client-side and server-side (Node.js, Deno) execution. There are multiple options available for transcompilation. Either the default TypeScript Checker can be used, or the Babel compiler can be invoked to convert TypeScript to JavaScript.`,
      originLanguage: 'en', targetLanguage: 'en',
    },
  });
  if (!translTypeScriptContentEN) {
    translTypeScriptContentEN = new Translations();
    translTypeScriptContentEN.originLanguage = 'en';
    translTypeScriptContentEN.targetLanguage = 'en';
    translTypeScriptContentEN.source = TranslationSourceEnum.AUTO;
    translTypeScriptContentEN.text = `TypeScript is an open-source programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript and adds optional static typing to the language. TypeScript is designed for development of large applications and transcompiles to JavaScript. As TypeScript is a superset of JavaScript, existing JavaScript programs are also valid TypeScript programs. TypeScript may be used to develop JavaScript applications for both client-side and server-side (Node.js, Deno) execution. There are multiple options available for transcompilation. Either the default TypeScript Checker can be used, or the Babel compiler can be invoked to convert TypeScript to JavaScript.`;
    translTypeScriptContentEN.translation = `TypeScript is an open-source programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript and adds optional static typing to the language. TypeScript is designed for development of large applications and transcompiles to JavaScript. As TypeScript is a superset of JavaScript, existing JavaScript programs are also valid TypeScript programs. TypeScript may be used to develop JavaScript applications for both client-side and server-side (Node.js, Deno) execution. There are multiple options available for transcompilation. Either the default TypeScript Checker can be used, or the Babel compiler can be invoked to convert TypeScript to JavaScript.`;
    translTypeScriptContentEN.type = TranslationTypeEnum.CONTENT;
    await translationRepo.save(translTypeScriptContentEN);
  }

  // Article #6 Content V1 BG TypeScript
  let translTypeScriptContentBG = await translationRepo.findOne({
    where: {
      text: `TypeScript is an open-source programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript and adds optional static typing to the language. TypeScript is designed for development of large applications and transcompiles to JavaScript. As TypeScript is a superset of JavaScript, existing JavaScript programs are also valid TypeScript programs. TypeScript may be used to develop JavaScript applications for both client-side and server-side (Node.js, Deno) execution. There are multiple options available for transcompilation. Either the default TypeScript Checker can be used, or the Babel compiler can be invoked to convert TypeScript to JavaScript.`,
      originLanguage: 'en', targetLanguage: 'bg',
    },
  });
  if (!translTypeScriptContentBG) {
    translTypeScriptContentBG = new Translations();
    translTypeScriptContentBG.originLanguage = 'en';
    translTypeScriptContentBG.targetLanguage = 'bg';
    translTypeScriptContentBG.source = TranslationSourceEnum.AUTO;
    translTypeScriptContentBG.text = `TypeScript is an open-source programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript and adds optional static typing to the language. TypeScript is designed for development of large applications and transcompiles to JavaScript. As TypeScript is a superset of JavaScript, existing JavaScript programs are also valid TypeScript programs. TypeScript may be used to develop JavaScript applications for both client-side and server-side (Node.js, Deno) execution. There are multiple options available for transcompilation. Either the default TypeScript Checker can be used, or the Babel compiler can be invoked to convert TypeScript to JavaScript.`;
    translTypeScriptContentBG.translation = `TypeScript е език за програмиране с отворен код, разработен и поддържан от Microsoft. Това е строг синтактичен набор от JavaScript и добавя незадължително статично писане към езика. TypeScript е предназначен за разработване на големи приложения и транскомпилации към JavaScript. Тъй като TypeScript е супер набор от JavaScript, съществуващите JavaScript програми също са валидни TypeScript програми. TypeScript може да се използва за разработване на JavaScript приложения за изпълнение от страна на клиента и от страна на сървъра (Node.js, Deno). Има много възможности за транскомпилация. Може да се използва проверката по подразбиране TypeScript, или компилаторът Babel може да бъде извикан за конвертиране на TypeScript в JavaScript.`;
    translTypeScriptContentBG.type = TranslationTypeEnum.CONTENT;
    await translationRepo.save(translTypeScriptContentBG);
  }

  // Article #6 Content V1 IT TypeScript
  let translTypeScriptContentIT = await translationRepo.findOne({
    where: {
      text: `TypeScript is an open-source programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript and adds optional static typing to the language. TypeScript is designed for development of large applications and transcompiles to JavaScript. As TypeScript is a superset of JavaScript, existing JavaScript programs are also valid TypeScript programs. TypeScript may be used to develop JavaScript applications for both client-side and server-side (Node.js, Deno) execution. There are multiple options available for transcompilation. Either the default TypeScript Checker can be used, or the Babel compiler can be invoked to convert TypeScript to JavaScript.`,
      originLanguage: 'en', targetLanguage: 'it',
    },
  });
  if (!translTypeScriptContentIT) {
    translTypeScriptContentIT = new Translations();
    translTypeScriptContentIT.originLanguage = 'en';
    translTypeScriptContentIT.targetLanguage = 'it';
    translTypeScriptContentIT.source = TranslationSourceEnum.AUTO;
    translTypeScriptContentIT.text = `TypeScript is an open-source programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript and adds optional static typing to the language. TypeScript is designed for development of large applications and transcompiles to JavaScript. As TypeScript is a superset of JavaScript, existing JavaScript programs are also valid TypeScript programs. TypeScript may be used to develop JavaScript applications for both client-side and server-side (Node.js, Deno) execution. There are multiple options available for transcompilation. Either the default TypeScript Checker can be used, or the Babel compiler can be invoked to convert TypeScript to JavaScript.`;
    translTypeScriptContentIT.translation = `TypeScript è un linguaggio di programmazione open source sviluppato e gestito da Microsoft. È un superset sintattico rigoroso di JavaScript e aggiunge la tipizzazione statica opzionale alla lingua. TypeScript è progettato per lo sviluppo di applicazioni di grandi dimensioni e transcompila in JavaScript. Poiché TypeScript è un superset di JavaScript, anche i programmi JavaScript esistenti sono programmi TypeScript validi. TypeScript può essere utilizzato per sviluppare applicazioni JavaScript sia per l'esecuzione lato client che lato server (Node.js, Deno). Sono disponibili più opzioni per la transcompilazione. È possibile utilizzare il controllo TypeScript predefinito oppure è possibile richiamare il compilatore Babel per convertire TypeScript in JavaScript.`;
    translTypeScriptContentIT.type = TranslationTypeEnum.CONTENT;
    await translationRepo.save(translTypeScriptContentIT);
  }

  // Article #6 Content V1 DE TypeScript
  let translTypeScriptContentDE = await translationRepo.findOne({
    where: {
      text: `TypeScript is an open-source programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript and adds optional static typing to the language. TypeScript is designed for development of large applications and transcompiles to JavaScript. As TypeScript is a superset of JavaScript, existing JavaScript programs are also valid TypeScript programs. TypeScript may be used to develop JavaScript applications for both client-side and server-side (Node.js, Deno) execution. There are multiple options available for transcompilation. Either the default TypeScript Checker can be used, or the Babel compiler can be invoked to convert TypeScript to JavaScript.`,
      originLanguage: 'en', targetLanguage: 'de',
    },
  });
  if (!translTypeScriptContentDE) {
    translTypeScriptContentDE = new Translations();
    translTypeScriptContentDE.originLanguage = 'en';
    translTypeScriptContentDE.targetLanguage = 'de';
    translTypeScriptContentDE.source = TranslationSourceEnum.AUTO;
    translTypeScriptContentDE.text = `TypeScript is an open-source programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript and adds optional static typing to the language. TypeScript is designed for development of large applications and transcompiles to JavaScript. As TypeScript is a superset of JavaScript, existing JavaScript programs are also valid TypeScript programs. TypeScript may be used to develop JavaScript applications for both client-side and server-side (Node.js, Deno) execution. There are multiple options available for transcompilation. Either the default TypeScript Checker can be used, or the Babel compiler can be invoked to convert TypeScript to JavaScript.`;
    translTypeScriptContentDE.translation = `TypeScript ist eine Open-Source-Programmiersprache, die von Microsoft entwickelt und verwaltet wird. Es ist eine strikte syntaktische Obermenge von JavaScript und fügt der Sprache optional statische Typisierung hinzu. TypeScript wurde für die Entwicklung großer Anwendungen entwickelt und kann in JavaScript konvertiert werden. Da TypeScript eine Obermenge von JavaScript ist, sind vorhandene JavaScript-Programme auch gültige TypeScript-Programme. Mit TypeScript können JavaScript-Anwendungen sowohl für die clientseitige als auch für die serverseitige Ausführung (Node.js, Deno) entwickelt werden. Für die Transkompilierung stehen mehrere Optionen zur Verfügung. Entweder kann der Standard-TypeScript-Checker verwendet werden, oder der Babel-Compiler kann aufgerufen werden, um TypeScript in JavaScript zu konvertieren.`;
    translTypeScriptContentDE.type = TranslationTypeEnum.CONTENT;
    await translationRepo.save(translTypeScriptContentDE);
  }

  await connection.close();

  // tslint:disable-next-line: no-console
  console.log('Translations seeded successfully!');

};

main()
  // tslint:disable-next-line: no-console
  .catch(console.log);
