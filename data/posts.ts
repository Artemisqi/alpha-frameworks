export interface Post {
  slug: string;
  title: string;
  category: string;
  date: string;
  year: number;
  summary: string;
  body: string;
  readTime: string;
  published: boolean;
  coverImage?: string;
  tags?: string[];
  mood?: string;
  images?: string[];
}

export const defaultPosts: Post[] = [
  {
    slug: "agent-team",
    title: "Agent Team：从单一模型走向委员会式决策",
    category: "AI / Systems",
    date: "2026-03",
    year: 2026,
    summary:
      "当 Agent Flow 进入多模型协同阶段，真正的 alpha 不在单个模型能力，而在委员会规则、共识形成和分工结构。",
    readTime: "8 min read",
    published: true,
    tags: ["AI", "Agent", "Multi-model", "Decision Systems"],
    mood: "🔥",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop",
    body: `
      <p>过去一个阶段，市场对 AI 的理解更多停留在单模型能力的提升。但真正有意思的变化，可能发生在多模型协同与流程设计层。</p>
      <p>当 GPT、Claude、Gemini、Qwen 这类模型被放入同一个工作流，它们不再只是替代关系，而可以形成互相审查、互相补充、彼此纠错的委员会结构。</p>
      <p>这意味着未来的产品护城河，可能并不只是模型参数本身，而是 decision protocol、routing、consensus 与 exception handling。</p>
      <h2>为什么这件事重要</h2>
      <p>如果一个复杂任务从"问一个模型"变成"多个模型互相评审后再由一个仲裁者做最终决策"，那么 AI 的可靠性会明显提升。</p>
      <p>对企业来说，这意味着在高价值、高风险场景中，AI 的可用性会更强；对投资来说，这意味着价值捕获不一定只在底层模型，也可能在 orchestration、workflow、control layer。</p>
      <h2>投资上的含义</h2>
      <p>如果这个方向成立，那么市场未来会越来越关注：</p>
      <ul>
        <li>AI orchestration</li>
        <li>observability</li>
        <li>workflow infrastructure</li>
        <li>enterprise control layer</li>
      </ul>
      <p>也就是说，真正的 alpha 可能来自"AI 如何被组织起来"，而不只是"AI 本身有多强"。</p>
    `,
  },
  {
    slug: "storage-ai-infra",
    title: "存储不是周期，而是 AI 基础设施的第二引擎",
    category: "Semis / Research",
    date: "2026-02",
    year: 2026,
    summary:
      "HBM、封装、带宽与推理成本共同决定了新一轮价值分配。真正值得研究的是瓶颈如何迁移，而不是只看传统 DRAM 周期。",
    readTime: "6 min read",
    published: true,
    tags: ["Semiconductors", "HBM", "AI Infrastructure", "Memory"],
    mood: "🧠",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop",
    body: `
      <p>传统半导体周期的分析框架正在失效。当 AI 训练和推理的需求指数级增长，存储不再只是"周期性商品"，而变成了基础设施瓶颈。</p>
      <h2>HBM 的结构性变化</h2>
      <p>HBM（高带宽内存）已经从边缘产品变成了 AI 芯片的核心组件。SK Hynix、Samsung、Micron 的竞争焦点正在从传统 DRAM 转向 HBM 和先进封装。</p>
      <p>这意味着存储行业的估值逻辑需要重写：不再是简单的供需周期，而是结构性的 AI 基础设施需求。</p>
      <h2>投资框架</h2>
      <p>关注三个维度：</p>
      <ul>
        <li>带宽瓶颈的迁移路径</li>
        <li>封装技术的价值捕获</li>
        <li>推理成本下降曲线与存储需求的关系</li>
      </ul>
    `,
  },
  {
    slug: "iran-conflict-market",
    title: "伊朗冲突的市场传导：油价、通胀与风格切换",
    category: "Macro / Geopolitics",
    date: "2026-01",
    year: 2026,
    summary:
      "地缘冲突如何通过油价传导至通胀预期，进而改变市场的风格偏好和资产配置逻辑。",
    readTime: "5 min read",
    published: true,
    tags: ["Geopolitics", "Oil", "Inflation", "Macro"],
    mood: "⚡",
    coverImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=600&fit=crop",
    body: `
      <p>地缘政治风险的市场定价，往往不在事件本身，而在传导链条。伊朗局势的升级需要关注的不是冲突本身，而是它如何影响油价、通胀预期和央行决策。</p>
      <h2>传导路径</h2>
      <p>油价上涨 → 通胀预期上升 → 利率预期调整 → 成长股承压 → 价值/能源板块相对受益。</p>
      <p>这条链条的每一环都有非线性的可能，关键在于判断哪些环节会被市场过度定价，哪些被忽略。</p>
    `,
  },
  {
    slug: "datadog-ai-workflow",
    title: "Datadog：从 observability 到 AI-native workflow 的跃迁",
    category: "Company / SaaS",
    date: "2026-01",
    year: 2026,
    summary:
      "Datadog 如何从监控工具进化为 AI 工作流的核心基础设施，以及这对 SaaS 估值框架的影响。",
    readTime: "7 min read",
    published: true,
    tags: ["SaaS", "Datadog", "Observability", "AI Workflow"],
    mood: "💡",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
    body: `
      <p>Datadog 的故事不只是 observability。当 AI agent 成为企业标配，谁来监控 agent 的行为、成本和可靠性？这正是 Datadog 的下一个增长引擎。</p>
      <h2>从监控到 AI 工作流</h2>
      <p>传统的 APM（应用性能监控）正在扩展为 AI 工作流的全链路可观测性。这包括模型调用追踪、token 成本监控、agent 行为审计等。</p>
      <p>Datadog 已经在 LLM observability 方向上布局，这可能重新定义其 TAM。</p>
    `,
  },
  {
    slug: "global-ai-value-chain",
    title: "全球化 AI 的价值分工会如何重构",
    category: "Macro / AI",
    date: "2025-11",
    year: 2025,
    summary:
      "当 AI 能力分层化，全球价值链的重构不只是芯片，还包括数据、算力、应用和监管的多维博弈。",
    readTime: "6 min read",
    published: true,
    tags: ["Global", "AI", "Value Chain", "Macro"],
    mood: "🌍",
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=600&fit=crop",
    body: `
      <p>AI 的全球化不是简单的技术扩散，而是一场多维度的价值链重构。芯片管制只是冰山一角，真正的博弈发生在数据主权、算力分配、应用生态和监管框架等多个层面。</p>
      <h2>价值链的分层</h2>
      <p>从底层到上层：芯片 → 算力基础设施 → 基础模型 → 应用层 → 数据与合规。每一层都有不同的竞争格局和价值捕获逻辑。</p>
      <p>中国、美国、欧洲在不同层面的优势和策略差异，决定了未来 AI 产业的全球分工格局。</p>
    `,
  },
  {
    slug: "judgment-process",
    title: "关于判断力：留下过程，而不是只留下结论",
    category: "Thinking / Meta",
    date: "2025-10",
    year: 2025,
    summary:
      "为什么记录判断过程比记录结论更有价值，以及如何建立一个可复盘的思考系统。",
    readTime: "4 min read",
    published: true,
    tags: ["Thinking", "Judgment", "Decision Making", "Meta"],
    mood: "✨",
    coverImage: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=1200&h=600&fit=crop",
    body: `
      <p>大多数人只记录结论："我看好 X"，"Y 会涨"。但真正有价值的是记录判断过程：基于什么信息、什么框架、什么假设得出了这个结论。</p>
      <h2>为什么过程比结论重要</h2>
      <p>结论可能对也可能错，但过程可以被复盘和改进。一个对的结论如果基于错误的逻辑，下次可能就不对了。一个错的结论如果基于合理的框架，说明框架本身值得保留和迭代。</p>
      <h2>如何建立思考系统</h2>
      <ul>
        <li>记录判断时的信息状态</li>
        <li>明确假设和前提条件</li>
        <li>设定复盘时间点</li>
        <li>区分"运气"和"能力"</li>
      </ul>
    `,
  },
];
