describe('API de Consulta de Matrícula dos Alunos', () => {

  it('Deve retornar todos os dados de uma matrícula regular', () => {
    const headers = {
      'X-API-KEY': 'unime-qualidade-oficial2'
    };
    const studentId = '4653421'; 

    cy.request({
      method: 'GET',
      url: `/v1/matriculas/${studentId}`,
      headers: headers
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', '4653421');
      expect(response.body).to.have.property('courseName');
      expect(response.body.tuition).to.have.property('amount');
      expect(response.body.tuition).to.have.property('formattedAmount');
      expect(response.body.tuition).to.have.property('dueDate');
      expect(response.body.tuition).to.have.property('status');
      expect(response.body.student).to.have.property('firstName');
      expect(response.body.student).to.have.property('lastName');
      expect(response.body.student).to.have.property('birthDate');
      expect(response.body.student).to.have.property('cpf');
    });
  });

  
  it('Deve retornar erro 409 para matrícula com pagamento atrasado', () => {
    const headers = {
      'X-API-KEY': 'unime-qualidade-oficial2'
    };
    const studentId = '5566778'; 

    cy.request({
      method: 'GET',
      url: `/v1/matriculas/${studentId}`,
      headers: headers,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(409);
      expect(response.body).to.have.property('mensagem', 'A matrícula informada possui débitos em aberto. Não é possível obter dados da mesma até a quitação!');
    });
  });


  it('Deve retornar os dados de uma matrícula de bolsista 100%', () => {
    const headers = {
      'X-API-KEY': 'unime-qualidade-oficial2'
    };
    const studentId = '7890123'; 

    cy.request({
      method: 'GET',
      url: `/v1/matriculas/${studentId}`,
      headers: headers
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', '7890123');
      expect(response.body).to.have.property('courseName');
      expect(response.body.tuition).to.not.have.property('amount');
      expect(response.body.tuition).to.not.have.property('dueDate');
      expect(response.body.tuition).to.have.property('status', 'BOLSISTA_100');
      expect(response.body.student).to.have.property('firstName');
      expect(response.body.student).to.have.property('lastName');
      expect(response.body.student).to.have.property('birthDate');
      expect(response.body.student).to.have.property('cpf');
    });
  });
});


it('Deve ser possível consultar os dados de uma matrícula de aluno bolsista 50%', () => {
  const headers = {
    'X-API-KEY': 'unime-qualidade-oficial2'
  };
  const studentId = '1113499'; 

  cy.request({
    method: 'GET',
    url: `/v1/matriculas/${studentId}`,
    headers: headers
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('id', '1113499');
    expect(response.body).to.have.property('courseName');
    expect(response.body.tuition).to.have.property('amount');
    expect(response.body.tuition).to.have.property('formattedAmount');
    expect(response.body.tuition).to.have.property('dueDate');
    expect(response.body.tuition).to.have.property('status', 'BOlSISTA_50');
    expect(response.body.student).to.have.property('firstName');
    expect(response.body.student).to.have.property('lastName');
    expect(response.body.student).to.have.property('birthDate');
    expect(response.body.student).to.have.property('cpf');
  });
});


it('Deve retornar erro 400 para matrícula inválida', () => {
  const headers = {
    'X-API-KEY': 'unime-qualidade-oficial2'
  };
  const studentId = 'XPTO123'; 

  cy.request({
    method: 'GET',
    url: `/v1/matriculas/${studentId}`,
    headers: headers,
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.eq(400);
    expect(response.body).to.have.property('mensagem', 'A matrícula informada não parece ser válida!');
  });
});


it('Deve retornar os dados de uma matrícula com todas as mensalidades quitadas', () => {
  const headers = {
    'X-API-KEY': 'unime-qualidade-oficial2'
  };
  const studentId = '1122334'; 
  
  cy.request({
    method: 'GET',
    url: `/v1/matriculas/${studentId}`,
    headers: headers,
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('id', '1122334');
    expect(response.body).to.have.property('courseName', 'Medicina Veterinária');
    expect(response.body.tuition).to.not.have.property('dueDate');
    expect(response.body.tuition).to.have.property('status', 'CONTRATO_QUITADO');
    expect(response.body.student).to.have.property('firstName', 'Ana');
    expect(response.body.student).to.have.property('lastName', 'Pereira Lima');
    expect(response.body.student).to.have.property('birthDate', '1990-04-25');
    expect(response.body.student).to.have.property('cpf', '12345678900');
  });
});


it('Deve retornar erro 404 para matrícula excluída', () => {
  const headers = {
    'X-API-KEY': 'unime-qualidade-oficial2'
  };
  const studentId = '4653499'; 

  cy.request({
    method: 'GET',
    url: `/v1/matriculas/${studentId}`,
    headers: headers,
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.eq(404);
    expect(response.body).to.have.property('mensagem', 'A matrícula informada foi excluída de nossa base de dados!');
  });
});


it('Deve retornar erro 400 para matrícula inválida', () => {
  const headers = {
    'X-API-KEY': 'unime-qualidade-oficial2'
  };
  const studentId = '4653499';

  cy.request({
    method: 'GET',
    url: `/v1/matriculas/${studentId}`,
    headers: headers,
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.eq(400);
    expect(response.body).to.have.property('mensagem', 'A matrícula informada não parece ser válida!');
  });
});


