Curriculum Analyzer reads a university course handout and builds a knowledge graph of what the course teaches. Exam questions are then mapped onto that graph, so faculty can see which topics a paper covers and which it misses. Built as a team of four; I worked on building the knowledge graph and extracting topics from it.

### How It Works
*   **Handout to Graph:** The handout is parsed with pymupdf, which keeps the math glyphs that pdfplumber drops. An LLM extracts a Neo4j graph of `Course → Topic → Concept` with learning objectives, and a second pass adds `REQUIRES` and `RELATED_TO` links between topics.
*   **Hybrid Retrieval:** Every searchable node is indexed twice, as Neo4j fulltext and as vector embeddings. The two rankings are fused with reciprocal rank fusion, weighting the dense side 1.5×.
*   **Question to Topics:** Retrieval narrows the candidates, then a small local model picks the topics a question actually tests. Questions that fall outside the syllabus are flagged rather than forced onto a topic.
*   **Figures:** Pages with circuit diagrams or plots are detected by counting Bézier curves in the PDF (0 on prose pages, 178 to 525 on circuit pages) and escalated to a vision model.
*   **Swappable Models:** Graph extraction, topic selection and embeddings are separate roles, each with its own provider. Everything runs locally on Ollama (qwen3:4b, mxbai-embed-large), with Gemini as an option for graph extraction.

### Results
*   **96%** of questions have a correct topic in the top three.
*   **1.0000** mean Jaccard similarity across 15 repeat runs, so the same paper always maps the same way.
*   **9/10** topic-selection accuracy with the 4B-parameter qwen3 model.
*   The CS F111 handout produces 13 topics, 79 concepts and 48 learning objectives.

### Tooling
A Streamlit app (Build, Inspect and Ask tabs) and a CLI (`build`, `index`, `ask`), with Langfuse tracing, structured logging, pytest, ruff and ty.
