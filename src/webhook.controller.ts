import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('Webhook')
@Controller('webhook')
export class WebhookController {
  @Post('supabase')
  @ApiOperation({ summary: 'Webhook Supabase - Confirmation email' })
  @ApiBody({ schema: { type: 'object', properties: { type: { type: 'string' }, user: { type: 'object' } } } })
  handleSupabaseEvent(@Body() payload: any) {
    // Vérifie le type d’événement
    if (payload.type === 'user_confirmed') {
      // Appelle ta fonction métier ici
      // Exemple : activer le compte, envoyer un mail, etc.
    }
    return { received: true };
  }
}
