/**
 * Represents the ID of an item (i.e., a single character) in the document
 * This is a lamport timestamp to ensure that the ID is unique and ordered
 */
export type Id = [agent: string, timestamp: number];

/**
 * Represents the version of the document for each agent
 */
export type Version = Record<string, number>;
