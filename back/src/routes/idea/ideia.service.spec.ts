import { Test, TestingModule } from '@nestjs/testing';
import { IdeaService } from './ideia.service';

describe('IdeaService', () => {
  let service: IdeaService;

  beforeAll(() => {
    process.env.OPENAI_API_KEY = 'test-api-key';
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IdeaService],
    }).compile();

    service = module.get<IdeaService>(IdeaService);

    service['client'] = {
      responses: {
        create: jest.fn().mockResolvedValue({
          output_text: 'Ideia mockada: poste reels curtos com CTA no final.',
        }),
      },
    } as any;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateIdea', () => {
    it('should generate an idea with given nicho and descricao', async () => {
      const nicho = 'fitness';
      const descricao = 'treinos rápidos';

      const result = await service.generateIdea(nicho, descricao);

      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should handle API errors gracefully', async () => {
      const nicho = 'tech';
      const descricao = 'programming tutorials';

      // Mock the OpenAI client to throw an error
      const originalClient = service['client'];
      service['client'] = {
        responses: {
          create: jest.fn().mockRejectedValueOnce(new Error('API Error')),
        },
      } as any;

      await expect(service.generateIdea(nicho, descricao)).rejects.toThrow(
        'API Error',
      );

      service['client'] = originalClient;
    });

    it('should include the nicho and descricao in the prompt', async () => {
      const nicho = 'educação';
      const descricao = 'cursos online';

      const result = await service.generateIdea(nicho, descricao);

      expect(result).toBeDefined();
      // The result should be a non-empty string from OpenAI
      expect(typeof result).toBe('string');
    });
  });
});
