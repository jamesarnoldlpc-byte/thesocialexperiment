const container = document.getElementById("leaderboard");

fetch("/.netlify/forms/xp-log/submissions")
  .then(res => res.json())
  .then(data => {
    if (!data || !data.length) {
      container.innerHTML = "<div class='loading'>No data yet</div>";
      return;
    }

    const players = {};

    // Keep highest XP per avatar
    data.forEach(entry => {
      const id = entry.data.avatarId;
      const xp = parseInt(entry.data.xp, 10) || 0;

      if (!players[id] || xp > players[id].xp) {
        players[id] = {
          name: entry.data.avatarName,
          xp: xp,
          title: entry.data.title || "Newcomer"
        };
      }
    });

    const sorted = Object.values(players)
      .sort((a, b) => b.xp - a.xp)
      .slice(0, 10);

    container.innerHTML = "";

    sorted.forEach((p, i) => {
      const row = document.createElement("div");
      row.className = "entry rank-" + (i + 1);

      row.innerHTML = `
        <div class="rank">#${i + 1}</div>
        <div>
          <div class="name">${p.name}</div>
          <div class="title">${p.title}</div>
        </div>
        <div class="xp">${p.xp}</div>
      `;

      container.appendChild(row);
    });
  })
  .catch(() => {
    container.innerHTML =
      "<div class='loading'>Leaderboard unavailable</div>";
  });
