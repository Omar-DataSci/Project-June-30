<!-- THE MASTER TOGGLE - Must be at the top level -->
<input type="checkbox" id="what-if-toggle" style="display:none;">

<!-- THE TRIGGER BUTTON -->
<label for="what-if-toggle" class="what-if-trigger">
  🔍 Go Beyond...
</label>

<!-- MAIN BRANCH (Colorful, Default) -->
<div log-branch="main">
  <input type="checkbox" id="log-day04" class="toggle-input" style="display:none;">
  
  <label for="log-day04" class="log-trigger">
    <h3>📝 Day 04: A diary that remember.</h3>
  </label>

  <div class="log-content">
    <p>alive text</p>
  </div>
</div>

<!-- ALTERNATE BRANCH (Dull, Hidden by Default) -->
<div log-branch="alter">
  <input type="checkbox" id="log-day06" class="toggle-input" style="display:none;">
  
  <label for="log-day06" class="log-trigger glowing-timeline">
    <h3>📝 Day 06: A diary that remember.</h3>
  </label>

  <div class="log-content">
    <p>alter ..dull text</p>
  </div>
</div>

<style>
/* ==================== BASE STYLES ==================== */
[log-branch] {
  margin-bottom: 8px;
  transition: all 1.5s ease;
}

/* ==================== MAIN BRANCH ==================== */
[log-branch="main"] .log-content {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: max-height 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease-in;
}

[log-branch="main"] .toggle-input:checked ~ .log-content {
  max-height: 200000px;
  opacity: 1;
  margin-top: 8px;
}

[log-branch="main"] .log-trigger {
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-weight: 500;
  transition: color 0.3s, text-shadow 0.3s;
}

[log-branch="main"] .log-trigger:hover {
  text-shadow: 0 0 10px rgba(237, 31, 31, 0.5);
}

/* ==================== ALTERNATE BRANCH ==================== */
/* HIDDEN BY DEFAULT */
[log-branch="alter"] {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  filter: grayscale(100%) brightness(0.5);
  transition: all 1.5s ease;
}

/* SHOW WHEN TOGGLE IS CHECKED */
#what-if-toggle:checked ~ [log-branch="alter"] {
  max-height: 200000px;
  opacity: 1;
  filter: grayscale(0%) brightness(1);
  margin-top: 15px;
}

[log-branch="alter"] .log-content {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: max-height 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease-in;
}

[log-branch="alter"] .toggle-input:checked ~ .log-content {
  max-height: 200000px;
  opacity: 1;
  margin-top: 8px;
}

[log-branch="alter"] .log-trigger {
  display: inline-block;
  cursor: pointer;
  color: #888888;
  font-weight: 500;
  transition: color 0.3s, text-shadow 0.3s;
}

[log-branch="alter"] .log-trigger:hover {
  color: #ffffff;
  text-shadow: 0 0 10px rgba(34, 31, 237, 0.5);
}

/* ==================== GLOWING TIMELINE ==================== */
/* This makes the alternate log glow when the branch is active */
#what-if-toggle:checked ~ [log-branch="alter"] .glowing-timeline {
  color: #ffffff !important;
  animation: pulse-glow 2s infinite alternate;
}


/* ==================== WHAT IF TOGGLE ==================== */
.what-if-trigger {
  cursor: pointer;
  color: #ffffff;
  text-decoration: underline;
  font-weight: bold;
  display: inline-block;
  margin: 20px 0;
  transition: all 0.3s ease;
}

.what-if-trigger:hover {
  color: #e6b8c2;
  text-shadow: 0 0 10px rgba(128, 0, 32, 0.5);
}

/* ==================== GRAYSCALE EFFECT ==================== */
/* When toggle is checked, fade the main branch */
#what-if-toggle:checked ~ [log-branch="main"] {
  filter: grayscale(80%) brightness(0.6);
  opacity: 0.5;
}
</style>