import type { PatternContext } from '../types';

/**
 * Default implementation of extracting locale type from filename
 */
const extractLocale = <CTX extends PatternContext = PatternContext>({
  chunk,
}: CTX) => new RegExp(`${chunk.name}\\.(.*?)\\.i18n`);

export default extractLocale;
