import { MigrationInterface, QueryRunner } from 'typeorm';

export class PopulateMessageTable1645398860209 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const promises = [];
    promises.push(
      queryRunner.query(
        `INSERT INTO public.messages(id, "content", "params")
              VALUES(
              'did_not_attend', 
              'Olá \${nome} ! Tudo bem? \n\nMeu nome é Ana e  sou  a secretária do Dr José Luís Lopes Correa.\n\nVocê agendou uma consulta em \${data}, com ele, com interesse na cirurgia bariátrica,  mas infelizmente não pode comparecer.\n\nVamos reagendar um horário para você? Podemos atendê-lo(a) de forma presencial ou online!\n\nEstamos à disposição!',
              '[{ "key": "nome", "type": "string" }, { "key": "data", "type": "date" }]'
              )`,
      ),
    );
    promises.push(
      queryRunner.query(
        `INSERT INTO public.messages(id, "content", "params")
        VALUES(
        'attended_not_operated',
        'Olá \${nome} ! Tudo bem? \n\nAqui é a Ana secretaria do Dr. José Luís. \n\nVocê esteve em consulta com ele em \${data}, nesse dia conversamos um pouco sobre o pré-operatório da cirurgia. \n\nO motivo do meu contato é para saber como está o andamento dos seus exames e se está conseguindo realizá-los. Se tem algo que possa ajuda-lo(a) ou se tem alguma dúvida. \n\nEstamos á disposição para  darmos todo o suporte no seu processo cirúrgico!',
        '[{ "key": "nome", "type": "string" }, { "key": "data", "type": "date" }]'
        )`,
      ),
    );
    promises.push(
      queryRunner.query(
        `INSERT INTO public.messages(id, "content", "params")
        VALUES(
        'operated_one_day_ago',
        'Olá \${nome} ! Tudo bem? \n\nPassando para lembrá-lo (a) da sua consulta com o Dr José Luís no próximo dia \${data} às \${hora} hs. Caso não possa comparecer, podemos fazer a consulta online tb. \n\nAguardamos você!',
        '[{ "key": "nome", "type": "string" }, { "key": "data", "type": "date" }, { "key": "data", "type": "datetime" }]'
        )`,
      ),
    );
    promises.push(
      queryRunner.query(
        `INSERT INTO public.messages(id, "content", "params")
        VALUES(
        'operated_ten_days_ago',
        'Olá \${nome} ! Tudo bem? \n\nSua próxima consulta com o Dr José Luis será dia \${data}. Conseguiu realizar os exames solicitados por ele na ultima consulta? Caso não tenha realizado ou tenha perdido os pedidos, posso te novamente por aqui! \n\nAguardo seu contato!',
        '[{ "key": "nome", "type": "string" }, { "key": "data", "type": "date" }]'
        )`,
      ),
    );
    promises.push(
      queryRunner.query(
        `INSERT INTO public.messages(id, "content", "params")
        VALUES(
        'operated_months',
        'Olá \${nome} ! Como você está? \n\nJá faz um tempinho que você não comparece as consultas de controle de pós cirurgia com o Dr José Luis! \n\nÉ muito importante que você realize os exames pós operatórios para  acompanhamento e consequentemente melhor resultado da sua cirurgia! Estamos te enviando os pedidos de exames ! \n\nFicaremos felizes em recebê-lo!',
        '[{ "key": "nome", "type": "string" }]'
        )`,
      ),
    );
    await Promise.all(promises);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM public.messages');
  }
}
