"use client";

import { useState } from "react";
import { deleteLinkAction, extendLinkExpirationAction, generateLinkAction, toggleLinkStatusAction } from "@/lib/actions";
import { formatTimeRemaining, getFullLinkUrl, isLinkActive } from "@/utils/linkUtils";
import styles from "./LinkManager.module.css";

export default function LinkManager({ boxId, links: initialLinks }) {
  const [links, setLinks] = useState(initialLinks || []);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [hours, setHours] = useState(24);
  const [copiedToken, setCopiedToken] = useState(null);

  const handleGenerateLink = async (e) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const formData = new FormData();
      formData.append("boxId", boxId);
      formData.append("hours", hours.toString());

      const result = await generateLinkAction(formData);

      if (result.success) {
        setLinks(prev => [result.data, ...prev]);
        setShowForm(false);
        setHours(24);
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

  const handleExtendExpiration = async (token) => {
    // eslint-disable-next-line no-alert
    const additionalHours = prompt("How many hours would you like to extend this link?", "24");

    if (!additionalHours || Number.isNaN(additionalHours) || additionalHours <= 0) {
      return;
    }

    try {
      const result = await extendLinkExpirationAction(token, Number.parseInt(additionalHours));

      if (result.success) {
        setLinks(prev => prev.map(link =>
          link.token === token ? { ...link, expiresAt: result.data.expiresAt, isActive: result.data.isActive } : link,
        ));
      }
      else {
        console.error(result.error || "Failed to extend link");
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
        <h3 className={styles.title}>Submission Links</h3>
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className={styles.button}
        >
          {showForm ? "Cancel" : "Generate New Link"}
        </button>
      </div>

      {showForm && (
        <div className={styles.form__container}>
          <form onSubmit={handleGenerateLink}>
            <div className={styles.form__group}>
              <label htmlFor="hours" className={styles.label}>
                Link Duration (hours)
              </label>
              <input
                type="number"
                id="hours"
                value={hours}
                onChange={e => setHours(Number.parseInt(e.target.value) || 24)}
                min="1"
                max="8760"
                className={styles.input}
              />
            </div>
            <button
              type="submit"
              disabled={isGenerating}
              className={styles.button}
            >
              {isGenerating ? "Generating..." : "Generate Link"}
            </button>
          </form>
        </div>
      )}

      <div className={styles.links__container}>
        {links.length === 0
          ? (
              <p className={styles.empty__message}>No links generated yet.</p>
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
                      <span className={styles.time__remaining}>
                        {formatTimeRemaining(link.expiresAt)}
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
                        onClick={() => handleExtendExpiration(link.token)}
                        className={`${styles.action__button} ${styles.action__extend}`}
                      >
                        Extend
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
