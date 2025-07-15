import type { Id, Version } from "./shared";
import type { CRDTDocument } from "./CRDTText";

export class Node {
  id: Id;
  children: Node[]; // represents the array of child nodes of this node
  parent: Node | null;
  content: CRDTDocument;
  deleted: boolean;
  dependencies: Operation[];
  path: Cursor;

  constructor(
    agent: string,
    content: CRDTDocument,
    parent: Node | null = null
  ) {
    this.parent = parent;
    this.content = content;
    this.deleted = false;
    this.dependencies = parent
      ? [
          ...parent.dependencies,
          {
            id: parent.id,
            dependencies: parent.dependencies,
            cursor: [...parent.path, parent.idToString()],
            mutation: "assign",
          },
        ]
      : [];
    this.children = [];
    this.path = parent ? [...parent.path, parent.idToString()] : [];
    this.id = [
      agent,
      this.dependencies.length === 0 ? 0 : this.dependencies.length + 1,
    ];
  }

  idToString() {
    return `${this.id[0]}${this.id[1]}`;
  }
}

type Cursor = string[];

type Operation = {
  id: Id;
  dependencies: Operation[];
  cursor: Cursor;
  mutation: "insert" | "assign" | "delete"; // make this an enum later
};

export class CRDTTree {
  nodes: Node[];
  version: Version;
  cursor: Cursor;
  root: Node;

  constructor(nodes: Node[] = [], version: Version, cursor: Cursor) {
    this.nodes = nodes;
    this.version = version;
    this.cursor = cursor;
    this.root = new Node();
  }

  insert(newNode: Node) {
    // iterate from the root node to the new node, appending all of the dependency arrays into a new array, which
    let dependencies: Operation[] = [];
    let currentNode: Node = this.root;

    this.nodes.push(newNode);
  }

  assign() {}
  delete() {}
}
