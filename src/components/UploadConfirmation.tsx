import { useState, useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface UploadConfirmationProps {
  fileName: string;
  onProceed: () => void;
  onCancel: () => void;
}

export function UploadConfirmation({ fileName, onProceed, onCancel }: UploadConfirmationProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          setIsComplete(true);
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="glass border-glass-border/50 max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-xl">
          {isComplete ? "Upload Complete!" : "Uploading Video..."}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="text-sm text-muted-foreground mb-2">{fileName}</div>
          <Progress value={uploadProgress} className="w-full h-2" />
          <div className="text-xs text-muted-foreground mt-1">
            {Math.round(uploadProgress)}%
          </div>
        </div>

        {isComplete && (
          <div className="flex items-center justify-center">
            <div className="animate-scale-in">
              <CheckCircle2 className="w-16 h-16 text-success animate-pulse" />
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={onCancel}
            disabled={isComplete}
            className="flex-1"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel Upload
          </Button>
          <Button 
            onClick={onProceed}
            disabled={!isComplete}
            className="flex-1 btn-gradient"
          >
            Proceed to Analysis
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}