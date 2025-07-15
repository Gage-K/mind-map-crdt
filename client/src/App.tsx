import "./App.css";
import { CRDTTree, Node } from "./types/CRDTTree";
import { CRDTDocument } from "./types/CRDTText";

function App() {
  const node1 = new Node(
    "agent1",
    new CRDTDocument("agent1", "Hello, world!"),
    null
  );
  const node2 = new Node(
    "agent2",
    new CRDTDocument("agent2", "Hello, world!"),
    node1
  );
  const node3 = new Node(
    "agent3",
    new CRDTDocument("agent1", "Hello, world!"),
    node2
  );
  const tree = new CRDTTree([], { agent1: 0, agent2: 0, agent3: 0 }, []);
  tree.insert(node1);
  tree.insert(node2);
  tree.insert(node3);

  console.log(tree);

  return (
    <>
      <h1>Hello World</h1>
    </>
  );
}

export default App;
