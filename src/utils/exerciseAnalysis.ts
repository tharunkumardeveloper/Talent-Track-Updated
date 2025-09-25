// Exercise Analysis Utilities
// Simulates the Python MediaPipe analysis logic for web application

export interface ExerciseAnalysisResult {
  reps: number;
  formQuality: 'excellent' | 'good' | 'needs-improvement' | 'poor';
  mistakes: string[];
  tips: string[];
  confidence: number;
  duration: number;
  avgRepTime: number;
}

export interface VideoQualityCheck {
  isGoodQuality: boolean;
  issues: string[];
  recommendations: string[];
}

// Simulate the angle calculation from the Python scripts
function calculateAngle(a: [number, number], b: [number, number], c: [number, number]): number {
  const ba = [a[0] - b[0], a[1] - b[1]];
  const bc = [c[0] - b[0], c[1] - b[1]];
  
  const dotProduct = ba[0] * bc[0] + ba[1] * bc[1];
  const magnitudeBA = Math.sqrt(ba[0] * ba[0] + ba[1] * ba[1]);
  const magnitudeBC = Math.sqrt(bc[0] * bc[0] + bc[1] * bc[1]);
  
  const cosAngle = Math.max(-1, Math.min(1, dotProduct / (magnitudeBA * magnitudeBC + 1e-9)));
  return Math.acos(cosAngle) * (180 / Math.PI);
}

// Analyze filename for posture and reps (based on your requirements)
export function analyzeFilename(filename: string): {
  postureType: 'good' | 'bad' | 'poor' | 'anomaly';
  extractedReps: number | null;
  confidence: number;
} {
  const lowerFilename = filename.toLowerCase();
  const firstLetter = lowerFilename.charAt(0);
  
  // Extract number from filename
  const numberMatch = filename.match(/(\d+)/);
  const extractedReps = numberMatch ? parseInt(numberMatch[1]) : null;
  
  let postureType: 'good' | 'bad' | 'poor' | 'anomaly';
  let confidence: number;
  
  switch (firstLetter) {
    case 'g':
      postureType = 'good';
      confidence = 0.92 + Math.random() * 0.07; // 92-99%
      break;
    case 'b':
      postureType = 'bad';
      confidence = 0.75 + Math.random() * 0.15; // 75-90%
      break;
    case 'p':
      postureType = 'poor';
      confidence = 0.3 + Math.random() * 0.2; // 30-50%
      break;
    case 'a':
      postureType = 'anomaly';
      confidence = 0.1 + Math.random() * 0.2; // 10-30%
      break;
    default:
      postureType = 'good';
      confidence = 0.80 + Math.random() * 0.15; // 80-95%
  }
  
  return { postureType, extractedReps, confidence };
}

// Simulate pushup analysis (based on pushup.py logic)
export function analyzePushups(filename: string, videoDuration: number = 60): ExerciseAnalysisResult {
  const { postureType, extractedReps, confidence } = analyzeFilename(filename);
  
  if (postureType === 'poor' || postureType === 'anomaly') {
    return {
      reps: 0,
      formQuality: 'poor',
      mistakes: ['Video quality insufficient for analysis'],
      tips: [
        'Ensure good lighting conditions',
        'Keep camera steady during recording',
        'Frame your full body in view',
        'Avoid blur and shaky movements'
      ],
      confidence: confidence,
      duration: videoDuration,
      avgRepTime: 0
    };
  }
  
  const baseReps = extractedReps || (15 + Math.floor(Math.random() * 20));
  const reps = Math.max(1, baseReps);
  const avgRepTime = videoDuration / reps;
  
  const formQuality = postureType === 'good' ? 
    (confidence > 0.9 ? 'excellent' : 'good') : 
    'needs-improvement';
  
  const mistakes = postureType === 'good' ? [] : [
    'Slight shoulder misalignment detected',
    'Core engagement could be improved',
    'Breathing rhythm inconsistent'
  ];
  
  const tips = postureType === 'good' ? [
    'Your form is spot-on throughout the exercise',
    'Breathing rhythm is well-coordinated',
    'Great core stability and control',
    'Perfect alignment maintained'
  ] : [
    'Focus on shoulder alignment',
    'Engage your core muscles more',
    'Maintain steady breathing pattern',
    'Keep your back straight throughout'
  ];
  
  return {
    reps,
    formQuality,
    mistakes,
    tips,
    confidence,
    duration: videoDuration,
    avgRepTime
  };
}

// Simulate situp analysis (based on situp.py logic)
export function analyzeSitups(filename: string, videoDuration: number = 60): ExerciseAnalysisResult {
  const { postureType, extractedReps, confidence } = analyzeFilename(filename);
  
  if (postureType === 'poor' || postureType === 'anomaly') {
    return {
      reps: 0,
      formQuality: 'poor',
      mistakes: ['Video analysis failed'],
      tips: [
        'Position camera to side view',
        'Frame torso and knees clearly',
        'Ensure stable camera mount',
        'Maintain clear movement visibility'
      ],
      confidence: confidence,
      duration: videoDuration,
      avgRepTime: 0
    };
  }
  
  const baseReps = extractedReps || (20 + Math.floor(Math.random() * 25));
  const reps = Math.max(1, baseReps);
  const avgRepTime = videoDuration / reps;
  
  const formQuality = postureType === 'good' ? 'excellent' : 'needs-improvement';
  
  const mistakes = postureType === 'good' ? [] : [
    'Neck strain detected in some reps',
    'Hip flexor compensation noted',
    'Incomplete range of motion'
  ];
  
  const tips = postureType === 'good' ? [
    'Excellent core engagement throughout',
    'Perfect neck alignment maintained',
    'Consistent tempo and control',
    'Full range of motion achieved'
  ] : [
    'Keep hands behind head, not neck',
    'Focus on lifting with core, not momentum',
    'Maintain controlled descent',
    'Keep feet flat on ground'
  ];
  
  return {
    reps,
    formQuality,
    mistakes,
    tips,
    confidence,
    duration: videoDuration,
    avgRepTime
  };
}

// Simulate pullup analysis (based on pullup.py logic)
export function analyzePullups(filename: string, videoDuration: number = 120): ExerciseAnalysisResult {
  const { postureType, extractedReps, confidence } = analyzeFilename(filename);
  
  if (postureType === 'poor' || postureType === 'anomaly') {
    return {
      reps: 0,
      formQuality: 'poor',
      mistakes: ['Insufficient video quality for analysis'],
      tips: [
        'Position camera to capture full body',
        'Show complete range of motion',
        'Ensure bar is visible in frame',
        'Record from side angle for best view'
      ],
      confidence: confidence,
      duration: videoDuration,
      avgRepTime: 0
    };
  }
  
  const baseReps = extractedReps || (5 + Math.floor(Math.random() * 15));
  const reps = Math.max(1, baseReps);
  const avgRepTime = videoDuration / reps;
  
  const formQuality = postureType === 'good' ? 'excellent' : 'needs-improvement';
  
  const mistakes = postureType === 'good' ? [] : [
    'Partial range of motion detected',
    'Swinging motion observed',
    'Grip width inconsistency'
  ];
  
  const tips = postureType === 'good' ? [
    'Perfect chin-over-bar clearance',
    'Excellent controlled descent',
    'Consistent grip and form',
    'No swinging or momentum used'
  ] : [
    'Ensure chin clears the bar completely',
    'Control the descent phase',
    'Minimize body swinging',
    'Maintain consistent grip width'
  ];
  
  return {
    reps,
    formQuality,
    mistakes,
    tips,
    confidence,
    duration: videoDuration,
    avgRepTime
  };
}

// Simulate shuttle run analysis (based on shuttlerun.py logic)
export function analyzeShuttleRun(filename: string, videoDuration: number = 180): ExerciseAnalysisResult {
  const { postureType, extractedReps, confidence } = analyzeFilename(filename);
  
  if (postureType === 'poor' || postureType === 'anomaly') {
    return {
      reps: 0,
      formQuality: 'poor',
      mistakes: ['Movement tracking failed'],
      tips: [
        'Position camera to capture both cones',
        'Ensure clear side view of full path',
        'Record complete sprint distance',
        'Maintain good lighting throughout'
      ],
      confidence: confidence,
      duration: videoDuration,
      avgRepTime: 0
    };
  }
  
  const baseRuns = extractedReps || (8 + Math.floor(Math.random() * 12));
  const reps = Math.max(1, baseRuns);
  const avgRepTime = videoDuration / reps;
  
  const formQuality = postureType === 'good' ? 'excellent' : 'needs-improvement';
  
  const mistakes = postureType === 'good' ? [] : [
    'Deceleration before cone touch',
    'Wide turning radius detected',
    'Inconsistent sprint pace'
  ];
  
  const tips = postureType === 'good' ? [
    'Excellent acceleration and deceleration',
    'Perfect cone touching technique',
    'Consistent pace throughout',
    'Optimal turning mechanics'
  ] : [
    'Sprint through the cone, don\'t slow down early',
    'Make sharp, tight turns',
    'Maintain consistent effort level',
    'Touch the cone with your hand, not just approach'
  ];
  
  return {
    reps,
    formQuality,
    mistakes,
    tips,
    confidence,
    duration: videoDuration,
    avgRepTime
  };
}

// Simulate vertical jump analysis
export function analyzeVerticalJump(filename: string, videoDuration: number = 120): ExerciseAnalysisResult {
  const { postureType, extractedReps, confidence } = analyzeFilename(filename);
  
  if (postureType === 'poor' || postureType === 'anomaly') {
    return {
      reps: 0,
      formQuality: 'poor',
      mistakes: ['Jump height measurement failed'],
      tips: [
        'Position camera 6 feet away',
        'Frame full body in view',
        'Ensure good lighting',
        'Jump straight up, not forward'
      ],
      confidence: confidence,
      duration: videoDuration,
      avgRepTime: 0
    };
  }
  
  const baseJumps = extractedReps || (3 + Math.floor(Math.random() * 5));
  const reps = Math.max(1, baseJumps);
  const avgRepTime = videoDuration / reps;
  
  const formQuality = postureType === 'good' ? 'excellent' : 'needs-improvement';
  
  const mistakes = postureType === 'good' ? [] : [
    'Forward drift during jump',
    'Uneven arm swing detected',
    'Landing impact too hard'
  ];
  
  const tips = postureType === 'good' ? [
    'Perfect vertical trajectory',
    'Excellent arm coordination',
    'Soft, controlled landings',
    'Consistent jump technique'
  ] : [
    'Jump straight up, avoid forward movement',
    'Use both arms equally for momentum',
    'Land softly on balls of feet',
    'Bend knees on landing to absorb impact'
  ];
  
  return {
    reps,
    formQuality,
    mistakes,
    tips,
    confidence,
    duration: videoDuration,
    avgRepTime
  };
}

// Main analysis function that routes to specific exercise analyzers
export function analyzeExerciseVideo(
  filename: string, 
  exerciseType: string, 
  videoDuration: number = 60
): ExerciseAnalysisResult {
  const exerciseId = exerciseType.toLowerCase().replace(/[^a-z]/g, '');
  
  switch (exerciseId) {
    case 'pushups':
    case 'pushup':
      return analyzePushups(filename, videoDuration);
    
    case 'situps':
    case 'situp':
      return analyzeSitups(filename, videoDuration);
    
    case 'pullups':
    case 'pullup':
      return analyzePullups(filename, videoDuration);
    
    case 'shuttlerun':
    case 'shuttle':
      return analyzeShuttleRun(filename, videoDuration);
    
    case 'verticaljump':
    case 'jump':
      return analyzeVerticalJump(filename, videoDuration);
    
    default:
      // Generic analysis for unknown exercises
      return analyzePushups(filename, videoDuration);
  }
}

// Check video quality based on filename patterns
export function checkVideoQuality(filename: string): VideoQualityCheck {
  const { postureType } = analyzeFilename(filename);
  
  if (postureType === 'poor') {
    return {
      isGoodQuality: false,
      issues: [
        'Low resolution detected',
        'Insufficient lighting',
        'Camera shake present',
        'Partial body framing'
      ],
      recommendations: [
        'Use better lighting (natural light preferred)',
        'Keep camera steady with tripod or stable surface',
        'Frame your full body in the shot',
        'Record in landscape orientation',
        'Ensure camera is at appropriate distance'
      ]
    };
  }
  
  if (postureType === 'anomaly') {
    return {
      isGoodQuality: false,
      issues: [
        'Inconsistent lighting patterns',
        'Unnatural movement artifacts',
        'Frame interpolation detected',
        'Digital manipulation indicators'
      ],
      recommendations: [
        'Use your device\'s native camera app',
        'Record in real-time without filters',
        'Avoid using video editing applications',
        'Ensure consistent lighting throughout',
        'Record in a single continuous take'
      ]
    };
  }
  
  return {
    isGoodQuality: true,
    issues: [],
    recommendations: []
  };
}

// Generate performance metrics based on analysis
export function generatePerformanceMetrics(analysis: ExerciseAnalysisResult): {
  accuracy: number;
  timing: number;
  consistency: number;
  overallScore: number;
} {
  const baseAccuracy = analysis.formQuality === 'excellent' ? 90 : 
                      analysis.formQuality === 'good' ? 80 : 
                      analysis.formQuality === 'needs-improvement' ? 70 : 50;
  
  const accuracy = Math.min(100, baseAccuracy + Math.floor(Math.random() * 10));
  
  const baseTiming = analysis.confidence > 0.9 ? 85 : 
                   analysis.confidence > 0.8 ? 75 : 
                   analysis.confidence > 0.7 ? 65 : 55;
  
  const timing = Math.min(100, baseTiming + Math.floor(Math.random() * 15));
  
  const baseConsistency = analysis.reps > 0 ? 
    Math.min(95, 70 + (analysis.reps * 2)) : 50;
  
  const consistency = Math.min(100, baseConsistency + Math.floor(Math.random() * 10));
  
  const overallScore = Math.round((accuracy + timing + consistency) / 3);
  
  return { accuracy, timing, consistency, overallScore };
}

// Calculate rewards based on performance
export function calculateRewards(analysis: ExerciseAnalysisResult, metrics: ReturnType<typeof generatePerformanceMetrics>): {
  xp: number;
  coins: number;
  badges: string[];
} {
  let baseXP = 50;
  let baseCoins = 25;
  const badges: string[] = [];
  
  // Bonus for good performance
  if (analysis.formQuality === 'excellent') {
    baseXP += 50;
    baseCoins += 25;
    badges.push('Perfect Form');
  } else if (analysis.formQuality === 'good') {
    baseXP += 25;
    baseCoins += 15;
  }
  
  // Bonus for high rep count
  if (analysis.reps >= 30) {
    baseXP += 30;
    baseCoins += 20;
    badges.push('Endurance Champion');
  } else if (analysis.reps >= 20) {
    baseXP += 15;
    baseCoins += 10;
    badges.push('Strong Performer');
  }
  
  // Bonus for consistency
  if (metrics.consistency >= 90) {
    baseXP += 20;
    baseCoins += 15;
    badges.push('Consistency Master');
  }
  
  // Bonus for overall excellence
  if (metrics.overallScore >= 90) {
    baseXP += 40;
    baseCoins += 30;
    badges.push('Excellence Award');
  }
  
  return {
    xp: baseXP,
    coins: baseCoins,
    badges
  };
}

// Simulate real-time frame analysis (for the analysis simulation)
export function simulateFrameAnalysis(frameNumber: number, totalFrames: number): {
  detectedMovements: string[];
  currentPhase: string;
  formFeedback: string;
} {
  const progress = frameNumber / totalFrames;
  const detectedMovements: string[] = [];
  let currentPhase = 'Starting position';
  let formFeedback = 'Analyzing...';
  
  if (progress < 0.2) {
    currentPhase = 'Starting position';
    formFeedback = 'Checking initial form and alignment';
    if (frameNumber === 10) detectedMovements.push('Body position detected');
  } else if (progress < 0.4) {
    currentPhase = 'Movement initiation';
    formFeedback = 'Tracking movement patterns';
    if (frameNumber === Math.floor(totalFrames * 0.3)) {
      detectedMovements.push('Movement pattern identified');
    }
  } else if (progress < 0.7) {
    currentPhase = 'Exercise execution';
    formFeedback = 'Counting repetitions and analyzing form';
    if (frameNumber === Math.floor(totalFrames * 0.5)) {
      detectedMovements.push('Rep cycle detected');
    }
  } else if (progress < 0.9) {
    currentPhase = 'Form assessment';
    formFeedback = 'Evaluating technique consistency';
    if (frameNumber === Math.floor(totalFrames * 0.8)) {
      detectedMovements.push('Form assessment complete');
    }
  } else {
    currentPhase = 'Analysis complete';
    formFeedback = 'Finalizing results and generating feedback';
  }
  
  return { detectedMovements, currentPhase, formFeedback };
}