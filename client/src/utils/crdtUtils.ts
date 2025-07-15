import type { Id, Version } from "../types/shared";
/**
 * Checks if two IDs are equal
 * @param a - The first ID
 * @param b - The second ID
 * @returns True if the IDs are equal, false otherwise
 */
export const idEq = (a: Id | null, b: Id | null): boolean =>
  // TODO: naming convention is a bit confusing
  a == b || (a !== null && b !== null && a[0] === b[0] && a[1] === b[1]);

/**
 * Checks if an item is in the version of the document
 * @param id - The ID of the item to check
 * @param version - The version of the document to check
 * @returns True if the item is in the version, false otherwise
 */
export function isInVersion(id: Id | null, version: Version): boolean {
  // ID Validation
  if (id === null) {
    return true;
  }
  const [agent, seq] = id;
  const highestSeq = version[agent];
  if (highestSeq == null) {
    return false;
  } else {
    // We've seen this version already
    return highestSeq >= seq;
  }
}
