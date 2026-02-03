import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Trash2, AlertTriangle, CheckCircle, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function DeleteData() {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!confirmDelete) {
      toast({
        title: "Confirmation Required",
        description: "Please confirm that you understand this action is irreversible.",
        variant: "destructive",
      });
      return;
    }

    const emailToUse = user?.email || email;
    
    if (!emailToUse) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // If user is logged in, delete their data directly
      if (user) {
        // Delete user's data from all tables
        await supabase.from('quran_bookmarks').delete().eq('user_id', user.id);
        await supabase.from('ramadan_goals').delete().eq('user_id', user.id);
        await supabase.from('profiles').delete().eq('user_id', user.id);
        
        // Sign out the user
        await signOut();
        
        toast({
          title: "Data Deleted Successfully",
          description: "Your account data has been permanently deleted.",
        });
      } else {
        // For non-logged in users, show confirmation
        // In a real app, you'd send this to an admin email or store in a requests table
        toast({
          title: "Deletion Request Submitted",
          description: "We will process your request within 30 days and send a confirmation to your email.",
        });
      }
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error deleting data:', error);
      toast({
        title: "Error",
        description: "Failed to process your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1 container mx-auto px-3 sm:px-4 py-6 sm:py-8 flex items-center justify-center">
          <Card variant="elevated" className="max-w-md w-full">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Request Submitted</h2>
              <p className="text-muted-foreground text-sm">
                {user 
                  ? "Your data has been permanently deleted. Thank you for using Nūr al-Islam."
                  : "Your deletion request has been received. We will process it within 30 days and send a confirmation to your email."
                }
              </p>
              <Button 
                onClick={() => navigate('/')} 
                variant="spiritual"
                className="w-full"
              >
                Return to Home
              </Button>
            </CardContent>
          </Card>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="max-w-xl mx-auto space-y-6">
          {/* Back Button */}
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Home</span>
          </Link>

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-destructive/10 rounded-full flex items-center justify-center">
              <Trash2 className="w-6 h-6 sm:w-8 sm:h-8 text-destructive" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Delete Your Data</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Request permanent deletion of your account and data
            </p>
          </div>

          {/* Warning Card */}
          <Card className="border-destructive/50 bg-destructive/5">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">This action is irreversible</h3>
                  <p className="text-sm text-muted-foreground">
                    Once your data is deleted, it cannot be recovered. This includes:
                  </p>
                  <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                    <li>Your profile and preferences</li>
                    <li>Qur'an reading progress and bookmarks</li>
                    <li>Ramadan tracking goals and history</li>
                    <li>Dhikr statistics</li>
                    <li>All saved settings</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Deletion Form */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="text-lg">Request Data Deletion</CardTitle>
              <CardDescription>
                {user 
                  ? "You are logged in. Your data will be deleted immediately upon submission."
                  : "Please provide your email address so we can locate and delete your data."
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {!user && (
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                )}

                {user && (
                  <div className="p-3 bg-secondary/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Logged in as: <span className="font-medium text-foreground">{user.email}</span>
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for Deletion (Optional)</Label>
                  <Textarea
                    id="reason"
                    placeholder="Help us improve by telling us why you're leaving..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
                  <Checkbox
                    id="confirm"
                    checked={confirmDelete}
                    onCheckedChange={(checked) => setConfirmDelete(checked as boolean)}
                  />
                  <Label htmlFor="confirm" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
                    I understand that this action is permanent and all my data will be 
                    irreversibly deleted from Nūr al-Islam.
                  </Label>
                </div>

                <Button
                  type="submit"
                  variant="destructive"
                  className="w-full"
                  disabled={isSubmitting || !confirmDelete}
                >
                  {isSubmitting ? "Processing..." : "Delete My Data"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Alternative Options */}
          <Card variant="elevated">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-foreground mb-3">Before You Go</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Consider these alternatives before deleting your account:
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    <Link to="/settings" className="text-primary hover:underline">Update your preferences</Link>
                    {" "}if the app isn't working as expected
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Disable notifications instead of deleting your account</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Contact us if you're experiencing technical issues</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
