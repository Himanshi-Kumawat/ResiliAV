// ResiliAV Automotive Cybersecurity Dataset & Telemetry Data
// Formulated from Korea University HCRLab Car-Hacking Benchmark & IEEE Conference Paper

export const INITIAL_METRICS = {
  vehicleStatus: 'Connected',
  autonomousMode: 'Autonomous Mode | Level 4',
  securityHealth: 'Normal', // 'Normal' | 'Threat Detected' | 'Mitigated'
  totalAttacksDetected: 7,
  detectionAccuracy: 98.6, // Or 99.78% in extended benchmark
  speed: 62, // km/h
  safeSpeedLimit: 50, // km/h hard-lock
  batteryLevel: 78, // %
  temperature: 36, // °C
  canBusTraffic: 1248, // msgs/s
  connection: 'Stable',
  seatbeltLocked: false,
  failSafeEngaged: false,
  currentMode: 'Adaptive Protection',
  activeStep: 1, // 1: Detect, 2: Analyze, 3: Respond, 4: Verify
};

export const INITIAL_ALERTS = [
  {
    id: 'alt-1',
    title: 'Suspicious CAN Message',
    description: 'Abnormal frame pattern detected (ID: 0x7E0)',
    severity: 'High',
    time: '14:21',
    canId: '0x7E0'
  },
  {
    id: 'alt-2',
    title: 'Unusual Network Traffic',
    description: 'High frequency connection attempt',
    severity: 'Medium',
    time: '13:56',
    canId: '0x0000'
  },
  {
    id: 'alt-3',
    title: 'Possible Fuzzing Attempt',
    description: 'Invalid payload size in CAN frame',
    severity: 'Medium',
    time: '12:43',
    canId: '0x0316'
  },
  {
    id: 'alt-4',
    title: 'System Check Completed',
    description: 'All modules operating normally',
    severity: 'Low',
    time: '11:15',
    canId: '0x018F'
  },
  {
    id: 'alt-5',
    title: 'Behavioral Analysis Update',
    description: 'Model performance stable',
    severity: 'Low',
    time: '09:32',
    canId: '0x02B0'
  }
];

export const INITIAL_EVENTS = [
  {
    id: 'evt-1',
    time: '14:21:03',
    type: 'CAN Injection',
    source: 'Vehicle Bus',
    severity: 'High',
    status: 'Mitigated'
  },
  {
    id: 'evt-2',
    time: '13:56:27',
    type: 'DoS Attempt',
    source: 'External',
    severity: 'Medium',
    status: 'Detected'
  },
  {
    id: 'evt-3',
    time: '12:43:12',
    type: 'Fuzzing',
    source: 'V2X',
    severity: 'Medium',
    status: 'Blocked'
  },
  {
    id: 'evt-4',
    time: '11:15:46',
    type: 'Port Scan',
    source: 'External',
    severity: 'Low',
    status: 'Logged'
  },
  {
    id: 'evt-5',
    time: '09:32:10',
    type: 'Normal Traffic',
    source: 'Vehicle Bus',
    severity: 'Low',
    status: '—'
  }
];

export const MODEL_PERFORMANCE_METRICS = {
  accuracy: 98.6,
  precision: 97.9,
  recall: 96.8,
  f1Score: 97.3,
  latency: 1.48, // ms
  fpr: 0.021, // %
  confusionMatrix: {
    normal: { normal: 942, attack: 18 },
    attack: { normal: 12, attack: 928 }
  }
};

// Table I from IEEE Paper
export const TABLE_I_DATA = [
  { dimension: 'Response Paradigm', prior: 'Passive Offline Logging', proposed: 'Active Closed-Loop CPS' },
  { dimension: 'Model Architecture', prior: 'Monolithic (Single Model)', proposed: 'Dual-Stage Cascaded' },
  { dimension: 'Payload Inspection', prior: 'Uniform / Rule-based', proposed: 'Multi-Head Attention' },
  { dimension: 'Vehicle Actuation', prior: 'None (Vehicle continues)', proposed: '50 km/h Safe Lock' },
  { dimension: 'Passenger Safety', prior: 'Unmanaged', proposed: 'Seatbelt Interlock' },
  { dimension: 'Inference Latency', prior: '8.0 ms – 22.0 ms', proposed: '1.48 ms (Sub-2ms)' },
  { dimension: 'Target Accuracy', prior: '97.5% – 99.1%', proposed: '99.78%' },
  { dimension: 'False Positive Rate', prior: '0.20% – 1.50%', proposed: '0.021%' },
  { dimension: 'Safety Compliance', prior: 'None Specified', proposed: 'ISO 26262 ASIL-D' }
];

// Table II from IEEE Paper
export const TABLE_II_DATA = [
  { model: 'Random Forest', acc: '98.15%', prec: '98.20%', rec: '98.15%', f1: '98.17%', fpr: '0.420%', latency: '2.45 ms' },
  { model: 'Standalone 1D-CNN', acc: '98.92%', prec: '98.95%', rec: '98.92%', f1: '98.93%', fpr: '0.180%', latency: '3.12 ms' },
  { model: 'Standalone XGBoost', acc: '99.42%', prec: '99.45%', rec: '99.42%', f1: '99.43%', fpr: '0.082%', latency: '0.41 ms' },
  { model: 'ResiliAV (Proposed ACH-IDS)', acc: '99.78%', prec: '99.80%', rec: '99.78%', f1: '99.79%', fpr: '0.021%', latency: '1.48 ms', highlighted: true }
];

// Table III: Detailed 12,000-packet Multi-Class Confusion Matrix
export const TABLE_III_DATA = [
  { groundTruth: 'Normal Driving', normal: 8393, dos: 1, fuzzy: 3, speed: 2, belt: 1, prec: '99.90%', rec: '99.92%', f1: '99.91%' },
  { groundTruth: 'DoS Flooding', normal: 1, dos: 958, fuzzy: 1, speed: 0, belt: 0, prec: '99.79%', rec: '99.79%', f1: '99.79%' },
  { groundTruth: 'Fuzzy Injection', normal: 2, dos: 1, fuzzy: 836, speed: 1, belt: 0, prec: '99.41%', rec: '99.52%', f1: '99.46%' },
  { groundTruth: 'Spoofing Speed (50 km/h)', normal: 3, dos: 0, fuzzy: 1, speed: 954, belt: 2, prec: '99.58%', rec: '99.38%', f1: '99.48%' },
  { groundTruth: 'Spoofing Seatbelt', normal: 2, dos: 0, fuzzy: 0, speed: 1, belt: 837, prec: '99.64%', rec: '99.64%', f1: '99.64%' }
];
