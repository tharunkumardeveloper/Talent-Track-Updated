import { useState, useEffect } from "react";
import { CircleCheck as CheckCircle2, Loader as Loader2, Play, Pause } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { simulateFrameAnalysis } from "@/utils/exerciseAnalysis";

interface AnalysisSimulationProps {
  onComplete: () => void;
}

const analysisSteps = [
  { id: 1, text: "Video uploaded", delay: 500 },
  { id: 2, text: "Movements detected", delay: 2000 },
  { id: 3, text: "Form reviewed", delay: 3500 },
  { id: 4, text: "Reps counted", delay: 5000 },
  { id: 5, text: "Benchmark comparison complete", delay: 6000 }
];

const loadingTexts = [
  "Analyzing each frame carefully...",
  "Detecting your movements...",
  "Tracking body position...",
  "Counting reps and tracking form...",
  "Comparing against standard benchmarks...",
  "Almost done..."
];

export function AnalysisSimulation({ onComplete }: AnalysisSimulationProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [frameNumber, setFrameNumber] = useState(0);
  const [isProcessingFrames, setIsProcessingFrames] = useState(false);
  const [detectedMovements, setDetectedMovements] = useState<string[]>([]);
  const [currentPhase, setCurrentPhase] = useState('Starting position');
  const [formFeedback, setFormFeedback] = useState('Analyzing...');

  useEffect(() => {
    // Start frame processing after initial upload
    setTimeout(() => {
      setIsProcessingFrames(true);
    }, 1000);

    // Simulate frame-by-frame analysis
    const frameInterval = setInterval(() => {
      setFrameNumber(prev => {
        if (prev >= 150) { // Simulate 150 frames total
          setIsProcessingFrames(false);
          clearInterval(frameInterval);
          return 150;
        }
        
        // Update analysis feedback based on frame
        const frameAnalysis = simulateFrameAnalysis(prev + 1, 150);
        setCurrentPhase(frameAnalysis.currentPhase);
        setFormFeedback(frameAnalysis.formFeedback);
        
        // Add new detected movements
        frameAnalysis.detectedMovements.forEach(movement => {
          if (!detectedMovements.includes(movement)) {
            setDetectedMovements(prevMovements => [...prevMovements, movement]);
          }
        });
        
        return prev + 1;
      });
    }, 40); // Fast frame processing


    // Cycle through loading texts
    const textInterval = setInterval(() => {
      setCurrentTextIndex(prev => (prev + 1) % loadingTexts.length);
    }, 1000);

    // Complete steps gradually
    analysisSteps.forEach((step) => {
      setTimeout(() => {
        setCompletedSteps(prev => [...prev, step.id]);
        setProgress((step.id / analysisSteps.length) * 100);
      }, step.delay);
    });

    // Complete analysis
    setTimeout(() => {
      onComplete();
    }, 7000);

    return () => {
      clearInterval(frameInterval);
      clearInterval(textInterval);
    };
  }, [onComplete]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card className="glass border-glass-border/50">
        <CardHeader>
          <CardTitle className="text-center flex items-center justify-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            AI Analysis in Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-lg font-medium animate-fade-in">
              {loadingTexts[currentTextIndex]}
            </p>
            <Progress value={progress} className="w-full h-2 mt-4" />
          </div>

          {/* Frame-by-Frame Video Analysis Simulation */}
          {isProcessingFrames && (
            <Card className="glass border-glass-border/30 bg-black/90">
              <CardContent className="p-4">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-2 text-sm text-green-400">
                    <Play className="w-4 h-4" />
                    Processing Video Frame by Frame
                  </div>
                  
                  {/* Mock Video Frame Display */}
                  <div className="relative bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-lg h-48 flex items-center justify-center border-2 border-primary/30">
                    <div className="absolute top-2 left-2 text-xs text-green-400 font-mono">
                      Frame: {frameNumber}/150
                    </div>
                    <div className="absolute top-2 right-2 text-xs text-green-400 font-mono">
                      FPS: 25
                    </div>
                    
                    {/* Simulated body outline */}
                    <div className="relative">
                      <div className="w-20 h-32 border-2 border-green-400/60 rounded-lg animate-pulse">
                        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 border-2 border-green-400/60 rounded-full" />
                        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-1 h-12 bg-green-400/60" />
                        <div className="absolute top-12 left-2 w-8 h-1 bg-green-400/60 transform -rotate-12" />
                        <div className="absolute top-12 right-2 w-8 h-1 bg-green-400/60 transform rotate-12" />
                        <div className="absolute bottom-4 left-3 w-1 h-8 bg-green-400/60" />
                        <div className="absolute bottom-4 right-3 w-1 h-8 bg-green-400/60" />
                      </div>
                      
                      {/* Movement detection overlay */}
                      <div className="absolute -inset-4 border border-yellow-400/50 rounded-lg animate-ping" />
                    </div>
                    
                    <div className="absolute bottom-2 left-2 text-xs text-yellow-400">
                      🎯 {currentPhase}
                    </div>
                    <div className="absolute bottom-2 right-2 text-xs text-blue-400">
                      📊 {formFeedback}
                    </div>
                  </div>
                  
                  {/* Real-time Detection Feed */}
                  <div className="text-left space-y-1 max-h-20 overflow-hidden">
                    {detectedMovements.map((movement, index) => (
                      <div 
                        key={index} 
                        className="text-xs text-green-400 animate-fade-in font-mono hover:text-green-300 transition-colors"
                      >
                        ✓ {movement}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-muted-foreground">Analysis Progress:</h4>
            {analysisSteps.map((step) => (
              <div 
                key={step.id} 
                className={`flex items-center gap-3 transition-all duration-500 ${
                  completedSteps.includes(step.id) 
                    ? 'text-success animate-fade-in' 
                    : 'text-muted-foreground/50'
                }`}
              >
                {completedSteps.includes(step.id) ? (
                  <CheckCircle2 className="w-4 h-4 animate-scale-in" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30" />
                )}
                <span className="text-sm">{step.text}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}