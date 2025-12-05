import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "wouter";
import { Upload, Download, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

/**
 * Bulk CSV Import Page (Admin Only)
 * Allows admins to import multiple events from CSV data
 */
export default function BulkImport() {
  const { user, loading } = useAuth();
  const [csvText, setCsvText] = useState("");
  const [results, setResults] = useState<any>(null);

  const templateQuery = trpc.bulkImport.getTemplate.useQuery();
  const importMutation = trpc.bulkImport.importEvents.useMutation({
    onSuccess: (data) => {
      setResults(data);
    },
  });

  // Check if user is admin
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Access denied. This page is only available to administrators.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const handleImport = () => {
    try {
      // Parse CSV text
      const lines = csvText.trim().split("\n");
      if (lines.length < 2) {
        alert("CSV must have at least a header row and one data row");
        return;
      }

      const headers = lines[0].split(",").map((h) => h.trim());
      const events = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(",").map((v) => v.trim());
        const event: any = {};

        headers.forEach((header, index) => {
          event[header] = values[index] || "";
        });

        events.push(event);
      }

      importMutation.mutate({ events });
    } catch (error) {
      alert("Error parsing CSV: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  const downloadTemplate = () => {
    if (!templateQuery.data) return;

    const csv = [
      templateQuery.data.headers.join(","),
      Object.values(templateQuery.data.example[0]).join(","),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "events_template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/perfil">
            <Button variant="ghost" className="mb-4">
              ← Back to Profile
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Bulk Event Import</h1>
          <p className="text-gray-600 mt-2">Import multiple events from CSV data</p>
        </div>

        {/* Template Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>CSV Template</CardTitle>
            <CardDescription>
              Download the template to see the required format and column headers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={downloadTemplate} disabled={!templateQuery.data}>
              <Download className="mr-2 h-4 w-4" />
              Download Template
            </Button>

            {templateQuery.data && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Required Columns:</p>
                <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                  {templateQuery.data.headers.join(", ")}
                </div>

                <p className="text-sm font-medium mt-4 mb-2">Disciplines:</p>
                <div className="bg-gray-100 p-3 rounded text-sm">
                  {templateQuery.data.disciplines.join(", ")}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Import Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Import Events</CardTitle>
            <CardDescription>
              Paste your CSV data below (including header row)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="name,discipline,date,city,region,venue,organizer,website,description&#10;Campeonato de España,natacion,2026-03-15,Madrid,Madrid,Centro M-86,RFEN,https://rfen.es,Campeonato nacional"
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              rows={10}
              className="font-mono text-sm"
            />

            <Button
              onClick={handleImport}
              disabled={!csvText.trim() || importMutation.isPending}
              className="mt-4"
            >
              <Upload className="mr-2 h-4 w-4" />
              {importMutation.isPending ? "Importing..." : "Import Events"}
            </Button>
          </CardContent>
        </Card>

        {/* Results Card */}
        {results && (
          <Card>
            <CardHeader>
              <CardTitle>Import Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="font-medium">{results.imported} events imported successfully</span>
                </div>

                {results.skipped > 0 && (
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    <span className="font-medium">{results.skipped} events skipped (already exist)</span>
                  </div>
                )}

                {results.errors.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <XCircle className="h-5 w-5 text-red-600" />
                      <span className="font-medium">{results.errors.length} errors</span>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded p-3">
                      {results.errors.map((err: any, i: number) => (
                        <div key={i} className="text-sm text-red-800">
                          Row {err.row}: {err.error}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Button onClick={() => window.location.href = "/eventos"} className="mt-4">
                  View Events
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
