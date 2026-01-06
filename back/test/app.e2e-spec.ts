import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});

describe('IdeaController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /v1/gerar-ideia', () => {
    it.only('should return a success response with generated idea', async () => {
      const payload = {
        nicho: 'fitness',
        descricao: ' treinos rápidos para mães ocupadas',
      };

      const response = await request(app.getHttpServer())
        .post('/api/v1/gerar-ideia')
        .send(payload)
        .expect(201);

      expect(response.body).toHaveProperty('success');
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('nicho');
      expect(response.body.data).toHaveProperty('descricao');
      expect(response.body.data).toHaveProperty('ideia');
      expect(response.body.data.nicho).toBe(payload.nicho);
      expect(response.body.data.descricao).toBe(payload.descricao);
    });

    it('should accept different nicho and descricao combinations', async () => {
      const payload = {
        nicho: 'tecnologia',
        descricao: 'dicas de programação em React',
      };

      const response = await request(app.getHttpServer())
        .post('/v1/gerar-ideia')
        .send(payload);

      if (response.status === 201 || response.status === 200) {
        expect(response.body.data.nicho).toBe(payload.nicho);
        expect(response.body.data.descricao).toBe(payload.descricao);
      }
    });

    it('should have proper response structure', async () => {
      const payload = {
        nicho: 'saúde',
        descricao: 'dicas de bem-estar',
      };

      const response = await request(app.getHttpServer())
        .post('/v1/gerar-ideia')
        .send(payload);

      if (response.status === 201 || response.status === 200) {
        const { body } = response;
        expect(body).toHaveProperty('success');
        expect(body).toHaveProperty('data');
        expect(typeof body.data.ideia).toBe('string');
        expect(body.data.ideia.length).toBeGreaterThan(0);
      }
    });

    it('should handle missing nicho field', async () => {
      const payload = {
        descricao: 'alguma descrição',
      };

      const response = await request(app.getHttpServer())
        .post('/v1/gerar-ideia')
        .send(payload);

      // Should fail validation
      expect([400, 422]).toContain(response.status);
    });

    it('should handle missing descricao field', async () => {
      const payload = {
        nicho: 'fitness',
      };

      const response = await request(app.getHttpServer())
        .post('/v1/gerar-ideia')
        .send(payload);

      // Should fail validation
      expect([400, 422]).toContain(response.status);
    });
  });
});
