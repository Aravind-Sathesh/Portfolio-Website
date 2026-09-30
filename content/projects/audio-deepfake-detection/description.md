Deepfake detection services usually need the raw audio, which means sending private conversations to a server. This team research project extends the SafeEar framework so detection runs on audio that has been stripped of its spoken content. My work covered the privacy pipeline and its evaluation.

### The Approach
1.  **Tokenisation:** Speech is encoded into discrete codes with SpeechTokenizer's residual vector quantiser.
2.  **Removing content:** The first two quantiser layers, which carry most of the semantic (word-level) information, are dropped before anything leaves the device.
3.  **Watermarking:** An adaptive watermark (α = 0.005) is added to the remaining tokens.
4.  **Saliency-guided masking:** 40% of the tokens are masked, chosen by saliency to hide the most revealing regions.
5.  **Healing and classification:** On the server, a non-autoregressive Transformer reconstructs the masked tokens and an Audio Spectrogram Transformer classifies the clip as genuine or spoofed.

### Results (ASVspoof 2019, 2,000 files)
*   The watermark is essentially free: EER goes from 4.21% to **4.15%** (AUC 99.18).
*   With random 40% masking plus the healer, EER is **5.82%** (AUC 98.78).
*   The strongest privacy setting (semantic layers removed and saliency masking) still reaches about **13.9% EER / 93.6 AUC**, making the privacy-versus-accuracy trade-off explicit.
*   A Google Lyra codec baseline at 3.2 kbps ran at a real-time factor of 0.025 across about 72k files (PESQ 2.47).
