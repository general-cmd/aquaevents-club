/**
 * Translation router for event content
 */

import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { translateEventTitle, translateEventDescription, translateEventTitlesBatch } from "../eventTranslation";

export const translationRouter = router({
  /**
   * Translate single event title or description
   */
  translateEvent: publicProcedure
    .input(z.object({
      text: z.string(),
      targetLang: z.string(),
      type: z.enum(['title', 'description'])
    }))
    .mutation(async ({ input }) => {
      const { text, targetLang, type } = input;

      if (type === 'title') {
        const translation = await translateEventTitle(text, targetLang);
        return { translation };
      } else {
        const translation = await translateEventDescription(text, targetLang);
        return { translation };
      }
    }),

  /**
   * Batch translate multiple event titles
   */
  translateEventBatch: publicProcedure
    .input(z.object({
      titles: z.array(z.string()),
      targetLang: z.string()
    }))
    .mutation(async ({ input }) => {
      const { titles, targetLang } = input;
      const translations = await translateEventTitlesBatch(titles, targetLang);
      return { translations };
    })
});
