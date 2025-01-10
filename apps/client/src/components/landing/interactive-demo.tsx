"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/landing/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/landing/progress";

const demoRoadmap = [
  { id: 1, title: "HTML Basics", completed: true },
  { id: 2, title: "CSS Fundamentals", completed: true },
  { id: 3, title: "JavaScript Essentials", completed: false },
  { id: 4, title: "React Introduction", completed: false },
];

export function InteractiveDemo() {
  const [activeStep, setActiveStep] = useState(2);
  const [showReview, setShowReview] = useState(false);

  const progress = (activeStep / demoRoadmap.length) * 100;

  return (
    <div className="bg-gray-50 dark:bg-gray-800 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-purple-700 dark:text-purple-400">Interactive Demo</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Experience Synaptic in action</p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">Try out our roadmap, concept connections, and review system.</p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Frontend Development Roadmap</CardTitle>
                <CardDescription>Track your progress through key concepts</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={progress} className="mb-4" />
                {demoRoadmap.map((step, index) => (
                  <div key={step.id} className={`flex items-center justify-between p-2 rounded ${index === activeStep ? "bg-purple-100 dark:bg-purple-900" : ""}`}>
                    <span className={step.completed ? "line-through" : ""}>{step.title}</span>
                    {index === activeStep && (
                      <Button size="sm" onClick={() => setActiveStep(index + 1)}>
                        Complete
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Concept Connections</CardTitle>
                <CardDescription>Visualize relationships between topics</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Placeholder for concept connection visualization */}
                <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">Concept Connection Visualization</div>
              </CardContent>
            </Card>
          </div>
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Review System</CardTitle>
              <CardDescription>Test your knowledge with smart flashcards</CardDescription>
            </CardHeader>
            <CardContent>
              {showReview ? (
                <div className="text-center">
                  <p className="mb-4">What is the primary purpose of CSS?</p>
                  <Button onClick={() => setShowReview(false)} className="mr-2">
                    Show Answer
                  </Button>
                  <Button onClick={() => setShowReview(false)} variant="outline">
                    Next Card
                  </Button>
                </div>
              ) : (
                <Button onClick={() => setShowReview(true)} className="w-full">
                  Start Review Session
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
