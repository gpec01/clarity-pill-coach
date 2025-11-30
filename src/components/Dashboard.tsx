import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, CheckCircle2, AlertCircle, FileText, ArrowLeft, Info, ExternalLink } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface DashboardProps {
  onBack: () => void;
}

const Dashboard = ({ onBack }: DashboardProps) => {
  const riskScore = 7.2;
  
  const medications = [
    {
      name: "Diclofenac",
      dosage: "50mg BID",
      status: "critical",
      flags: ["Triple Whammy", "High ADR Risk"],
      recommendation: "Consider alternative NSAID or switch to Acetaminophen",
      rationale: "Part of the dangerous 'Triple Whammy' combination (NSAID + ACE inhibitor + Diuretic). Increases acute kidney injury risk by 31% in elderly patients.",
      source: "Lapi F, et al. BMJ 2013;346:e8525"
    },
    {
      name: "Lisinopril",
      dosage: "10mg QD",
      status: "warning",
      flags: ["Triple Whammy Component"],
      recommendation: "Monitor renal function if continuing with current regimen",
      rationale: "ACE inhibitor contributing to Triple Whammy. Safe to continue if NSAID is stopped.",
      source: "STOPP/START Criteria v2"
    },
    {
      name: "Furosemide",
      dosage: "40mg QD",
      status: "warning",
      flags: ["Triple Whammy Component"],
      recommendation: "Continue with enhanced monitoring",
      rationale: "Loop diuretic component of Triple Whammy. Essential for heart failure management.",
      source: "STOPP/START Criteria v2"
    },
    {
      name: "Amitriptyline",
      dosage: "25mg QHS",
      status: "warning",
      flags: ["High Anticholinergic Burden", "Fall Risk"],
      recommendation: "Consider switching to Mirtazapine or reducing dose",
      rationale: "High anticholinergic burden increases fall risk by 2.5x in patients >65. Patient reports dizziness.",
      source: "Beers Criteria 2023"
    },
    {
      name: "Metformin",
      dosage: "500mg BID",
      status: "safe",
      flags: [],
      recommendation: "Continue current therapy",
      rationale: "Appropriate for T2DM management. No contraindications with eGFR >45.",
      source: "ADA Guidelines 2024"
    },
    {
      name: "Atorvastatin",
      dosage: "20mg QD",
      status: "safe",
      flags: [],
      recommendation: "Continue current therapy",
      rationale: "Appropriate for cardiovascular risk reduction. No drug interactions.",
      source: "ACC/AHA Guidelines"
    },
  ];

  const criticalCount = medications.filter(m => m.status === "critical").length;
  const warningCount = medications.filter(m => m.status === "warning").length;
  const safeCount = medications.filter(m => m.status === "safe").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Clarity</h1>
                <p className="text-xs text-muted-foreground">Medication Analysis Dashboard</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onBack} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <Button className="gap-2">
                <FileText className="h-4 w-4" />
                Generate Patient PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Risk Score Overview */}
        <Card className="p-6 mb-8 bg-gradient-to-br from-card to-destructive/5 border-destructive/20 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <AlertCircle className="h-8 w-8 text-destructive" />
                <h2 className="text-2xl font-bold text-foreground">Polypharmacy Risk Score</h2>
              </div>
              <p className="text-muted-foreground mb-4">Based on current medication regimen and patient factors</p>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-destructive"></div>
                  <span className="text-sm font-medium">{criticalCount} Critical</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-warning"></div>
                  <span className="text-sm font-medium">{warningCount} Warning</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-success"></div>
                  <span className="text-sm font-medium">{safeCount} Safe</span>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center">
                <svg className="h-32 w-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="none" className="text-muted" />
                  <circle 
                    cx="64" 
                    cy="64" 
                    r="56" 
                    stroke="currentColor" 
                    strokeWidth="8" 
                    fill="none" 
                    strokeDasharray={`${(riskScore / 10) * 351.86} 351.86`}
                    className="text-destructive transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-4xl font-bold text-foreground">{riskScore}</span>
                  <span className="text-xs text-muted-foreground">/ 10</span>
                </div>
              </div>
              <p className="text-sm text-destructive font-medium mt-2">High Risk</p>
            </div>
          </div>
        </Card>

        {/* Medications List */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-foreground mb-4">Medication Review</h3>
          
          <TooltipProvider>
            {medications.map((med, index) => (
              <Card 
                key={index} 
                className={`p-6 transition-all hover:shadow-md ${
                  med.status === 'critical' ? 'border-destructive/40 bg-gradient-to-r from-destructive/5 to-card' :
                  med.status === 'warning' ? 'border-warning/40 bg-gradient-to-r from-warning/5 to-card' :
                  'border-success/40 bg-gradient-to-r from-success/5 to-card'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`h-12 w-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      med.status === 'critical' ? 'bg-destructive/10' :
                      med.status === 'warning' ? 'bg-warning/10' :
                      'bg-success/10'
                    }`}>
                      {med.status === 'critical' ? <AlertCircle className="h-6 w-6 text-destructive" /> :
                       med.status === 'warning' ? <AlertTriangle className="h-6 w-6 text-warning" /> :
                       <CheckCircle2 className="h-6 w-6 text-success" />}
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-xl font-semibold text-foreground">{med.name}</h4>
                          <Badge variant="outline" className="text-xs">{med.dosage}</Badge>
                        </div>
                        
                        {med.flags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {med.flags.map((flag, i) => (
                              <Badge 
                                key={i} 
                                variant={med.status === 'critical' ? 'destructive' : 'secondary'}
                                className="text-xs"
                              >
                                {flag}
                              </Badge>
                            ))}
                          </div>
                        )}
                        
                        {med.status !== 'safe' && (
                          <div className="space-y-2">
                            <div className="flex items-start gap-2">
                              <Info className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-sm font-medium text-foreground">Recommendation:</p>
                                <p className="text-sm text-muted-foreground">{med.recommendation}</p>
                              </div>
                            </div>
                            
                            <div className="pl-6 text-sm text-muted-foreground">
                              <p className="mb-2">{med.rationale}</p>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors">
                                    <span className="text-xs font-medium">Source: {med.source}</span>
                                    <ExternalLink className="h-3 w-3" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="text-xs">Click to view full citation</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                          </div>
                        )}
                        
                        {med.status === 'safe' && (
                          <p className="text-sm text-muted-foreground">{med.rationale}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {med.status !== 'safe' && (
                    <Button size="sm" variant="outline" className="gap-2 flex-shrink-0">
                      View Tapering Plan
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </TooltipProvider>
        </div>

        {/* Action Summary */}
        <Card className="p-6 mt-8 bg-gradient-to-br from-primary/5 to-card border-primary/20">
          <h3 className="text-xl font-semibold text-foreground mb-4">Recommended Actions</h3>
          <ol className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary font-semibold text-xs">1</span>
              <span><strong className="text-foreground">Immediate:</strong> Discontinue Diclofenac and switch to Acetaminophen 1000mg TID for pain management</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary font-semibold text-xs">2</span>
              <span><strong className="text-foreground">Week 1-2:</strong> Begin Amitriptyline taper (reduce to 12.5mg for 1 week, then discontinue)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary font-semibold text-xs">3</span>
              <span><strong className="text-foreground">Ongoing:</strong> Monitor renal function and symptoms weekly during medication changes</span>
            </li>
          </ol>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
