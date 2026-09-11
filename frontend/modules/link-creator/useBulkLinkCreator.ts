import { useState } from "react";

export function useBulkLinkCreator() {
  const [urlsText, setUrlsText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdResults, setCreatedResults] = useState<any[] | null>(null);

  const handleSubmitBulk = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setCreatedResults(null);
    setLoading(true);

    const urls = urlsText
      .split("\n")
      .map((u) => u.trim())
      .filter((u) => u !== "");

    if (urls.length === 0) {
      setError("Please enter at least one URL.");
      setLoading(false);
      return;
    }

    if (urls.length > 20) {
      setError("You can only shorten up to 20 URLs at once.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/links/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls }),
      });
      
      const data = await res.json();
      
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to create bulk links.");
      }
      
      setCreatedResults(data.links);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return {
    urlsText,
    setUrlsText,
    loading,
    error,
    createdResults,
    handleSubmitBulk,
  };
}
