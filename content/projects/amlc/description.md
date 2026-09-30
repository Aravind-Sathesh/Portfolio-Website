Built with Team EC2 Bombers for the Amazon ML Challenge 2026, this is an entity-resolution system that decides which vendor records refer to the same real-world business as records in a master list, even when names and addresses are written in different languages and scripts.

### The Pipeline
1.  **Normalisation:** Names and addresses are transliterated to a common form using anyascii plus a learned Indic transliteration step, so the same business written in Devanagari and Latin script lines up.
2.  **Blocking:** An exact TF-IDF search from the vendor side keeps **98.25% of true matches** while producing only about **2.6 candidates per record**, which keeps every later stage cheap.
3.  **Feature model:** 48 hand-built fuzzy, token and field-level features (RapidFuzz) feed a LightGBM classifier.
4.  **Cross-encoder reranking:** Any pair the first model gives at least a 1% chance goes through a `bge-reranker-base` cross-encoder, trained on SageMaker GPUs.
5.  **Stacking and assignment:** A second LightGBM model combines both scores, and each vendor record is assigned at most one match above a 0.75 threshold.

### Results
*   **0.9836 macro F0.5** on the public leaderboard, up from 0.842 on the first submission.
*   Ranking AUC on the hardest, most uncertain pairs rose from 0.856 to **0.981** as the reranker and stacker were added.
*   About **0.954** on a country the model never saw in training (France), showing the pipeline generalises beyond its training markets.
