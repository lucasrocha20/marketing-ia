import { Controller, Post, Body } from '@nestjs/common';
import { OpenaiService } from './openai.service';

export class GenerateIdeaDto {
  nicho: string;
  descricao: string;
}

@Controller('gerar-ideia')
export class IdeiaController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post()
  async gerarIdeia(@Body() dto: GenerateIdeaDto) {
    const idea = await this.openaiService.generateIdea(
      dto.nicho,
      dto.descricao,
    );

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
