"use client";

import { useState } from "react";
import { deleteLinkAction, generateLinkAction, toggleLinkStatusAction } from "@/lib/actions";
import { getFullLinkUrl, isLinkActive } from "@/utils/linkUtils";
import styles from "./dashboard.module.css";

export default function LinkManager({ boxId, links: initialLinks }) {
  const [links, setLinks] = useState(initialLinks || []);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedToken, setCopiedToken] = useState(null);

  const handleGenerateLink = async (e) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const formData = new FormData();
      formData.append("boxId", boxId);

      const result = await generateLinkAction(formData);

      if (result.success) {
        setLinks(prev => [result.data, ...prev]);
      }
      else {
        console.error(result.error || "Failed to generate link");
      }
    }
    catch (error) {
      console.error(error, "An unexpected error occurred");
    }
    finally {
      setIsGenerating(false);
    }
  };

  const handleToggleStatus = async (token) => {
    try {
      const result = await toggleLinkStatusAction(token);

      if (result.success) {
        setLinks(prev => prev.map(link =>
          link.token === token ? { ...link, isActive: result.data.isActive } : link,
        ));
      }
      else {
        console.error(result.error || "Failed to update link status");
      }
    }
    catch (error) {
      console.error(error, "An unexpected error occurred");
    }
  };

  const handleDeleteLink = async (token) => {
    // eslint-disable-next-line no-alert
    if (!confirm("Are you sure you want to delete this link? This action cannot be undone.")) {
      return;
    }

    try {
      const result = await deleteLinkAction(token);

      if (result.success) {
        setLinks(prev => prev.filter(link => link.token !== token));
      }
      else {
        console.error(result.error || "Failed to delete link");
      }
    }
    catch (error) {
      console.error(error, "An unexpected error occurred");
    }
  };

  const copyToClipboard = async (token) => {
    try {
      const url = getFullLinkUrl(token);
      await navigator.clipboard.writeText(url);
      setCopiedToken(token);
      setTimeout(() => setCopiedToken(null), 2000);
    }
    catch (error) {
      console.error(error, "Failed to copy link to clipboard");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.link__creation__container}>
          <h3 className={styles.title}>Submission Link</h3>
          {links.length === 0 && (
            <form onSubmit={handleGenerateLink}>
              <button
                type="submit"
                disabled={isGenerating}
                className={styles.link__generation__button}
              >
                {isGenerating ? "Generating..." : "Generate Link"}
              </button>
            </form>
          )}
        </div>
      </div>

      <div className={styles.links__container}>
        {links.length === 0
          ? (
              <p className={styles.empty__message}>No link generated yet.</p>
            )
          : (
              links.map(link => (
                <div key={link.token} className={styles.link__card}>
                  <div className={styles.link__header}>
                    <div className={styles.status__container}>
                      <span className={`${styles.status__badge} ${
                        isLinkActive(link) ? styles.status__active : styles.status__inactive
                      }`}
                      >
                        {isLinkActive(link) ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <div className={styles.actions__container}>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(link.token)}
                        className={`${styles.action__button} ${styles.action__copy}`}
                      >
                        {copiedToken === link.token ? "Copied!" : "Copy Link"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(link.token)}
                        className={`${styles.action__button} ${styles.action__toggle}`}
                      >
                        {link.isActive ? "Disable" : "Enable"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteLink(link.token)}
                        className={`${styles.action__button} ${styles.action__delete}`}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className={styles.link__url}>
                    {getFullLinkUrl(link.token)}
                  </div>
                  <div className={styles.link__meta}>
                    Created:
                    {" "}
                    {new Date(link.createdAt).toLocaleString()}
                  </div>
                </div>
              ))
            )}
      </div>
    </div>
  );
}
