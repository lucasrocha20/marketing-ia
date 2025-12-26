import { Controller, Post, Body } from '@nestjs/common';
import { IdeaService } from './ideia.service';

export class GenerateIdeaDto {
  nicho: string;
  descricao: string;
}

@Controller('gerar-ideia')
export class IdeiaController {
  constructor(private readonly ideaService: IdeaService) {}

  @Post()
  async gerarIdeia(@Body() dto: GenerateIdeaDto) {
    const idea = await this.ideaService.generateIdea(dto.nicho, dto.descricao);

    return {
      success: true,
      data: {
        nicho: dto.nicho,
        descricao: dto.descricao,
        ideia: idea,
      },
    };
  }
}
