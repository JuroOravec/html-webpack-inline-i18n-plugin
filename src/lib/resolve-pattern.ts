import type { Pattern, PatternContext } from '../types';
import debug from './debug';

/**
 * Default implementation of extracting locale type from filename
 */
const resolvePattern = <T extends PatternContext>(
  name: string,
  pattern: Pattern,
  ctx: T,
) => {
  if (pattern && typeof pattern === 'function') {
    debug(`Started pattern function "${name}"`);
    const resolvedPattern = pattern(ctx);
    debug(`Done pattern function "${name}"`);
    return resolvedPattern;
  }
  return pattern as string | RegExp;
};

export default resolvePattern;
