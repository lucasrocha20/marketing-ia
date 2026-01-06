import { Test, TestingModule } from '@nestjs/testing';
import { IdeiaController } from './ideia.controller';
import { IdeaService } from './ideia.service';

describe('IdeiaController', () => {
  let controller: IdeiaController;
  let service: IdeaService;

  const mockIdeaService = {
    generateIdea: jest
      .fn()
      .mockResolvedValue('Estratégia: Reels curtos com hooks impactantes...'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IdeiaController],
      providers: [
        {
          provide: IdeaService,
          useValue: mockIdeaService,
        },
      ],
    }).compile();

    controller = module.get<IdeiaController>(IdeiaController);
    service = module.get<IdeaService>(IdeaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('gerarIdeia', () => {
    it('should return a success response with generated idea', async () => {
      const dto = { nicho: 'fitness', descricao: 'treinos rápidos' };
      const expectedIdea = 'Estratégia: Reels curtos com hooks impactantes...';

      mockIdeaService.generateIdea.mockResolvedValueOnce(expectedIdea);

      const result = await controller.gerarIdeia(dto);

      expect(result).toEqual({
        success: true,
        data: {
          nicho: dto.nicho,
          descricao: dto.descricao,
          ideia: expectedIdea,
        },
      });

      expect(service.generateIdea).toHaveBeenCalledWith(
        dto.nicho,
        dto.descricao,
      );
    });

    it('should handle service errors', async () => {
      const dto = { nicho: 'tech', descricao: 'coding' };
      const errorMessage = 'API Error';

      mockIdeaService.generateIdea.mockRejectedValueOnce(
        new Error(errorMessage),
      );

      await expect(controller.gerarIdeia(dto)).rejects.toThrow(errorMessage);
    });

    it('should accept valid nicho and descricao', async () => {
      const dto = { nicho: 'saúde', descricao: 'dicas de bem-estar' };
      const expectedIdea = 'Ideia gerada com sucesso...';

      mockIdeaService.generateIdea.mockResolvedValueOnce(expectedIdea);

      const result = await controller.gerarIdeia(dto);

      expect(result.success).toBe(true);
      expect(result.data.nicho).toBe(dto.nicho);
      expect(result.data.descricao).toBe(dto.descricao);
    });
  });
});
