// Dynamic Study Generator utilizing Retrieval-Augmented Generation (RAG) modeling.
// Generates detailed summaries, source text chunks (contextual database), quizzes with source citations, 
// and pre-computed Q&A indices simulating search queries over document context.

export function generateStudyData(filename) {
  const name = filename.toLowerCase();
  const cleanName = filename.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ");
  const capitalizedSubject = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);

  // 1. COMPUTER SCIENCE / MACHINE LEARNING / REACT
  if (name.includes('react') || name.includes('learn') || name.includes('code') || name.includes('prog') || name.includes('js') || name.includes('algo')) {
    return {
      summary: "This study text details software engineering design patterns, algorithm optimization principles (Big O), and component rendering mechanics in framework environments. It outlines the separation of data concern from layout rendering, stateful tree structures, and database query optimizations.",
      bullets: [
        "Core Principle: Component-driven architectures utilize virtual DOM trees to minimize costly layout paint events in client browsers.",
        "Key Takeaway 1: React hooks and props manage stateful reactivities, where state changes trigger child component re-renders.",
        "Key Takeaway 2: Machine learning algorithms classify into supervised (labeled mapping) or unsupervised (pattern clustering) categories."
      ],
      // Grounded source passages simulating document chunks extracted by OCR
      sourceChunks: [
        {
          id: "cs-chunk-1",
          source: "Page 1, Paragraph 3",
          text: "Supervised learning models rely on a training dataset containing pairs of input objects and desired output values. The algorithm analyzes the training data and produces an inferred function, which can be used for mapping new examples. In contrast, unsupervised learning processes unlabeled inputs, aiming to detect hidden structures."
        },
        {
          id: "cs-chunk-2",
          source: "Page 2, Paragraph 1",
          text: "React maintains an in-memory representation of the UI called the Virtual DOM. When state updates occur, a diffing algorithm (reconciliation) compares the new element tree with the previous one. It computes the minimum number of steps to apply changes to the actual DOM, optimizing execution speeds."
        },
        {
          id: "cs-chunk-3",
          source: "Page 3, Paragraph 4",
          text: "Algorithmic time complexity measures the growth rate of computational operations relative to input size (n). The ideal is constant time complexity O(1), where actions execute in identical steps regardless of input scaling, whereas quadratic complexity O(n²) indicates nested iteration loops."
        }
      ],
      // Quizzes grounded in retrieved chunks
      quiz: [
        {
          q: "What is the key characteristic that distinguishes supervised learning from unsupervised learning?",
          a: ["Supervised learning uses unlabeled data to group inputs", "Supervised learning requires labeled input-output pairs to train mapping functions", "Supervised learning runs entirely without human-defined inputs", "Supervised learning is slower and cannot scale"],
          correct: 1,
          citation: "Page 1, Paragraph 3",
          excerpt: "Supervised learning models rely on a training dataset containing pairs of input objects and desired output values."
        },
        {
          q: "How does React avoid writing slow updates directly to the browser DOM?",
          a: ["By running styling files on background server threads", "By querying database indexes directly in JavaScript", "By calculating virtual element tree comparisons via a reconciliation algorithm", "By converting code files to static text representations"],
          correct: 2,
          citation: "Page 2, Paragraph 1",
          excerpt: "When state updates occur, a diffing algorithm (reconciliation) compares the new Virtual DOM tree with the previous one to compute the minimum number of changes."
        },
        {
          q: "Which Big O notation represents an algorithm containing nested loops that scale quadratically?",
          a: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
          correct: 3,
          citation: "Page 3, Paragraph 4",
          excerpt: "Quadratic complexity O(n²) indicates nested iteration loops, showing operations grow proportionally to the square of input size."
        }
      ],
      // Suggested queries for Q&A search
      suggestedQueries: [
        "Explain how the Virtual DOM works.",
        "What is the difference between supervised and unsupervised learning?",
        "What does O(n²) mean in terms of scaling?"
      ],
      // RAG QA database simulating query execution
      queryAnswers: {
        "Explain how the Virtual DOM works.": {
          answer: "The Virtual DOM is React's local representation of the real DOM. When a component's state changes, React builds a new Virtual DOM tree and diffs it with the old one (a process called reconciliation). It then calculates the most efficient way to patch the actual browser DOM to match, saving valuable execution time.",
          sources: [
            { source: "Page 2, Paragraph 1", text: "React maintains an in-memory representation of the UI called the Virtual DOM. When state updates occur, a diffing algorithm (reconciliation) compares..." }
          ]
        },
        "What is the difference between supervised and unsupervised learning?": {
          answer: "Supervised learning models train on dataset samples that are already labeled with correct answers, mapping input directly to outputs. Unsupervised learning models work on raw, unlabeled data, attempting to find organic clusters and patterns without preset targets.",
          sources: [
            { source: "Page 1, Paragraph 3", text: "Supervised learning models rely on a training dataset containing pairs of input objects and desired output values... In contrast, unsupervised learning processes unlabeled inputs..." }
          ]
        },
        "What does O(n²) mean in terms of scaling?": {
          answer: "O(n²) represents quadratic complexity. It means that if your input size doubles, the operations required by the algorithm will quadruple. This typically occurs in algorithms that employ nested loops (looping through all elements, and looping through them again inside).",
          sources: [
            { source: "Page 3, Paragraph 4", text: "The ideal is constant time complexity O(1)... whereas quadratic complexity O(n²) indicates nested iteration loops." }
          ]
        }
      }
    };
  }

  // 2. CHEMISTRY
  if (name.includes('chem') || name.includes('organic') || name.includes('acid') || name.includes('reaction') || name.includes('molecule') || name.includes('hydrocarbon')) {
    return {
      summary: "This study text details molecular structure configurations, organic hydrocarbon nomenclature, and chemical thermodynamics. It explores functional group characteristics, reaction activation pathways, and molecular electron behaviors.",
      bullets: [
        "Core Principle: Carbon atoms form stable tetrahedral structures using sp3 hybridization, allowing long-chain hydrocarbon compounds.",
        "Key Takeaway 1: Alkenes and alkynes contain unsaturated double/triple bonds, making them highly receptive to chemical addition reactions.",
        "Key Takeaway 2: Catalysts lower the activation barrier of reaction pathways without changing the free energy of reactants or products."
      ],
      sourceChunks: [
        {
          id: "chem-chunk-1",
          source: "Page 1, Paragraph 2",
          text: "Carbon's electronic configuration allows it to form four covalent bonds. In saturated hydrocarbons (alkanes), carbon atoms display sp3 hybridization, resulting in a tetrahedral geometry with bond angles of approximately 109.5 degrees. This structure yields stable, relatively unreactive bonds."
        },
        {
          id: "chem-chunk-2",
          source: "Page 2, Paragraph 3",
          text: "Unsaturated hydrocarbons contain double bonds (alkenes) or triple bonds (alkynes). These pi bonds are weaker than sigma bonds and present electron-rich centers. Consequently, alkenes readily undergo electrophilic addition, where halogen or hydrogen atoms attach across the double bond."
        },
        {
          id: "chem-chunk-3",
          source: "Page 4, Paragraph 1",
          text: "A catalyst provides an alternative reaction mechanism with a lower activation energy (Ea) compared to the uncatalyzed reaction. However, a catalyst does not alter the thermodynamic variables of the reaction; it accelerates the rate of reaction but does not shift the equilibrium position."
        }
      ],
      quiz: [
        {
          q: "What is the typical bond angle associated with sp3 hybridized carbon atoms in alkanes?",
          a: ["90 degrees", "120 degrees", "109.5 degrees", "180 degrees"],
          correct: 2,
          citation: "Page 1, Paragraph 2",
          excerpt: "In saturated hydrocarbons (alkanes), carbon atoms display sp3 hybridization, resulting in a tetrahedral geometry with bond angles of approximately 109.5 degrees."
        },
        {
          q: "Why do alkenes undergo addition reactions more readily than alkanes?",
          a: ["They are fully saturated with hydrogen atoms", "They contain weaker, electron-rich pi bonds that are accessible to electrophiles", "They are highly acidic in aqueous solution", "They display tetrahedral configurations"],
          correct: 1,
          citation: "Page 2, Paragraph 3",
          excerpt: "These pi bonds are weaker than sigma bonds and present electron-rich centers. Consequently, alkenes readily undergo electrophilic addition."
        },
        {
          q: "How does a catalyst impact a chemical reaction?",
          a: ["It increases the total heat of reaction", "It shifts the final chemical equilibrium towards the product side", "It lowers the activation energy of the reaction pathway", "It destroys the bonds of reactants irreversibly"],
          correct: 2,
          citation: "Page 4, Paragraph 1",
          excerpt: "A catalyst provides an alternative reaction mechanism with a lower activation energy (Ea) compared to the uncatalyzed reaction."
        }
      ],
      suggestedQueries: [
        "Explain sp3 hybridization and bond angles.",
        "Why are unsaturated hydrocarbons reactive?",
        "Do catalysts change reaction thermodynamics?"
      ],
      queryAnswers: {
        "Explain sp3 hybridization and bond angles.": {
          answer: "In sp3 hybridization, one s orbital and three p orbitals merge to create four identical hybrid orbitals. In carbon, these orbitals point to the corners of a tetrahedron, producing a tetrahedral geometry with stable bond angles of 109.5 degrees, characteristic of alkanes.",
          sources: [
            { source: "Page 1, Paragraph 2", text: "In saturated hydrocarbons (alkanes), carbon atoms display sp3 hybridization, resulting in a tetrahedral geometry with bond angles of approximately 109.5 degrees." }
          ]
        },
        "Why are unsaturated hydrocarbons reactive?": {
          answer: "Unsaturated hydrocarbons contain double or triple bonds. These bonds consist of pi (π) bonds which are weaker and hold electrons less tightly than sigma (σ) bonds. Electrophiles are drawn to this electron-rich double-bond space, prompting addition reactions where the pi bond breaks to attach new atoms.",
          sources: [
            { source: "Page 2, Paragraph 3", text: "These pi bonds are weaker than sigma bonds and present electron-rich centers. Consequently, alkenes readily undergo electrophilic addition..." }
          ]
        },
        "Do catalysts change reaction thermodynamics?": {
          answer: "No. Catalysts only speed up the reaction rate by lowering the activation energy barrier. They do not alter the free energy (ΔG) of the reactants or products, meaning the starting materials, final yields, and equilibrium concentrations remain unchanged.",
          sources: [
            { source: "Page 4, Paragraph 1", text: "However, a catalyst does not alter the thermodynamic variables of the reaction; it accelerates the rate... but does not shift the equilibrium." }
          ]
        }
      }
    };
  }

  // 3. BIOLOGY / MEDICINE
  if (name.includes('bio') || name.includes('cell') || name.includes('dna') || name.includes('genetics') || name.includes('anatomy') || name.includes('med')) {
    return {
      summary: "This biology guide details cellular respiration pathways, genetic coding sequences, and membrane transport physics. It outlines structural mechanisms of eukaryotic cells, RNA translations, and enzyme catalysis loops.",
      bullets: [
        "Core Principle: Cellular respiration splits glucose molecules to charge ATP batteries inside the mitochondrial membrane.",
        "Key Takeaway 1: Genetic transcripts code instructions from DNA to mRNA, which is translated by ribosomes into functional amino acid chains.",
        "Key Takeaway 2: Cell membranes regulate internal environments using selective active transport pumps and passive diffusion channels."
      ],
      sourceChunks: [
        {
          id: "bio-chunk-1",
          source: "Page 1, Paragraph 4",
          text: "Cellular respiration occurs in three main stages: glycolysis, the citric acid (Krebs) cycle, and oxidative phosphorylation. Glycolysis breaks down glucose in the cytoplasm. The resulting pyruvate molecules enter the mitochondrial matrix to drive the Krebs cycle, generating NADH and FADH2 to power the electron transport chain."
        },
        {
          id: "bio-chunk-2",
          source: "Page 2, Paragraph 2",
          text: "Gene expression is a two-step process. First, transcription occurs in the cell nucleus, where RNA polymerase synthesizes a complementary mRNA strand from DNA template lines. Second, translation takes place in the cytoplasm, where ribosomes read mRNA codons and assemble matching amino acids into protein chains."
        },
        {
          id: "bio-chunk-3",
          source: "Page 3, Paragraph 5",
          text: "The cell membrane acts as a semi-permeable barrier. Passive transport (diffusion, osmosis) moves molecules down concentration gradients without expenditure of cell energy. Active transport requires ATP energy, utilizing membrane proteins like the sodium-potassium pump to move molecules against concentration gradients."
        }
      ],
      quiz: [
        {
          q: "What is the sequence of stages in cellular respiration, and where does the citric acid (Krebs) cycle occur?",
          a: ["Glycolysis -> Krebs -> ETC; cytoplasm", "Glycolysis -> Krebs -> ETC; mitochondrial matrix", "Krebs -> Glycolysis -> ETC; cell nucleus", "ETC -> Krebs -> Glycolysis; ribosome"],
          correct: 1,
          citation: "Page 1, Paragraph 4",
          excerpt: "Glycolysis breaks down glucose in the cytoplasm. The resulting pyruvate molecules enter the mitochondrial matrix to drive the Krebs cycle..."
        },
        {
          q: "Where in the cell do transcription and translation occur respectively?",
          a: ["Cytoplasm and nucleus", "Ribosome and mitochondria", "Nucleus and cytoplasm", "Nucleus and lysosome"],
          correct: 2,
          citation: "Page 2, Paragraph 2",
          excerpt: "First, transcription occurs in the cell nucleus... Second, translation takes place in the cytoplasm, where ribosomes read mRNA..."
        },
        {
          q: "What distinguishes active transport across cell membranes from passive transport?",
          a: ["Active transport relies solely on water molecules", "Active transport does not require transport proteins", "Active transport requires ATP energy to pump solutes against concentration gradients", "Active transport only moves gases"],
          correct: 2,
          citation: "Page 3, Paragraph 5",
          excerpt: "Active transport requires ATP energy, utilizing membrane proteins... to move molecules against concentration gradients."
        }
      ],
      suggestedQueries: [
        "Describe the stages of cellular respiration.",
        "How are proteins built from DNA instructions?",
        "What is the difference between active and passive transport?"
      ],
      queryAnswers: {
        "Describe the stages of cellular respiration.": {
          answer: "Respiration occurs in three steps: 1) Glycolysis (glucose is split in the cell cytoplasm, generating small amounts of ATP and NADH), 2) The Krebs Cycle (pyruvate is broken down in the mitochondrial matrix to generate electron carriers), and 3) Oxidative Phosphorylation (the electron transport chain utilizes these carriers to generate a large ATP yield).",
          sources: [
            { source: "Page 1, Paragraph 4", text: "Cellular respiration occurs in three main stages: glycolysis, the citric acid (Krebs) cycle, and oxidative phosphorylation..." }
          ]
        },
        "How are proteins built from DNA instructions?": {
          answer: "Proteins are built in a two-stage process: Transcription (an enzyme copies the DNA blueprint into a single-stranded messenger RNA molecule inside the nucleus) and Translation (the mRNA travels to a ribosome in the cytoplasm, which reads the sequence and strings together matching amino acids).",
          sources: [
            { source: "Page 2, Paragraph 2", text: "First, transcription occurs in the cell nucleus, where RNA polymerase... Second, translation takes place in the cytoplasm, where ribosomes read mRNA..." }
          ]
        },
        "What is the difference between active and passive transport?": {
          answer: "Passive transport is the natural movement of substances down their concentration gradient (from high to low concentration) without needing energy. Active transport pumps substances against their natural gradient (from low to high concentration) which requires cellular energy in the form of ATP.",
          sources: [
            { source: "Page 3, Paragraph 5", text: "Passive transport (diffusion, osmosis) moves molecules down concentration gradients... Active transport requires ATP energy..." }
          ]
        }
      }
    };
  }

  // 4. PHYSICS / MATH / CALCULUS
  if (name.includes('phys') || name.includes('math') || name.includes('calc') || name.includes('algebra') || name.includes('mechanic') || name.includes('gravity') || name.includes('quantum')) {
    return {
      summary: "This physics and calculus review outlines vector mechanics, thermodynamic principles, and derivative functions. It focuses on rate-of-change mathematical definitions, kinematics equations, and energy conservation proofs.",
      bullets: [
        "Core Principle: Derivatives quantify the instantaneous rate of change of a variable, geometrically representing tangent line slopes.",
        "Key Takeaway 1: Net force represents the rate of change of momentum over time, translating to F = ma under static mass conditions.",
        "Key Takeaway 2: The total energy of an isolated system is conserved, converting between kinetic, potential, and thermal forms."
      ],
      sourceChunks: [
        {
          id: "phys-chunk-1",
          source: "Page 1, Paragraph 3",
          text: "In calculus, the derivative of a function f(x) measures its sensitivity to change in output relative to inputs. Formally, it is defined as the limit of the difference quotient as the interval approaches zero. Geometrically, the derivative f'(x) represents the slope of the tangent line to the graph at that point."
        },
        {
          id: "phys-chunk-2",
          source: "Page 2, Paragraph 5",
          text: "Newton's second law of motion specifies that the acceleration of an object is directly proportional to the net force acting on it, and inversely proportional to its mass (a = F/m). For constant mass systems, the relationship is written as F = ma, where force and acceleration are vector quantities."
        },
        {
          id: "phys-chunk-3",
          source: "Page 3, Paragraph 2",
          text: "The law of conservation of energy states that the total energy of an isolated system remains constant over time. Energy cannot be created or destroyed, but can only be transformed from one form (e.g., gravitational potential energy) to another (e.g., kinetic energy of motion)."
        }
      ],
      quiz: [
        {
          q: "What does the derivative of a mathematical function represent geometrically?",
          a: ["The area underneath the curve", "The slope of the tangent line to the graph at a given point", "The distance from the origin to the curve", "The intersection of the curve with the y-axis"],
          correct: 1,
          citation: "Page 1, Paragraph 3",
          excerpt: "Geometrically, the derivative f'(x) represents the slope of the tangent line to the graph at that point."
        },
        {
          q: "Under what condition is Newton's second law of motion expressed as the vector formula F = ma?",
          a: ["Only when the system mass remains constant", "Only when the object is at rest", "Only when gravity is neglected", "Only when working in polar coordinates"],
          correct: 0,
          citation: "Page 2, Paragraph 5",
          excerpt: "For constant mass systems, the relationship is written as F = ma, where force and acceleration are vector quantities."
        },
        {
          q: "Which thermodynamic or kinetic law states that energy in an isolated system can only change forms, not be created or destroyed?",
          a: ["Second Law of Thermodynamics", "Newton's Third Law", "Law of Conservation of Energy", "Law of Gravitation"],
          correct: 2,
          citation: "Page 3, Paragraph 2",
          excerpt: "The law of conservation of energy states that the total energy of an isolated system remains constant over time. Energy cannot be created or destroyed..."
        }
      ],
      suggestedQueries: [
        "Formally define a derivative.",
        "Explain Newton's second law.",
        "What does conservation of energy state?"
      ],
      queryAnswers: {
        "Formally define a derivative.": {
          answer: "Formally, a derivative is the limit of the difference quotient [f(x+h) - f(x)] / h as h approaches zero. It measures how much the function's output changes in response to an infinitesimally small change in input. Visually, it equals the slope of the tangent line touching the function curve.",
          sources: [
            { source: "Page 1, Paragraph 3", text: "Formally, it is defined as the limit of the difference quotient... f'(x) represents the slope of the tangent line..." }
          ]
        },
        "Explain Newton's second law.": {
          answer: "Newton's second law states that net force equals the rate of change of momentum. If mass is constant, this simplifies to Net Force = Mass x Acceleration (F=ma). It dictates that an object's acceleration is proportional to the force pushing it and inversely proportional to its mass.",
          sources: [
            { source: "Page 2, Paragraph 5", text: "Newton's second law of motion specifies that the acceleration... is directly proportional to the net force... For constant mass systems, the relationship is written as F = ma..." }
          ]
        },
        "What does conservation of energy state?": {
          answer: "It states that inside any isolated system, the total energy is constant. While energy can move between different types (like potential energy transforming into kinetic motion as an object drops), the overall sum of energy never increases or decreases.",
          sources: [
            { source: "Page 3, Paragraph 2", text: "The law of conservation of energy states that the total energy of an isolated system remains constant over time. Energy cannot be created or destroyed..." }
          ]
        }
      }
    };
  }

  // 5. HISTORY
  if (name.includes('history') || name.includes('war') || name.includes('revolution') || name.includes('rome') || name.includes('treaty') || name.includes('empire') || name.includes('ancient')) {
    return {
      summary: "This study text details socio-political shifts, economic triggers of structural revolutions, and negotiation dynamics of global treaties. It examines territorial partitions, imperial collapses, and systemic societal changes.",
      bullets: [
        "Core Principle: Structural economic imbalances combined with social stratification form primary triggers for political revolution.",
        "Key Takeaway 1: The collapse of centralized Roman administration in 476 AD initiated localized governance networks across Europe (feudalism).",
        "Key Takeaway 2: The Treaty of Versailles imposed severe financial liabilities and territorial losses, creating major economic instability."
      ],
      sourceChunks: [
        {
          id: "hist-chunk-1",
          source: "Page 1, Paragraph 3",
          text: "The fall of the Western Roman Empire in 476 AD, marked by the deposition of Romulus Augustulus by Odoacer, dissolved centralized authority. In the vacuum, local landowners consolidated power, leading to the rise of feudalism—a decentralized system of reciprocal military and land obligations."
        },
        {
          id: "hist-chunk-2",
          source: "Page 2, Paragraph 4",
          text: "The French Revolution of 1789 stemmed from structural grievances, including severe crown insolvency, poor harvest shortages, and the inequitable taxation of the Third Estate (commoners), while the nobility and clergy retained tax exemptions. This culminated in the storming of the Bastille."
        },
        {
          id: "hist-chunk-3",
          source: "Page 4, Paragraph 2",
          text: "Signed in 1919, the Treaty of Versailles concluded World War I. Article 231 (the War Guilt Clause) placed absolute blame on Germany, demanding 132 billion gold marks in reparations. The resulting economic inflation and loss of industrial territories weakened Weimar Germany's stability."
        }
      ],
      quiz: [
        {
          q: "What political structure emerged in Western Europe following the fall of centralized Roman authority in 476 AD?",
          a: ["Democratic republics", "Decentralized feudalism based on land and military service", "The Holy Roman Empire's immediate consolidation", "Absolutist industrial regimes"],
          correct: 1,
          citation: "Page 1, Paragraph 3",
          excerpt: "In the vacuum, local landowners consolidated power, leading to the rise of feudalism—a decentralized system of reciprocal military and land obligations."
        },
        {
          q: "Which tax structure grievance contributed directly to the outbreak of the French Revolution in 1789?",
          a: ["The Third Estate was exempt from paying taxes", "Nobles were taxed at double the rate of commoners", "Commoners (Third Estate) paid the burden of taxes while nobility and clergy were exempt", "The church was forced to pay all royal debts"],
          correct: 2,
          citation: "Page 2, Paragraph 4",
          excerpt: "First-tier grievances included the inequitable taxation of the Third Estate (commoners), while the nobility and clergy retained tax exemptions."
        },
        {
          q: "What was the consequence of Article 231 of the Treaty of Versailles?",
          a: ["It partitioned Germany into four occupation zones", "It laid blame on Germany and forced huge financial reparations", "It established the League of Nations headquarters in Berlin", "It forgave all wartime loans"],
          correct: 1,
          citation: "Page 4, Paragraph 2",
          excerpt: "Article 231 (the War Guilt Clause) placed absolute blame on Germany, demanding 132 billion gold marks in reparations."
        }
      ],
      suggestedQueries: [
        "Explain the origins of feudalism.",
        "What caused the French Revolution?",
        "What were the economic effects of the Treaty of Versailles?"
      ],
      queryAnswers: {
        "Explain the origins of feudalism.": {
          answer: "Feudalism arose after the Western Roman Empire collapsed in 476 AD. Without a central army or government to protect people, regional landholders stepped in. They exchanged land and safety for military service and farm labor from local commoners, creating a localized, hierarchical grid of power.",
          sources: [
            { source: "Page 1, Paragraph 3", text: "The fall of the Western Roman Empire... dissolved centralized authority. In the vacuum, local landowners consolidated power, leading to the rise of feudalism..." }
          ]
        },
        "What caused the French Revolution?": {
          answer: "The French Revolution of 1789 was sparked by a financial crisis due to royal debts, severe food shortages from bad crop harvests, and anger over an unfair class tax system where the wealthy nobles and clergy paid nothing, while commoners bore the entire tax load.",
          sources: [
            { source: "Page 2, Paragraph 4", text: "The French Revolution... stemmed from structural grievances, including severe crown insolvency, poor harvest shortages, and the inequitable taxation of the Third Estate..." }
          ]
        },
        "What were the economic effects of the Treaty of Versailles?": {
          answer: "The treaty forced Germany to take full blame for World War I and pay astronomical reparations (132 billion gold marks). Combined with the loss of resource-rich industrial land, this triggered hyperinflation, ruined the German currency, and destabilized the Weimar Republic.",
          sources: [
            { source: "Page 4, Paragraph 2", text: "Article 231 placed absolute blame on Germany... demanding 132 billion gold marks in reparations. The resulting economic inflation and loss of industrial territories weakened Weimar Germany's stability." }
          ]
        }
      }
    };
  }

  // 6. ECONOMICS / BUSINESS / MARKETING
  if (name.includes('econ') || name.includes('market') || name.includes('finance') || name.includes('business') || name.includes('inflation') || name.includes('stock') || name.includes('money')) {
    return {
      summary: "This economic analysis covers market equilibrium structures, monetary policy controls, and corporate accounting frameworks. It details supply-demand dynamics, inflation mechanics, and financial statement structures.",
      bullets: [
        "Core Principle: Market clearing prices occur where the quantity supplied matches the quantity demanded on supply-demand curves.",
        "Key Takeaway 1: Inflation splits into demand-pull (consumer spending growth) and cost-push (rising manufacturing resource costs) types.",
        "Key Takeaway 2: Balance sheets inventory assets, liabilities, and equity, satisfying the equation: Assets = Liabilities + Equity."
      ],
      sourceChunks: [
        {
          id: "econ-chunk-1",
          source: "Page 1, Paragraph 2",
          text: "In microeconomics, the law of supply and demand determines price equilibrium. The supply curve slopes upward, showing producers offer more goods at higher prices, while the demand curve slopes downward. The intersection represents the equilibrium price, where supply equals demand."
        },
        {
          id: "econ-chunk-2",
          source: "Page 2, Paragraph 4",
          text: "Inflation is the rate at which general prices increase. Demand-pull inflation occurs when aggregate demand grows faster than aggregate supply. Cost-push inflation is driven by increases in wages and raw materials, forcing producers to raise prices to protect margins."
        },
        {
          id: "econ-chunk-3",
          source: "Page 3, Paragraph 3",
          text: "Corporate accounting relies on the double-entry bookkeeping system. The balance sheet reflects a snapshot of a firm's financial status at a specific date. It is governed by the accounting equation: Assets = Liabilities + Owner's Equity, indicating assets must match debts and capital inputs."
        }
      ],
      quiz: [
        {
          q: "What defines the equilibrium price point on a supply and demand graph?",
          a: ["The point where the supply curve touches the vertical y-axis", "The point where the quantity demanded equals the quantity supplied", "The maximum possible price set by central regulators", "The point where company profit is zero"],
          correct: 1,
          citation: "Page 1, Paragraph 2",
          excerpt: "The intersection represents the equilibrium price, where the quantity supplied equals the quantity demanded."
        },
        {
          q: "What is the primary driver of cost-push inflation?",
          a: ["Excessive printing of paper currency by central banks", "Rapid growth in consumer credit and borrowing", "Increases in raw material prices or wages that raise production costs", "A sharp decline in currency interest rates"],
          correct: 2,
          citation: "Page 2, Paragraph 4",
          excerpt: "Cost-push inflation is driven by increases in wages and raw materials, forcing producers to raise prices to protect margins."
        },
        {
          q: "Which fundamental accounting equation must be satisfied by a corporate balance sheet?",
          a: ["Assets = Liabilities - Equity", "Assets = Liabilities + Equity", "Equity = Assets + Liabilities", "Liabilities = Assets + Equity"],
          correct: 1,
          citation: "Page 3, Paragraph 3",
          excerpt: "It is governed by the accounting equation: Assets = Liabilities + Owner's Equity."
        }
      ],
      suggestedQueries: [
        "Explain the law of supply and demand.",
        "What is the difference between demand-pull and cost-push inflation?",
        "What is the core accounting equation?"
      ],
      queryAnswers: {
        "Explain the law of supply and demand.": {
          answer: "The law of supply and demand states that market prices are set by two competing forces: supply (how much of a product is available) and demand (how much people want it). As prices go up, producers want to sell more (supply slopes up) but buyers want to buy less (demand slopes down). The price settles where these two lines cross, called market equilibrium.",
          sources: [
            { source: "Page 1, Paragraph 2", text: "The supply curve slopes upward... while the demand curve slopes downward. The intersection represents the equilibrium price..." }
          ]
        },
        "What is the difference between demand-pull and cost-push inflation?": {
          answer: "Demand-pull inflation is caused by high demand—buyers have more money and want to buy more than what is available, pulling prices up. Cost-push inflation is caused by supply costs—rising costs of raw materials or workers force companies to raise prices to maintain profit margins.",
          sources: [
            { source: "Page 2, Paragraph 4", text: "Demand-pull inflation occurs when aggregate demand grows faster... Cost-push inflation is driven by increases in wages and raw materials..." }
          ]
        },
        "What is the core accounting equation?": {
          answer: "The accounting equation is Assets = Liabilities + Owner's Equity. It forms the backbone of a balance sheet, stating that everything a company owns (assets) must be financed either through borrowing money (liabilities) or using the owners' own funds and profits (equity).",
          sources: [
            { source: "Page 3, Paragraph 3", text: "It is governed by the accounting equation: Assets = Liabilities + Owner's Equity, indicating assets must match debts and capital inputs." }
          ]
        }
      }
    };
  }

  // 7. GENERIC FALLBACK (Dynamically structures RAG chunks based on filename words)
  return {
    summary: `This research brief covers core themes and structural definitions relating to "${capitalizedSubject}". It reviews foundational theories, operational workflows, and active recall studies within this specific discipline.`,
    bullets: [
      `Core Principle: Systematic exploration of ${capitalizedSubject} establishes a structured knowledge index, accelerating information retrieval.`,
      `Key Takeaway 1: Classifying key metrics inside ${capitalizedSubject} lowers search latency during active studies by up to 50%.`,
      `Key Takeaway 2: Grounding studies in primary document text blocks prevents memory leakage and resolves conceptual ambiguities.`
    ],
    sourceChunks: [
      {
        id: "gen-chunk-1",
        source: "Page 1, Paragraph 2",
        text: `The core structure of ${capitalizedSubject} is determined by primary variables and environmental inputs. Research indicates that analyzing these systems in isolation provides key indicators about how the overall subject behaves under experimental loading conditions.`
      },
      {
        id: "gen-chunk-2",
        source: "Page 2, Paragraph 4",
        text: `Active recall study methods represent a major shift from passive note review. By prompting the cognitive system to retrieve information directly from memory channels, synaptic networks are re-fortified, increasing long-term conceptual retention ratios.`
      },
      {
        id: "gen-chunk-3",
        source: "Page 3, Paragraph 1",
        text: "Retrieval-Augmented Generation (RAG) is a concept that merges document context retrieval with text generation. In educational study tools, showing exact page references alongside answers guarantees that study assessments are anchored in verified source material."
      }
    ],
    quiz: [
      {
        q: `What is the primary focus of the document "${filename}"?`,
        a: [`Investigating core parameters and workflows of ${cleanName}`, "Analyzing mechanical components in unrelated systems", "Exploring agricultural trends in sub-tropical zones", "Determining thermodynamic factors in isolated networks"],
        correct: 0,
        citation: "Page 1, Paragraph 2",
        excerpt: `The core structure of ${capitalizedSubject} is determined by primary variables and environmental inputs.`
      },
      {
        q: "Why is active recall considered superior to passive note-reading for students?",
        a: ["It saves time by omitting important sections", "It forces the brain to retrieve information, strengthening neural pathways", "It completely eliminates the need to review index lists", "It is easier to implement without thinking"],
        correct: 1,
        citation: "Page 2, Paragraph 4",
        excerpt: "By prompting the cognitive system to retrieve information directly from memory channels, synaptic networks are re-fortified..."
      },
      {
        q: "What is the primary benefit of incorporating RAG concepts in study assessments?",
        a: ["It randomizes quiz questions automatically", "It guarantees that study evaluations are anchored in verified source material via citations", "It reduces the size of files stored on server vaults", "It allows students to skip reading documents entirely"],
        correct: 1,
        citation: "Page 3, Paragraph 1",
        excerpt: "RAG merges document context retrieval with text generation... showing exact page references alongside answers guarantees that study assessments are anchored in verified source material."
      }
    ],
    suggestedQueries: [
      `What is the core focus of ${capitalizedSubject}?`,
      "What are the benefits of active recall?",
      "How does RAG apply to study assessments?"
    ],
    queryAnswers: {
      [`What is the core focus of ${capitalizedSubject}?`]: {
        answer: `The document details structural parameters, baseline equations, and operational workflows of ${capitalizedSubject}, highlighting how individual variables interact to form the overall subject environment.`,
        sources: [
          { source: "Page 1, Paragraph 2", text: `The core structure of ${capitalizedSubject} is determined by primary variables and environmental inputs.` }
        ]
      },
      "What are the benefits of active recall?": {
        answer: "Active recall forces the brain to retrieve information from memory, which re-strengthens pathways. This leads to much stronger long-term retention compared to passive reading, which only creates a false sense of familiarity.",
        sources: [
          { source: "Page 2, Paragraph 4", text: "By prompting the cognitive system to retrieve information directly from memory channels, synaptic networks are re-fortified..." }
        ]
      },
      "How does RAG apply to study assessments?": {
        answer: "By linking quiz questions and summaries directly to their corresponding text chunks in the document (complete with page numbers and quotes), RAG ensures study assessments are grounded in the source, increasing precision and accuracy.",
        sources: [
          { source: "Page 3, Paragraph 1", text: "RAG merges document context retrieval with text generation... showing exact page references alongside answers guarantees that study assessments are anchored..." }
        ]
      }
    }
  };
}
