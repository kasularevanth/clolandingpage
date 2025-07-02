import React from "react";

function getInitials(name) {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const colors = [
  "#2563eb",
  "#059669",
  "#f59e42",
  "#e11d48",
  "#6366f1",
  "#fbbf24",
  "#10b981",
  "#f43f5e",
];

const Waitlist = ({ users = [] }) => (
  <div className="waitlist-card">
    <h2 className="waitlist-title">Waitlist</h2>
    <ul className="waitlist-list">
      {users.map((user, idx) => (
        <li className="waitlist-user" key={user.email}>
          <span
            className="waitlist-avatar"
            style={{ background: colors[idx % colors.length] }}
          >
            {getInitials(user.fullName)}
          </span>
          <span className="waitlist-name">{user.fullName}</span>
          <span className="waitlist-rank">#{idx + 1}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default Waitlist;
