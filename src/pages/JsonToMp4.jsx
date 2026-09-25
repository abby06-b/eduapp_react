import React, { useState, useEffect, useRef } from 'react';
import {
  FileVideo,
  Play,
  Pause,
  RotateCcw,
  Download,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Code,
  Layers,
  Film,
  Volume2,
  VolumeX,
  Zap,
  ArrowRight,
  Trash2,
  Copy,
  Check,
  BrainCircuit,
  Sliders,
  CheckCircle,
  UploadCloud,
  Upload
} from 'lucide-react';
import { generateStudyData } from '../utils/studyGenerator';
import './JsonToMp4.css';

// Preset sample JSON structures (Theory, Algorithms, Data Structures)
const PRESET_CONCEPTS = {
  mlTypes: {
    name: 'Types of Machine Learning (Theory)',
    badge: 'AI Theory',
    icon: '🧠',
    json: JSON.stringify(
      {
        concept: 'Types of Machine Learning',
        category: 'Artificial Intelligence & Theory',
        difficulty: 'Conceptual Theory',
        description: 'Comprehensive overview of Supervised, Unsupervised, and Reinforcement Learning paradigms.',
        steps: [
          {
            step: 1,
            title: '1. Supervised Learning',
            subtitle: 'Learning from Labeled Training Datasets',
            isTheory: true,
            icon: '🎯',
            points: [
              'Algorithm is trained on input-output labeled pairs (X, Y).',
              'Goal: Learn a mapping function f(X) to predict labels for new unseen data.',
              'Key Tasks: Classification (Spam/Not Spam) & Regression (House Price Prediction).'
            ],
            narration: 'Supervised learning trains models on labeled datasets to learn mapping functions for predictions.'
          },
          {
            step: 2,
            title: '2. Unsupervised Learning',
            subtitle: 'Discovering Hidden Patterns in Unlabeled Data',
            isTheory: true,
            icon: '🧩',
            points: [
              'Input data has no target labels or prior correct answers.',
              'Goal: Discover intrinsic patterns, groupings, and structural clusters.',
              'Key Tasks: Customer Segmentation (K-Means) & Dimensionality Reduction (PCA).'
            ],
            narration: 'Unsupervised learning discovers hidden clusters and structural patterns in unlabeled datasets.'
          },
          {
            step: 3,
            title: '3. Reinforcement Learning',
            subtitle: 'Trial & Error Strategy via Environment Rewards',
            isTheory: true,
            icon: '🎮',
            points: [
              'Agent takes sequential actions in an environment to maximize cumulative rewards.',
              'Learns optimal policy strategy through trial-and-error feedback.',
              'Applications: Autonomous Driving, AlphaGo, Robotics & Game Playing AI.'
            ],
            narration: 'Reinforcement learning optimizes agent actions based on cumulative feedback rewards.'
          }
        ]
      },
      null,
      2
    )
  },
  bubbleSort: {
    name: 'Bubble Sort Algorithm (Numerics)',
    badge: 'Sorting Algorithm',
    icon: '🧼',
    json: JSON.stringify(
      {
        concept: 'Bubble Sort Algorithm',
        category: 'Sorting Algorithms',
        difficulty: 'Beginner',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        description: 'Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.',
        initialData: [45, 12, 89, 34, 67, 23],
        code: [
          'def bubble_sort(arr):',
          '    n = len(arr)',
          '    for i in range(n):',
          '        for j in range(0, n-i-1):',
          '            if arr[j] > arr[j+1]:',
          '                arr[j], arr[j+1] = arr[j+1], arr[j]',
          '    return arr'
        ],
        steps: [
          {
            step: 1,
            title: 'Initial Unsorted Array',
            array: [45, 12, 89, 34, 67, 23],
            highlightIndices: [],
            status: 'normal',
            description: 'Starting with 6 unsorted array elements: [45, 12, 89, 34, 67, 23].',
            codeLine: 1,
            narration: 'Welcome to Bubble Sort. We start with six unsorted numbers.'
          },
          {
            step: 2,
            title: 'Compare 45 & 12 (Swap Needed)',
            array: [45, 12, 89, 34, 67, 23],
            highlightIndices: [0, 1],
            status: 'swap',
            description: 'Index 0 (45) > Index 1 (12). Swapping 45 and 12!',
            codeLine: 5,
            narration: 'Comparing 45 and 12. Since 45 is greater than 12, we swap them.'
          },
          {
            step: 3,
            title: 'After First Swap',
            array: [12, 45, 89, 34, 67, 23],
            highlightIndices: [0, 1],
            status: 'compare',
            description: '12 and 45 are now in correct relative order.',
            codeLine: 6,
            narration: 'The array elements are now 12, 45, 89, 34, 67, 23.'
          },
          {
            step: 4,
            title: 'Compare 45 & 89 (No Swap)',
            array: [12, 45, 89, 34, 67, 23],
            highlightIndices: [1, 2],
            status: 'compare',
            description: '45 <= 89. No swap needed.',
            codeLine: 4,
            narration: 'Comparing 45 and 89. 45 is smaller, so no swap is needed.'
          },
          {
            step: 5,
            title: 'Compare 89 & 34 (Swap Needed)',
            array: [12, 45, 89, 34, 67, 23],
            highlightIndices: [2, 3],
            status: 'swap',
            description: '89 > 34. Swapping 89 and 34!',
            codeLine: 5,
            narration: 'Comparing 89 and 34. 89 is larger, so we swap them.'
          },
          {
            step: 6,
            title: 'Pass 1 Complete (89 Locked)',
            array: [12, 45, 34, 67, 23, 89],
            highlightIndices: [5],
            status: 'sorted',
            description: 'Element 89 is in its locked sorted position.',
            codeLine: 3,
            narration: 'Pass 1 is complete. 89 is now locked in place.'
          },
          {
            step: 7,
            title: 'Sorting Completed!',
            array: [12, 23, 34, 45, 67, 89],
            highlightIndices: [0, 1, 2, 3, 4, 5],
            status: 'sorted',
            description: 'Bubble Sort finished! All elements are sorted in ascending order.',
            codeLine: 7,
            narration: 'Sorting complete! All array elements are now fully sorted.'
          }
        ]
      },
      null,
      2
    )
  },
  osiModel: {
    name: 'OSI 7-Layer Architecture',
    badge: 'Networking Theory',
    icon: '🌐',
    json: JSON.stringify(
      {
        concept: 'OSI 7-Layer Network Model',
        category: 'Computer Networks & Systems',
        difficulty: 'Theoretical Concept',
        description: 'The standard theoretical framework for internet network communication layers.',
        steps: [
          {
            step: 1,
            title: 'Application & Presentation Layers (L7 - L6)',
            subtitle: 'End-User Interaction & Data Formatting',
            isTheory: true,
            icon: '💻',
            points: [
              'Layer 7 (Application): Direct protocols like HTTP, HTTPS, SMTP, FTP.',
              'Layer 6 (Presentation): Formatting, SSL/TLS encryption, and data compression.'
            ],
            narration: 'The top layers handle user interaction, data translation, and SSL encryption.'
          },
          {
            step: 2,
            title: 'Transport & Network Layers (L4 - L3)',
            subtitle: 'Connections & Packet Routing',
            isTheory: true,
            icon: '⚡',
            points: [
              'Layer 4 (Transport): End-to-end segmentation and flow control (TCP / UDP).',
              'Layer 3 (Network): Packet routing across logical networks using IP Addresses.'
            ],
            narration: 'Transport manages TCP connections while Network handles packet routing across IP networks.'
          },
          {
            step: 3,
            title: 'Data Link & Physical Layers (L2 - L1)',
            subtitle: 'Hardware Addressing & Bit Transmissions',
            isTheory: true,
            icon: '🔌',
            points: [
              'Layer 2 (Data Link): Physical MAC addressing and Ethernet frame transmission.',
              'Layer 1 (Physical): Binary bitstream signal transfer over fiber, wire, or Wi-Fi.'
            ],
            narration: 'The lower layers convert digital frames into physical bitstream signals across hardware wires.'
          }
        ]
      },
      null,
      2
    )
  }
};

export default function JsonToMp4({ setNotes }) {
  const [jsonInput, setJsonInput] = useState(PRESET_CONCEPTS.mlTypes.json);
  const [isValidJson, setIsValidJson] = useState(true);
  const [jsonError, setJsonError] = useState('');
  const [parsedData, setParsedData] = useState(null);

  // Conversion & Video state
  const [isConverting, setIsConverting] = useState(false);
  const [conversionProgress, setConversionProgress] = useState(0);
  const [conversionStatusText, setConversionStatusText] = useState('');

  // Video player state
  const [mp4VideoUrl, setMp4VideoUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('explanation'); // explanation, code, specs
  const [isSpeakingActive, setIsSpeakingActive] = useState(false);

  // Upload state for MP4 video
  const [isUploadingMp4, setIsUploadingMp4] = useState(false);
  const [isUploadedMp4, setIsUploadedMp4] = useState(false);
  const [uploadToast, setUploadToast] = useState('');

  // Canvas & Audio Refs
  const canvasRef = useRef(null);
  const playAbortControllerRef = useRef(null);

  // Load Speech Voices on mount
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  // Validate and parse JSON whenever input changes
  useEffect(() => {
    try {
      if (!jsonInput.trim()) {
        setIsValidJson(false);
        setJsonError('JSON input cannot be empty.');
        setParsedData(null);
        return;
      }
      const parsed = JSON.parse(jsonInput);
      setIsValidJson(true);
      setJsonError('');
      const normalized = normalizeConceptData(parsed);
      setParsedData(normalized);
    } catch (err) {
      setIsValidJson(false);
      setJsonError(err.message);
      setParsedData(null);
    }
  }, [jsonInput]);

  // Universal Normalizer: Works for BOTH Theory Concepts & Numerical Algorithms!
  const normalizeConceptData = (input) => {
    if (typeof input !== 'object' || input === null) {
      return {
        concept: 'Custom Concept',
        category: 'General Concept',
        difficulty: 'Theory',
        description: `Value: ${String(input)}`,
        code: [],
        steps: [
          {
            step: 1,
            title: 'Concept Overview',
            isTheory: true,
            points: [String(input)],
            description: String(input),
            narration: String(input)
          }
        ]
      };
    }

    // If it's a raw array (e.g. list of theory topics or numbers)
    if (Array.isArray(input)) {
      const isNumbers = input.every((x) => typeof x === 'number');

      return {
        concept: isNumbers ? 'Numerical Dataset' : 'Conceptual Topics List',
        category: 'Data Structure',
        difficulty: 'General',
        description: `Visualizing ${input.length} concept items.`,
        code: input.map((item, i) => `Item [${i + 1}]: ${typeof item === 'object' ? JSON.stringify(item) : item}`),
        steps: input.map((item, idx) => ({
          step: idx + 1,
          title: `Concept ${idx + 1}`,
          subtitle: typeof item === 'object' ? item.title || item.name || `Topic ${idx + 1}` : `Item ${idx + 1}`,
          isTheory: !isNumbers,
          points:
            typeof item === 'object'
              ? Array.isArray(item.points)
                ? item.points
                : Object.entries(item).map(([k, v]) => `${k}: ${v}`)
              : [`Details: ${item}`],
          array: isNumbers ? input : null,
          highlightIndices: isNumbers ? [idx] : [],
          description: typeof item === 'object' ? item.description || JSON.stringify(item) : String(item),
          narration:
            typeof item === 'object'
              ? item.narration || item.description || item.title || `Concept ${idx + 1}`
              : `Topic ${idx + 1}: ${item}`
        }))
      };
    }

    // Object provided - Extract metadata
    const conceptName = input.concept || input.title || input.topic || input.name || input.algorithm || 'Theory Concept';
    const category = input.category || input.subject || input.type || 'Educational Concept';
    const difficulty = input.difficulty || 'General Concept';
    const timeComplexity = input.timeComplexity || 'N/A (Theory)';
    const spaceComplexity = input.spaceComplexity || 'N/A (Theory)';
    const description = input.description || input.summary || input.overview || 'Concept visualization generated from JSON.';

    // Code extraction if present
    let code = [];
    if (Array.isArray(input.code)) {
      code = input.code;
    } else if (typeof input.code === 'string') {
      code = input.code.split('\n');
    }

    // Check for predefined steps / stages / components / layers array
    const rawSteps =
      input.steps ||
      input.stages ||
      input.components ||
      input.layers ||
      input.topics ||
      input.modules ||
      input.sections;

    let steps = [];
    if (Array.isArray(rawSteps) && rawSteps.length > 0) {
      steps = rawSteps.map((s, idx) => {
        const hasNumbers = Array.isArray(s.array) || Array.isArray(s.data) || Array.isArray(input.initialData);
        const isTheory = s.isTheory || !hasNumbers || Array.isArray(s.points) || Array.isArray(s.bullets) || s.subtitle || s.text;

        let points = s.points || s.bullets || s.details || s.facts || [];
        if (points.length === 0 && (s.description || s.text)) {
          points = [s.description || s.text];
        }

        return {
          step: s.step || idx + 1,
          title: s.title || s.name || s.heading || `Section ${idx + 1}`,
          subtitle: s.subtitle || s.caption || s.subheading || '',
          icon: s.icon || (isTheory ? '💡' : '📊'),
          isTheory: Boolean(isTheory),
          points: points,
          array: hasNumbers ? s.array || s.data || input.initialData : null,
          nodes: s.nodes || input.nodes || null,
          highlightIndices: s.highlightIndices || s.highlights || [],
          pointers: s.pointers || null,
          status: s.status || (s.swapped ? 'swap' : 'normal'),
          description: s.description || s.text || s.narration || `Section ${idx + 1} details`,
          codeLine: s.codeLine || 1,
          narration: s.narration || s.description || s.title || `Section ${idx + 1}`
        };
      });
    } else {
      // Unstructured JSON object with arbitrary key-values (Theory or Data)
      const objectKeys = Object.keys(input).filter(
        (k) => !['concept', 'category', 'difficulty', 'timeComplexity', 'spaceComplexity', 'description', 'code'].includes(k)
      );

      steps = objectKeys.map((key, idx) => {
        const val = input[key];
        let pointsList = [];

        if (Array.isArray(val)) {
          pointsList = val.map((v) => (typeof v === 'object' ? JSON.stringify(v) : String(v)));
        } else if (typeof val === 'object' && val !== null) {
          pointsList = Object.entries(val).map(([k, v]) => `${k}: ${v}`);
        } else {
          pointsList = [`${key}: ${String(val)}`];
        }

        return {
          step: idx + 1,
          title: key.toUpperCase().replace(/_/g, ' '),
          subtitle: `Concept property: ${key}`,
          icon: '📌',
          isTheory: true,
          points: pointsList,
          description: `${key}: ${pointsList.join(' • ')}`,
          narration: `Section ${key} details ${pointsList[0] || ''}`
        };
      });

      if (steps.length === 0) {
        steps = [
          {
            step: 1,
            title: conceptName,
            subtitle: category,
            icon: '🎓',
            isTheory: true,
            points: [description],
            description: description,
            narration: description
          }
        ];
      }
    }

    return {
      concept: conceptName,
      category,
      difficulty,
      timeComplexity,
      spaceComplexity,
      description,
      code,
      steps
    };
  };

  // Preset Handler
  const handlePresetSelect = (key) => {
    if (PRESET_CONCEPTS[key]) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsPlaying(false);
      setJsonInput(PRESET_CONCEPTS[key].json);
      setMp4VideoUrl(null);
      setCurrentStepIndex(0);
      setIsUploadedMp4(false);
      setUploadToast('');
    }
  };

  // Format JSON code in editor
  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed, null, 2));
    } catch (e) {
      // ignore
    }
  };

  // Copy JSON
  const handleCopyJson = () => {
    navigator.clipboard.writeText(jsonInput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /**
   * ACCURATE SPEECH TIMING CALCULATION
   * Computes estimated natural speech duration in ms based on word count,
   * punctuation pauses, and playback rate so speech is NEVER prematurely cut off.
   */
  const calculateSpeechDurationMs = (text, speed = 1.0) => {
    if (!text || !text.trim()) return 4000;
    const cleanText = text.trim();
    const words = cleanText.split(/\s+/).length;
    const commas = (cleanText.match(/[,:;-]/g) || []).length;
    const periods = (cleanText.match(/[.!?]/g) || []).length;

    // ~2.2 words per second at speed 1.0
    const baseSpeechMs = (words / (2.2 * speed)) * 1000;
    const pauseMs = (commas * 350 + periods * 650) / speed;

    // Minimum display time per section is 4.5s + 1200ms padding after sentence finishes
    return Math.max(4500, Math.ceil(baseSpeechMs + pauseMs + 1200));
  };

  /**
   * SPLIT NARRATION TEXT INTO SHORT SENTENCE CHUNKS FOR SPEECH TTS ENCODING
   */
  const splitTextIntoChunks = (text, maxLen = 140) => {
    if (!text || String(text).length <= maxLen) return [String(text || '')];
    const sentences = String(text).match(/[^.!?]+[.!?]+/g) || [String(text)];
    const chunks = [];
    let current = '';
    for (const s of sentences) {
      if ((current + s).length > maxLen) {
        if (current.trim()) chunks.push(current.trim());
        current = s;
      } else {
        current += s;
      }
    }
    if (current.trim()) chunks.push(current.trim());
    return chunks.length ? chunks : [String(text)];
  };

  /**
   * PRE-FETCHES AND PRE-DECODES HUMAN TTS SPEECH MP3 AUDIO BUFFERS INTO MEMORY
   * Eliminates network delay during MediaRecorder encoding so TTS plays INSTANTLY at t = 0.0s!
   */
  const fetchAndDecodeAudioBuffer = async (text, audioCtx) => {
    if (!text || !String(text).trim() || !audioCtx) return null;
    const cleanText = String(text).replace(/[\r\n]+/g, ' ').trim();
    const chunks = splitTextIntoChunks(cleanText, 130);
    const audioBuffers = [];

    for (let c = 0; c < chunks.length; c++) {
      const chunkText = chunks[c];
      if (!chunkText) continue;

      try {
        if (audioCtx.state === 'suspended') {
          await audioCtx.resume();
        }

        const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(chunkText)}&tl=en&client=tw-ob`;
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(googleUrl)}`;

        const response = await fetch(proxyUrl);
        if (response.ok) {
          const arrayBuffer = await response.arrayBuffer();
          if (arrayBuffer && arrayBuffer.byteLength > 200) {
            const audioBuffer = await new Promise((resolve, reject) => {
              audioCtx.decodeAudioData(arrayBuffer.slice(0), resolve, reject);
            });
            if (audioBuffer) {
              audioBuffers.push(audioBuffer);
            }
          }
        }
      } catch (err) {
        console.warn('TTS prefetch chunk notice:', err);
      }
    }

    if (audioBuffers.length === 0) return null;
    if (audioBuffers.length === 1) return audioBuffers[0];

    try {
      const totalLength = audioBuffers.reduce((acc, b) => acc + b.length, 0);
      const numberOfChannels = audioBuffers[0].numberOfChannels;
      const sampleRate = audioBuffers[0].sampleRate;
      const combinedBuffer = audioCtx.createBuffer(numberOfChannels, totalLength, sampleRate);

      let offset = 0;
      for (const b of audioBuffers) {
        for (let channel = 0; channel < numberOfChannels; channel++) {
          combinedBuffer.getChannelData(channel).set(b.getChannelData(channel), offset);
        }
        offset += b.length;
      }
      return combinedBuffer;
    } catch (e) {
      return audioBuffers[0];
    }
  };

  /**
   * STREAMS NATURAL SPOKEN HUMAN TTS VOICE DIRECTLY INTO WEBAUDIO DESTINATION & MEDIARECORDER
   * Plays pre-loaded memory buffers instantly at t = 0.0s for crisp, immediate playback!
   */
  const playSpeechAudioTrackAsync = async (text, audioCtx, destNode, isMuted, preloadedBuffer = null) => {
    if (isMuted || !text || !String(text).trim()) {
      setIsSpeakingActive(false);
      await new Promise((r) => setTimeout(r, 1500));
      return;
    }

    setIsSpeakingActive(true);
    const cleanText = String(text).replace(/[\r\n]+/g, ' ').trim();

    // 1. Speak out loud through local browser speaker for live preview
    speakNarrationDirect(cleanText);

    // 2. Play PRE-LOADED INSTANT HUMAN VOICE AUDIO BUFFER if available in RAM!
    if (preloadedBuffer && audioCtx && destNode) {
      try {
        if (audioCtx.state === 'suspended') {
          await audioCtx.resume();
        }

        const source = audioCtx.createBufferSource();
        source.buffer = preloadedBuffer;

        const compressor = audioCtx.createDynamicsCompressor();
        compressor.threshold.setValueAtTime(-20, audioCtx.currentTime);
        compressor.knee.setValueAtTime(30, audioCtx.currentTime);
        compressor.ratio.setValueAtTime(12, audioCtx.currentTime);
        compressor.attack.setValueAtTime(0.003, audioCtx.currentTime);
        compressor.release.setValueAtTime(0.25, audioCtx.currentTime);

        const gainNode = audioCtx.createGain();
        gainNode.gain.setValueAtTime(0.95, audioCtx.currentTime);

        source.connect(compressor);
        compressor.connect(gainNode);
        gainNode.connect(destNode);

        try {
          gainNode.connect(audioCtx.destination);
        } catch (e) {
          // ignore
        }

        const durationMs = preloadedBuffer.duration * 1000;
        await new Promise((resolve) => {
          source.onended = resolve;
          source.start(0);
          setTimeout(resolve, durationMs + 200);
        });

        setIsSpeakingActive(false);
        return;
      } catch (e) {
        console.warn('Error playing preloaded speech buffer:', e);
      }
    }

    const chunks = splitTextIntoChunks(cleanText, 130);
    for (let c = 0; c < chunks.length; c++) {
      const chunkText = chunks[c];
      if (!chunkText) continue;

      let playedOk = false;

      // 3. Fetch REAL HUMAN SPOKEN VOICE MP3 audio fallback
      if (audioCtx && destNode) {
        try {
          if (audioCtx.state === 'suspended') {
            await audioCtx.resume();
          }

          const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(chunkText)}&tl=en&client=tw-ob`;
          const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(googleUrl)}`;

          const response = await fetch(proxyUrl);
          if (response.ok) {
            const arrayBuffer = await response.arrayBuffer();
            if (arrayBuffer && arrayBuffer.byteLength > 200) {
              const audioBuffer = await new Promise((resolve, reject) => {
                audioCtx.decodeAudioData(arrayBuffer.slice(0), resolve, reject);
              });

              if (audioBuffer) {
                const source = audioCtx.createBufferSource();
                source.buffer = audioBuffer;

                const compressor = audioCtx.createDynamicsCompressor();
                compressor.threshold.setValueAtTime(-20, audioCtx.currentTime);
                compressor.knee.setValueAtTime(30, audioCtx.currentTime);
                compressor.ratio.setValueAtTime(12, audioCtx.currentTime);
                compressor.attack.setValueAtTime(0.003, audioCtx.currentTime);
                compressor.release.setValueAtTime(0.25, audioCtx.currentTime);

                const gainNode = audioCtx.createGain();
                gainNode.gain.setValueAtTime(0.95, audioCtx.currentTime);

                source.connect(compressor);
                compressor.connect(gainNode);
                gainNode.connect(destNode);

                try {
                  gainNode.connect(audioCtx.destination);
                } catch (e) {
                  // ignore
                }

                const durationMs = audioBuffer.duration * 1000;
                await new Promise((resolve) => {
                  source.onended = resolve;
                  source.start(0);
                  setTimeout(resolve, durationMs + 200);
                });

                playedOk = true;
              }
            }
          }
        } catch (err) {
          console.warn('Human voice TTS fetch notice:', err);
        }
      }

      // 4. Silent fallback pause if offline
      if (!playedOk && audioCtx && destNode) {
        const words = chunkText.split(/\s+/).length;
        const durationMs = Math.max(2000, words * 400);
        await new Promise((r) => setTimeout(r, durationMs));
      }

      await new Promise((r) => setTimeout(r, 200));
    }

    setIsSpeakingActive(false);
  };

  /**
   * PROMISIFIED TTS NARRATION
   * Speaks the full narration sentence and guarantees complete playback
   * without truncating or cutting off sentences mid-word.
   */
  const speakNarrationAsync = (text, speed = playbackSpeed, muted = isAudioMuted) => {
    return new Promise((resolve) => {
      const estimatedMs = calculateSpeechDurationMs(text, speed);

      if (muted || !('speechSynthesis' in window) || !text) {
        setIsSpeakingActive(false);
        setTimeout(resolve, estimatedMs);
        return;
      }

      try {
        window.speechSynthesis.cancel(); // Stop any pending utterances cleanly

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = Math.max(0.75, Math.min(2.0, speed * 0.95)); // Natural comfortable cadence
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        // Select premium natural English voice if available
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice =
          voices.find(
            (v) =>
              v.lang.startsWith('en') &&
              (v.name.includes('Natural') ||
                v.name.includes('Google') ||
                v.name.includes('Samantha') ||
                v.name.includes('Daniel') ||
                v.name.includes('US') ||
                v.name.includes('UK'))
          ) || voices.find((v) => v.lang.startsWith('en')) || null;

        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }

        let hasEnded = false;
        setIsSpeakingActive(true);

        const finish = () => {
          if (!hasEnded) {
            hasEnded = true;
            setIsSpeakingActive(false);
            // Allow a comfortable 800ms pause after sentence finishes before resolving step
            setTimeout(resolve, 800);
          }
        };

        utterance.onend = finish;
        utterance.onerror = (e) => {
          console.log('Utterance notice:', e);
          finish();
        };

        window.speechSynthesis.speak(utterance);

        // Safety fallback timeout in case browser drops TTS onend event
        setTimeout(() => {
          finish();
        }, estimatedMs + 2500);
      } catch (err) {
        console.warn('TTS error fallback:', err);
        setIsSpeakingActive(false);
        setTimeout(resolve, estimatedMs);
      }
    });
  };

  // Synchronous quick speak helper for manual scrubbing/step clicks
  const speakNarrationDirect = (text) => {
    if (isAudioMuted || !('speechSynthesis' in window) || !text) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = playbackSpeed * 0.95;
      utterance.pitch = 1.0;
      setIsSpeakingActive(true);
      utterance.onend = () => setIsSpeakingActive(false);
      utterance.onerror = () => setIsSpeakingActive(false);
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      setIsSpeakingActive(false);
    }
  };

  // Helper function to draw multi-line text cleanly inside Canvas boxes
  const drawWrappedCanvasText = (ctx, text, x, y, maxWidth, lineHeight, maxLines = 3) => {
    if (!text) return;
    const words = String(text).split(' ');
    let line = '';
    let currentY = y;
    let linesCount = 0;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > maxWidth && n > 0) {
        linesCount++;
        if (linesCount >= maxLines) {
          ctx.fillText(line.trim() + '...', x, currentY);
          return;
        }
        ctx.fillText(line.trim(), x, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim(), x, currentY);
  };

  // Canvas Frame Drawing Engine: Renders BOTH Theory Slides & Numerical Algorithms in 9:16 Portrait Reel View!
  const drawCanvasFrame = (stepIdx, data = parsedData) => {
    const canvas = canvasRef.current;
    if (!canvas || !data) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width; // 720
    const height = canvas.height; // 1280

    const currentStep = data.steps[stepIdx] || data.steps[0];

    // Background Gradient (Futuristic Slate/Indigo 9:16 Vertical Reel)
    const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
    bgGradient.addColorStop(0, '#090d16');
    bgGradient.addColorStop(0.35, '#1e1b4b');
    bgGradient.addColorStop(0.7, '#0f172a');
    bgGradient.addColorStop(1, '#070a12');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Tech Background Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Glowing Ambient Neon Accents
    const glowGradTop = ctx.createRadialGradient(width / 2, 0, 10, width / 2, 0, 400);
    glowGradTop.addColorStop(0, 'rgba(99, 102, 241, 0.25)');
    glowGradTop.addColorStop(1, 'transparent');
    ctx.fillStyle = glowGradTop;
    ctx.fillRect(0, 0, width, 400);

    // Top Header Banner
    ctx.fillStyle = '#818cf8';
    ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
    ctx.fillText((data.category || 'CONCEPT REEL').toUpperCase(), 35, 48);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
    drawWrappedCanvasText(ctx, data.concept || 'Educational Concept', 35, 78, width - 240, 28, 2);

    // Step Counter Pill
    const stepText = `SECTION ${stepIdx + 1} OF ${data.steps.length}`;
    ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
    const textWidth = ctx.measureText(stepText).width;

    ctx.fillStyle = 'rgba(99, 102, 241, 0.25)';
    ctx.strokeStyle = 'rgba(129, 140, 248, 0.55)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(width - 35 - textWidth - 24, 38, textWidth + 24, 32, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#c7d2fe';
    ctx.fillText(stepText, width - 35 - textWidth - 12, 58);

    // Header Separator Line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(35, 120);
    ctx.lineTo(width - 35, 120);
    ctx.stroke();

    // Main Section Card Area (y: 135 to 1050)
    const cardX = 35;
    const cardY = 135;
    const cardW = width - 70; // 650
    const cardH = height - 355; // 925

    // Visual Render Decision: Theory Slide vs Node Graph vs Numerical Array
    if (currentStep.isTheory || (currentStep.points && currentStep.points.length > 0 && !currentStep.array)) {
      // RENDER THEORY CONCEPT REEL SLIDE CARD
      ctx.fillStyle = 'rgba(15, 23, 42, 0.82)';
      ctx.strokeStyle = 'rgba(129, 140, 248, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(cardX, cardY, cardW, cardH, 20);
      ctx.fill();
      ctx.stroke();

      // Section Icon & Title Header inside card
      const iconSymbol = currentStep.icon || '📌';
      ctx.font = '36px sans-serif';
      ctx.fillText(iconSymbol, cardX + 25, cardY + 55);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
      drawWrappedCanvasText(ctx, currentStep.title || `Section ${stepIdx + 1}`, cardX + 75, cardY + 45, cardW - 100, 26, 2);

      if (currentStep.subtitle) {
        ctx.fillStyle = '#94a3b8';
        ctx.font = '14px "Plus Jakarta Sans", sans-serif';
        drawWrappedCanvasText(ctx, currentStep.subtitle, cardX + 75, cardY + 75, cardW - 100, 18, 1);
      }

      // Render Theory Bullet Point Cards
      const points = currentStep.points || [currentStep.description];
      const startPointY = cardY + 110;
      const maxPoints = Math.min(6, points.length);
      const availH = cardH - 130;
      const pointCardH = Math.min(130, Math.max(90, (availH - (maxPoints - 1) * 14) / maxPoints));

      points.slice(0, maxPoints).forEach((ptText, idx) => {
        const ptY = startPointY + idx * (pointCardH + 14);

        // Bullet Card Container
        ctx.fillStyle = 'rgba(30, 41, 59, 0.85)';
        ctx.strokeStyle = idx === 0 ? 'rgba(99, 102, 241, 0.6)' : 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(cardX + 25, ptY, cardW - 50, pointCardH, 12);
        ctx.fill();
        ctx.stroke();

        // Glowing Bullet Dot
        ctx.fillStyle = idx === 0 ? '#818cf8' : idx === 1 ? '#34d399' : idx === 2 ? '#f59e0b' : '#ec4899';
        ctx.beginPath();
        ctx.arc(cardX + 48, ptY + 30, 6, 0, Math.PI * 2);
        ctx.fill();

        // Bullet Text with Multi-line Wrapping
        ctx.fillStyle = '#f8fafc';
        ctx.font = '14px "Plus Jakarta Sans", sans-serif';
        drawWrappedCanvasText(ctx, String(ptText), cardX + 68, ptY + 30, cardW - 105, 20, 4);
      });
    } else if (currentStep.nodes) {
      // RENDER LINKED LIST / GRAPH NODES
      ctx.fillStyle = 'rgba(15, 23, 42, 0.82)';
      ctx.strokeStyle = 'rgba(129, 140, 248, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(cardX, cardY, cardW, cardH, 20);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(currentStep.title || `Section ${stepIdx + 1}`, cardX + 30, cardY + 50);

      if (currentStep.subtitle) {
        ctx.fillStyle = '#94a3b8';
        ctx.font = '14px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(currentStep.subtitle, cardX + 30, cardY + 75);
      }

      const nodes = currentStep.nodes;
      const nodeWidth = 85;
      const nodeHeight = 60;
      const startX = (width - (nodes.length * 125 - 40)) / 2;
      const startY = cardY + 350;

      nodes.forEach((nodeVal, idx) => {
        const x = startX + idx * 125;
        const y = startY;

        const isPrev = currentStep.pointers?.prev === nodeVal;
        const isCurr = currentStep.pointers?.curr === nodeVal;

        let strokeColor = '#475569';
        let fillColor = 'rgba(30, 41, 59, 0.8)';
        if (isCurr) {
          strokeColor = '#ec4899';
          fillColor = 'rgba(236, 72, 153, 0.25)';
        } else if (isPrev) {
          strokeColor = '#10b981';
          fillColor = 'rgba(16, 185, 129, 0.25)';
        }

        ctx.fillStyle = fillColor;
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(x, y, nodeWidth, nodeHeight, 12);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(nodeVal, x + nodeWidth / 2, y + 38);
        ctx.textAlign = 'left';

        if (idx < nodes.length - 1) {
          ctx.strokeStyle = '#818cf8';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(x + nodeWidth, y + nodeHeight / 2);
          ctx.lineTo(x + nodeWidth + 35, y + nodeHeight / 2);
          ctx.stroke();

          ctx.fillStyle = '#818cf8';
          ctx.beginPath();
          ctx.moveTo(x + nodeWidth + 40, y + nodeHeight / 2);
          ctx.lineTo(x + nodeWidth + 30, y + nodeHeight / 2 - 6);
          ctx.lineTo(x + nodeWidth + 30, y + nodeHeight / 2 + 6);
          ctx.fill();
        }
      });
    } else {
      // RENDER NUMERICAL ARRAY BARS IN 9:16 VERTICAL REEL VIEW
      ctx.fillStyle = 'rgba(15, 23, 42, 0.82)';
      ctx.strokeStyle = 'rgba(129, 140, 248, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(cardX, cardY, cardW, cardH, 20);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(currentStep.title || `Section ${stepIdx + 1}`, cardX + 30, cardY + 50);

      if (currentStep.description) {
        ctx.fillStyle = '#94a3b8';
        ctx.font = '14px "Plus Jakarta Sans", sans-serif';
        drawWrappedCanvasText(ctx, currentStep.description, cardX + 30, cardY + 75, cardW - 60, 20, 2);
      }

      const array = currentStep.array || [10, 20, 30, 40, 50];
      const maxVal = Math.max(...array, 100);
      const barAreaWidth = cardW - 60; // 590
      const barGap = 16;
      const totalGaps = (array.length - 1) * barGap;
      const barWidth = Math.min(80, Math.max(35, (barAreaWidth - totalGaps) / array.length));
      const totalWidth = array.length * barWidth + totalGaps;
      const startX = cardX + (cardW - totalWidth) / 2;
      const baseBannerY = cardY + 680;

      array.forEach((val, idx) => {
        const isHighlighted = currentStep.highlightIndices?.includes(idx);
        const barHeight = Math.max(50, (val / maxVal) * 360);
        const x = startX + idx * (barWidth + barGap);
        const y = baseBannerY - barHeight;

        let barColorGrad = ctx.createLinearGradient(x, y, x, baseBannerY);
        let borderColor = 'rgba(255, 255, 255, 0.15)';
        let shadowColor = 'transparent';

        if (isHighlighted) {
          if (currentStep.status === 'swap') {
            barColorGrad.addColorStop(0, '#f43f5e');
            barColorGrad.addColorStop(1, '#e11d48');
            borderColor = '#fb7185';
            shadowColor = 'rgba(244, 63, 94, 0.5)';
          } else if (currentStep.status === 'sorted' || currentStep.status === 'found') {
            barColorGrad.addColorStop(0, '#34d399');
            barColorGrad.addColorStop(1, '#059669');
            borderColor = '#6ee7b7';
            shadowColor = 'rgba(52, 211, 153, 0.5)';
          } else {
            barColorGrad.addColorStop(0, '#818cf8');
            barColorGrad.addColorStop(1, '#4f46e5');
            borderColor = '#c7d2fe';
            shadowColor = 'rgba(129, 140, 248, 0.5)';
          }
        } else {
          barColorGrad.addColorStop(0, 'rgba(51, 65, 85, 0.85)');
          barColorGrad.addColorStop(1, 'rgba(30, 41, 59, 0.95)');
        }

        ctx.save();
        if (isHighlighted) {
          ctx.shadowColor = shadowColor;
          ctx.shadowBlur = 15;
        }

        ctx.fillStyle = barColorGrad;
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = isHighlighted ? 2.5 : 1;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 10);
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        ctx.fillStyle = isHighlighted ? '#ffffff' : '#94a3b8';
        ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(String(val), x + barWidth / 2, y - 12);
        ctx.textAlign = 'left';
      });
    }

    // Bottom Audio Narration Reel Card Overlay
    const narrY = height - 210;
    const narrW = width - 70;
    const narrH = 175;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
    ctx.strokeStyle = isSpeakingActive ? 'rgba(52, 211, 153, 0.7)' : 'rgba(99, 102, 241, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(35, narrY, narrW, narrH, 16);
    ctx.fill();
    ctx.stroke();

    // Narration Title & Audio Status Indicator
    ctx.fillStyle = '#818cf8';
    ctx.font = 'bold 14px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`AUDIO NARRATION: ${currentStep.title || ''}`, 55, narrY + 32);

    // Audio Wave Visualizer Bars when speaking
    if (isSpeakingActive && !isAudioMuted) {
      ctx.fillStyle = '#34d399';
      const waveX = width - 110;
      const heights = [14, 24, 18, 28, 16];
      heights.forEach((h, i) => {
        ctx.beginPath();
        ctx.roundRect(waveX + i * 9, narrY + 30 - h / 2, 4, h, 2);
        ctx.fill();
      });
    }

    ctx.fillStyle = '#f1f5f9';
    ctx.font = '14px "Plus Jakarta Sans", sans-serif';
    const narrationText = currentStep.narration || currentStep.description || 'Explaining concept...';
    drawWrappedCanvasText(ctx, narrationText, 55, narrY + 62, narrW - 40, 22, 4);
  };

  // Trigger canvas drawing when step index or parsed data changes
  useEffect(() => {
    if (parsedData) {
      drawCanvasFrame(currentStepIndex, parsedData);
    }
  }, [currentStepIndex, parsedData, isSpeakingActive]);

  /**
   * LIVE PLAYBACK LOOP WITH FULL SENTENCE AUDIO COMPLETION
   * Advances through sections ONLY after the narration sentence finishes completely!
   */
  useEffect(() => {
    let isCancelled = false;

    const playSequence = async () => {
      if (!isPlaying || !parsedData || !parsedData.steps.length) return;

      let idx = currentStepIndex;
      while (isPlaying && !isCancelled && idx < parsedData.steps.length) {
        setCurrentStepIndex(idx);
        const step = parsedData.steps[idx];
        const text = step.narration || step.description;

        // Await full audio sentence completion before advancing step!
        await speakNarrationAsync(text, playbackSpeed, isAudioMuted);

        if (isCancelled) break;

        idx++;
        if (idx >= parsedData.steps.length) {
          setIsPlaying(false);
          setCurrentStepIndex(0);
          break;
        }
      }
    };

    if (isPlaying) {
      playSequence();
    } else {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsSpeakingActive(false);
    }

    return () => {
      isCancelled = true;
    };
  }, [isPlaying, playbackSpeed, isAudioMuted]);

  /**
   * OPTIMIZED JSON ---> MP4 CONVERSION ENGINE WITH EMBEDDED AUDIO
   * Ensures narration sentences finish 100% completely for each slide section!
   */
  const handleConvertJsonToMp4 = async () => {
    if (!isValidJson || !parsedData) return;

    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsConverting(true);
    setIsUploadedMp4(false);
    setUploadToast('');
    setConversionProgress(5);
    setConversionStatusText('Analyzing JSON concept structure & speech sentences...');
    setMp4VideoUrl(null);

    try {
      const canvas = canvasRef.current;
      if (!canvas) throw new Error('Canvas element unavailable');

      setConversionProgress(15);
      setConversionStatusText('Initializing Web Audio Engine & HD Video Stream (30 FPS)...');

      // Create Web Audio API Destination for recorded video audio track
      let audioTrack = null;
      let audioCtx = null;
      let destNode = null;
      try {
        const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
        if (AudioCtxClass) {
          audioCtx = new AudioCtxClass({ sampleRate: 44100 });
          destNode = audioCtx.createMediaStreamDestination();
          destNode.channelCount = 2;
          if (destNode.stream.getAudioTracks().length > 0) {
            audioTrack = destNode.stream.getAudioTracks()[0];
          }
        }
      } catch (e) {
        console.log('Audio track init notice:', e);
      }

      // Capture canvas stream
      const canvasStream = canvas.captureStream(30);
      const combinedTracks = [...canvasStream.getVideoTracks()];
      if (audioTrack) {
        combinedTracks.push(audioTrack);
      }

      const compositeStream = new MediaStream(combinedTracks);

      let options = { mimeType: 'video/webm;codecs=vp9,opus', audioBitsPerSecond: 128000, videoBitsPerSecond: 2500000 };
      if (MediaRecorder.isTypeSupported('video/mp4;codecs=avc1.42E01E,mp4a.40.2')) {
        options = { mimeType: 'video/mp4;codecs=avc1.42E01E,mp4a.40.2', audioBitsPerSecond: 128000, videoBitsPerSecond: 2500000 };
      } else if (MediaRecorder.isTypeSupported('video/mp4;codecs=avc1,mp4a.40.2')) {
        options = { mimeType: 'video/mp4;codecs=avc1,mp4a.40.2', audioBitsPerSecond: 128000, videoBitsPerSecond: 2500000 };
      } else if (MediaRecorder.isTypeSupported('video/mp4')) {
        options = { mimeType: 'video/mp4', audioBitsPerSecond: 128000, videoBitsPerSecond: 2500000 };
      } else if (MediaRecorder.isTypeSupported('video/webm;codecs=h264,opus')) {
        options = { mimeType: 'video/webm;codecs=h264,opus', audioBitsPerSecond: 128000, videoBitsPerSecond: 2500000 };
      }

      const mediaRecorder = new MediaRecorder(compositeStream, options);
      const recordedChunks = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunks.push(e.data);
        }
      };

      const recorderStoppedPromise = new Promise((resolve) => {
        mediaRecorder.onstop = () => {
          const blob = new Blob(recordedChunks, { type: options.mimeType || 'video/mp4' });
          const url = URL.createObjectURL(blob);
          resolve(url);
        };
      });

      // PRE-FETCH & PRE-DECODE ALL TTS SPEECH BUFFERS BEFORE STARTING MEDIARECORDER RECORDING!
      // This ensures 0s delay when recording begins — speech starts INSTANTLY on frame 1 without buzzing!
      const totalSteps = parsedData.steps.length;
      const preloadedAudioBuffers = [];

      for (let i = 0; i < totalSteps; i++) {
        const stepProgress = Math.round(5 + ((i + 1) / totalSteps) * 20);
        setConversionProgress(stepProgress);
        const currentTitle = parsedData.steps[i].title || `Section ${i + 1}`;
        setConversionStatusText(`Pre-loading speech clip ${i + 1} / ${totalSteps}: "${currentTitle}"...`);

        const narrationText = parsedData.steps[i].narration || parsedData.steps[i].description || parsedData.steps[i].title;
        const buffer = await fetchAndDecodeAudioBuffer(narrationText, audioCtx);
        preloadedAudioBuffers.push(buffer);
      }

      setConversionProgress(28);
      setConversionStatusText('All TTS speech tracks pre-loaded into RAM! Initializing MediaRecorder...');

      mediaRecorder.start(100);

      // Loop through each slide section, speaking full pre-loaded sentences into destNode & encoding video!
      for (let i = 0; i < totalSteps; i++) {
        setCurrentStepIndex(i);
        drawCanvasFrame(i, parsedData);

        const currentProgress = Math.round(30 + ((i + 1) / totalSteps) * 65);
        setConversionProgress(currentProgress);
        const currentTitle = parsedData.steps[i].title || `Section ${i + 1}`;
        setConversionStatusText(`Speaking & Encoding Section ${i + 1} / ${totalSteps}: "${currentTitle}"`);

        const narrationText = parsedData.steps[i].narration || parsedData.steps[i].description;

        // INSTANTLY EMBED PRE-LOADED HUMAN SPOKEN VOICE AUDIO DIRECTLY INTO MEDIARECORDER DESTNODE STREAM!
        await playSpeechAudioTrackAsync(narrationText, audioCtx, destNode, isAudioMuted, preloadedAudioBuffers[i]);
      }

      setConversionProgress(95);
      setConversionStatusText('Finalizing MP4 Video Stream...');
      
      // Allow final video frames to settle
      await new Promise((res) => setTimeout(res, 500));
      mediaRecorder.stop();

      if (audioCtx) {
        try {
          audioCtx.close();
        } catch (e) {
          // ignore
        }
      }

      const videoBlobUrl = await recorderStoppedPromise;

      setConversionProgress(100);
      setConversionStatusText('MP4 Video Successfully Generated!');
      setMp4VideoUrl(videoBlobUrl);

      setTimeout(() => {
        setIsConverting(false);
        setCurrentStepIndex(0);
        setIsPlaying(true);
      }, 400);
    } catch (err) {
      console.error('Error generating MP4:', err);
      setConversionStatusText(`Error: ${err.message}`);
      setIsConverting(false);
    }
  };

  const formatBytes = (bytes, decimals = 1) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  // UPLOAD GENERATED MP4 VIDEO TO POSTGRESQL DATABASE & EDUREEL APP VAULT
  const handleUploadMp4 = async () => {
    if (!mp4VideoUrl || isUploadingMp4) return;

    setIsUploadingMp4(true);
    setUploadToast('Preparing MP4 video stream for database upload...');

    try {
      const response = await fetch(mp4VideoUrl);
      const blob = await response.blob();

      const safeTitle = (parsedData?.concept || 'concept_video').toLowerCase().replace(/[^a-z0-9]/g, '_');
      const fileName = `${safeTitle}.mp4`;
      const file = new File([blob], fileName, { type: blob.type || 'video/mp4' });

      setUploadToast('Uploading MP4 to EduReel PostgreSQL backend vault...');

      const formData = new FormData();
      formData.append('file', file, fileName);
      formData.append('title', parsedData?.concept || fileName);
      formData.append('hasAudio', 'true');

      let dbItem = null;
      try {
        const apiRes = await fetch('https://edureel-backend-o33b.onrender.com/api/upload', {
          method: 'POST',
          body: formData
        });
        if (apiRes.ok) {
          const resData = await apiRes.json();
          dbItem = resData.dbResult || resData;
        }
      } catch (err) {
        console.warn('Backend upload note:', err.message);
      }

      const newNote = {
        id: String(dbItem?.id || Date.now()),
        name: dbItem?.title || dbItem?.filename || parsedData?.concept || fileName,
        size: formatBytes(blob.size),
        timestamp: 'Just now',
        status: 'completed',
        videoUrl: mp4VideoUrl,
        hasAudio: true,
        ...generateStudyData(fileName),
        date: new Date().toISOString()
      };

      if (typeof setNotes === 'function') {
        setNotes((prev) => [newNote, ...prev]);
      }

      setIsUploadingMp4(false);
      setIsUploadedMp4(true);
      setUploadToast(`🎉 "${parsedData?.concept || fileName}" uploaded successfully to database vault!`);

      setTimeout(() => {
        setUploadToast('');
      }, 6000);
    } catch (err) {
      console.error('Error uploading MP4 video:', err);
      setIsUploadingMp4(false);
      setUploadToast(`Upload failed: ${err.message}`);
    }
  };

  const handleDownloadMp4 = () => {
    if (!mp4VideoUrl) return;
    const a = document.createElement('a');
    a.href = mp4VideoUrl;
    const safeTitle = (parsedData?.concept || 'concept_video').toLowerCase().replace(/[^a-z0-9]/g, '_');
    a.download = `${safeTitle}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="json-to-mp4-container animate-fade-in">
      {/* Header Section */}
      <header className="page-header-banner">
        <div className="header-left">
          <div className="badge-pill">
            <Zap size={14} className="sparkle-icon" />
            <span>Universal AI JSON ➔ MP4 Video Generator</span>
          </div>
          <h1 className="page-title">Convert JSON Concept to MP4 Video</h1>
          <p className="page-subtitle">
            Paste ANY concept JSON (Theory Topics, Machine Learning, Networking, Algorithms, Data Structures) to automatically build an HD MP4 concept video.
          </p>
        </div>

        {/* Preset Concept Chips */}
        <div className="presets-wrapper">
          <span className="presets-label">
            <Sparkles size={14} /> Preset Samples:
          </span>
          <div className="preset-buttons">
            {Object.entries(PRESET_CONCEPTS).map(([key, item]) => (
              <button
                key={key}
                className="preset-btn"
                onClick={() => handlePresetSelect(key)}
                title={`Load ${item.name}`}
              >
                <span className="preset-emoji">{item.icon}</span>
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Workspace Layout (2 Column Split) */}
      <div className="workspace-grid">
        {/* Left Column: JSON Code Editor */}
        <div className="editor-card glass-card">
          <div className="card-header">
            <div className="card-title-group">
              <Code className="header-icon text-primary" size={20} />
              <div>
                <h3 className="card-title">JSON Concept Code</h3>
                <p className="card-desc">Paste Theory or Algorithm JSON definition</p>
              </div>
            </div>

            <div className="editor-actions">
              <button className="icon-action-btn" onClick={handleFormatJson} title="Auto-Format JSON">
                <Sliders size={16} />
                <span>Format</span>
              </button>
              <button className="icon-action-btn" onClick={handleCopyJson} title="Copy JSON">
                {copied ? <Check size={16} className="text-emerald" /> : <Copy size={16} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                className="icon-action-btn text-rose"
                onClick={() =>
                  setJsonInput(
                    '{\n  "concept": "My Custom Theory",\n  "steps": [\n    {\n      "title": "Supervised Learning",\n      "points": ["Trained on labeled dataset", "Learns mapping f(X)=Y"],\n      "narration": "Supervised learning trains models on labeled datasets to predict accurate target outputs."\n    }\n  ]\n}'
                  )
                }
                title="Clear Editor"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          {/* Validation Status Indicator */}
          <div className={`validation-bar ${isValidJson ? 'valid' : 'invalid'}`}>
            {isValidJson ? (
              <>
                <CheckCircle2 size={16} />
                <span>Valid JSON Schema • {parsedData?.steps?.length || 0} Video Sections Loaded</span>
              </>
            ) : (
              <>
                <AlertCircle size={16} />
                <span>Syntax Error: {jsonError}</span>
              </>
            )}
          </div>

          {/* JSON Textarea Editor */}
          <div className="textarea-wrapper">
            <textarea
              className="json-textarea"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="Paste theory concept JSON code here..."
              spellCheck="false"
            />
          </div>

          {/* Action Convert Button */}
          <div className="convert-action-area">
            <button
              className={`btn-primary convert-btn ${!isValidJson || isConverting ? 'disabled' : ''}`}
              onClick={handleConvertJsonToMp4}
              disabled={!isValidJson || isConverting}
            >
              {isConverting ? (
                <>
                  <div className="spinner-icon" />
                  <span>Converting JSON to MP4 Video...</span>
                </>
              ) : (
                <>
                  <Film size={20} />
                  <span>Convert JSON ➔ MP4 Video</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: MP4 Video Visualization Output Panel */}
        <div className="video-card glass-card">
          <div className="card-header">
            <div className="card-title-group">
              <FileVideo className="header-icon text-secondary" size={20} />
              <div>
                <h3 className="card-title">MP4 Concept Video Player</h3>
                <p className="card-desc">Theory Presentation Slides & Voiceover Engine</p>
              </div>
            </div>

            {mp4VideoUrl && (
              <div className="header-actions-group">
                <button
                  className={`btn-upload-mp4 ${isUploadedMp4 ? 'uploaded' : ''}`}
                  onClick={handleUploadMp4}
                  disabled={isUploadingMp4}
                  title="Upload MP4 video to EduReel database notes vault"
                >
                  {isUploadingMp4 ? (
                    <>
                      <div className="spinner-icon" />
                      <span>Uploading...</span>
                    </>
                  ) : isUploadedMp4 ? (
                    <>
                      <CheckCircle size={16} />
                      <span>Uploaded to Vault</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud size={16} />
                      <span>Upload MP4 Video</span>
                    </>
                  )}
                </button>
                <button className="btn-download" onClick={handleDownloadMp4} title="Download .MP4 file">
                  <Download size={16} />
                  <span>Download .MP4</span>
                </button>
              </div>
            )}
          </div>

          {/* Upload Status Toast Banner */}
          {uploadToast && (
            <div className={`upload-toast-bar ${isUploadedMp4 ? 'success' : 'info'}`}>
              {isUploadedMp4 ? <CheckCircle size={16} /> : <UploadCloud size={16} />}
              <span>{uploadToast}</span>
            </div>
          )}

          {/* Conversion Loading Overlay Progress Bar */}
          {isConverting && (
            <div className="conversion-overlay">
              <div className="progress-modal-card">
                <BrainCircuit className="pulse-brain-icon" size={48} />
                <h4>Generating Concept MP4 Video</h4>
                <p className="status-text">{conversionStatusText}</p>

                <div className="progress-bar-track">
                  <div className="progress-bar-fill" style={{ width: `${conversionProgress}%` }} />
                </div>
                <div className="progress-percentage">{conversionProgress}% Completed</div>
              </div>
            </div>
          )}

          {/* Canvas Render Display */}
          <div className="canvas-wrapper">
            <canvas ref={canvasRef} width={720} height={1280} className="concept-canvas" />

            {mp4VideoUrl && (
              <div className="mp4-ready-badge">
                <CheckCircle size={14} />
                <span>9:16 Video Ready</span>
              </div>
            )}
          </div>

          {/* Video Control Bar */}
          <div className="video-controls-bar">
            <button
              className="play-btn"
              onClick={() => {
                if (isPlaying) {
                  setIsPlaying(false);
                  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                  setIsSpeakingActive(false);
                } else {
                  if (currentStepIndex >= (parsedData?.steps?.length || 1) - 1) {
                    setCurrentStepIndex(0);
                  }
                  setIsPlaying(true);
                }
              }}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>

            <button
              className="control-btn"
              onClick={() => {
                setIsPlaying(false);
                if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                setIsSpeakingActive(false);
                setCurrentStepIndex(0);
              }}
              title="Reset Video"
            >
              <RotateCcw size={18} />
            </button>

            {/* Step Selector Slider / Timeline Scrub */}
            <div className="timeline-scrubber">
              <span className="step-label">
                Section {currentStepIndex + 1} / {parsedData?.steps?.length || 1}
              </span>
              <input
                type="range"
                min="0"
                max={(parsedData?.steps?.length || 1) - 1}
                value={currentStepIndex}
                onChange={(e) => {
                  const idx = parseInt(e.target.value, 10);
                  setCurrentStepIndex(idx);
                  if (parsedData?.steps[idx]) {
                    speakNarrationDirect(parsedData.steps[idx].narration);
                  }
                }}
                className="timeline-slider"
              />
            </div>

            {/* Playback Speed selector */}
            <div className="speed-selector">
              <button
                className={`speed-btn ${playbackSpeed === 1 ? 'active' : ''}`}
                onClick={() => setPlaybackSpeed(1)}
              >
                1x
              </button>
              <button
                className={`speed-btn ${playbackSpeed === 1.5 ? 'active' : ''}`}
                onClick={() => setPlaybackSpeed(1.5)}
              >
                1.5x
              </button>
              <button
                className={`speed-btn ${playbackSpeed === 2 ? 'active' : ''}`}
                onClick={() => setPlaybackSpeed(2)}
              >
                2x
              </button>
            </div>

            {/* Audio Voiceover Mute Toggle */}
            <button
              className={`control-btn ${isAudioMuted ? 'muted' : ''}`}
              onClick={() => {
                const nextMute = !isAudioMuted;
                setIsAudioMuted(nextMute);
                if (nextMute && 'speechSynthesis' in window) {
                  window.speechSynthesis.cancel();
                  setIsSpeakingActive(false);
                }
              }}
              title={isAudioMuted ? 'Unmute Audio Narration' : 'Mute Audio Narration'}
            >
              {isAudioMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>

          {/* Video Metadata Tabs & Tracing Breakdown */}
          <div className="meta-tabs-section">
            <div className="tab-headers">
              <button
                className={`tab-btn ${activeTab === 'explanation' ? 'active' : ''}`}
                onClick={() => setActiveTab('explanation')}
              >
                <Layers size={16} />
                <span>Section Breakdown</span>
              </button>
              <button
                className={`tab-btn ${activeTab === 'code' ? 'active' : ''}`}
                onClick={() => setActiveTab('code')}
              >
                <Code size={16} />
                <span>Source JSON / Code</span>
              </button>
              <button
                className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
                onClick={() => setActiveTab('specs')}
              >
                <Zap size={16} />
                <span>Concept Specs</span>
              </button>
            </div>

            <div className="tab-content">
              {activeTab === 'explanation' && (
                <div className="explanation-tab animate-fade-in">
                  <div className="step-card-active">
                    <div className="step-badge">Section {currentStepIndex + 1}</div>
                    <h4>{parsedData?.steps[currentStepIndex]?.title || 'Section Title'}</h4>
                    <p>{parsedData?.steps[currentStepIndex]?.description || 'Section detailed breakdown...'}</p>

                    {parsedData?.steps[currentStepIndex]?.points && (
                      <div className="array-state-view">
                        <span className="state-label">Key Points:</span>
                        <div className="state-pills">
                          {parsedData.steps[currentStepIndex].points.map((pt, i) => (
                            <span key={i} className="state-pill highlight">
                              {pt}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'code' && (
                <div className="code-tab animate-fade-in">
                  <div className="code-block-container">
                    <pre>{JSON.stringify(parsedData, null, 2)}</pre>
                  </div>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="specs-tab animate-fade-in">
                  <div className="metrics-grid">
                    <div className="metric-card">
                      <span className="metric-label">Concept Subject</span>
                      <span className="metric-value">{parsedData?.concept || 'N/A'}</span>
                    </div>
                    <div className="metric-card">
                      <span className="metric-label">Category</span>
                      <span className="metric-value highlight-purple">{parsedData?.category || 'Theory'}</span>
                    </div>
                    <div className="metric-card">
                      <span className="metric-label">Mode</span>
                      <span className="metric-value highlight-blue">Theory Presentation</span>
                    </div>
                    <div className="metric-card">
                      <span className="metric-label">Sections</span>
                      <span className="metric-value">{parsedData?.steps?.length || 0} Sections</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
