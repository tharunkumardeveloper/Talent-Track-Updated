import { useState } from "react";
import { User, MapPin, Calendar, Camera, Save, X, Settings, Eye, Volume2, Hand, Accessibility, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: {
    name: string;
    location: string;
    joinDate: string;
    gender?: string;
    accessibility?: {
      assistiveMode: boolean;
      highContrast: boolean;
      voiceNarration: boolean;
      subtitles: boolean;
      alternateInput: boolean;
      disabilityType: string;
      assistiveDevices: string[];
      testPreferences: string[];
    };
  };
  onSave: (profile: any) => void;
}

export function ProfileEditModal({ isOpen, onClose, currentProfile, onSave }: ProfileEditModalProps) {
  const [profile, setProfile] = useState({
    name: currentProfile.name,
    location: currentProfile.location,
    gender: currentProfile.gender || "prefer-not-to-say",
    profilePic: null as File | null,
    medicalReport: null as File | null,
    accessibility: {
      assistiveMode: currentProfile.accessibility?.assistiveMode || false,
      highContrast: currentProfile.accessibility?.highContrast || false,
      voiceNarration: currentProfile.accessibility?.voiceNarration || false,
      subtitles: currentProfile.accessibility?.subtitles || false,
      alternateInput: currentProfile.accessibility?.alternateInput || false,
      disabilityType: currentProfile.accessibility?.disabilityType || "none",
      assistiveDevices: currentProfile.accessibility?.assistiveDevices || [],
      testPreferences: currentProfile.accessibility?.testPreferences || []
    }
  });
  const { toast } = useToast();

  const handleSave = () => {
    if (!profile.name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your name",
        variant: "destructive"
      });
      return;
    }

    if (!profile.location.trim()) {
      toast({
        title: "Location Required", 
        description: "Please enter your location",
        variant: "destructive"
      });
      return;
    }

    if (!profile.medicalReport) {
      toast({
        title: "Medical Report Required",
        description: "Please upload your medical report to access assessments",
        variant: "destructive"
      });
      return;
    }

    onSave(profile);
    toast({
      title: "Profile Updated! ✅",
      description: "Your profile has been successfully updated",
    });
    onClose();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfile(prev => ({ ...prev, profilePic: file }));
    }
  };

  const handleMedicalReportUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfile(prev => ({ ...prev, medicalReport: file }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass border-glass-border/50 backdrop-blur-glass max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-primary bg-clip-text text-transparent">
            ✏️ Edit Profile
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Profile Picture Upload */}
          <div className="text-center">
            <div className="relative mx-auto w-24 h-24 mb-4">
              <div className="w-24 h-24 rounded-full bg-gradient-primary border-2 border-primary/50 flex items-center justify-center text-xl font-bold text-primary-foreground shadow-glow">
                <User className="w-10 h-10" />
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-background border border-glass-border/30"
                onClick={() => document.getElementById('profile-pic-upload')?.click()}
              >
                <Camera className="w-4 h-4" />
              </Button>
              <input
                id="profile-pic-upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
            {profile.profilePic && (
              <p className="text-xs text-success">New profile picture selected</p>
            )}
          </div>

          {/* Name Input */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter your full name"
              className="glass border-glass-border/30"
            />
          </div>

          {/* Gender Selection */}
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select value={profile.gender} onValueChange={(value) => setProfile(prev => ({ ...prev, gender: value }))}>
              <SelectTrigger className="glass border-glass-border/30">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent className="glass border-glass-border/30">
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="non-binary">Non-binary</SelectItem>
                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Location Input */}
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={profile.location}
              onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
              placeholder="City, State"
              className="glass border-glass-border/30"
            />
          </div>

          {/* Member Since (Read Only) */}
          <div className="space-y-2">
            <Label htmlFor="join-date">Member Since</Label>
            <Input
              id="join-date"
              value={currentProfile.joinDate}
              disabled
              className="glass border-glass-border/30 opacity-60"
            />
          </div>

          {/* Medical Report Upload */}
          <div className="space-y-2">
            <Label htmlFor="medical-report">Medical Report *</Label>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('medical-report-upload')?.click()}
                className="border-glass-border/30"
              >
                <Heart className="w-4 h-4 mr-2" />
                Upload Medical Report
              </Button>
              <input
                id="medical-report-upload"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleMedicalReportUpload}
                className="hidden"
              />
              {profile.medicalReport && (
                <span className="text-xs text-success">✓ {profile.medicalReport.name}</span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Upload your medical clearance (PDF or image). Required to access fitness assessments.
            </p>
          </div>

          <Separator className="bg-glass-border/30" />

          {/* Accessibility Settings Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Accessibility className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Accessibility Settings</h3>
            </div>

            {/* Assistive Mode */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="assistive-mode">Assistive Mode</Label>
                <p className="text-xs text-muted-foreground">Simpler navigation, larger buttons, readable fonts</p>
              </div>
              <Switch
                id="assistive-mode"
                checked={profile.accessibility.assistiveMode}
                onCheckedChange={(checked) => 
                  setProfile(prev => ({
                    ...prev,
                    accessibility: { ...prev.accessibility, assistiveMode: checked }
                  }))
                }
              />
            </div>

            {/* High Contrast Mode */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="high-contrast">High Contrast Mode</Label>
                <p className="text-xs text-muted-foreground">Darker backgrounds with white text for better visibility</p>
              </div>
              <Switch
                id="high-contrast"
                checked={profile.accessibility.highContrast}
                onCheckedChange={(checked) => 
                  setProfile(prev => ({
                    ...prev,
                    accessibility: { ...prev.accessibility, highContrast: checked }
                  }))
                }
              />
            </div>

            {/* Voice Narration */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="voice-narration">Voice Narration</Label>
                <p className="text-xs text-muted-foreground">Reads instructions in simple language</p>
              </div>
              <Switch
                id="voice-narration"
                checked={profile.accessibility.voiceNarration}
                onCheckedChange={(checked) => 
                  setProfile(prev => ({
                    ...prev,
                    accessibility: { ...prev.accessibility, voiceNarration: checked }
                  }))
                }
              />
            </div>

            {/* Subtitles */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="subtitles">Video Subtitles</Label>
                <p className="text-xs text-muted-foreground">Display subtitles for all tutorial videos</p>
              </div>
              <Switch
                id="subtitles"
                checked={profile.accessibility.subtitles}
                onCheckedChange={(checked) => 
                  setProfile(prev => ({
                    ...prev,
                    accessibility: { ...prev.accessibility, subtitles: checked }
                  }))
                }
              />
            </div>

            {/* Alternate Input Methods */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="alternate-input">Alternate Input Methods</Label>
                <p className="text-xs text-muted-foreground">Enable gesture or voice-based controls</p>
              </div>
              <Switch
                id="alternate-input"
                checked={profile.accessibility.alternateInput}
                onCheckedChange={(checked) => 
                  setProfile(prev => ({
                    ...prev,
                    accessibility: { ...prev.accessibility, alternateInput: checked }
                  }))
                }
              />
            </div>

            {/* Disability Type Selection */}
            <div className="space-y-2">
              <Label htmlFor="disability-type">Disability Type (Optional)</Label>
              <Select 
                value={profile.accessibility.disabilityType} 
                onValueChange={(value) => 
                  setProfile(prev => ({
                    ...prev,
                    accessibility: { ...prev.accessibility, disabilityType: value }
                  }))
                }
              >
                <SelectTrigger className="glass border-glass-border/30">
                  <SelectValue placeholder="Select if applicable" />
                </SelectTrigger>
                <SelectContent className="glass border-glass-border/30">
                  <SelectItem value="none">None / Prefer not to say</SelectItem>
                  <SelectItem value="wheelchair">Wheelchair user</SelectItem>
                  <SelectItem value="vision">Vision impairment</SelectItem>
                  <SelectItem value="hearing">Hearing impairment</SelectItem>
                  <SelectItem value="limb">Limb difference</SelectItem>
                  <SelectItem value="mobility">Mobility limitation</SelectItem>
                  <SelectItem value="cognitive">Cognitive difference</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Assistive Devices */}
            <div className="space-y-2">
              <Label>Assistive Devices Used</Label>
              <div className="grid grid-cols-2 gap-2">
                {["Wheelchair", "Prosthetics", "Hearing Aid", "Walking Aid", "Support Braces", "None"].map((device) => (
                  <div key={device} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={device}
                      checked={profile.accessibility.assistiveDevices.includes(device)}
                      onChange={(e) => {
                        const devices = e.target.checked
                          ? [...profile.accessibility.assistiveDevices, device]
                          : profile.accessibility.assistiveDevices.filter(d => d !== device);
                        setProfile(prev => ({
                          ...prev,
                          accessibility: { ...prev.accessibility, assistiveDevices: devices }
                        }));
                      }}
                      className="rounded border-glass-border/30"
                    />
                    <Label htmlFor={device} className="text-sm">{device}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Test Preferences */}
            <div className="space-y-2">
              <Label>Test Preference Adjustments</Label>
              <div className="grid grid-cols-1 gap-2">
                {["Seated exercises", "Upper body focus", "Extended time limits", "Modified movements", "Verbal cues only"].map((pref) => (
                  <div key={pref} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={pref}
                      checked={profile.accessibility.testPreferences.includes(pref)}
                      onChange={(e) => {
                        const prefs = e.target.checked
                          ? [...profile.accessibility.testPreferences, pref]
                          : profile.accessibility.testPreferences.filter(p => p !== pref);
                        setProfile(prev => ({
                          ...prev,
                          accessibility: { ...prev.accessibility, testPreferences: prefs }
                        }));
                      }}
                      className="rounded border-glass-border/30"
                    />
                    <Label htmlFor={pref} className="text-sm">{pref}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1 border-glass-border/30"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              className="flex-1 btn-gradient"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}