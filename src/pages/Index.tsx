import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Clock, FileText, Lightbulb, ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import PatientIntake from "@/components/PatientIntake";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'intake' | 'dashboard'>('landing');

  if (currentView === 'intake') {
    return <PatientIntake onComplete={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'dashboard') {
    return <Dashboard onBack={() => setCurrentView('landing')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Clarity</h1>
              <p className="text-xs text-muted-foreground">Clinical Deprescribing Co-Pilot</p>
            </div>
          </div>
          <Button onClick={() => setCurrentView('intake')} className="gap-2">
            Start Review <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            <Lightbulb className="h-4 w-4" />
            Evidence-Based Medication Optimization
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            Transform Complex Polypharmacy Into{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Clear Action
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A clinical decision support tool that helps GPs safely deprescribe non-essential medications, 
            reducing pill burden and adverse drug events—backed by trusted medical evidence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              onClick={() => setCurrentView('intake')}
              className="gap-2 text-base"
            >
              Start Patient Review <ArrowRight className="h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2 text-base">
              <FileText className="h-5 w-5" />
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="container mx-auto px-6 py-16 border-t border-border/50">
        <div className="max-w-5xl mx-auto">
          <Card className="p-8 bg-gradient-to-br from-card to-secondary/30 border-border/50 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3">The Challenge</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  GPs have just <span className="font-semibold text-foreground">15 minutes per patient</span>. 
                  When faced with a polymedicated patient on 10+ medications, the cognitive burden is overwhelming. 
                  Current systems flag problems but offer no solutions—leading to alert fatigue and inaction.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h3 className="text-3xl font-bold text-foreground">How Clarity Helps</h3>
            <p className="text-lg text-muted-foreground">From data to decision in minutes, not hours</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow bg-card">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-success" />
                </div>
                <h4 className="text-xl font-semibold text-foreground">Traffic Light Triage</h4>
                <p className="text-muted-foreground">
                  Instant risk stratification with Red/Amber/Green flags. See high-priority issues first, 
                  with every alert backed by clinical evidence and source citations.
                </p>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow bg-card">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Lightbulb className="h-6 w-6 text-accent" />
                </div>
                <h4 className="text-xl font-semibold text-foreground">Smart Alternatives</h4>
                <p className="text-muted-foreground">
                  Don't just flag problems—suggest solutions. Get safer medication alternatives and 
                  evidence-based tapering protocols for every recommendation.
                </p>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow bg-card">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-foreground">Clinical Safety First</h4>
                <p className="text-muted-foreground">
                  Every suggestion is validated against STOPP/START criteria, Beers List, and current guidelines. 
                  The AI suggests; you decide.
                </p>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow bg-card">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-warning" />
                </div>
                <h4 className="text-xl font-semibold text-foreground">Patient Communication</h4>
                <p className="text-muted-foreground">
                  Generate patient-friendly PDFs explaining medication changes in plain language, 
                  complete with tapering schedules and what to expect.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-16 border-t border-border/50">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h3 className="text-3xl font-bold text-foreground">Ready to Simplify Polypharmacy?</h3>
          <p className="text-lg text-muted-foreground">
            Start your first patient review in under 3 minutes
          </p>
          <Button 
            size="lg" 
            onClick={() => setCurrentView('intake')}
            className="gap-2"
          >
            Begin Patient Review <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                Clarity © 2025 - Clinical Deprescribing Co-Pilot
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              For healthcare professionals only. Not a substitute for clinical judgment.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
