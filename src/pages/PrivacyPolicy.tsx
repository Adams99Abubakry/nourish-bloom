import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Database, Lock, Eye, Mail, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Privacy Policy</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Last updated: February 3, 2026
            </p>
          </div>

          {/* Introduction */}
          <Card variant="elevated">
            <CardContent className="pt-6">
              <p className="text-muted-foreground leading-relaxed">
                Welcome to Nūr al-Islam. We are committed to protecting your privacy and ensuring 
                the security of your personal information. This Privacy Policy explains how we collect, 
                use, and safeguard your data when you use our Islamic spiritual companion application.
              </p>
            </CardContent>
          </Card>

          {/* Data Collection */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Database className="w-5 h-5 text-primary" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Account Information</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm sm:text-base">
                  <li>Email address (for authentication)</li>
                  <li>Display name (optional)</li>
                  <li>Profile preferences (reciter, translation, theme)</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">Usage Data</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm sm:text-base">
                  <li>Qur'an reading progress and bookmarks</li>
                  <li>Dhikr counter statistics</li>
                  <li>Ramadan tracking goals</li>
                  <li>Prayer time preferences</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">Location Data (Optional)</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm sm:text-base">
                  <li>Geographic coordinates for accurate prayer times</li>
                  <li>Qibla direction calculation</li>
                  <li>Location is only accessed when you grant permission</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Data */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Eye className="w-5 h-5 text-primary" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 text-sm sm:text-base">
                <li>Provide personalized prayer times based on your location</li>
                <li>Save your Qur'an reading progress across devices</li>
                <li>Track your spiritual goals during Ramadan</li>
                <li>Customize your experience with preferred reciters and translations</li>
                <li>Send prayer time notifications (only if enabled)</li>
                <li>Improve our services and user experience</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Lock className="w-5 h-5 text-primary" />
                Data Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground text-sm sm:text-base">
                We implement industry-standard security measures to protect your data:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm sm:text-base">
                <li>All data is encrypted in transit using TLS/SSL</li>
                <li>Data is stored securely with Row Level Security (RLS)</li>
                <li>Your data is only accessible to you through your authenticated account</li>
                <li>We do not sell or share your personal information with third parties</li>
                <li>No public leaderboards or sharing of personal spiritual data</li>
              </ul>
            </CardContent>
          </Card>

          {/* Third Party Services */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                Third-Party Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm sm:text-base mb-3">
                We use the following third-party services:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm sm:text-base">
                <li><strong>Aladhan API</strong> - For accurate prayer time calculations</li>
                <li><strong>Al-Quran Cloud API</strong> - For Qur'an text and audio</li>
                <li>These services may have their own privacy policies</li>
              </ul>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Trash2 className="w-5 h-5 text-primary" />
                Your Rights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground text-sm sm:text-base">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm sm:text-base">
                <li>Access your personal data stored in our system</li>
                <li>Update or correct your information through settings</li>
                <li>Request deletion of your account and all associated data</li>
                <li>Withdraw consent for location access at any time</li>
                <li>Disable notifications through your browser/device settings</li>
              </ul>
              <div className="mt-4 p-4 bg-secondary/50 rounded-lg">
                <p className="text-sm text-foreground">
                  To request deletion of your data, please visit our{" "}
                  <Link to="/delete-data" className="text-primary hover:underline font-medium">
                    Data Deletion Request
                  </Link>{" "}
                  page.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Mail className="w-5 h-5 text-primary" />
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm sm:text-base">
                If you have any questions about this Privacy Policy or our data practices, 
                please contact us at:
              </p>
              <p className="mt-2 text-foreground font-medium">
                devsiddique@example.com
              </p>
            </CardContent>
          </Card>

          {/* Changes to Policy */}
          <Card variant="elevated">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-foreground mb-2">Changes to This Policy</h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                We may update this Privacy Policy from time to time. We will notify you of any 
                changes by posting the new Privacy Policy on this page and updating the 
                "Last updated" date.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
