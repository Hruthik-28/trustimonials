"use client";
import React from "react";
import { SignOutButton } from "@clerk/nextjs";

export default function page() {
  return (
    <div className="flex justify-center items-center">
      DASHBOARD
      <SignOutButton redirectUrl="/">Logout</SignOutButton>
    </div>
  );
}
