"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { SPOTS_PER_REFERRAL, useWaitlist } from "@/components/WaitlistProvider";
import { stepClass } from "./stepClass";

const DREAM_MAX = 600;

const SHARE_COPY =
  "I just joined the waitlist for Maren — it finds someone worth your time instead of making you swipe. Check it out: ";
const SHARE_COPY_X =
  "Just joined the waitlist for @meetmaren — it finds your person instead of handing you a deck of faces. ";

export function Step4Success({ active, animate }: { active: boolean; animate: boolean }) {
  const { success, shareUrl, patchWaitlist } = useWaitlist();

  const position = success?.position;
  const referrals = success?.referrals ?? 0;

  return (
    <div className={stepClass(active, animate)} id="step4">
      <div className="badge">
        {position
          ? `You're #${Number(position).toLocaleString()} on the list`
          : "You're on the list"}
      </div>
      <h2 className="suc-h">You&apos;re in.</h2>
      <p className="suc-p">
        We&apos;ll reach out when it&apos;s your turn. The earlier you joined, the sooner
        you get in.
      </p>

      <div className="share-box">
        <p className="share-label">Move up the line.</p>
        <p className="share-sub">Every friend who joins bumps you closer to the front.</p>

        <ShareRow url={shareUrl} />

        {referrals > 0 && (
          <p className="ref-count">
            {referrals} {referrals === 1 ? "friend has" : "friends have"} joined — you moved
            up {(referrals * SPOTS_PER_REFERRAL).toLocaleString()} spots
          </p>
        )}

        <ShareButtons url={shareUrl} />

        <div className="milestones">
          <span className="milestone">
            <strong>3 refs</strong> → priority access
          </span>
          <span className="milestone">
            <strong>5 refs</strong> → early invite
          </span>
          <span className="milestone">
            <strong>10 refs</strong> → founding member
          </span>
        </div>
      </div>

      <div className="ref-steps">
        <div className="ref-step">
          <div className="ref-icon">🔗</div>
          <strong>Share your link</strong>
          <p>Send it to someone who deserves better dates</p>
        </div>
        <div className="ref-step">
          <div className="ref-icon">✓</div>
          <strong>They join</strong>
          <p>You both move up the waitlist</p>
        </div>
        <div className="ref-step">
          <div className="ref-icon">🔑</div>
          <strong>Get in sooner</strong>
          <p>Top referrers get earliest access</p>
        </div>
      </div>

      <DreamFeature onSubmit={(answer) => patchWaitlist({ p_dream_feature: answer })} />
    </div>
  );
}

// ── Copyable link ────────────────────────────────────────────────────────────

function ShareRow({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const flashCopied = () => {
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  const copy = () => {
    track("share_copy", { channel: "clipboard" });
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url).then(flashCopied, fallback);
    } else {
      fallback();
    }
  };

  // execCommand is deprecated but still the only path in older in-app browsers,
  // which is exactly where a share link gets opened.
  function fallback() {
    inputRef.current?.select();
    try {
      document.execCommand("copy");
    } catch {
      /* nothing else to try — the field is selected, they can copy by hand */
    }
    flashCopied();
  }

  return (
    <div className="share-row">
      <input
        ref={inputRef}
        type="text"
        className="share-link"
        value={url}
        readOnly
        onFocus={(e) => e.target.select()}
      />
      <button
        type="button"
        className={copied ? "copy-btn copied" : "copy-btn"}
        onClick={copy}
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

// ── Channel buttons ──────────────────────────────────────────────────────────

function ShareButtons({ url }: { url: string }) {
  const body = encodeURIComponent(SHARE_COPY + url);
  const xBody = encodeURIComponent(SHARE_COPY_X + url);

  const channels = [
    { key: "imessage", label: "💬 iMessage", href: `sms:?&body=${body}` },
    {
      key: "x",
      label: "𝕏 Post",
      href: `https://twitter.com/intent/tweet?text=${xBody}`,
    },
    { key: "whatsapp", label: "WhatsApp", href: `https://wa.me/?text=${body}` },
  ];

  return (
    <div className="share-btns">
      {channels.map((c) => (
        <a
          key={c.key}
          className="share-btn"
          href={c.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("share_click", { channel: c.key })}
        >
          {c.label}
        </a>
      ))}
    </div>
  );
}

// ── Post-signup open question ────────────────────────────────────────────────

function DreamFeature({ onSubmit }: { onSubmit: (answer: string) => void }) {
  const [answer, setAnswer] = useState("");
  const [done, setDone] = useState<null | "sent" | "skipped">(null);
  const [pending, setPending] = useState(false);

  const send = () => {
    const value = answer.trim();
    if (!value) return;
    setPending(true);
    track("dream_send", { len: value.length });
    onSubmit(value);
    // The answer is a nice-to-have; do not make them wait on the round trip.
    setDone("sent");
  };

  return (
    <div className="q-box">
      <div className={done ? "q-form off" : "q-form"}>
        <p className="q-box-label">
          If you could build the perfect way to find the right person, what would it do
          differently?
        </p>
        <p className="q-box-opt">Totally optional. But we&apos;re listening.</p>
        <textarea
          className="q-ta"
          placeholder="Whatever comes to mind..."
          maxLength={DREAM_MAX}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <div className="q-acts">
          <button type="button" className="q-send" onClick={send} disabled={pending}>
            {pending ? "..." : "Share"}
          </button>
          <button
            type="button"
            className="q-skip"
            onClick={() => {
              track("dream_skip", {});
              setDone("skipped");
            }}
          >
            Skip
          </button>
        </div>
      </div>
      <div className={done ? "q-thanks on" : "q-thanks"}>
        <p className="thx-t">
          {done === "skipped" ? "No worries. We'll be in touch." : "Noted. That actually helps."}
        </p>
      </div>
    </div>
  );
}
