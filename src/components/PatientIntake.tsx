import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Shield, Upload, ArrowRight, Plus, X } from "lucide-react";
import { toast } from "sonner";

interface PatientIntakeProps {
  onComplete: () => void;
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
}

const PatientIntake = ({ onComplete }: PatientIntakeProps) => {
  const [medications, setMedications] = useState<Medication[]>([
    { id: "1", name: "", dosage: "", frequency: "" }
  ]);

  const addMedication = () => {
    setMedications([...medications, { id: Date.now().toString(), name: "", dosage: "", frequency: "" }]);
  };

  const removeMedication = (id: string) => {
    if (medications.length > 1) {
      setMedications(medications.filter(med => med.id !== id));
    }
  };

  const updateMedication = (id: string, field: keyof Medication, value: string) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, [field]: value } : med
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Patient data recorded. Analyzing medications...");
    setTimeout(() => onComplete(), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Clarity</h1>
            <p className="text-xs text-muted-foreground">Patient Medication Review</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 max-w-5xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Patient Information</h2>
          <p className="text-muted-foreground">Enter patient details and current medication regimen</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Demographics */}
          <Card className="p-6 bg-card shadow-md">
            <h3 className="text-xl font-semibold text-foreground mb-4">Demographics</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" placeholder="e.g., 72" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input id="weight" type="number" placeholder="e.g., 68" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="egfr">eGFR (mL/min)</Label>
                <Input id="egfr" type="number" placeholder="e.g., 45" />
              </div>
            </div>
          </Card>

          {/* Active Conditions */}
          <Card className="p-6 bg-card shadow-md">
            <h3 className="text-xl font-semibold text-foreground mb-4">Active Conditions</h3>
            <Textarea 
              placeholder="Enter active diagnoses (e.g., Hypertension, Type 2 Diabetes, Chronic Kidney Disease Stage 3)"
              className="min-h-[100px]"
            />
          </Card>

          {/* Medications */}
          <Card className="p-6 bg-card shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-foreground">Current Medications</h3>
              <Button type="button" variant="outline" size="sm" onClick={addMedication} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Medication
              </Button>
            </div>
            
            <div className="space-y-4">
              {medications.map((med, index) => (
                <div key={med.id} className="grid md:grid-cols-12 gap-4 items-end p-4 rounded-lg bg-secondary/30 border border-border/50">
                  <div className="md:col-span-5 space-y-2">
                    <Label htmlFor={`med-name-${med.id}`}>Medication Name</Label>
                    <Input 
                      id={`med-name-${med.id}`}
                      placeholder="e.g., Metformin"
                      value={med.name}
                      onChange={(e) => updateMedication(med.id, 'name', e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-3 space-y-2">
                    <Label htmlFor={`med-dosage-${med.id}`}>Dosage</Label>
                    <Input 
                      id={`med-dosage-${med.id}`}
                      placeholder="e.g., 500mg"
                      value={med.dosage}
                      onChange={(e) => updateMedication(med.id, 'dosage', e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-3 space-y-2">
                    <Label htmlFor={`med-freq-${med.id}`}>Frequency</Label>
                    <Input 
                      id={`med-freq-${med.id}`}
                      placeholder="e.g., BID"
                      value={med.frequency}
                      onChange={(e) => updateMedication(med.id, 'frequency', e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-1">
                    {medications.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeMedication(med.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Symptoms */}
          <Card className="p-6 bg-card shadow-md">
            <h3 className="text-xl font-semibold text-foreground mb-4">Recent Symptoms/Complaints</h3>
            <Textarea 
              placeholder="Enter any reported symptoms (e.g., dizziness, falls, confusion, dry mouth)"
              className="min-h-[100px]"
            />
          </Card>

          {/* File Upload Alternative */}
          <Card className="p-6 bg-card shadow-md border-dashed border-2">
            <div className="text-center space-y-3">
              <div className="mx-auto h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Upload className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Or Upload Patient Summary</h3>
                <p className="text-sm text-muted-foreground">Drag and drop a PDF or text file</p>
              </div>
              <Button type="button" variant="outline" className="gap-2">
                <Upload className="h-4 w-4" />
                Choose File
              </Button>
            </div>
          </Card>

          {/* Submit */}
          <div className="flex gap-4 justify-end pt-4">
            <Button type="submit" size="lg" className="gap-2">
              Analyze Medications <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientIntake;
