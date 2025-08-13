"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
  const [tabValue, setTabValue] = useState("requirements");

  // Form states
  const [country, setCountry] = useState("");
  const [degree, setDegree] = useState("");
  const [academicRecord, setAcademicRecord] = useState("");
  const [englishLevel, setEnglishLevel] = useState("");
  const [budget, setBudget] = useState("");

  const handleSubmit = async () => {
    try {
      const payload = {
        country,
        degree,
        academicRecord,
        englishLevel,
        budget,
      };

      console.log("Sending data to backend:", payload);

      // const res = await fetch("/api/university-search", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(payload),
      // });

      // if (!res.ok) {
      //   throw new Error(`HTTP error! status: ${res.status}`);
      // }

      // const data = await res.json();
      // console.log("Response from backend:", data);

      setTabValue("ai");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex md:px-10 w-full flex-col gap-6">
      <Tabs value={tabValue} onValueChange={setTabValue}>
        <TabsList className="mx-auto">
          <TabsTrigger value="requirements">Details</TabsTrigger>
          <TabsTrigger value="ai">Suggestions</TabsTrigger>
        </TabsList>

        <TabsContent
          value="requirements"
          className="max-w-lg md:w-lg w-full mx-auto"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold tracking-wide">
                Find Your University
              </CardTitle>
              <CardDescription>
                Fill in your details and let our AI find the best universities
                for you.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {/* Country */}
              <div className="grid gap-2">
                <Label>Country</Label>
                <Select onValueChange={setCountry} required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usa">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="canada">Canada</SelectItem>
                    <SelectItem value="australia">Australia</SelectItem>
                    <SelectItem value="germany">Germany</SelectItem>
                    <SelectItem value="france">France</SelectItem>
                    <SelectItem value="netherlands">Netherlands</SelectItem>
                    <SelectItem value="newzealand">New Zealand</SelectItem>
                    <SelectItem value="sweden">Sweden</SelectItem>
                    <SelectItem value="singapore">Singapore</SelectItem>
                    <SelectItem value="italy">Italy</SelectItem>
                    <SelectItem value="switzerland">Switzerland</SelectItem>
                    <SelectItem value="ireland">Ireland</SelectItem>
                    <SelectItem value="denmark">Denmark</SelectItem>
                    <SelectItem value="norway">Norway</SelectItem>
                    <SelectItem value="spain">Spain</SelectItem>
                    <SelectItem value="finland">Finland</SelectItem>
                    <SelectItem value="japan">Japan</SelectItem>
                    <SelectItem value="southkorea">South Korea</SelectItem>
                    <SelectItem value="china">China</SelectItem>
                    <SelectItem value="uae">United Arab Emirates</SelectItem>
                    <SelectItem value="malaysia">Malaysia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Degree */}
              <div className="grid gap-2">
                <Label>Preferred Subject / Degree</Label>
                <Input
                  required
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  placeholder="e.g. Masters, Bachelors, MBA"
                />
              </div>

              {/* Academic Records */}
              <div className="grid gap-2">
                <Label>Academic Records</Label>
                <Select onValueChange={setAcademicRecord} required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Academic Records" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">
                      Excellent (GPA 3.8–4.0 or CGPA 8.5–10)
                    </SelectItem>
                    <SelectItem value="good">
                      Good (GPA 3.0–3.7 or CGPA 7.5–8.4)
                    </SelectItem>
                    <SelectItem value="average">
                      Average (GPA 2.5–2.9 or CGPA 6.5–7.4)
                    </SelectItem>
                    <SelectItem value="below-average">
                      Below Average (GPA &lt; 2.5 or CGPA &lt; 6.5)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* English Proficiency */}
              <div className="grid gap-2">
                <Label>English Proficiency</Label>
                <Select onValueChange={setEnglishLevel} required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select English Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="c2">C2 (Proficient)</SelectItem>
                    <SelectItem value="c1">C1 (Advanced)</SelectItem>
                    <SelectItem value="b2">B2 (Upper-Intermediate)</SelectItem>
                    <SelectItem value="b1">B1 (Intermediate)</SelectItem>
                    <SelectItem value="a2">A2 (Elementary)</SelectItem>
                    <SelectItem value="a1">A1 (Beginner)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Budget */}
              <div className="grid gap-2">
                <Label>Your Yearly Tuition Budget (USD)</Label>
                <Input
                  required
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="e.g. $20000"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSubmit}>Go to Suggestions</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Suggestions Tab */}
        <TabsContent
          value="ai"
          className="border-rose-50 md:w-3xl w-full mx-auto"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold tracking-wide">
                AI Recommendations
              </CardTitle>
              <CardDescription>
                Your personalized university suggestions will appear here.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <p>Results coming from backend...</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => setTabValue("requirements")}>
                Back to Details
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
