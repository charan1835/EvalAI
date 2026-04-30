/**
 * Demo seed data — injected into the history panel when the DB returns an
 * empty result.  Looks real: mix of AI Quiz sessions and Mock Interview
 * evaluations, realistic scores, dates, and question breakdowns.
 */

export const DEMO_HISTORY = [
  // ── AI Quiz entries ──────────────────────────────────────────────────────
  {
    _id: "demo_quiz_1",
    type: "quiz",
    topic: "React.js",
    score: 8,
    total: 10,
    percentage: 80,
    status: "Elite",
    icon: "🧠",
    date: _daysAgo(1),
    questions_detail: [
      _qd("What is the Virtual DOM in React?", { A: "A copy of the real DOM kept in memory", B: "A database layer", C: "A CSS framework", D: "A Node.js module" }, "A", "A", "The virtual DOM is a lightweight in-memory representation that React diffs before applying minimal updates to the real DOM."),
      _qd("Which hook replaces componentDidMount?", { A: "useState", B: "useRef", C: "useEffect", D: "useMemo" }, "C", "C", "useEffect with an empty dependency array runs after the first render, replicating componentDidMount."),
      _qd("What does useCallback return?", { A: "A memoized value", B: "A memoized function", C: "A context", D: "A ref" }, "B", "B", "useCallback returns a stable function reference, preventing unnecessary child re-renders."),
      _qd("How do you prevent re-renders in React?", { A: "React.memo", B: "ReactDOM.render", C: "useState(false)", D: "dangerouslySetInnerHTML" }, "A", "A", "React.memo is a HOC that skips re-rendering if props are shallowly equal."),
      _qd("What is the purpose of keys in lists?", { A: "Styling elements", B: "Uniquely identifying elements for diffing", C: "Event handling", D: "State management" }, "B", "B", "Keys help React identify which items changed, were added, or removed during reconciliation."),
      _qd("What does the Context API solve?", { A: "Async data fetching", B: "Prop drilling", C: "CSS-in-JS", D: "Server-side rendering" }, "B", "B", "Context provides a way to share values without passing props through every component level."),
      _qd("What is a controlled component?", { A: "A component with refs", B: "A component whose input value is driven by state", C: "A component with no children", D: "A pure function" }, "B", "B", "In a controlled component, form data is handled by React state rather than the DOM."),
      _qd("What does React.StrictMode do?", { A: "Enforces HTTPS", B: "Detects potential problems in development", C: "Enables SSR", D: "Compiles JSX" }, "B", "A", "StrictMode renders components twice in development to help identify side-effects."),
      _qd("What is reconciliation?", { A: "Merging git branches", B: "The process React uses to diff virtual DOM trees", C: "State initialization", D: "CSS specificity resolution" }, "B", "B", "Reconciliation is the algorithm React uses to update the DOM by comparing the old and new virtual DOM trees."),
      _qd("When should you use useRef?", { A: "To store mutable values without re-rendering", B: "To replace useState", C: "To fetch data", D: "To define routes" }, "A", "A", "useRef holds a mutable value in .current that persists across renders without triggering re-renders."),
    ],
  },
  {
    _id: "demo_quiz_2",
    type: "quiz",
    topic: "System Design",
    score: 7,
    total: 10,
    percentage: 70,
    status: "Passed",
    icon: "🧠",
    date: _daysAgo(3),
    questions_detail: [
      _qd("What is horizontal scaling?", { A: "Adding more CPU to one server", B: "Adding more servers to a pool", C: "Compressing database rows", D: "Sharding within one DB" }, "B", "B", "Horizontal scaling (scale-out) adds more machines to distribute load, unlike vertical scaling which upgrades one machine."),
      _qd("What does a CDN primarily solve?", { A: "Database latency", B: "Latency for static assets by caching near users", C: "Authentication", D: "Service discovery" }, "B", "B", "CDNs cache static content at edge locations geographically close to users, reducing round-trip time."),
      _qd("What is the CAP theorem?", { A: "CPU, API, Performance", B: "Consistency, Availability, Partition Tolerance — pick two", C: "A cache invalidation strategy", D: "A load balancing algorithm" }, "B", "A", "CAP theorem states that a distributed system can guarantee only two of Consistency, Availability, and Partition Tolerance simultaneously."),
      _qd("What is a message queue used for?", { A: "Caching SQL queries", B: "Decoupling services and buffering async tasks", C: "Storing user sessions", D: "Compiling code" }, "B", "B", "Message queues (e.g., RabbitMQ, Kafka) decouple producers from consumers and enable async processing."),
      _qd("What is an API Gateway?", { A: "A database proxy", B: "A single entry point that routes requests to microservices", C: "A firewall", D: "A DNS resolver" }, "B", "B", "An API Gateway handles routing, auth, rate limiting, and load balancing for downstream microservices."),
      _qd("What is eventual consistency?", { A: "All nodes immediately agree on state", B: "Nodes will converge to the same state given no new updates", C: "Transactions are always atomic", D: "A database replication strategy" }, "B", "B", "Eventual consistency guarantees that, given enough time without updates, all replicas converge to the same value."),
      _qd("What is a load balancer's primary job?", { A: "Encrypt traffic", B: "Distribute incoming requests across multiple servers", C: "Compress responses", D: "Cache database queries" }, "B", "B", "A load balancer distributes network traffic evenly to prevent any single server from becoming a bottleneck."),
      _qd("Which algorithm does consistent hashing solve?", { A: "Sorting distributed data", B: "Minimizing re-distribution when nodes are added/removed", C: "Encrypting cache keys", D: "Compressing JSON" }, "B", "A", "Consistent hashing minimizes key redistribution when servers join or leave a cluster, crucial for distributed caches."),
      _qd("What is a circuit breaker pattern?", { A: "A network firewall rule", B: "A pattern that stops cascading failures by failing fast", C: "A database index type", D: "A CSS layout technique" }, "B", "B", "The circuit breaker stops calling a failing service for a period, preventing cascading failures across the system."),
      _qd("What distinguishes SQL from NoSQL?", { A: "SQL is faster", B: "SQL uses fixed schemas; NoSQL is schema-flexible", C: "NoSQL uses tables", D: "SQL is newer" }, "B", "B", "SQL databases use structured schemas and ACID transactions; NoSQL databases offer flexible schemas for scale."),
    ],
  },
  {
    _id: "demo_quiz_3",
    type: "quiz",
    topic: "Python",
    score: 9,
    total: 10,
    percentage: 90,
    status: "Elite",
    icon: "🧠",
    date: _daysAgo(5),
    questions_detail: [],
  },

  // ── Mock Interview entries ────────────────────────────────────────────────
  {
    _id: "demo_interview_1",
    type: "interview",
    topic: "Data Structures",
    question: "Explain the difference between a stack and a queue.",
    user_answer: "A stack follows LIFO (Last In First Out) and a queue follows FIFO (First In First Out). Stacks are used in recursion and undo operations, while queues are used in scheduling and BFS traversal.",
    score: 8.7,
    status: "Elite",
    icon: "📝",
    date: _daysAgo(2),
  },
  {
    _id: "demo_interview_2",
    type: "interview",
    topic: "Databases",
    question: "What is database indexing and why is it important?",
    user_answer: "An index is a data structure that speeds up data retrieval by allowing the database engine to find rows without scanning every row. It trades write performance for read speed.",
    score: 7.4,
    status: "Passed",
    icon: "📝",
    date: _daysAgo(4),
  },
  {
    _id: "demo_interview_3",
    type: "interview",
    topic: "Algorithms",
    question: "What is the time complexity of Quicksort in the average case?",
    user_answer: "O(n log n) on average because the pivot divides the array roughly in half each time, leading to log n levels with n work at each level.",
    score: 9.1,
    status: "Elite",
    icon: "📝",
    date: _daysAgo(6),
  },
  {
    _id: "demo_interview_4",
    type: "interview",
    topic: "OOP",
    question: "Explain polymorphism with a real-world example.",
    user_answer: "Polymorphism allows objects of different types to be treated as instances of the same base class. For example, a Shape class with a draw() method can be overridden by Circle and Rectangle classes.",
    score: 8.2,
    status: "Elite",
    icon: "📝",
    date: _daysAgo(8),
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

function _daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split("T")[0] + " " +
    d.toTimeString().split(" ")[0].slice(0, 5);
}

function _qd(question, options, correct_answer, user_answer, explanation) {
  return {
    question,
    options,
    correct_answer,
    user_answer,
    is_correct: correct_answer === user_answer,
    explanation,
  };
}
