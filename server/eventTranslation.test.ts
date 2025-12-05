/**
 * Tests for AI-powered event translation
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { translateEventTitle, translateEventDescription, translateEventTitlesBatch } from './eventTranslation';
import { invokeLLM } from './_core/llm';

// Mock the LLM module
vi.mock('./_core/llm', () => ({
  invokeLLM: vi.fn()
}));

describe('Event Translation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('translateEventTitle', () => {
    it('should translate event title from Spanish to Catalan', async () => {
      const mockResponse = {
        choices: [{
          message: {
            content: 'Campionat de Natació de Barcelona'
          }
        }]
      };
      
      (invokeLLM as any).mockResolvedValue(mockResponse);

      const result = await translateEventTitle(
        'Campeonato de Natación de Barcelona',
        'Catalan'
      );

      expect(result).toBe('Campionat de Natació de Barcelona');
      expect(invokeLLM).toHaveBeenCalledWith(
        expect.objectContaining({
          messages: expect.arrayContaining([
            expect.objectContaining({
              role: 'system',
              content: expect.stringContaining('Catalan')
            })
          ])
        })
      );
    });

    it('should translate event title from Spanish to Basque', async () => {
      const mockResponse = {
        choices: [{
          message: {
            content: 'Bartzelonako Igeriketa Txapelketa'
          }
        }]
      };
      
      (invokeLLM as any).mockResolvedValue(mockResponse);

      const result = await translateEventTitle(
        'Campeonato de Natación de Barcelona',
        'Basque'
      );

      expect(result).toBe('Bartzelonako Igeriketa Txapelketa');
    });

    it('should translate event title from Spanish to English', async () => {
      const mockResponse = {
        choices: [{
          message: {
            content: 'Barcelona Swimming Championship'
          }
        }]
      };
      
      (invokeLLM as any).mockResolvedValue(mockResponse);

      const result = await translateEventTitle(
        'Campeonato de Natación de Barcelona',
        'English'
      );

      expect(result).toBe('Barcelona Swimming Championship');
    });

    it('should fallback to original title on LLM error', async () => {
      (invokeLLM as any).mockRejectedValue(new Error('LLM API error'));

      const result = await translateEventTitle(
        'Campeonato de Natación de Barcelona',
        'Catalan'
      );

      expect(result).toBe('Campeonato de Natación de Barcelona');
    });

    it('should handle empty LLM response', async () => {
      const mockResponse = {
        choices: [{
          message: {
            content: ''
          }
        }]
      };
      
      (invokeLLM as any).mockResolvedValue(mockResponse);

      const result = await translateEventTitle(
        'Campeonato de Natación de Barcelona',
        'Catalan'
      );

      expect(result).toBe('Campeonato de Natación de Barcelona');
    });
  });

  describe('translateEventDescription', () => {
    it('should translate event description from Spanish to Galician', async () => {
      const mockResponse = {
        choices: [{
          message: {
            content: 'Competición de natación para todas as categorías. Inscricións abertas ata o 15 de decembro.'
          }
        }]
      };
      
      (invokeLLM as any).mockResolvedValue(mockResponse);

      const result = await translateEventDescription(
        'Competición de natación para todas las categorías. Inscripciones abiertas hasta el 15 de diciembre.',
        'Galician'
      );

      expect(result).toContain('Competición');
      expect(result).toContain('natación');
    });

    it('should translate event description from Spanish to Valencian', async () => {
      const mockResponse = {
        choices: [{
          message: {
            content: 'Competició de natació per a totes les categories. Inscripcions obertes fins al 15 de desembre.'
          }
        }]
      };
      
      (invokeLLM as any).mockResolvedValue(mockResponse);

      const result = await translateEventDescription(
        'Competición de natación para todas las categorías. Inscripciones abiertas hasta el 15 de diciembre.',
        'Valencian'
      );

      expect(result).toContain('Competició');
    });

    it('should fallback to original description on error', async () => {
      (invokeLLM as any).mockRejectedValue(new Error('LLM API error'));

      const originalDescription = 'Competición de natación para todas las categorías.';
      const result = await translateEventDescription(originalDescription, 'Catalan');

      expect(result).toBe(originalDescription);
    });
  });

  describe('translateEventTitlesBatch', () => {
    it('should batch translate multiple event titles', async () => {
      const mockResponse = {
        choices: [{
          message: {
            content: `1. Campionat de Natació de Barcelona
2. Torneig de Waterpolo de Madrid
3. Triatló de València`
          }
        }]
      };
      
      (invokeLLM as any).mockResolvedValue(mockResponse);

      const titles = [
        'Campeonato de Natación de Barcelona',
        'Torneo de Waterpolo de Madrid',
        'Triatlón de Valencia'
      ];

      const result = await translateEventTitlesBatch(titles, 'Catalan');

      expect(result['Campeonato de Natación de Barcelona']).toBe('Campionat de Natació de Barcelona');
      expect(result['Torneo de Waterpolo de Madrid']).toBe('Torneig de Waterpolo de Madrid');
      expect(result['Triatlón de Valencia']).toBe('Triatló de València');
    });

    it('should handle batch translation with numbered format variations', async () => {
      const mockResponse = {
        choices: [{
          message: {
            content: `1) Barcelona Swimming Championship
2) Madrid Water Polo Tournament`
          }
        }]
      };
      
      (invokeLLM as any).mockResolvedValue(mockResponse);

      const titles = [
        'Campeonato de Natación de Barcelona',
        'Torneo de Waterpolo de Madrid'
      ];

      const result = await translateEventTitlesBatch(titles, 'English');

      expect(result['Campeonato de Natación de Barcelona']).toBe('Barcelona Swimming Championship');
      expect(result['Torneo de Waterpolo de Madrid']).toBe('Madrid Water Polo Tournament');
    });

    it('should fallback to originals on batch translation error', async () => {
      (invokeLLM as any).mockRejectedValue(new Error('LLM API error'));

      const titles = [
        'Campeonato de Natación de Barcelona',
        'Torneo de Waterpolo de Madrid'
      ];

      const result = await translateEventTitlesBatch(titles, 'Catalan');

      expect(result['Campeonato de Natación de Barcelona']).toBe('Campeonato de Natación de Barcelona');
      expect(result['Torneo de Waterpolo de Madrid']).toBe('Torneo de Waterpolo de Madrid');
    });

    it('should handle empty batch translation response', async () => {
      const mockResponse = {
        choices: [{
          message: {
            content: ''
          }
        }]
      };
      
      (invokeLLM as any).mockResolvedValue(mockResponse);

      const titles = ['Campeonato de Natación de Barcelona'];
      const result = await translateEventTitlesBatch(titles, 'Catalan');

      expect(result['Campeonato de Natación de Barcelona']).toBe('Campeonato de Natación de Barcelona');
    });
  });

  describe('Translation Quality', () => {
    it('should preserve proper nouns in translations', async () => {
      const mockResponse = {
        choices: [{
          message: {
            content: 'Barcelona Swimming Championship'
          }
        }]
      };
      
      (invokeLLM as any).mockResolvedValue(mockResponse);

      const result = await translateEventTitle(
        'Campeonato de Natación de Barcelona',
        'English'
      );

      // Barcelona should be preserved as proper noun
      expect(result).toContain('Barcelona');
    });

    it('should translate event types correctly', async () => {
      const mockResponse = {
        choices: [{
          message: {
            content: 'Campionat de Natació'
          }
        }]
      };
      
      (invokeLLM as any).mockResolvedValue(mockResponse);

      const result = await translateEventTitle(
        'Campeonato de Natación',
        'Catalan'
      );

      // "Campeonato" should be translated to "Campionat"
      expect(result).toContain('Campionat');
    });
  });
});
