### The Challenge: Signal Loss in Optical Communication
This research addresses a critical problem in Free-Space Optical (FSO) communication: atmospheric turbulence distorts signals, making them unreadable. Initial attempts to classify these distorted signals using a standard Convolutional Neural Network (CNN) were unsuccessful, yielding less than 15% accuracy and proving the difficulty of the problem.

### An Advanced ML Solution: The GNN+CNN Pipeline
To solve this, the project pivoted to a more robust signal type ("petalled modes") and implemented an innovative two-stage machine learning pipeline:

1.  **GNN for Signal Reconstruction:** A Graph Neural Network (GNN) was designed to handle the most challenging scenario: **severe occlusion**, where 75% of the incoming signal data was randomly masked (deleted). The GNN's sole task was to analyze the single remaining quadrant and intelligently reconstruct the full, complete signal pattern.

2.  **CNN for Signal Classification:** The fully reconstructed signal from the GNN was then passed to a fine-tuned CNN. This network's task was to classify the clean, reconstructed pattern and accurately identify the original data it represented.

### Exceptional Results
This GNN+CNN architecture demonstrated remarkable resilience. Even when working with only 25% of the original data, the system achieved a **perfect 100% classification accuracy**. The success of this model showcases the power of using specialized neural networks not just for classification, but for advanced signal reconstruction in challenging, real-world conditions.

### Efficient Inference
The ~300K-parameter model was trained with quantization-aware training, cutting inference compute by about 35% with negligible accuracy loss, and was validated on both CUDA and Apple MPS.
