/**
 * Demo seed data — injected into the history panel when the DB returns an
 * empty result.  Looks real: mix of AI Quiz sessions and Mock Interview
 * evaluations, realistic scores, dates, and question breakdowns.
 */

export const DEMO_QUESTIONS = [
  // ── Data Structures ───────────────────────────────────────────────────────
  { question: "What is the difference between a stack and a queue?", answer: "A stack is a LIFO (Last In First Out) data structure where elements are added and removed from the same end (top). A queue is FIFO (First In First Out) where elements are added at the rear and removed from the front. Stacks are used in recursion and undo operations; queues are used in scheduling and BFS traversal.", category: "Data Structures", difficulty: "Easy" },
  { question: "Explain the concept of a binary search tree (BST).", answer: "A BST is a tree where each node has at most two children. For every node, all values in the left subtree are smaller and all values in the right subtree are larger. This property enables O(log n) search, insertion, and deletion in a balanced tree.", category: "Data Structures", difficulty: "Medium" },
  { question: "What is a hash table and how does it handle collisions?", answer: "A hash table maps keys to values using a hash function to compute bucket indices, enabling O(1) average-case operations. Collisions are handled via chaining (linked list at each bucket) or open addressing (probing for the next empty slot).", category: "Data Structures", difficulty: "Medium" },
  { question: "What is the difference between a linked list and an array?", answer: "Arrays store elements in contiguous memory and support O(1) random access but have fixed size. Linked lists store nodes with data and pointers, allowing O(1) insertions/deletions at the head but requiring O(n) for random access and using extra memory for pointers.", category: "Data Structures", difficulty: "Easy" },
  { question: "Explain graph traversal using BFS and DFS.", answer: "BFS uses a queue and explores nodes level by level — ideal for shortest paths in unweighted graphs. DFS uses a stack (or recursion) and explores as far as possible before backtracking — good for topological sort, cycle detection, and maze solving.", category: "Data Structures", difficulty: "Hard" },

  // ── Algorithms ────────────────────────────────────────────────────────────
  { question: "What is the time complexity of Quicksort and when does it degrade?", answer: "Quicksort has O(n log n) average-case time complexity. It degrades to O(n²) worst case when the pivot is always the smallest or largest element (e.g., already-sorted arrays with naive pivot selection).", category: "Algorithms", difficulty: "Medium" },
  { question: "Explain dynamic programming with an example.", answer: "Dynamic programming solves problems by breaking them into overlapping subproblems and storing results to avoid recomputation. Example: Fibonacci — naively O(2^n) but with DP becomes O(n). It requires optimal substructure and overlapping subproblems.", category: "Algorithms", difficulty: "Hard" },
  { question: "What is binary search and what is its time complexity?", answer: "Binary search finds a target in a sorted array by repeatedly halving the search interval. It compares the target to the midpoint — if smaller, search left; if larger, search right. Time complexity is O(log n).", category: "Algorithms", difficulty: "Easy" },
  { question: "What is the difference between Dijkstra's and Bellman-Ford algorithms?", answer: "Dijkstra's finds shortest paths in O((V+E) log V) but only works with non-negative weights. Bellman-Ford works with negative weights and detects negative cycles in O(VE) time, making it slower but more versatile.", category: "Algorithms", difficulty: "Hard" },

  // ── OOP ──────────────────────────────────────────────────────────────────
  { question: "Explain the four pillars of Object-Oriented Programming.", answer: "1. Encapsulation: bundling data and methods, restricting direct access. 2. Abstraction: hiding implementation details. 3. Inheritance: a class deriving from a parent class. 4. Polymorphism: objects of different types responding to the same interface differently.", category: "OOP", difficulty: "Easy" },
  { question: "What is the difference between method overloading and method overriding?", answer: "Method overloading (compile-time polymorphism) defines multiple methods with the same name but different parameters. Method overriding (runtime polymorphism) allows a subclass to provide a specific implementation of a method already defined in its parent class.", category: "OOP", difficulty: "Medium" },
  { question: "What is the SOLID principle in software design?", answer: "SOLID: Single Responsibility (one reason to change), Open/Closed (open for extension, closed for modification), Liskov Substitution (subtypes substitutable for base types), Interface Segregation (small specific interfaces), Dependency Inversion (depend on abstractions).", category: "OOP", difficulty: "Hard" },

  // ── Databases ─────────────────────────────────────────────────────────────
  { question: "What are ACID properties in database transactions?", answer: "ACID ensures reliable transactions: Atomicity (all or nothing), Consistency (valid state to valid state), Isolation (concurrent transactions don't interfere), Durability (committed data persists after failures).", category: "Databases", difficulty: "Medium" },
  { question: "What is database normalization and why is it important?", answer: "Normalization organizes data to reduce redundancy. 1NF eliminates repeating groups. 2NF removes partial dependencies. 3NF removes transitive dependencies. It ensures consistency and reduces update anomalies.", category: "Databases", difficulty: "Medium" },
  { question: "Explain the difference between SQL and NoSQL databases.", answer: "SQL uses structured schemas and ACID transactions — ideal for relational data. NoSQL offers flexible schemas and horizontal scalability — suited for unstructured data and high-volume workloads like MongoDB, Cassandra, and Redis.", category: "Databases", difficulty: "Easy" },

  // ── System Design ─────────────────────────────────────────────────────────
  { question: "What is the CAP theorem?", answer: "CAP theorem: a distributed system can guarantee at most two of Consistency (every read gets the latest write), Availability (every request gets a response), and Partition Tolerance (works despite network splits). Partition tolerance is mandatory in practice, so the trade-off is C vs A.", category: "System Design", difficulty: "Hard" },
  { question: "Explain the purpose of a load balancer.", answer: "A load balancer distributes incoming traffic across multiple backend servers to prevent overload. It improves availability and scalability using algorithms like round-robin, least connections, or IP hash, and routes traffic away from unhealthy servers.", category: "System Design", difficulty: "Medium" },
  { question: "What is the difference between horizontal and vertical scaling?", answer: "Vertical scaling increases resources (CPU, RAM) of one server — simple but has a hardware ceiling. Horizontal scaling adds more servers — preferred for distributed systems due to better fault tolerance and theoretically unlimited capacity.", category: "System Design", difficulty: "Easy" },

  // ── Python ────────────────────────────────────────────────────────────────
  { question: "What is the Python GIL and how does it affect multithreading?", answer: "The GIL (Global Interpreter Lock) allows only one thread to execute Python bytecode at a time. This prevents true CPU parallelism with threads. Use multiprocessing for CPU-bound tasks, or async IO for IO-bound concurrency.", category: "Python", difficulty: "Hard" },
  { question: "What is the difference between a list and a tuple in Python?", answer: "Lists are mutable ordered sequences created with []. Tuples are immutable created with (). Tuples are faster, can be dictionary keys, and signal that data shouldn't change. Use lists for dynamic collections, tuples for fixed data.", category: "Python", difficulty: "Easy" },
  { question: "Explain Python decorators with an example.", answer: "A decorator wraps a function to add behavior without modifying its source code. Applied with @syntax. A @timer decorator measures execution time by wrapping the function in a wrapper that records start/end time. Used for logging, caching, and auth.", category: "Python", difficulty: "Medium" },

  // ── React ─────────────────────────────────────────────────────────────────
  { question: "What is the difference between useState and useReducer?", answer: "useState is best for simple independent state. useReducer is preferred for complex state logic with multiple sub-values or when next state depends on previous. useReducer takes (state, action) => newState and makes state transitions explicit.", category: "React", difficulty: "Medium" },
  { question: "What are React keys and why are they important?", answer: "Keys give list elements a stable identity so React can efficiently reconcile (diff) the virtual DOM. They must be unique among siblings. Using array indices as keys causes bugs when reordering items.", category: "React", difficulty: "Easy" },
  { question: "Explain the React component lifecycle using hooks.", answer: "componentDidMount = useEffect(()=>{}, []). componentDidUpdate = useEffect(()=>{}, [dep]). componentWillUnmount = cleanup function returned from useEffect. useState replaces this.state. useRef replaces createRef for persisting values.", category: "React", difficulty: "Hard" },
];

export const DEMO_LEADERBOARD = [
  { rank: 1,  name: "Arjun Mehta",      avatar: "AM", score: 9.7, sessions: 48, streak: 21, tier: "FAANG Elite",    badge: "🏆", domain: "System Design",   trend: "+0.3", college: "IIT Bombay" },
  { rank: 2,  name: "Priya Sharma",     avatar: "PS", score: 9.4, sessions: 41, streak: 18, tier: "FAANG Elite",    badge: "🥈", domain: "Algorithms",       trend: "+0.5", college: "IIT Delhi" },
  { rank: 3,  name: "Rahul Nair",       avatar: "RN", score: 9.1, sessions: 37, streak: 14, tier: "FAANG Elite",    badge: "🥉", domain: "Data Structures",  trend: "+0.2", college: "NIT Trichy" },
  { rank: 4,  name: "Sneha Patel",      avatar: "SP", score: 8.8, sessions: 34, streak: 11, tier: "Senior Dev",     badge: "⭐", domain: "React.js",         trend: "+0.4", college: "BITS Pilani" },
  { rank: 5,  name: "Vikram Iyer",      avatar: "VI", score: 8.5, sessions: 29, streak: 9,  tier: "Senior Dev",     badge: "⭐", domain: "Python",           trend: "-0.1", college: "IIT Madras" },
  { rank: 6,  name: "Ananya Roy",       avatar: "AR", score: 8.2, sessions: 26, streak: 7,  tier: "Mid-Level",      badge: "💎", domain: "Databases",        trend: "+0.6", college: "VIT Vellore" },
  { rank: 7,  name: "Karthik Reddy",    avatar: "KR", score: 7.9, sessions: 22, streak: 5,  tier: "Mid-Level",      badge: "💎", domain: "OOP",              trend: "+0.1", college: "SRM University" },
  { rank: 8,  name: "Divya Krishnan",   avatar: "DK", score: 7.6, sessions: 19, streak: 4,  tier: "Mid-Level",      badge: "💡", domain: "System Design",   trend: "+0.3", college: "Manipal University" },
  { rank: 9,  name: "Aditya Joshi",     avatar: "AJ", score: 7.3, sessions: 16, streak: 3,  tier: "Developing",     badge: "💡", domain: "Algorithms",       trend: "+0.2", college: "RVCE Bangalore" },
  { rank: 10, name: "Meera Pillai",     avatar: "MP", score: 7.0, sessions: 13, streak: 2,  tier: "Developing",     badge: "🔥", domain: "Python",           trend: "+0.8", college: "PES University" },
];

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
